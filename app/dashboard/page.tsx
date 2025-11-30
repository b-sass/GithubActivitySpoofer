import Calendar from "./ui/calendar";
import "../global.css"
import { getGithubUser } from "../lib/github/user";

export default async function Dashboard() {

  getGithubUser()
  
  return(
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Dashboard</h1>
      <a href="https://github.com/apps/activitySpoofer/installations/new" target="_blank" rel="noopener noreferrer">Install app</a>
      <Calendar year={2025}></Calendar>
    </div>
  );
}