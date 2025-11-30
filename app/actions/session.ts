import "server-only"
import { cookies } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"

export const createSession = async (token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()
  
  console.log("setting cookies")
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await JSON.parse(cookie!)
 
  if (!session?.access_token) {
    redirect('/login')
  }
 
  return { isAuth: true, accessToken: session.access_token }
})