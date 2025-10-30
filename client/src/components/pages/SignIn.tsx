import UserForm from "../Form";
import { HandleUserRedirect } from "../../functions/authFunctions/userAuthFunction.tsx";

export default function SignIn(){
  HandleUserRedirect()
  return (
    <div className='flex justify-center items-center h-screen bg-custom-bg'>
      <UserForm endpoint="signin" />
    </div>
  )
};