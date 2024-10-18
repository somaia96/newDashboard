import { AlertTitle } from "@mui/material";
import Alert from '@mui/material/Alert';

const Alerting = () => {
  return (
    <Alert className="my-5 w-11/12 md:w-6/12 mx-auto p-3 font-bold text-3xl" variant="filled" severity="error">
      <AlertTitle><div className="text-white font-bold text-xl mx-1">تحذير!</div></AlertTitle>
      <div className="font-bold text-lg text-white">حصل خطأ أثناء جلب المعلومات</div>
    </Alert>
  )
}

export default Alerting
