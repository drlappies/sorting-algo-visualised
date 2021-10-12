import React from 'react'

interface IProps {
    name: string,
    value: number,
    min: number,
    max: number,
    callback: (value: number) => void,
}

const Input: React.FC<IProps> = ({ name, value, callback, min, max }) => {
    return (
        <div className="flex flex-row justify-center ">
            <label className="text-gray-700 select-none font-medium" htmlFor="speed">{name}: </label>
            <input className="py-2" id="speed" name="speed" type="range" min={min} max={max} value={value} onChange={(e) => callback(parseInt(e.target.value))} />
        </div>
    )
}

export default Input