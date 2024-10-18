import { useState } from "react"
import { Button } from "../ui/button"
import instance from "../../api/instance"
import { IComplaints, Status } from "../../interfaces"
import toasty from "../../utils/toast"
import getToken from "../../utils/gitToken";

interface IPutComp{
    status:Status,
    _method:string,
}

const Details = ({setRefresh,tabs, setOpenDetail, data }: {setRefresh:(val:string)=>void,tabs:{ name: string; value: Status; }[], setOpenDetail: (val: boolean) => void, data: IComplaints }) => {
    const [compData, setCompData] = useState<IPutComp>({
        status: data.status,
        _method: "PUT",
    })

    const [activeTab, setActiveTab] = useState(data.status)

    const handlActiveTabClick = (tab: Status) => {
        setActiveTab(tab);
        if(tab !== Status.Trash){
            setCompData((prev:IPutComp) => {
            return {
                ...prev,
                status: tab
            }
        })}
    };
    const handleCancel = () => {
        setActiveTab(Status.Unresolved);
        setCompData((prev:IPutComp) => {
            return {
                ...prev,
                status: Status.Unresolved
            }
        })
        setOpenDetail(false)
    };

    const handleSave = async (tab:string, id: number) => {
        
        if(tab === Status.Trash){         
        try {
            let res = await instance.delete(`/complaint/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            (res.status === 200 || res.status === 201) ? toasty("success","تم الارسال لسلة المهملات") : null;
            setOpenDetail(false)
            setRefresh("delete")
        } catch (error) {
            toasty("error","حدث خطأ أثناء الحذف")
        }

        return;
        }

        try {
            let res = await instance.post(`/complaint/${id}`, compData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            (res.status === 200 || res.status === 201) ? toasty("success","تم ارسال الشكوى بنجاح") : null;
            setOpenDetail(false)
            setRefresh("edit")
        } catch (error) {
            toasty("error","حدث خطأ أثناء ارسال الشكوى")
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
                     <img className="w-full h-auto" src={data.photos[0]} alt="" />
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
                    onClick={() => handleSave(activeTab,data.id!)}
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
