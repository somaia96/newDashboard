import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { IDecisions, IEvents, INews, INewsApi, IServices, ITabs } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import { useState } from "react";
import { Dialog } from '@headlessui/react'
import instance from "../api/instance";
import FormEditNews from "./Form/FormEdit/FormEditNews";
import FormEditServ from "./Form/FormEdit/FormEditServ";
import FormEditEvents from "./Form/FormEdit/FormEditEvent";
import FormEditDecision from "./Form/FormEdit/FormEditDecision";
import toasty from "../utils/toast";
import getToken from "../utils/gitToken";

interface IProps {
  news: INewsApi,
  order?: number,
  noPic?: boolean,
  url:string,
  tabs?:ITabs[],
  setRefresh:(val:string)=>void,
}
export default function CardNews({setRefresh, noPic = true, order = 0, news,url,tabs }: IProps) {
  const [openDel, setOpenDel] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [itemID, setItemID] = useState<number>(0)


  let timestamp = news.activity_date ? new Date(news.activity_date!) : new Date(news.created_at!);

  const handleEdite=()=>{
    setOpenEdit(true)
  }
  const handleDelete=(id:number)=>{
    setItemID(id)
    setOpenDel(true)
  }
  
  const DeleteItem=async(id:number,url:string)=>{
    setOpenDel(false)
    try {
      let res = await instance.delete(`${url}/${id}`, {
          headers: {
              Authorization: `Bearer ${getToken()}`,
          }
      });
      (res.status === 200 || res.status === 201) ? toasty("success","تم الحذف بنجاح") : null;
      setRefresh("delete")

    } catch (error) {
      console.error('Error fetching news:', error);
      toasty("error","حدث خطأ أثناء الحذف")
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  }
  return (
    <Card className={(order != 0 ? "max-w-full md:max-w-[49%] " : "") + "w-full max-w-[100%] p-3 md:gap-5 flex-col lg:flex-row my-3"}>
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
                    onClick={()=>DeleteItem(itemID,url)}
                        className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        حذف
                    </button>
                    <button
                    onClick={()=>setOpenDel(false)}
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
            { (url === "/news") ? <FormEditNews setRefresh={setRefresh} item={news as INews} setOpenEdit={setOpenEdit}/>
            : (url === "/services") ? <FormEditServ setRefresh={setRefresh} item={news as IServices} setOpenEdit={setOpenEdit} tabs={tabs}/>
            : (url === "/activity") ? <FormEditEvents setRefresh={setRefresh} item={news as IEvents} setOpenEdit={setOpenEdit} tabs={tabs}/>
            : (url === "/decision") ? <FormEditDecision setRefresh={setRefresh} item={news as IDecisions} setOpenEdit={setOpenEdit}/>
            :null }
          </Dialog.Panel>
        </div>
      </Dialog>
      {noPic && <CardHeader
        shadow={false}
        floated={false}
        className={(order != 0 ? "hidden md:block " : "") + " relative m-0 w-full lg:w-1/4 lg:shrink-0 lg:rounded-l-none"}
        style={order != 0 ? { order: order, marginRight: "auto" } : {}}
      >
        {news.photos ? <img
          src={typeof(news.photos[0]) == "string"?news.photos[0]:""}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover"
        /> : <img
          src={`/images/empty.jpg`}
          alt="card-image"
          className="lg:h-[224px] w-full object-cover"
        />}
      </CardHeader>}
      <CardBody className="flex flex-col lg:pe-5 lg:py-6 lg:my-0 w-full">
       <div className="flex justify-between items-center w-full">
       <Typography variant="h6" className="mb-4 text-xl text-primary uppercase">
          {news.title}
        </Typography>
        <div className='flex justify-center gap-2 items-center'>
                    <button
                        onClick={handleEdite}
                        className="px-4 my-3 border-2 border-primary rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        تعديل
                    </button>
                    <button
                        onClick={()=>handleDelete(news.id!)}
                        className="px-4 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        حذف
                    </button>
                </div>
       </div>
        {timestamp && <Typography variant="small" color="blue-gray" className="mb-2 text-sm text-gray-600">
          {timestamp.toISOString().split('T')[0]}
        </Typography>}
        <div color="gray" className="mb-3 text-base text-gray-900">
          {txtSlicer(news.description, (news.photos ? undefined : 250))}
        </div>
        {news.photos ? <div className="flex max-w-full justify-center items-center md:justify-start w-full gap-3 mb-5 md:mb-0 -order-1 md:order-12">
          {news.photos.map((img, i) => (
            <img className="w-auto h-14" key={i} src={typeof(img)=="string"?img:""} />
          ))}
        </div> : null

        }
      </CardBody>
    </Card>
  );
}