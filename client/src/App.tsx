import { useEffect, useState } from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn'
import Main from './components/pages/Main';
import { Toaster } from "@/components/ui/sonner"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={< />} />*/}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Main />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}