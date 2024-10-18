import { useState } from "react";
import { IMembers } from "../../interfaces";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import instance from "../../api/instance";
import { Dialog } from '@headlessui/react'
import FormEditMember from "../Form/FormEdit/FormEditMember";
import { txtSlicer } from "../../utils/functions";
import toasty from "../../utils/toast";
import getToken from "../../utils/gitToken";

function Member({ setRefresh, member }: {setRefresh:(val:string)=>void, member: IMembers }) {
  const [openDel, setOpenDel] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [itemID, setItemID] = useState<number>(0)

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
      (res.status === 200 || res.status === 201) ? toasty("success","تم الحذف بنجاح") : null;
      setRefresh("true")

    } catch (error) {
      console.error('Error fetching news:', error);
      toasty("error","حدث خطأ أثناء الحذف")
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <Card className="h-full max-h-[450px]">
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
            <FormEditMember  setRefresh={setRefresh} member={member} setOpenEdit={setOpenEdit} />
          </Dialog.Panel>
        </div>
      </Dialog>
      <CardHeader shadow={false} floated={false} >
        {member.photo ? <img src={typeof(member.photo) == "string" ? member.photo :""}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover" /> : <img
          src={`/images/empty.jpg`}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover"
        />}
      </CardHeader>
      <CardBody className="p-5 flex flex-col items-center justify-center h-full">
        <Typography variant="h4" className="mb-2 text-primary uppercase text-sm">
          {member.name}
        </Typography>
        <Typography variant="small" color="blue-gray" className="mb-2 text-sm text-gray-600">
          {member.job_title}
        </Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-gray-600">
          {txtSlicer(member.description, 150)}
        </Typography>
      </CardBody>
      <CardFooter className="px-5 pb-5 pt-0">
        <div className='flex justify-center gap-2 items-end h-auto'>
          <button
            onClick={handleEdite}
            className="px-3 border-2 border-primary rounded-lg bg-primary py-1 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            تعديل
          </button>
          <button
            onClick={() => handleDelete(member.id!)}
            className="px-3 rounded-lg border-2 border-red-800 py-1 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            حذف
          </button>
        </div>
      </CardFooter>
    </Card >
  );
}

export default Member;
