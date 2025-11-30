"use server"
import { redirect } from "next/navigation"
import { convertTokenData, exchangeCode } from "./githubAuth"
import { createSession } from "./session"

export const signup = async (code: string | null) => {
  if (code === null) {
    redirect("/")
  }

  const tokenParams = await exchangeCode(code!)
  const token = convertTokenData(tokenParams)
  await createSession(JSON.stringify(token))
}