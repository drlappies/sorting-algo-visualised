import React, { useState, useEffect, useCallback } from 'react'
import Bar from './Bar'

const Visualiser: React.FunctionComponent<{}> = () => {
    const [items, setItems] = useState<number[]>([])
    const [upper, setUpper] = useState<number>(50)
    const [lower, setLower] = useState<number>(0)
    const [isSorting, setIsSorting] = useState<boolean[]>([])
    const [speed, setSpeed] = useState<number>(100)

    const generateItems = useCallback((lowerBoundary: number = lower, upperBoundary: number = upper) => {
        if (isNaN(lowerBoundary)) setLower(0)
        if (isNaN(upperBoundary)) setUpper(0)
        const arr = []
        const isSort = []
        for (let i = 0; i < 20; i++) {
            const num = Math.floor(Math.random() * (upperBoundary - lowerBoundary) + lowerBoundary)
            arr.push(num)
            isSort.push(false)
        }
        setItems(arr)
        setIsSorting(isSort)
    }, [lower, upper])

    const wait = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

    const bubbleSort = () => {
        let arr = items
        let sort = isSorting
        let length = arr.length

        async function task(j: number) {
            await wait(speed);

            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                setItems([...arr])
            }

        }

        const main = async () => {
            for (let i = 0; i < length - 1; i++) {
                for (let j = 0; j < length - 1; j++) {
                    sort[j] = true
                    sort[j + 1] = true
                    setIsSorting([...sort])
                    await task(j)
                    sort[j] = false
                    sort[j + 1] = false
                    setIsSorting([...sort])
                }
            }
        }

        main()
    }

    useEffect(() => {
        generateItems(upper, lower)
    }, [generateItems, lower, upper])

    return (
        <div>
            <div className="flex flex-row justify-center h-80">
                {items.map((el, i) =>
                    <Bar key={i} value={el} isSwapping={isSorting[i]} />
                )}
            </div>
            <div className="mt-64 flex flex-row justify-evenly">
                <div>
                    <label className="text-gray-700 select-none font-medium" htmlFor="lower">Lower Bound: </label>
                    <input className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" name="lower" type="range" value={lower} min="1" max="50" onChange={(e) => setLower(parseInt(e.target.value))} />
                </div>
                <div>
                    <label className="text-gray-700 select-none font-medium" htmlFor="upper">Upper Bound: </label>
                    <input className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" name="upper" type="range" value={upper} min="1" max="50" onChange={(e) => setUpper(parseInt(e.target.value))} />
                </div>
                <div>
                    <label className="text-gray-700 select-none font-medium" htmlFor="speed">Sort speed: </label>
                    <input className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" name="speed" type="range" min="1" max="500" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                </div>
                <button className="bg-green-500 px-24 py-2 rounded" onClick={bubbleSort}>Sort</button>
                <button className="bg-blue-500 px-24 py-2 rounded" onClick={() => generateItems(lower, upper)}>Randomise</button>
            </div>
        </div>
    )
}

export default Visualiser