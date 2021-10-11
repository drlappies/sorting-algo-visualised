import React from 'react'
interface Sort {
    value: number,
    isSwapping: boolean
}

const Bar: React.FunctionComponent<Sort> = ({ value, isSwapping }) => {
    return (
        <div className="bg-yellow-300 m-px w-1/12 text-center font-bold text-lg" style={{ height: `${value * 8}px`, backgroundColor: isSwapping ? "red" : "yellowgreen" }}>{value}</div>
    )
}

export default Bar