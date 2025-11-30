import Link from "next/link";
// import "./globals.css

export default function Home() {
  return(
    <div>
      <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}>
        <p>Log in</p>
      </Link>
    </div>
  );
}