import { ReactNode } from "react";
import Day from "./day";

export default function Row({day, year, handleDates}: {day: number, year: number, handleDates: (date: string) => void}): ReactNode {

  const arr = new Array(53).fill(0)

  const janFirst = new Date(year, 0, 1)
  const firstSunday = new Date(janFirst)
  firstSunday.setDate(janFirst.getDate() - janFirst.getDay())
  firstSunday.setHours(12) // DST workaround

  return (
    <tr className="flex flex-row p-0" draggable="false">
      {arr.map((n, i) => {
        const cellDate = new Date(firstSunday)
        cellDate.setDate(firstSunday.getDate() + i * 7 + (day - 1))
        const isoDate = cellDate.toISOString().slice(0,10)

        return <Day key={i} date={isoDate} isActive={cellDate.getFullYear() !== year ? false : true} handleDates={handleDates}/>
      })}
    </tr>
  )
}