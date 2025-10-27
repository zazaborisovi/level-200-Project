import { useEffect, useState } from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import SignUp from './components/SignUp';
import Main from './components/Main';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={< />} />*/}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

// export default function s(){
//   const [data , setData] = useState(null)
//   useEffect(() => {
//     async function fetchData(){
//       const url = 'http://localhost:6969/api/test'
//       try{
//         const req = await fetch(url)
//         const res = await req.json()
//         setData(res)
//         console.log(res)
//       }catch(err){
//         console.error(err)
//       }
//     }
//     fetchData();
//     console.log(data)
//   }, []);
//   return (
//     <div> 
//       {data?(
//         <div>
//           {/* @ts-expect-error - ts will take data as null */}
//           {data.user.name}
//         </div>
//       ):(<div className='bg-black rounded-full w-20 h-20'/>)
//       }
//       <SignUp />
//     </div>
//   )
// }