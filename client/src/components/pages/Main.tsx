import { SignOut } from '@/functions/authFunctions/userAuthFunction'
import {useEffect, useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Main(){
  const [note , setNote] = useState()
  const [name , setName] = useState("")
  const [content , setContent] = useState("")
  
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
  
  const addNote = async (note: { name: string, content: string }) => {
    try {
      const res = await fetch("http://localhost:6969/api/addnote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note),
        credentials: 'include',
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        console.log(note)
        console.log(res)
        toast.error(data.message)
        return
      }
      
      toast.success("Note added successfully")
    } catch (err){
      console.error(err)
    }
  }
  return (
    <div>
      <button onClick={() => SignOut(toast , navigate)}>Log Out</button>
      
      <form>
        <input name="name" type="text" onChange={(e) => setName(e.target.value)} />
        <input name="content" type="text" onChange={(e) => setContent(e.target.value)} />
        <button onClick={(e) => {
          e.preventDefault()
          addNote({name: name, content: content})
        }}>Add Note</button>
      </form>
      {note?.map((note) => (
        <div>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
        </div>
      ))}
      
    </div>
  );
};
