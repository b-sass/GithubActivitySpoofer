"use client"
import { signup } from "../actions/signup"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Auth() {
  const params = useSearchParams()
  const router = useRouter()

  const code = params.get("code")
  console.log(code)

  useEffect(() => {
    signup(code)
    router.push("/dashboard")
  })
  
  return(
    <>Auth</>
  );
}

