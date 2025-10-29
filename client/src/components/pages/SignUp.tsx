import {useEffect, useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { HandleFormSubmit } from '@/functions/authFunctions/userAuthFunction'

export default function SignUp(){
  const [username , setUser] = useState("")
  const [password , setPassword] = useState("")
  
  const navigate = useNavigate()
  const url = "http://localhost:6969/api/signup"
  
  const inputStyle = "outline-0 rounded-md h-10 w-full bg-custom-accent-2"
  
  const isUserAuthenticated = async () => {
    try{
      fetch("http://localhost:6969/api/check/user/auth", {credentials: 'include'})
        .then(res =>{
          if (res.ok){
            navigate('/')
          }
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
      toast.error(result)
    }
    catch(error){
      console.error(error)
    }
    await isUserAuthenticated()
  }
  return (
    <div className='flex justify-center items-center h-screen bg-custom-bg text-custom-text'>
      <Card className='w-[400px] h-[500px] flex justify-center items-center *:w-[75%] text-center bg-custom-card border-0'>
        <CardHeader>
          <CardTitle className='text-3xl text-custom-text'>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='
            text-custom-text
            group:bg-black
            flex flex-col gap-2 items-center 
            *:w-full *:rounded-md *:p-2 *:*:pl-2 *:*:pr-2
            '>
            <label>
              <p className='text-xl text-start'>Username</p>
              <input type="text"value={username} onChange={(e)=>setUser(e.target.value)}  className={`${inputStyle}`} required/>
            </label>
            <label>
              <p className='text-xl text-start'>Password</p>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={8}
              className={`peer invalid:text-red-600 invalid:outline-2 invalid:outline-red-300 ${inputStyle} `} required/>
              <ul className='invisible peer-invalid:visible text-start'>Minimum 8 characters</ul>
            </label>
            <div className='flex flex-col gap-2'>
              <button type="submit" onClick={(e) => HandleFormSubmit(e, { username, password } , "POST" , navigate , url)} 
              className="rounded-xl bg-custom-accent hover:bg-custom-accent-2 w-full h-[45px]"
              >Sign Up</button>
              <p className='text-md text-start'>Have an account?  
                <a onClick={() => navigate("/signin")} className="text-custom-accent hover:text-custom-accent-2 cursor-pointer"> Sing In</a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
