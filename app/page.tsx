import Link from "next/link";
// import "./globals.css

export default function Home() {
  const clientID = process.env.CLIENT_ID
  const env = process.env.NODE_ENV
  const uri = env == "development" ? "http://localhost:3000/auth" : "https://github-activity-spoofer.vercel.app/auth"


  return(
    <div>
      <Link href={`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${uri}`}>
        <p>Log in</p>
      </Link>
    </div>
  );
}