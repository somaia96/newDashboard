import CardNews from "../components/Card";
import { useState, ChangeEvent } from "react";
import { INewsApi } from "@/interfaces";
import instance from '../api/instance'
import { Button } from '../components/ui/button';
import Alerting from '../components/Complaint/Alert';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from '@tanstack/react-query'
import { txtSlicer } from "../utils/functions";
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import TabSkeleton from "../components/Skeleton/TabSkeleton";
import FormAddEvents from "../components/Form/FormsAdd/FormAddEvent";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";

interface IEventTabs {
  id: number,
  name: string,
}
const pagesize = 2;

const Events = () => {

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const { isLoading, error, data } = useQuery({
    queryKey: ['activityData'],
    queryFn: async () => {
      const eventRes = await instance.get('/activity')
      const tabRes = await instance.get('/activity-type');
      setFilteredEvents(eventRes.data.data)

      return { eventRes, tabRes }
    }
  })

  const tabs = data?.tabRes.data.data;

  const handlActiveTabClick = (tab: string) => {
    setActiveTab(tab);
    setFilteredEvents(data?.eventRes.data.data.filter((eveData: INewsApi) => eveData.activity_type_name === tab));
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

  if (isLoading) return (
    <div className="my-10 space-y-5 flex flex-col items-center justify-center">
      <FormAddSkeleton/>
      <div className="font-header md:text-3xl font-bold text-center text-primary">الفعاليات</div>
      <div className='flex items-center justify-center gap-4 my-3'>
        {Array.from({ length: 5 }).map((_, i) => <TabSkeleton key={i} />)}
      </div>
      {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-10">
      <div className="container">
        <FormAddEvents tabs={tabs} />
      </div>
      <div className="font-header md:text-3xl font-bold text-center text-primary">الفعاليات</div>
      <div className='flex lg:justify-center items-center gap-3 overflow-x-scroll py-2' style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
        {tabs.map((tab: IEventTabs) => (
          <Button key={tab.id}
            onClick={() => handlActiveTabClick(tab.name)}
            className={(activeTab === tab.name
              ? "bg-primary text-white border-primary"
              : "border-gray-200 bg-white text-gray-800") + ' w-28 md:w-36 border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{txtSlicer(tab.name, 12)}</Button>
        ))}
      </div>
      {filteredEvents.slice(Pag.from, Pag.to).map((news: INewsApi) => (
        <CardNews news={news} key={news.id} url="/activity" tabs={tabs} />
      ))}
      <div className="flex justify-items-center justify-center	">
        <Stack spacing={2}>
          <Pagination
            onChange={handelPagination}
            count={Math.ceil(filteredEvents.length / pagesize)}
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

export default Events;
