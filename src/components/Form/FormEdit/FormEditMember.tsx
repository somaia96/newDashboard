import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../../api/instance'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { IMembers } from '@/interfaces';
import toasty from '../../../utils/toast';


export default function FormEditMember({setRefresh, member, setOpenEdit }: {setRefresh:(val:string)=>void, member: IMembers, setOpenEdit: (val: boolean) => void }) {
    const [memberEditData, setMemberEditData] = useState<IMembers>({
        name: member.name,
        job_title:member.job_title,
        description:member.description,
        photo: "",
        _method: "PUT",
    })

    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };

    const changeEditHandler = async (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === "photos") {
            const files: FileList | null = (e.target as HTMLInputElement).files;
            const filesArray = files ?? [];
            if (filesArray?.length > 0) {
               
            const newEditPhotos = Array.from(filesArray);
            setMemberEditData((prev) => ({ ...prev, photo: newEditPhotos[0] }));
            }
        } else {
            setMemberEditData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            let res = await instance.post(`/council-members/${member.id}`, memberEditData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            (res.status === 200 || res.status === 201) ? toasty("success","تم تعديل معلومات العضو") : null;
            setRefresh("true")
        } catch (error) {
            toasty("error","حدث خطأ أثناء تعديل المعلومات")
        }
    };

    return (
        <div className='flex gap-3 p-5  rounded-3xl bg-white'>
            <form className='w-full rounded-xl' onSubmit={(e) => submitHandler(e)}>
                <div className="space-y-2">
                    <h2 className='font-bold text-xl text-center text-primary mb-5'>تعديل العضو</h2>
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
                                value={memberEditData?.name}
                                onChange={(e) => { changeEditHandler(e) }}
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
                                value={memberEditData?.job_title}
                                onChange={(e) => { changeEditHandler(e) }}
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
                                value={memberEditData?.description}
                                onChange={(e) => { changeEditHandler(e) }}
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
                                        htmlFor="photos"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>اضغط لإضافة صور أو اسحب الصور وافلت هنا</span>
                                        <input
                                            id="photos"
                                            name="photos"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => { changeEditHandler(e) }}
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
                        تعديل
                    </button>
                    <button
                        type='button'
                        onClick={() => setOpenEdit(false)}
                        className="w-1/3 my-3 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        الغاء
                    </button>
                </div>
            </form>
        </div>
    )
}
