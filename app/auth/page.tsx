"use client"
import { signup } from "../actions/signup"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
// type SearchParams = {
//     searchParams: Promise<Record<string, string>>;
// };

export default function Auth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get("code")

  useEffect(() => {
    signup(code)
    router.push("/dashboard")
  })
  
  return(
    <>Auth</>
  );
}