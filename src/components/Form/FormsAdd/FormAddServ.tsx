import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../../api/instance'
import toast, { Toaster } from 'react-hot-toast';
import { txtSlicer } from '../../../utils/functions';
import { Button } from '../../ui/button';


interface IEventTabs {
    id: number,
    name: string,
}
export default function FormAddServ({ tabs }: { tabs: IEventTabs[] }) {
    const [activeTab, setActiveTab] = useState(1)
    const [servData, setServData] = useState({
        title: "",
        description: "",
        service_category_id: 1,
    })
    const handleTabClick = (tabNum: number) => {
        setActiveTab(tabNum);
        setServData((prev) => ({ ...prev, service_category_id: tabNum }));
    }
    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };

    const changeHandler = async (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            let res = await instance.post("/services", servData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                }
            });

            (res.status === 200 || res.status === 201) ? toast.success('تم ارسال الطلب ', {
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
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={(e) => submitHandler(e)}>
                <Toaster position="top-center" reverseOrder={false} />
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة خدمة جديدة</h2>

                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            النوع
                        </label>
                        <div style={{scrollbarWidth:"thin", scrollbarColor: "#cfcfcfb8 transparent" }} className="overflow-x-scroll py-1 flex rounded-md shadow-sm flex-1 gap-2">
                            {tabs.map((tab: IEventTabs) => (
                                <Button key={tab.id}
                                    type='button'
                                    onClick={() => handleTabClick(tab.id)}
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
                                placeholder='عنوان الخدمة'
                                autoComplete="title"
                                value={servData?.title}
                                onChange={(e) => { changeHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
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
                                value={servData?.description}
                                onChange={(e) => { changeHandler(e) }}
                                placeholder='نص الخدمة'
                                className="block border border-1 border-gray-300  px-3 w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
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
