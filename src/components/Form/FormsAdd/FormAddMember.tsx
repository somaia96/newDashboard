import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../../api/instance'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { IMembers } from '../../../interfaces';
import toasty from '../../../utils/toast';

export default function FormAddMember({ setRefresh}:{setRefresh:(val:string)=>void}) {
    const [memberAddData, setMemberAddData] = useState<IMembers>({
        name: "",
        job_title:"",
        description:"",
        photo: "",
    })

    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };

    const changeAddHandler = async (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name == "photo") {
            const files: FileList | null = (e.target as HTMLInputElement).files;
            const filesArray = files ?? [];
            if (filesArray?.length > 0) {
               
          const newAddPhotos = Array.from(filesArray);
          console.log(newAddPhotos[0]);
          
          setMemberAddData((prev) => ({ ...prev, photo: newAddPhotos[0] }));
            }
        } else {
          setMemberAddData((prev) => ({ ...prev, [name]: value }));
        }
      };
      
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            let res = await instance.post("/council-members", memberAddData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });

            (res.status === 200 || res.status === 201) ? toasty("success","تم اضافة العضو بنجاح") : null;
            setRefresh("true")

        } catch (error) {
            toasty("error","حدث خطأ أثناء اضافة العضو")
        }
    };

    return (
        <div className='flex gap-3 p-5 my-10 rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={(e) => submitHandler(e)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>اضافة عضو جديد</h2>
                    <div className="flex items-center justify-between">
                        <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            الاسم
                        </label>
                        <div className="flex rounded-md shadow-sm flex-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="اسم العضو"
                                autoComplete="name"
                                value={memberAddData?.name}
                                onChange={(e) => { changeAddHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>

                   <div className="flex items-center justify-between">
                        <label htmlFor="job" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            المنصب :
                        </label>
                        <div className="flex rounded-md shadow-sm flex-1">
                            <input
                                id="job"
                                name="job_title"
                                type="text"
                                placeholder="المنصب"
                                autoComplete="job"
                                value={memberAddData?.job_title}
                                onChange={(e) => { changeAddHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="description" className="text-sm font-medium w-16 leading-6 text-gray-900">
                            نبذة :
                        </label>
                        <div className='flex-1'>
                            <textarea
                                id="description"
                                name="description"
                                rows={2}
                                value={memberAddData?.description}
                                onChange={(e) => { changeAddHandler(e) }}
                                placeholder='نبذة عن العضو'
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
                        اضافة
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
