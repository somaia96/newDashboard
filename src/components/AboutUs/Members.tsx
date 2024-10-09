import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { useQuery } from "@tanstack/react-query";
import instance from "../../api/instance";
import Alerting from "../Complaint/Alert";
import { IMember } from "@/interfaces";
import Member from "./Member";
import MemberSkeleton from "../Skeleton/MemberSkeleton";

const Members = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['council-members'],
    queryFn: async () => {
      const { data } = await instance.get('/council-members')
      return data.data
    }
  })

  if (isLoading) return (
    <div className="flex items-center justify-center gap-5">
      <div className="rounded-full w-8 h-8 bg-gray-300 -ms-12"></div>
      <div className="my-10 space-y-5 w-full">
        <h3 className="text-lg font-bold  text-primary my-5">أعضاء مجلس البلدية:</h3>
        <div className="flex gap-5 justify-between items-center">
          {Array.from({ length: 3 }).map((_, i) => <MemberSkeleton key={i} />)}
        </div>
      </div>
      <div className="rounded-full w-8 h-8 bg-gray-300 -me-12"></div>
    </div>
  )

  if (error) return <Alerting />

  return (
    <div className="mb-10 mt-5 overflow-x-hidden md:overflow-visible">
      <h3 className="text-lg font-bold  text-primary my-5">أعضاء مجلس البلدية:</h3>
      <Carousel className="w-full" dir="ltr">
        <CarouselContent className="-ml-1">
          {data.map((member: IMember) => (
            <CarouselItem key={member.id} className="overflow-hidden p-0 md:p-2 md:basis-1/3">
              <Member member={member} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className="hidden md:inline-flex"/>
        <CarouselNext  className="hidden md:inline-flex"/>
      </Carousel>
    </div>
  )
}

export default Members