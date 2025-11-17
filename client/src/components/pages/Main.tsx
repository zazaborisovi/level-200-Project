import { SignOut } from '@/functions/authFunctions/userAuthFunction'
import {useEffect, useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader } from '../ui/card'

const APIURL = import.meta.env.VITE_API_URL

const CustomInput = ({name , type , onChange}) =>{ //created outside to prevent re-rendering every time we type in it
  return (
    <label htmlFor={name} className="flex flex-col sm:flex-row w-full *:w-full">
      <b className='capitalize sm:w-[20%]'>{name}</b>
      <input name={name} type={type} onChange={onChange} className='outline-0 border-2 border-black sm:w-[80%] p-1 bg-custom-accent-2' />
    </label>
  )
}

export default function Main(){
  const [note , setNote] = useState()
  const [name , setName] = useState("")
  const [content , setContent] = useState("")
  
  const getNoteUrl = `${APIURL}/getnote`
  const navigate = useNavigate()
  
  useEffect(() =>{
    try{
      fetch(`${APIURL}/check/user/auth`, {credentials: 'include'})
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
        const res = await fetch(getNoteUrl , { credentials: "include" })
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
      const res = await fetch(`${APIURL}/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note),
        credentials: 'include',
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        toast.error(data.message)
        return
      }
      
      toast.success("Note added successfully")
      const res2 = await fetch(getNoteUrl , { credentials: "include" })
      const newData = await res2.json()
      setNote(newData.notes)
      console.log(newData)
    } catch (err){
      console.error(err)
    }
  }
  
  const delNote = async (noteToDel) =>{
    try{
      const res = await fetch(`${APIURL}/deleteNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteToDel),
        credentials: 'include',
      })
      
      const data = await res.json()
      
      
      toast.success("Note deleted successfully")
      const res2 = await fetch(getNoteUrl , { credentials: "include" })
      const newData = await res2.json()
      setNote(newData.notes)
      console.log(newData)
    } catch (err){
      console.error(err)
    }
  }
  

  
  return (
    <div className='h-screen w-screen flex flex-col items-start justify-start bg-custom-bg'>
      <button onClick={() => SignOut(toast , navigate)} className='border-black border-2 p-2 absolute right-2 top-2 bg-custom-card text-custom-text'>Log Out</button>
      <Card className='container sm:w-[500px] bg-custom-card text-custom-text border-0 justify-start pt-0'>
        <CardHeader className="flex w-full bg-custom-accent rounded-t-xl py-6">
          <form
            className=" w-full p-2 flex flex-col gap-5 sm:gap-2 sm:flex-row"
          >
            <div className="flex flex-col gap-2 w-full sm:w-[90%]">
              <CustomInput name="name" type="text" onChange={(e) => setName(e.target.value)} />
              <CustomInput name="content" type="text" onChange={(e) => setContent(e.target.value)} />
            </div>
            <button onClick={(e) => {
              e.preventDefault()
              addNote({name: name, content: content})
            }}
            className="border-black border-2 p-2 w-full sm:w-[10%] bg-custom-accent-2">+</button>
          </form>
        </CardHeader>
        <CardContent className="flex gap-2 flex-col">
          {note?.map((note) => (
            <div className="border-black rounded-xl flex flex-col gap-2 border-2 *:m-1 w-full relative items-center [&>*:not(:first-child)]:w-full *:text-center
              bg-custom-accent text-custom-text">
              <button onClick={(e) => delNote({name: note.name})} value={note.name}
              className='absolute -top-4 -right-3 w-6 h-8 rounded-xl text-red-700 text-xl'
              >X</button>
              <h2>{note.name}</h2>
              <p>{note.content}</p>
            </div>
          ))}  
        </CardContent>
      </Card>
    </div>
  );
};
