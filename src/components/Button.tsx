import React from 'react';


interface IProps {
    name: string,
    color: string,
    callback: () => void
}

const Button: React.FC<IProps> = ({ name, callback, color }) => {
    return (
        <button className={`bg-${color}-500 px-24 py-2 rounded mx-2`} onClick={callback}>{name}</button >
    )
}

export default Button