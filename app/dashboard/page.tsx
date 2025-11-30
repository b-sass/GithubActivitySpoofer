import Calendar from "./ui/calendar";
import "../global.css"

export default async function Dashboard() {

  // const userData = await getUser()
  
  return(
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Dashboard</h1>
      <Calendar year={2025}></Calendar>
    </div>
  );
}