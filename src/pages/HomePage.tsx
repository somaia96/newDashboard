// import instance from '../api/instance'
// import { useQuery } from '@tanstack/react-query'
// import Alerting from '../components/Complaint/Alert';
// import HomeSkeleton from '../components/Skeleton/HomeSkeleton';
import { StyledEngineProvider } from '@mui/material/styles';
import BarCharts from '../components/Home/BarCharts';


const HomePage = () => {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['homeData'],
  //   queryFn: async () => {
  //     const resNew = await instance.get('/news');
  //     const eventRes = await instance.get('/activity')
  //     const tabEveRes = await instance.get('/activity-type');
  //     const resDes = await instance.get('/decision');
  //     const resSer = await instance.get('/services');
  //     const tabSerRes = await instance.get('/service-categories');
  //     return { resNew, eventRes, tabEveRes, resDes, resSer, tabSerRes }
  //   }
  // })

  // if (isLoading) return (
  //   <div className="my-10 container space-y-10">
  //     <HomeSkeleton />
  //   </div>
  // )

  // if (error) return <Alerting />
  return (
      <StyledEngineProvider injectFirst>
        <BarCharts />
      </StyledEngineProvider>

  )
}

export default HomePage
