import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET

export const runtime = "nodejs";
const isProtectedRoute=createRouteMatcher(["/main(.*)","/courses(.*)","/consulation(.*)"]);

export default clerkMiddleware(async(auth,req)=>{
  const {userId}=await auth()
  if(!userId && isProtectedRoute(req)){
    const {redirectToSignIn}=await auth()
    return redirectToSignIn()
  }
   if (req.nextUrl.pathname.startsWith("/dashboard")) {
  const adminToken = req.cookies.get("adminToken")?.value;

  if (!adminToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(adminToken, SECRET!);
    return NextResponse.next();
  } catch(error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
  
  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}