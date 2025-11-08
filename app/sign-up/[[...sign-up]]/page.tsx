"use client"
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs"
import axios from "axios";
import { useEffect } from "react";

export default function SignUpPage() {
   const { user, isSignedIn } = useUser();

  useEffect(() => {
    
    const createUser = async () => {
      if (!user) return;

      try {
        const res = await axios.post("/api/createUser", {
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        console.log("✅ User created in database:", res.data);
      } catch (error) {
        console.error("❌ Error creating user:", error);
      }
    };

    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn, user]);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <SignUp 
      redirectUrl="/"
      />
      {/* Sign up form goes here */}
    </div>
  )
}
