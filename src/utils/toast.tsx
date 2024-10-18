import toast from 'react-hot-toast';

const toasty = (status:string,msg:string) => {
  if(status == "success") {
    return toast.success(msg?msg:'تم ارسال الطلب ', {
        duration: 2000,
        position: 'top-center',
        className: 'bg-blue-100',
        icon: '👏',
    })
  } else{
    return  toast.error(msg?msg:'حدث خطأ أثناء ارسال الطلب', {
        duration: 2000,
        position: 'top-center',
        className: 'bg-red-100',
    });
  }
}

export default toasty
