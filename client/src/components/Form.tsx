import {useEffect, useState} from 'react' 
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HandleFormSubmit } from '@/functions/authFunctions/userAuthFunction';

const CustomInput = ({type , name , onChange }) =>{
  return(
    <input 
    type={type}
    name={name}
    onChange={onChange}
    className={`outline-0 rounded-md h-10 w-full bg-custom-accent-2 pr-4 pl-4
    ${name == "password" && 'peer invalid:text-red-600 invalid:outline-2 invalid:outline-red-300 '}`}
    />
  )
}

export default function UserForm({endpoint}){
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  
  const navigate = useNavigate()
  const url = `http://localhost:6969/api/${endpoint}`
  

  return (
    <Card className='bg-custom-card border-0 flex items-center justify-center *:w-[90%] text-center pt-15 pb-15'>
      <CardHeader>
        <CardTitle className='text-3xl text-custom-text'>{endpoint == "signup" ? "Sign Up" : "Sign In"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form 
          className='text-custom-text flex flex-col gap-4 items-center 
          *:w-full *:p-2 '
        >
          <label htmlFor="username" 
            className='text-xl text-start'
          >
            Username
            <CustomInput
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)} 
            />
          </label>
          <label htmlFor='password'
            className='text-xl text-start'
          >
            Password
            <CustomInput
            type="password"
            name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <div className='flex flex-col gap-4 items-start'>
            <button 
              className='rounded-xl bg-custom-accent hover:bg-custom-accent-2 w-full h-[45px]'
              onClick={(e) => {
                e.preventDefault()
                HandleFormSubmit(e , {username , password} , "POST" , navigate , url)
              }}
            >
              {endpoint == "signup" ? "Sign Up" : "Sign In"}
            </button>
            <Link to={endpoint == "signup" ? "/signin" : "/signup"}>
              {endpoint == "signup" ? "Have an account? Sign In" : "Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
