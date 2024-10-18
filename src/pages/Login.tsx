import toasty from "../utils/toast";
import instance from "../api/instance";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const storeToken = (token:string) => {
        localStorage.setItem('tokenMunicipality', token);
      };
      
    const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name == "password") return setPassword(value)
            setEmail(value)
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            let res = await instance.post('/admin/login', {
                "email": email,
                "password": password
            });
            storeToken(res.data.token);
            if(res.status === 200 || res.status === 201) {
                toasty("success",'تم تسجيل الدخول بنجاح') ;
                setTimeout(()=>{
                    navigate("/")
                } ,2000);
        }
        } catch (error) {
            toasty("error",'تأكد من صحة المعلومات')
    };
    }
    return (
        <div className="h-screen flex container items-center justify-center">
          <div className="flex rounded-lg overflow-hidden w-3/4">
            
          <div className="w-2/5 bg-white p-10">
                <form className='w-full rounded-xl' onSubmit={(e) => submitHandler(e)}>
                   <div className="space-y-3">
                        <h2 className='font-bold text-xl text-center text-primary mb-5'>مرحبا بكم في لوحة تحكم بلدية ضاحية الأسد</h2>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium w-16 leading-6 text-gray-900">
                                الحساب الالكتروني
                            </label>
                            <div className="flex rounded-md shadow-sm flex-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="الحساب الالكتروني"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => { changeHandler(e) }}
                                    className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium w-16 leading-6 text-gray-900">
                                كلمة السر
                            </label>
                            <div className="flex rounded-md shadow-sm flex-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="كلمة السر"
                                    autoComplete="password"
                                    value={password}
                                    onChange={(e) => { changeHandler(e) }}
                                    className="bg-white block border border-1 border-gray-300 flex-1 rounded-lg px-3 py-1.5 placeholder:text-gray-400 sm:text-sm w-full sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="w-full my-5 rounded-lg bg-primary py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        تسجيل الدخول
                    </button>
                </form>
            </div>
            <div className="flex-1">
                <img className="h-full w-auto" src="/images/headerBG.jpg" alt="" />
            </div>
          </div>
        </div>
    )
}

export default Login
