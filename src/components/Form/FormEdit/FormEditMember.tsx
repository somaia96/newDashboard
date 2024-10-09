import { FormEvent, ChangeEvent, useState } from 'react';
import instance from '../../../api/instance'
import toast from 'react-hot-toast';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { IMember } from '@/interfaces';

export default function FormEditMember({ item, setOpenEdit }: { item: IMember, setOpenEdit: (val: boolean) => void }) {
    const [memberData, setMemberData] = useState({
        name: item.name,
        photos: [],
        _method: "PUT",
    })

    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };

    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const files = e.target.files;

        if (name == "photos") {
            const newPhotos = Array.from(files);
            setMemberData((prev) => ({ ...prev, photos: newPhotos }));
        } else {
            setMemberData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            let res = await instance.post(`/council-members/${item.id}`, memberData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });

            (res.status === 200 || res.status === 201) ? toast.success('تم تعديل المعلومات ', {
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
                {/* <Toaster position="top-center" reverseOrder={false} /> */}
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
                                value={memberData?.name}
                                onChange={(e) => { changeHandler(e) }}
                                className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
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
                                            onChange={(e) => { changeHandler(e) }}
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