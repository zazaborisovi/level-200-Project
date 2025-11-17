import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "sonner"

const APIURL = import.meta.env.VITE_API_URL

export const HandleUserRedirect = () =>{
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async() =>{
      try{
        const res = await fetch(`${APIURL}check/user/auth`, { credentials: 'include' })
        if (res.ok){
          navigate('/')
        }
      } catch (err){
        console.error(err)
      }
    }
    checkAuth()
  }, [navigate])
}

export const HandleFormSubmit = async (e: React.FormEvent, data: { username: string, password: string }, Method, navigate , url) => {
  e.preventDefault()
  try {
    const res = await fetch(url, {
      method: Method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    
    const result = await res.json()
    
    if(!res.ok){
      toast.error(result.message)
      return
    }
    
    navigate("/")
    
  } catch(err){
    console.error(err)
  }
}

export const SignOut = async(toast , navigate) =>{
  try {
    const res = await fetch(`${APIURL}/signout`, {
      method: 'POST',
      credentials: 'include'
    })
    
    const data = await res.json()
    
    if (!res.ok) {
      toast.error(data.message)
    }
    
    navigate("/signin")
  }
  catch(err){
    console.error(err)
  }
}