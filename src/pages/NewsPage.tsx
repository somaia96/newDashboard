import CardNews from "../components/Card";
import { useState, ChangeEvent } from "react";
import { INews, INewsApi } from "@/interfaces";
import instance from '../api/instance'
import Alerting from '../components/Complaint/Alert';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from '@tanstack/react-query'
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import FormAddNews from "../components/Form/FormsAdd/FormAddNews";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";

const pagesize = 2;
const NewsPage = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['newsData'],
    queryFn: async () => {
      const { data } = await instance.get('/news')
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
    <div className="flex flex-col items-center justify-center">
      <FormAddSkeleton />
      <div className="my-10 container space-y-5">
        {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-10">
      <div className="container">
        <FormAddNews />
      </div>
      {data.slice(Pag.from, Pag.to).map((news: INews) => (
        <CardNews news={news as INewsApi} key={news.id} url="/news" />
      ))}
      <div className="flex justify-items-center justify-center	">
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
};

export default NewsPage;
