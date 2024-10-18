import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../../api/instance'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Button } from '../../ui/button';
import { txtSlicer } from '../../../utils/functions';
import { IEvents, ITabs } from '../../../interfaces';
import toasty from '../../../utils/toast';
import getToken from "../../../utils/gitToken";


export default function FormAddEvents({setRefresh, tabs }: {setRefresh:(val:string)=>void, tabs: ITabs[] }) {
    let todayDate = new Date()
    const [activeTab, setActiveTab] = useState(0)
    const [eventData, setEventData] = useState<IEvents>({
        title: "",
        description: "",
        photos: [],
        activity_type_id: 1,
        activity_date: todayDate.toISOString().split('T')[0],
    })
    const handleTabClick = (tab: number) => {
        setActiveTab(tab);
        setEventData((prev) => ({ ...prev, activity_type_id: tab }));
    }

    const changeAddHandler = async (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name == "photo") {
            const files: FileList | null = (e.target as HTMLInputElement).files;
            const filesArray = files ?? [];
            if (filesArray?.length > 0) {
            const eventPhotos = Array.from(filesArray);
               
            setEventData((prev) => ({ ...prev, photos: eventPhotos }));
            }
        } else {
            setEventData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const submitAddHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            let res = await instance.post("/activity", eventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            (res.status === 200 || res.status === 201) ? toasty("success","تم ارسال الفعالية بنجاح") : null;
            setRefresh("add")

        } catch (error) {
            toasty("error","حدث خطأ أثناء ارسال الفعالية")
        }
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={(e) => submitAddHandler(e)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة فعالية جديدة</h2>

                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                        الفئة
                        </label>
                        <div className="flex rounded-md shadow-sm py-1 flex-1 gap-2" style={{scrollbarWidth:"thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
                            {tabs.map((tab: ITabs) => (
                                <Button key={tab.id}
                                    type='button'
                                    onClick={() => handleTabClick(tab.id!)}
                                    className={(activeTab === tab.id
                                        ? "bg-primary text-white border-primary"
                                        : "border-gray-200 bg-white text-gray-800") + ' w-28 border-1 border focus-visible:ring-0 py-1  hover:text-white hover:bg-primary text-base'}
                                >{txtSlicer(tab.name, 12)}</Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="title" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            العنوان
                        </label>
                        <div className="flex rounded-md shadow-sm flex-1">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="عنوان الفعالية"
                                autoComplete="title"
                                value={eventData?.title}
                                onChange={(e) => { changeAddHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="date" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            التاريخ
                        </label>
                        <div className="flex flex-1 rounded-md shadow-sm">
                            <input
                                id="date"
                                name="activity_date"
                                type="date"
                                autoComplete="date"
                                value={eventData.activity_date}
                                onChange={(e) => { changeAddHandler(e) }}
                                className="bg-white block border border-1 border-gray-300  flex-1 rounded-lg px-3 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="description" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            النص
                        </label>
                        <div className='flex-1'>
                            <textarea
                                id="description"
                                name="description"
                                rows={2}
                                value={eventData?.description}
                                onChange={(e) => { changeAddHandler(e) }}
                                placeholder='نص الفعالية'
                                className="block border border-1 border-gray-300  px-3 w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="cover-photo" className="text-sm w-16 font-medium leading-6 text-gray-900">
                            الصور :
                        </label>
                        <div className="bg-white border border-1 border-gray-300 flex-1 flex justify-center rounded-lg px-6 py-3">
                            <div className="text-center">
                                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="items-center justify-center flex text-xs leading-6 text-gray-600">
                                    <label
                                        htmlFor="photo"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>اضغط لإضافة صور أو اسحب الصور وافلت هنا</span>
                                        <input
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => { changeAddHandler(e) }}
                                            className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs font-semibold leading-6 text-gray-600">يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 1</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-3 mt-5'>
                    <button
                        className="w-1/3 my-3 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        نشر
                    </button>
                    <button
                        className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        الغاء
                    </button>
                </div>
            </form>
        </div>
    )
}
