import Link from "next/link";
// import "./globals.css

export default function Home() {
  const clientID = process.env.CLIENT_ID
  const uri = "http://localhost:3000/auth"

  return(
    <div>
      <Link href={`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${uri}`}>
        <p>Log in</p>
      </Link>
    </div>
  );
}