import React from 'react'
interface Sort {
    value: number,
    isSwapping: boolean
}

const Bar: React.FunctionComponent<Sort> = ({ value, isSwapping }) => {
    return (
        <div className="bg-yellow-300 mx-0.5 w-1/6" style={{ height: `${value * 8}px`, backgroundColor: isSwapping ? "red" : "yellowgreen" }}>{value}</div>
    )
}

export default Bar