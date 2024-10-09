import { useState } from "react";
import { IMember } from "../../interfaces";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import instance from "../../api/instance";
import toast from "react-hot-toast";
import { Dialog } from '@headlessui/react'
import FormEditMember from "../Form/FormEdit/FormEditMember";

function Member({ member }: { member: IMember }) {
  const [openDel, setOpenDel] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [itemID, setItemID] = useState<number>(0)


  const getToken = () => {
    return localStorage.getItem('tokenMunicipality');
  };
  const handleEdite = () => {
    setOpenEdit(true)
  }
  const handleDelete = (id: number) => {
    setItemID(id)
    setOpenDel(true)
  }

  const DeleteItem = async (id: number) => {
    setOpenDel(false)
    try {
      let res = await instance.delete(`/council-members/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      });
      (res.status === 200 || res.status === 201) ? toast.success('تم الحذف بنجاح  ', {
        duration: 2000,
        position: 'top-center',
        className: 'bg-blue-100',
        icon: '👏',
      }) : null;
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('حدث خطأ أثناء ارسال الطلب', {
        duration: 2000,
        position: 'top-center',
        className: 'bg-red-100',
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <Card className="h-full">
      {/* Modal Delete Item */}
      <Dialog open={openDel} onClose={setOpenDel} className="relative z-10">
        <Dialog.Backdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
          <Dialog.Panel
            className="relative transform overflow-hidden rounded-lg bg-white p-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <h2 className="font-semibold text-lg">هل أنت متأكد ؟</h2>
            <div className='flex justify-center gap-3 mt-5'>
              <button
                onClick={() => DeleteItem(itemID)}
                className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                حذف
              </button>
              <button
                onClick={() => setOpenDel(false)}
                className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                الغاء
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Modal Edit Item */}
      <Dialog open={openEdit} onClose={setOpenEdit} className="relative z-10">
        <Dialog.Backdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
          <Dialog.Panel
            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <FormEditMember item={member} setOpenEdit={setOpenEdit}/>
          </Dialog.Panel>
        </div>
      </Dialog>
      <CardHeader shadow={false} floated={false} >
        {member.photo ? <img src={member.photo}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover" /> : <img
          src={`/images/empty.jpg`}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover"
        />}
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-center ">
        <Typography variant="h4" className="mb-2 text-primary uppercase text-sm">
          {member.name}
        </Typography>
        <div className='flex justify-center gap-2 items-center'>
          <button
            onClick={handleEdite}
            className="px-4 my-3 border-2 border-primary rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            تعديل
          </button>
          <button
            onClick={() => handleDelete(member.id)}
            className="px-4 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            حذف
          </button>
        </div>
    </CardBody>
    </Card >
  );
}

export default Member;
