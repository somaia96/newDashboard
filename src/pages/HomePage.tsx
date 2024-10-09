import instance from '../api/instance'
import { useQuery } from '@tanstack/react-query'
import Alerting from '../components/Complaint/Alert';
import HomeSkeleton from '../components/Skeleton/HomeSkeleton';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset, valueFormatter } from '../dataset/weather';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const HomePage = () => {
let valueFormatter =20;
  const { isLoading, error, data } = useQuery({
    queryKey: ['homeData'],
    queryFn: async () => {
      const resNew = await instance.get('/news');
      const eventRes = await instance.get('/activity')
      const tabEveRes = await instance.get('/activity-type');
      const resDes = await instance.get('/decision');
      const resSer = await instance.get('/services');
      const tabSerRes = await instance.get('/service-categories');
      return { resNew, eventRes, tabEveRes, resDes, resSer, tabSerRes }
    }
  })
  let dataset = data?.eventRes.data;

  if (isLoading) return (
    <div className="my-10 container space-y-10">
      <HomeSkeleton />
    </div>
  )

  if (error) return <Alerting />
  return (
      <div className="container">
         {/* <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    /> */}
     </div>
    
  )
}

export default HomePage
