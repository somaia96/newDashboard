
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

interface IComlaint {
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
    const TABLE_HEAD = ["الاسم", "رقم الهاتف", "التاريخ", "التفاصيل"];

    const getToken = () => {
        return localStorage.getItem('tokenMunicipality');
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ['complaint'],
        queryFn: async () => {
            const { data } = await instance.get('/complaint',{
                headers:{
                    Authorization: `Bearer ${getToken()}`
                }
            })
            return data.data
        }
    })

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
    if (isLoading) return (
        <div className="flex items-center justify-center gap-5">
            <div className="rounded-full w-8 h-8 bg-gray-300 -ms-12"></div>
            <div className="my-10 space-y-5 w-full">
                <h3 className="text-lg font-bold  text-primary my-5">أعضاء مجلس البلدية:</h3>
                <div className="flex gap-5 justify-between items-center">
                    {Array.from({ length: 3 }).map((_, i) => <h2 key={i}>loading</h2>)}
                </div>
            </div>
            <div className="rounded-full w-8 h-8 bg-gray-300 -me-12"></div>
        </div>
    )

    if (error) return <Alerting />

    return (<div>
        
        <Card className="h-full w-full mt-10">
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
                    {data.slice(Pag.from, Pag.to).map(({ id, name, number, created_at, photos }: IComlaint, index: number) => {
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
                                        {name?name:"غير مسجل"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {number?number:"غير مسجل"}
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
                                <td className={classes + " flex justify-around items-center"}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {photos.length > 0 ? "شكوى" : "شكوى + صورة"}
                                    </Typography>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
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

        <div className="flex justify-items-center justify-center my-5">
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