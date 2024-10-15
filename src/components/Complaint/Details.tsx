import { useState } from "react"
import { Button } from "../ui/button"
import instance from "../../api/instance"
import toast from "react-hot-toast"

interface IComplaint {
    id: number,
    name: string,
    number: string,
    description: string,
    status: string,
    photos: {
        id: number,
        photo_url: string,
    }[],
    created_at: string,
}
const Details = ({tabs, setOpenDetail, data }: {tabs:{ name: string; value: string; }[], setOpenDetail: (val: boolean) => void, data: IComplaint }) => {
    const [compData, setCompData] = useState({
        name: data.name,
        number: data.number,
        description: data.description,
        status: data.status,
        photos: [...data.photos],
        _method: "PUT",
    })

    const [activeTab, setActiveTab] = useState(data.status)

    const handlActiveTabClick = (tab: string) => {
        setActiveTab(tab);
        setCompData((prev) => {
            return {
                ...prev,
                status: tab
            }
        })
    };
    const handleCancel = () => {
        setActiveTab("unresolved");
        setCompData((prev) => {
            return {
                ...prev,
                status: "unresolved"
            }
        })
        setOpenDetail(false)
    };
    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };

    const handleSave = async (id: number) => {
        console.log(compData, id,);

        try {
            let res = await instance.post(`/complaint/${id}`, compData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            (res.status === 200 || res.status === 201) ? toast.success('تم ارسال الطلب ', {
                duration: 2000,
                position: 'top-center',
                className: 'bg-blue-100',
                icon: '👏',
            }) : null;
            setOpenDetail(false)
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
        <div className="flex flex-col justify-center items-center gap-3 p-10 rounded-3xl">
            <div className="flex justify-between w-full gap-1">
                <div className="flex-1 flex flex-col gap-5" >
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">الاسم :</h3>
                        <p className="text-gray-800">{data.name}</p>
                    </div>
                    <div className="flex ">
                        <h3 className="w-32 font-semibold text-gray-800">رقم الهاتف :</h3>
                        <p className="text-gray-800">{data.number}</p>
                    </div>
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">تاريخ التقديم :</h3>
                        <p className="text-gray-800">{data.created_at}</p>
                    </div>
                    <div className="flex">
                        <h3 className="w-32 font-semibold text-gray-800">نص الشكوى :</h3>
                        <p className="text-gray-800">{data.description}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="w-32 font-semibold text-gray-800">الصورة :</h3>
                    <div className="overflow-hidden w-full max-h-80">
                        {
                            data.photos?.length > 0 ? 
                     <img className="w-full h-auto" src={data.photos[0].photo_url} alt="" />
:
                     <img className="w-full h-auto" src="/images/empty.jpg" alt="" /> 

                        }

                    </div>

                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">الرجاء اختيار الحالة:</h2>
                <div className='flex justify-center items-center gap-3 py-2' >
                    {tabs.map((tab, i) => (
                        <Button key={i}
                            onClick={() => handlActiveTabClick(tab.value)}
                            className={(activeTab === tab.value
                                ? "bg-primary text-white border-primary"
                                : "border-gray-200 bg-white text-gray-800") + ' text-base border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary '}>{tab.name}</Button>
                    ))}
                </div>
            </div>
            <div className='flex justify-center gap-3 mt-5 w-full px-10'>
                <button
                    onClick={() => handleSave(data.id)}
                    className="flex-1 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    حفظ التعديلات
                </button>
                <button
                    onClick={handleCancel}

                    className="flex-1 rounded-lg border-2 border-red-800 py-2 font-semibold text-red-800 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    الغاء
                </button>
            </div>
        </div>
    )
}

export default Details
