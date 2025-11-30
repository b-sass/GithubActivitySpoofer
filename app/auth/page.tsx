import { signup } from "../actions/signup"
import { redirect } from "next/navigation"

type SearchParams = {
    searchParams: Promise<Record<string, string>>;
};

export default async function Auth({searchParams}: SearchParams) {
  const code = (await searchParams).code
  console.log(code)

  signup(code)
  redirect("/dashboard")
  
  return(
    <>Auth</>
  );
}