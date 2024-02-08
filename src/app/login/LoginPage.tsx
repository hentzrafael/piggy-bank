import { useRouter } from "next/router";
import { useState } from "react";

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
        router.replace("/home?username="+username);
      }else{
        alert(message);
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full p-4 border-2 border-gray-300 rounded-md"
          value={username}
          onChange={handleUsernameChange}
          style={{ color: 'black' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-4 border-2 border-gray-300 rounded-md"
          value={password}
          onChange={handlePasswordChange}
          style={{ color: 'black' }}
        />
        <button className="w-full p-4 bg-blue-500 text-white rounded-md" onClick={login}>Login</button>
      </div>
    </div>
  );
}