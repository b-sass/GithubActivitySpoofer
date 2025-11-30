"use client"
import { ReactNode, useState } from "react";

export default function Day({date, isActive, handleDates} : {date: string, isActive: boolean, handleDates: (date: string) => void}): ReactNode {

  const [squareColor, setSquareColor] = useState("bg-gray-100")

  const colorSquare = (e: React.MouseEvent) => {
    if (e.buttons === 1) {  // Left mouse button held
      if (squareColor === "bg-gray-100") {
        setSquareColor("bg-green-300")
        console.log(`Change color to green`)
      } else {
        setSquareColor("bg-gray-100")
        console.log(`Change color to gray`)
      }
      handleDates(date)
    }
  }

  if (isActive) {
    return (
      <td className={`min-w-4 min-h-4 border border-gray-400 ${squareColor} rounded`}
      draggable="false"
      onMouseEnter={(e) => {colorSquare(e)}}
      onMouseDown={(e) => {colorSquare(e); console.log(`Date: ${date}`)}}>
      </td> 
    )
  } else {
    return (
       <td 
       className={`min-w-4 min-h-4 border border-gray-400 bg-gray-900 rounded`}
       draggable="false">
       </td>
    )
  }
}