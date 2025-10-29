import {useEffect, useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Main(){
  const [note , setNote] = useState()
  const url = "http://localhost:6969/api/getnote"
  const navigate = useNavigate()
  useEffect(() =>{
    try{
      fetch("http://localhost:6969/api/check/user/auth", {credentials: 'include'})
        .then(res =>{
          if (!res.ok){
            navigate('/signup')
          }
          console.log("Auth check status:", res.status)
        })
    }
    catch(error){
      console.error(error)
    }
    const getNote = async () =>{
      try{
        const res = await fetch(url , { credentials: "include" })
        const data = await res.json()
        setNote(data.notes)
      }
      catch(error){
        console.error(error)
      }
    }
    getNote()
  },[])

  const signOut = async() =>{
    try {
      const res = await fetch("http://localhost:6969/api/signout", {
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
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
      {note?.map((note) => (
        <div>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
        </div>
      ))}
      
    </div>
  );
};
