import { Card } from '@mui/material'
import React from 'react'
import ListCard3ColSel from '../card/ListCard3ColSel'
import CheckboxCard from './CheckboxCard'

const ListSelect = ({Itemlist,onChange, isSingleSelect=false}) => {
    const onClick=(value)=>{

        Itemlist =  Itemlist.map((obj) =>
                obj.Id === value.Id ?
                    { ...obj, isActive: value.isActive } :
                    { ...obj, isActive: isSingleSelect?false: obj.isActive}
            )
            onChange(Itemlist)
    }
  return (
    <>
    {
        Itemlist?.map((item, index) => (
            <CheckboxCard Item={item} onClick={onClick} key={index}/>
        ))
    }
    </>
  )
}

export default ListSelect