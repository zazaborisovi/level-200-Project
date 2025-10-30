import { HandleUserRedirect } from '@/functions/authFunctions/userAuthFunction'
import UserForm from '../Form'

export default function SignUp(){
  HandleUserRedirect()
  return (
    <div className='flex justify-center items-center h-screen bg-custom-bg'>
      <UserForm endpoint="signup" />
    </div>
  )
}