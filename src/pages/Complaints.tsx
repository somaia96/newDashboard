
import Alerting from "../components/Complaint/Alert";
import instance from "../api/instance";
import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ComplaintSkeleton from "../components/Skeleton/ComplaintSkeleton";
import Details from "../components/Complaint/Details";
import { Dialog } from '@headlessui/react'
import { Toaster } from "react-hot-toast";
import { Button } from "../components/ui/button";

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

const pagesize = 9;

export default function Complaints() {
    const tabs = [{ name: "غير معالجة", value: "unresolved" },
    { name: "قيد المعالجة", value: "in progress" },
    { name: "تمت المعالجة", value: "resolved" },
    { name: "نقل إلى سلة المحذوفات", value: "trash" },
    ]

    const [detail, setDetail] = useState({
        id: 0,
        name: "",
        number: "",
        description: "",
        status: "",
        created_at: "",
        photos: []
    })

    const [activeTab, setActiveTab] = useState("unresolved")
    const [filteredComp, setFilteredComp] = useState([]);

    const [openDetail, setOpenDetail] = useState(false)
    const TABLE_HEAD = ["الاسم", "رقم الهاتف", "التاريخ", "التفاصيل"];

    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ['complaint'],
        queryFn: async () => {
            const { data } = await instance.get('/complaint', {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            setFilteredComp(data.data)

            return data.data
        }
    })
    const handlActiveTabClick = (tab: string) => {
        console.log(tab);

        setActiveTab(tab);
        if (tab === "trash") {
            try {
                (async () => {
                    const { data } = await instance.get('/complaints/trashed', {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    })
                    setFilteredComp(data.data)

                })()
            } catch (error) {
                console.log(error);

            }
            return;
        }
        setFilteredComp(data?.filter((compData: IComplaint) => compData.status === tab));
    };

    const [Pag, setPag] = useState({
        from: 0,
        to: pagesize,
    });
    const handelPagination = (event: ChangeEvent<unknown>, page: number) => {
        console.log(event);
        const from = (page - 1) * pagesize;
        const to = (page - 1) * pagesize + pagesize;
        setPag({ ...Pag, from: from, to: to });
    };
    const clickHandler = ({ id, name, number, description, status, created_at, photos }: IComplaint) => {
        setOpenDetail(true)
        setDetail({ id, name, number, description, status, created_at, photos })
    }
    if (isLoading) return <ComplaintSkeleton />

    if (error) return <Alerting />

    return (<div>
        <h2 className="font-semibold text-xl text-gray-800">صندوق الشكاوي الواردة :</h2>

        <div className='flex lg:justify-center items-center gap-3 py-2'>
        <h3 className="font-semibold text-gray-800">عرض :</h3>

            {tabs.map((tab, i) => (
                <Button key={i}
                    onClick={() => handlActiveTabClick(tab.value)}
                    className={(activeTab === tab.value
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 bg-white text-gray-800") + ' border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{tab.name}</Button>
            ))}
        </div>
        <Card className="h-full w-full mt-5">
            <Toaster />
            {/* Modal Edit Item */}
            <Dialog open={openDetail} onClose={setOpenDetail} className="relative z-10 w-full">
                <Dialog.Backdrop
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <div className="fixed inset-0 flex justify-center items-center z-10 w-screen overflow-y-auto">
                    <Dialog.Panel
                        className="relative md:max-h-3xl md:max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <Details tabs={tabs} setOpenDetail={setOpenDetail} data={detail} />

                    </Dialog.Panel>
                </div>
            </Dialog>

            <table className="w-full min-w-max table-auto text-center rounded-3xl">
                <thead className="bg-[#F8F0E5]">
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 p-4"
                            >
                                <Typography
                                    variant="small"
                                    className="font-semibold leading-3 text-primary"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredComp.slice(Pag.from, Pag.to).map(({ id, name, number, description, status, created_at, photos }: IComplaint, index: number) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={id} className="even:bg-blue-gray-50/50">
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {name ? name : "غير مسجل"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {number ? number : "غير مسجل"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {created_at.toString().split('T')[0]}
                                    </Typography>
                                </td>
                                <td className={classes + " flex justify-between items-center"}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {photos.length > 0 ? "شكوى + صورة" : "شكوى"}
                                    </Typography>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        onClick={() => clickHandler({ id, name, number, description, status, created_at, photos })}
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        عرض المزيد
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>

        <div className="flex justify-items-center justify-center my-4">
            <Stack spacing={2}>
                <Pagination
                    onChange={handelPagination}
                    count={Math.ceil(data.length / pagesize)}
                    color="primary"
                    shape="rounded"
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </div>
    </div>
    );
}