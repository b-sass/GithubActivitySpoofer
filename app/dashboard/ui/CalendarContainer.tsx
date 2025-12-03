"use client"
import { useState } from "react"
import Calendar from "./calendar"
import { YearMenu } from "./YearMenu"

export const CalendarContainer = () => {

    const [year, setYear] = useState(new Date().getFullYear())

    const handleChange = (year: number) => {
        setYear(year)
    }

    return (
        <>
            <YearMenu currentYear={year} handleChange={handleChange}/>
            <Calendar currentYear={year}/>
        </>
    )
}