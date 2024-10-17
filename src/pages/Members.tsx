import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
import { useQuery } from "@tanstack/react-query";
import instance from "../api/instance";
import Alerting from "../components/Complaint/Alert";
import { IMembers } from "../interfaces";
import Member from "../components/AboutUs/Member";
import MemberSkeleton from "../components/Skeleton/MemberSkeleton";
import FormAddSkeleton from "../components/Skeleton/FormAddSkeleton";
import FormAddMember from "../components/Form/FormsAdd/FormAddMember";
import { useState } from "react";

const Members = () => {
  const [refresh, setRefresh] = useState("false")

  const { isLoading, error, data } = useQuery({
    queryKey: ['council-members', refresh],
    queryFn: async ({ queryKey }) => {
      const currentStatus = queryKey[1]; // Access tabId from queryKey
      if (!currentStatus) return; // Avoid unnecessary initial request
     const { data } = await instance.get('/council-members')
      return data.data
    },
    enabled: !!refresh,

  })

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center">
      <FormAddSkeleton />
      <div className=" w-full">
      <div className="h-8 w-60 bg-gray-300 rounded-lg dark:bg-gray-700 mb-10"></div>
        <div className="flex justify-between items-center">
      <div className="rounded-full w-8 h-8 bg-gray-300 -ms-12"></div>
          {Array.from({ length: 3 }).map((_, i) => <MemberSkeleton key={i} />)}
      <div className="rounded-full w-8 h-8 bg-gray-300 -me-12"></div>

        </div>
      </div>
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="my-5">
      <div className="container">
        <FormAddMember setRefresh={setRefresh}/>
      </div>
      <div className="mb-10 mt-5 overflow-x-hidden md:overflow-visible">
        <h3 className="text-lg font-bold  text-primary my-5">أعضاء مجلس البلدية:</h3>
        <Carousel className="w-full" dir="ltr">
          <CarouselContent className="-ml-1">
            {data.map((member: IMembers) => (
              <CarouselItem key={member.id} className="overflow-hidden p-0 md:p-2 md:basis-1/3">
                <Member  setRefresh={setRefresh} member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  )
}
export default Members

