import CardNews from '../components/Card';
import { useState } from "react";
import { INewsApi } from "@/interfaces";
import { Button } from '../components/ui/button';
import Alerting from '../components/Complaint/Alert';
import instance from '../api/instance'
import { useQuery } from '@tanstack/react-query'
import { txtSlicer } from '../utils/functions';
import CardSkeleton from '../components/Skeleton/CardSkeleton';
import TabSkeleton from '../components/Skeleton/TabSkeleton';
import FormAddServ from '../components/Form/FormsAdd/FormAddServ';

interface IEventTabs {
  id: number,
  name: string,
}
const Services = () => {

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const { isLoading, error, data } = useQuery({
    queryKey: ['serviceData'],
    queryFn: async () => {
      const serviceRes = await instance.get('/services')
      const tabRes = await instance.get('/service-categories');
      setFilteredEvents(serviceRes.data.data)

      return { serviceRes, tabRes }
    }
  })

  const tabs = data?.tabRes.data.data;

  const handlActiveTabClick = (tab: number) => {
    setActiveTab(tab);
    setFilteredEvents(data?.serviceRes.data.data.filter((servData: INewsApi) => servData.service_category_id === `${tab}`));
  };

  if (isLoading) return (
    <div className="my-10 space-y-5">
      <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
      <div className='flex items-center justify-center gap-4 my-3'>
        {Array.from({ length: 5 }).map((_, i) => <TabSkeleton key={i} />)}
      </div>
      <div className='grid md:grid-cols-2 gap-20'>
        {Array.from({ length: 5 }).map((_, i) => <CardSkeleton noPic={false} key={i} />)}
      </div>
    </div>
  )

  if (error) return <Alerting />
  return (
    <div className='my-5'>
      <div className="container">
        <FormAddServ tabs={tabs} />
      </div>
      <div className="font-header font-bold text-center md:text-3xl text-primary">الخدمات</div>
      <div className='flex lg:justify-center items-center gap-3 overflow-x-scroll py-2' style={{ scrollbarWidth: "thin", scrollbarColor: "#cfcfcfb8 transparent" }}>
        {tabs.map((tab: IEventTabs) => (
          <Button key={tab.id}
            onClick={() => handlActiveTabClick(tab.id)}
            className={(activeTab === tab.id
              ? "bg-primary text-white border-primary"
              : "border-gray-200 bg-white text-gray-800") + ' w-28 md:w-36 border-1 border focus-visible:ring-0 py-1 hover:text-white hover:bg-primary md:text-lg'}>{txtSlicer(tab.name, 12)}</Button>
        ))}
      </div>
      <div className='flex gap-3 flex-col md:flex-row md:flex-wrap md:justify-between'>
        {filteredEvents.map((item: INewsApi) => <CardNews tabs={tabs} noPic={false} key={item.id} order={2} news={item} url='/services' />)}
      </div>
    </div>
  )
}

export default Services