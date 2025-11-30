"use client"
import { ReactNode, useState } from "react";
import { spoofCommit } from "@/app/actions/commitSpoofer";
import Row from "./row";
import "./styles.css"
import { getGithubUser } from "@/app/lib/github/user";

export default function Calendar({year}: {year: number}): ReactNode {
  
  const arr = new Array(7).fill(0)
  const [dates, setDates] = useState<Map<string, boolean>>(new Map())
  
  const handleDates = (date: string) => {
    const d = dates
    if(!d.has(date)) {
      d.set(date, false)
    }
    d.set(date, !d.get(date))
    setDates(d)
  }

  const convertToArray = (map: Map<string, boolean>) => {
    const arr: string[] = []
    map.forEach((value, key) => {
      if (value) { arr.push(key) }
    })
    return arr
  }

  return (
    <>
    <table className="flex flex-col p-0">
      <tbody>
        {arr.map((n, i) => (
          <Row key={i} day={i+1} year={year} handleDates={handleDates}></Row>  
        ))}
      </tbody>
    </table>
    <button onClick={async () => {await sendData(convertToArray(dates))}}>Save</button>
    </>
  )
}

const sendData = async (dates: string[]) => {
  const userData = await getGithubUser()
  console.log(userData)
  await spoofCommit(userData!.login, userData!.id, "activitySpoofer", dates)  
  // const user = await getGithubUserEmail()
  // console.log(user)
}