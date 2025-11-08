import { SignUp } from "@clerk/nextjs";


export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <SignUp 
      redirectUrl="/"
      />
      {/* Sign up form goes here */}
    </div>
  )
}
