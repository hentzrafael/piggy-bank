import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      },
      );
      const {statusCode, message} = await res.json();
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
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full p-4 border-2 border-gray-300 rounded-md mt-2 mb-2"
          value={username}
          onChange={handleUsernameChange}
          style={{ color: 'black' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-4 border-2 border-gray-300 rounded-md mt-2 mb-2"
          value={password}
          onChange={handlePasswordChange}
          style={{ color: 'black' }}
        />
        <button
        style={{ backgroundColor: "#6C63FF" }}
        className="w-full p-4 text-white rounded-md" onClick={login}>Login</button>
        <span className="text-gray-500 w-2/4 flex mt-2">Don&apos;t have an account?<a href="/register" className="text-blue-500">Register</a></span>
      </div>
    </div>
    </div>
  );
}