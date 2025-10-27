import {useEffect, useState} from 'react' 
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
  const [username , setUser] = useState("")
  const [password , setPassword] = useState("")
  
  const navigate = useNavigate()
  const url = "http://localhost:6969/api/signup"
  
  const inputStyle = "outline-0 border-2 border-black rounded-md h-10 w-full"
  
  const isUserAuthenticated = async () => {
    try{
      fetch("http://localhost:6969/api/check/user/auth", {credentials: 'include'})
        .then(res =>{
          if (res.ok){
            navigate('/main')
          }
          console.log("Auth check status:", res.status);
        })
    }
    catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    isUserAuthenticated()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {username , password}
    const options = {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data),
      credentials: 'include'
    }
    try{
      const res = await fetch(url , options)
      const result = await res.json()
      console.log(result)
    }
    catch(error){
      console.error(error)
    }
    isUserAuthenticated()
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-[400px] h-[500px] flex justify-center items-center *:w-[75%] text-center'>
        <CardHeader>
          <CardTitle className='text-3xl'>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='
            group:bg-black
            flex flex-col gap-10 items-center 
            *:w-full *:rounded-md *:p-2'>
            <label>
              <p className='text-xl text-start'>Username</p>
              <input type="text"value={username} onChange={(e)=>setUser(e.target.value)}  className={`${inputStyle}`}/>
            </label>
            <label>
              <p className='text-xl text-start'>Password</p>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8}
              className={`peer invalid:text-red-600 invalid:outline-2 invalid:outline-red-300 ${inputStyle}`}/>
              <ul className='invisible peer-invalid:visible text-start'>Minimum 8 characters</ul>
            </label>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Sign Up</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
