import React from 'react'

interface IProps {
    method: string,
    callback: (value: string) => void,
    children: React.ReactNode
}

const Select: React.FunctionComponent<IProps> = ({ method, callback, children }) => {
    return (
        <select className="px-24 py-2 rounded mx-2" id="method" name="method" value={method} onChange={(e) => callback(e.target.value)}>
            {children}
        </select>
    )
}

export default Select