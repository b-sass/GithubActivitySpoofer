"use client"
export const YearMenu = ({currentYear, handleChange}: {currentYear: number, handleChange: (_: number) => void}) => {
    
    let years: number[] = new Array(68).fill(0)
    years = years.map((y, idx) => idx + 1970)

    return (
        <select value={currentYear} onChange={(e) => {handleChange(+e.target.value)}}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
            {/* <option value={12}>12</option> */}
        </select>
    )
}