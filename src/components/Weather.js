import React from 'react'
import useFetch from '../utils/useFetch';
export default function Weather({url}) {
    return (
        <div>
            {data && <h1>{data}</h1>}
        </div>
    )
}
