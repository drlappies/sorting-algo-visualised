import React, { useState, useEffect, useCallback } from 'react'
import Bar from './Bar'

const Visualiser: React.FunctionComponent<{}> = () => {
    const [items, setItems] = useState<number[]>([])
    const [upper, setUpper] = useState<number>(50)
    const [lower, setLower] = useState<number>(0)
    const [length, setLength] = useState<number>(20)
    const [isSorting, setIsSorting] = useState<boolean[]>([])
    const [speed, setSpeed] = useState<number>(500)
    const [method, setMethod] = useState<string>('bubbleSort')

    const generateItems = useCallback((lowerBoundary: number, upperBoundary: number, arrLength: number) => {
        const arr = []
        const isSort = []
        for (let i = 0; i < arrLength; i++) {
            const num = Math.floor(Math.random() * (upperBoundary - lowerBoundary) + lowerBoundary)
            arr.push(num)
            isSort.push(false)
        }
        setItems(arr)
        setIsSorting(isSort)
    }, [])

    const bubbleSort = () => {
        let arr = items
        let sort = isSorting
        let length = arr.length

        function* main() {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length - 1; j++) {
                    sort[j] = true;
                    sort[j + 1] = true;
                    yield setIsSorting([...sort])
                    if (arr[j] > arr[j + 1]) {
                        let temp = arr[j]
                        arr[j] = arr[j + 1]
                        arr[j + 1] = temp
                        yield setItems([...arr])
                    }
                    sort[j] = false;
                    sort[j + 1] = false;
                    yield setIsSorting([...sort])
                }
            }
        }
        const step = main()
        const interval = setInterval(() => {
            let next = step.next()
            if (next.done) {
                clearInterval(interval)
            }
        }, 1500 / speed)
    }

    const selectionSort = () => {
        let arr = items
        let sort = isSorting
        let length = arr.length

        function* main() {
            for (let i = 0; i < length; i++) {
                let min = i;
                let temp = arr[i]
                sort[i] = true
                yield setIsSorting([...sort])
                for (let j = i + 1; j < length; j++) {
                    sort[j] = true
                    yield setIsSorting([...sort])
                    if (arr[j] < arr[min]) {
                        min = j
                    }
                    sort[j] = false
                    yield setIsSorting([...sort])
                }
                arr[i] = arr[min]
                arr[min] = temp;
                sort[i] = false
                yield setItems([...arr])
                yield setIsSorting([...sort])
            }
        }

        const step = main()
        const interval = setInterval(() => {
            let next = step.next()
            if (next.done) {
                clearInterval(interval)
            }
        }, 1500 / speed)
    }

    const insertionSort = () => {
        let arr = items
        let sort = isSorting
        let length = arr.length

        function* main() {
            for (let i = 0; i < length; i++) {
                sort[i] = true
                yield setIsSorting([...sort])
                let temp = arr[i]
                let j;
                for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
                    sort[j + 1] = true
                    yield setIsSorting([...sort])
                    arr[j + 1] = arr[j];
                    sort[j + 1] = false
                    yield setIsSorting([...sort])
                }
                arr[j + 1] = temp
                yield setItems([...arr])
                sort[i] = false
                yield setIsSorting([...sort])
            }
        }

        const step = main()
        const interval = setInterval(() => {
            let next = step.next()
            if (next.done) {
                clearInterval(interval)
            }
        }, 1500 / speed)
    }

    const mergeSort = async () => {
        let arr = items
        let sort = isSorting

        function* main(array: number[] = arr) {
            let sorted = array.slice()
            let length = sorted.length
            let buffer = new Array(length)

            for (let size = 1; size < length; size *= 2) {
                for (let leftStart = 0; leftStart < length; leftStart += 2 * size) {

                    let left = leftStart
                    let right = Math.min(left + size, length)
                    let leftLimit = right
                    let rightLimit = Math.min(right + size, length)
                    let i = left;

                    while (left < leftLimit && right < rightLimit) {
                        if (sorted[left] <= sorted[right]) {
                            sort[left] = true;
                            sort[right] = true;
                            yield setIsSorting(prevState => prevState = [...sort])

                            sort[left] = false;
                            sort[right] = false;
                            yield setIsSorting(prevState => prevState = [...sort])
                            buffer[i++] = sorted[left++];
                            yield setItems([...sorted])
                        } else {
                            sort[left] = true;
                            sort[right] = true;
                            yield setIsSorting(prevState => prevState = [...sort])

                            sort[left] = false;
                            sort[right] = false;
                            yield setIsSorting(prevState => prevState = [...sort])
                            buffer[i++] = sorted[right++]
                            yield setItems([...sorted])
                        }
                    }

                    while (left < leftLimit) {
                        sort[left] = true;
                        sort[right] = true;
                        yield setIsSorting(prevState => prevState = [...sort])

                        sort[left] = false;
                        sort[right] = false;
                        yield setIsSorting(prevState => prevState = [...sort])

                        buffer[i++] = sorted[left++];
                        yield setItems([...sorted])
                    }

                    while (right < rightLimit) {
                        sort[left] = true;
                        sort[right] = true;
                        yield setIsSorting(prevState => prevState = [...sort])

                        sort[left] = false;
                        sort[right] = false;
                        yield setIsSorting(prevState => prevState = [...sort])

                        buffer[i++] = sorted[right++];
                        yield setItems([...sorted])

                    }
                }
                let temp = sorted
                sorted = buffer
                buffer = temp
            }
            yield setItems([...sorted])
        }

        const step = main()
        const interval = setInterval(() => {
            let next = step.next()
            if (next.done) {
                clearInterval(interval)
            }
        }, 1500 / speed)
    }

    const sort = (method: string) => {
        switch (method) {
            case 'bubbleSort':
                bubbleSort()
                break;
            case 'selectionSort':
                selectionSort()
                break;
            case 'insertionSort':
                insertionSort()
                break;
            case 'mergeSort':
                mergeSort();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        generateItems(upper, lower, length)
    }, [generateItems, length, lower, upper])

    return (
        <div className="bg-gray-300 min-h-screen">
            <div className="flex flex-row justify-center h-80 ">
                {items.map((el, i) =>
                    <Bar key={i} value={el} isSwapping={isSorting[i]} />
                )}
            </div>
            <div className="mt-64 grid grid-cols-4 gap-4">
                <div className="flex flex-row justify-center ">
                    <label className="text-gray-700 select-none font-medium" htmlFor="lower">Lower Bound: </label>
                    <input className="py-2" id="lower" name="lower" type="range" value={lower} min="1" max="50" onChange={(e) => setLower(parseInt(e.target.value))} />
                </div>
                <div className="flex flex-row justify-center ">
                    <label className="text-gray-700 select-none font-medium" htmlFor="upper">Upper Bound: </label>
                    <input className="py-2" id="upper" name="upper" type="range" value={upper} min="1" max="50" onChange={(e) => setUpper(parseInt(e.target.value))} />
                </div>
                <div className="flex flex-row justify-center ">
                    <label className="text-gray-700 select-none font-medium" htmlFor="length">Length: </label>
                    <input className="py-2" id="length" name="length" type="range" min="10" max="50" value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
                </div>
                <div className="flex flex-row justify-center ">
                    <label className="text-gray-700 select-none font-medium" htmlFor="speed">Speed: </label>
                    <input className="py-2" id="speed" name="speed" type="range" min="1" max="500" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                </div>
            </div>
            <div className="flex flex-row justify-center mt-10">
                <select className="px-24 py-2 rounded mx-2" id="method" name="method" value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                </select>
                <button className="bg-green-500 px-24 py-2 rounded mx-2" onClick={() => sort(method)}>Sort</button>
                <button className="bg-blue-500 px-24 py-2 rounded mx-2" onClick={() => generateItems(lower, upper, length)}>Randomise</button>
            </div>
        </div>
    )
}

export default Visualiser