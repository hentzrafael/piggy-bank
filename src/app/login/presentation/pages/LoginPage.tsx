import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { makeLogin } from "../../application/login.service";
import { LoginInput } from "../components/LoginInput/LoginInput";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const {statusCode, message} = await makeLogin(username, password);
      if(statusCode === 200){
        router.push("/home?username="+username);
      }else{
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Image src={"savings.svg"} alt={"Person riding a piggy bank"} width={300} height={300} className="sm:w-2/4 md:w-2/5 lg:w-4/12 flex"/>
    <div>
      <ToastContainer/>
      <div className="p-4">
        <LoginInput 
        onChange={handleUsernameChange}
        value={username}
        type="text" 
        placeholder="Enter your username"/>
        <LoginInput
        onChange={handlePasswordChange}
        value={password}
        type="password"
        placeholder="Enter your password" />
        <button
        style={{ backgroundColor: "#6C63FF" }}
        className="w-full p-4 text-white rounded-md" onClick={login}>Login</button>
        <span className="text-gray-500 w-2/4 flex mt-2">Don&apos;t have an account?<a href="#" className="text-blue-500">Register</a></span>
      </div>
    </div>
    </div>
  );
}