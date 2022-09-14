import React, { useEffect, useState } from 'react'
import List3ColSelAll from './List3ColSelAll'
import TextCommaNumber from '../Text/TextCommaNumber'
import { Container, Button, TextField, Typography } from '@mui/material'


const List26 = ({ Dataa,handleClick}) => {



    const [textarray, setTextarray] = useState('')
    console.log("textarray", textarray);

    const click = () =>{
        setTextarray(textarray)
    }
    const [getLabel, setGetLabel] = useState('Comma separated Roll Number')

    const [Data, setData] = useState([])
    useEffect(() => {
        setData(Dataa);
    }, [Dataa]);
    const refreshData = (data) => {
        let arr = []
        data.map((obj) => {
            if (!obj.isActive)
                arr.push(obj.text1)
        })
        setTextarray(arr.join(','))
        setGetLabel('Enter Absent Numbers')
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
            <Container>
                <TextCommaNumber
                    name={'Roll Number'}
                    textarray={textarray}
                    validarray={Data.map((obj) => obj.text1)}
                    changeText={changeText}
                    getLabel={getLabel}
                />

                <List3ColSelAll Itemlist={Data} refreshData={refreshData} />
            </Container>

        </>
    )
}

export default List26