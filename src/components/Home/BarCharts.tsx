
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { datasetDecision, datasetEvent, datasetNews, datasetServices, valueFormatter } from './DataCharts';

const chartDecisionSetting = {
  yAxis: [
    {
      label: 'القرارات',
    },
  ],
  width: 500,
  height: 320,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(0, 0)',
    },
  },
};
const chartServicesSetting = {
    yAxis: [
      {
        label: 'الخدمات',
      },
    ],
    width: 500,
    height: 320,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(0, 0)',
      },
    },
  };
  const chartEventSetting = {
    yAxis: [
      {
        label: 'الفعاليات',
      },
    ],
    width: 500,
    height: 320,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(0, 0)',
      },
    },
  };
  const chartNewsSetting = {
    yAxis: [
      {
        label: 'الأخبار',
      },
    ],
    width: 500,
    height: 320,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(0, 0)',
      },
      
    },
  };
      
export default function BarCharts() {
  return (
   <div className='grid grid-cols-2'>
     <BarChart
      dataset={datasetDecision}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'decision',color:"#b40101", valueFormatter },
      ]}
      {...chartDecisionSetting}
    />
     <BarChart
      dataset={datasetNews}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'news',color:"#00a6ff", valueFormatter },
      ]}
      {...chartNewsSetting}
    />
     <BarChart
      dataset={datasetEvent}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'event',color:"#13bfa2", valueFormatter },
      ]}
      {...chartEventSetting}
    />
     <BarChart
      dataset={datasetServices}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'services',color:"#840098", valueFormatter },
      ]}
      {...chartServicesSetting}
    />
   </div>
  );
}
