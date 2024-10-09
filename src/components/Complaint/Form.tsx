import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../api/instance'
import toast, { Toaster } from 'react-hot-toast';
import { PhotoIcon } from '@heroicons/react/24/solid'

interface IData {
    title:string,
    description:string,
    photos?:[],
    service_category_id?:number,
}

interface IProps {
    title: string,
    url: string,
}

export default function Form({ title, url }: IProps) {

    const [token, setToken] = useState<string | null>("");
    

    // const [typeData, setTypeData] = useState(()=>{
    //     if(title == "services") return "service_category_id";
    //     if(title == "decisions") return "decision_id";
    //     if(title == "events") return "activity_type_name";
    // });
    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };
    
    setToken(getToken())
    let todayDate = new Date()
 
    const [newsData, setNewsData] = useState({
        title: "",
        description: "",
        photos: [],
    })
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        photos: [],
        activity_type_name: 1,
        activity_date: todayDate,
    })
    const [descData, setDescData] = useState({
      title: "",
      description: "",
      photos: [],
      decision_date: todayDate,
      decision_id: 1,
  })
  
    const [servData, setServData] = useState({
        title: "",
        description: "",
        service_category_id: 1,
    })

const [data, setData] = useState(()=>{
    if(title == "news") return newsData;
    if(title == "services") return servData;
    if(title == "decisions") return descData;
    if(title == "events") return eventData;
})

    const changeHandler = async (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServData((prev:{}) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            let res = await instance.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة {title} جديد</h2>

                    { title !== "news" &&
                         <div className="flex items-center justify-between">
                         <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                             النوع
                         </label>
                         <div className="flex rounded-md shadow-sm flex-1">
                             {/* <input
                                 id="title"
                                 name="title"
                                 type="text"
                                 placeholder="الاسم و الكنية"
                                 autoComplete="title"
                                 value={data.type}
                                 onChange={(e) => { changeHandler(e) }}
                                 className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                             /> */}
                         </div>
                     </div>
                    }


                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            العنوان
                        </label>
                        <div className="flex rounded-md shadow-sm flex-1">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="الاسم و الكنية"
                                autoComplete="title"
                                value={data?.title}
                                onChange={(e) => { changeHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>

                    {(title !== "news" && title !== "services") && <div className="flex items-center justify-between">
                        <label htmlFor="number" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            التاريخ
                        </label>
                        <div className="flex flex-1 rounded-md shadow-sm">
                            <input
                                id="date"
                                name="number"
                                type="text"
                                placeholder="هاتف ثابت أو موبايل"
                                autoComplete="number"
                                value={""}
                                onChange={(e) => { changeHandler(e) }}
                                className="bg-white block border border-1 border-gray-300  flex-1 rounded-lg px-3 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>}

                    <div className="flex items-center justify-between">
                        <label htmlFor="description" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            النص
                        </label>
                        <div className='flex-1'>
                            <textarea
                                id="description"
                                name="description"
                                rows={2}
                                value={data?.description}
                                onChange={(e) => { changeHandler(e) }}
                                placeholder='شرح طبيعة الشكوى أو المخالفة ........'
                                className="block border border-1 border-gray-300  px-3 w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {title !== "services" && <div className="flex items-center justify-between">
                        <label htmlFor="cover-photo" className="text-sm w-16 font-medium leading-6 text-gray-900">
                            الصور :
                        </label>
                        <div className="bg-white border border-1 border-gray-300 flex-1 flex justify-center rounded-lg px-6 py-3">
                            <div className="text-center">
                                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="items-center justify-center flex text-xs leading-6 text-gray-600">
                                    <label
                                        htmlFor="photos"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>اضغط لإضافة صور أو اسحب الصور وافلت هنا</span>
                                        <input
                                            id="photos"
                                            name="photos"
                                            type="file"
                                            onChange={(e) => { changeHandler(e) }}
                                            className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs font-semibold leading-6 text-gray-600">يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 1</p>
                            </div>
                        </div>
                    </div>}
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
