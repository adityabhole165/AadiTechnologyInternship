import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const Card33 = ({ name, checked, value, onChange }) => {
    useEffect(() => {
        
    }, [])
    const clickFunc = () => {
        onChange({ name: name, value : value, checked: !checked })
    }
    return (<>
        {
            checked ?
                <CheckCircleIcon sx={{color:'green'}} onClick={clickFunc} /> :
                <RadioButtonUncheckedIcon id="a" onClick={clickFunc}/>
        }
    </>)
}
export default Card33;