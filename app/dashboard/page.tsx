import Calendar from "./ui/calendar";
import "../global.css"
import { getGithubUser } from "../lib/github/user";
import Link from "next/link";

export default async function Dashboard() {

  getGithubUser()
  
  return(
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Dashboard</h1>
      <Link href="https://github.com/apps/activitySpoofer/installations/new">Install app</Link>
      <Calendar year={2025}></Calendar>
    </div>
  );
}