import { StyledEngineProvider } from '@mui/material/styles';
import BarCharts from '../components/Home/BarCharts';

const HomePage = () => {
  return (
      <StyledEngineProvider injectFirst>
        <BarCharts />
      </StyledEngineProvider>
  )
}

export default HomePage
