import CardNews from '../components/Card';
import { ChangeEvent, useState } from "react";
import { INewsApi, IServices ,ITabs } from "@/interfaces";
import { Button } from '../components/ui/button';
import Alerting from '../components/Alert';
import instance from '../api/instance'
import { useQuery } from '@tanstack/react-query'
import { txtSlicer } from '../utils/functions';
import CardSkeleton from '../components/Skeleton/CardSkeleton';
import TabSkeleton from '../components/Skeleton/TabSkeleton';
import FormAddServ from '../components/Form/FormsAdd/FormAddServ';
import { Dialog } from '@headlessui/react'
import FormAddSkeleton from '../components/Skeleton/FormAddSkeleton';
import toasty from '../utils/toast';
import getToken from "../utils/gitToken";


const Services = () => {
  const [refresh, setRefresh] = useState("false")

  // tabs
  const [nameTab, setNameTab] = useState("");
  const [addArr, setAddArr] = useState([]);
  const [delArr, setDelArr] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  // modal
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  // data
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['serviceData', refresh],
    queryFn: async ({ queryKey}) => {
      const currentStatus = queryKey[1]; // Access tabId from queryKey
      if (!currentStatus) return; // Avoid unnecessary initial request
      const serviceRes = await instance.get('/services')
      const tabRes = await instance.get('/service-categories');
      setFilteredEvents(serviceRes.data.data)
      setAddArr(tabRes.data.data)
      return { serviceRes, tabRes }
    },
    enabled: !!refresh,

  })

  // Tabs Add & Edit
  // add tab
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNameTab(e.target.value)
  }
  // cancel add tab
  const cancelHandler = () => {
    setNameTab("")
    setOpenAdd(false)
  }
  // confirm add tab
  const submitHandler = async () => {
    try {
      let res = await instance.post("/service-categories", { name: nameTab }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        }
      });

      (res.status === 200 || res.status === 201) ? toasty("success","تم اضافة فئة جديدة بنجاح") : null;
      setOpenAdd(false)
      setNameTab("")

    } catch (error) {
      toasty("error","حدث خطأ أثناء اضافة فئة")
    }

  }
  // Tabs Editing
  // delete tabs temp
  const addToDelArr = (idDel: number) => {
    setDelArr((prev: number[]) => [idDel, ...prev])
    setAddArr((prev) => prev.filter((item: ITabs) => item.id !== idDel))
  }
  // cancel deleting tabs
  const cancelEditHandler = () => {
    setAddArr(data?.tabRes.data.data)
    setDelArr([])
    setOpenEdit(false)
  }
  // delete tabs perm
  const submitEditCatHandler = async () => {
    try {
      delArr.forEach((id) => {
        instance.delete(`/service-categories/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          }
        });
      });
      setOpenEdit(false)
      setDelArr([])
      setAddArr(data?.tabRes.data.data)
      setRefresh("delete")
    } catch (error) {
      toasty("error","حدث خطأ أثناء حذف الفئة")
    }
  }

  const tabs = data?.tabRes.data.data;

  const handlActiveTabClick = (tab: number) => {
    setActiveTab(tab);
    setFilteredEvents(data?.serviceRes.data.data.filter((servData: IServices) => servData.service_category_id === tab));
  };


  if (isLoading) return (
    <div className="my-10 space-y-5 flex flex-col items-center justify-center">
      <FormAddSkeleton serv={true} />
      <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
      <div className='flex items-center justify-center gap-4 my-3'>
        {Array.from({ length: 5 }).map((_, i) => <TabSkeleton key={i} />)}
      </div>
      <div className='grid md:grid-cols-2 gap-20'>
        {Array.from({ length: 5 }).map((_, i) => <CardSkeleton noPic={false} key={i} />)}
      </div>
    </div>
  )

  if (error) return <Alerting />
  return (
    <div className='my-5'>
      {/* Modal Add category */}
      <Dialog open={openAdd} onClose={setOpenAdd} className="relative z-10">
        <Dialog.Backdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
          <Dialog.Panel
            className="relative transform overflow-hidden rounded-lg bg-white p-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <h2 className="font-semibold text-xl mb-5 text-center">اضافة فئة خدمة جديدة</h2>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="name" className=" font-medium  leading-6 text-gray-900">
                اسم الفئة :
              </label>
              <div className="flex rounded-md shadow-sm flex-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder='يجب ألا تتجاوز الفئة 12 حرف'
                  autoComplete="name"
                  value={nameTab}
                  onChange={(e) => { changeHandler(e) }}
                  className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                />
              </div>
            </div>
            <div className='flex justify-center gap-3 mt-5'>
              <button
                onClick={submitHandler}
                className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                نشر
              </button>
              <button
                onClick={cancelHandler}
                className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                الغاء
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Modal Edit category */}
      <Dialog open={openEdit} onClose={setOpenEdit} className="relative z-10">
        <Dialog.Backdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
          <Dialog.Panel
            className="relative transform overflow-hidden rounded-lg bg-white p-5 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <h2 className="font-semibold text-xl mb-5 text-primary text-center">اضافة فئة خدمة جديدة</h2>
            <div className='flex flex-col gap-2'>
              {addArr.map((tab: ITabs) => {
                  
                return <div key={tab.id} className="flex items-center shadow-md p-4 rounded-lg justify-between gap-7">
                  <div className=" font-medium text-lg leading-6 text-gray-700">
                    {tab.name}
                  </div>
                  <div
                    onClick={() => addToDelArr(tab.id!)}
                    className="flex cursor-pointer rounded-md text-sm text-red-800 justify-end flex-1">
                    حذف
                  </div>
                </div>
              })}
            </div>
            <div className='flex justify-center gap-3 mt-5'>
              <button
                onClick={submitEditCatHandler}
                className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                حفظ التعديلات
              </button>
              <button
                onClick={cancelEditHandler}
                className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                الغاء
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div>
        <div className='flex justify-center gap-3 mt-5'>
          <button
            onClick={() => setOpenAdd(true)}
            className="flex justify-around items-center w-1/4 px-5 text-lg my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            اضافة فئة جديدة
            <i className="fa-solid fa-plus fa-xl text-lg"></i>
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="w-1/4 my-3 rounded-lg border-2 text-lg border-primary py-2 font-semibold text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            تعديل الفئات الحالية
          </button>
        </div>
      </div>
      <div className="container">
        <FormAddServ setRefresh={setRefresh} tabs={tabs} />
      </div>
      <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
      <div className='flex lg:justify-center items-center gap-3 overflow-x-scroll py-2' style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
        {tabs.map((tab: ITabs) => (
          <Button key={tab.id}
            onClick={() => handlActiveTabClick(tab.id!)}
            className={(activeTab === tab.id
              ? "bg-primary text-white border-primary"
              : "border-gray-200 bg-white text-gray-800") + ' w-28 md:w-36 border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{txtSlicer(tab.name, 12)}</Button>
        ))}
      </div>
      <div className='flex gap-3 flex-col md:flex-row md:flex-wrap md:justify-between'>
        {filteredEvents.map((item: IServices) => <CardNews setRefresh={setRefresh} tabs={tabs} noPic={false} key={item.id} news={item as INewsApi} url='/services' />)}
      </div>
    </div>
  )
}

export default Services