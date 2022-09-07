import React, { useState } from 'react'
import List3ColSelAll from './List3ColSelAll'
import TextCommaNumber from '../Text/TextCommaNumber'
const List26 = () => {
    const [textarray, setTextarray] = useState('')
    const [getLabel, setGetLabel] = useState('Comma separated Roll Number')
    const [Data, setData] = useState([{
        text1: "1",
        text2: "Ajit",
        isActive: true
    }, {
        text1: "2",
        text2: "Mayur",
        isActive: true
    }]
    )
    const refreshData = (data) => {
        let arr = []
        data.map((obj) => {
            if (!obj.isActive)
                arr.push(obj.text1)
        })
        setTextarray(arr.join(','))
        setGetLabel('Comma separated Roll Number')
        setData(data);
    }
    const changeText = (data) => {
        setTextarray(data.text)
        setGetLabel(data.getLabel)
        let arr = data.text.split(',')
        setData(Data.map((obj) =>
            arr.includes(obj.text1) ? { ...obj, isActive: false } : { ...obj, isActive: true }
        ))
    }

    return (
        <>

            <TextCommaNumber
                name={'Roll Number'}
                textarray={textarray}
                validarray={Data.map((obj) => obj.text1)}
                changeText={changeText}
                getLabel={getLabel} />

            <List3ColSelAll Itemlist={Data} refreshData={refreshData} />
        </>
    )
}

export default List26