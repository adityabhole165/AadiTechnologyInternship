import { Box } from '@mui/material'
import React from 'react'
import ListHeaderCard3ColSel from 'src/libraries/card/ListHeaderCard3ColSel'
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages'
import CheckboxCard from 'src/libraries/list/CheckboxCard'
import ListSelect from 'src/libraries/list/ListSelect'
import { ListStyle } from 'src/libraries/styled/CardStyle'

const SelectallAddrecipents = ({ Itemlist, onChange, isSingleSelect = false }) => {
    const onClick = (value) => {

        Itemlist = Itemlist.map((obj) =>
            obj.Id === value.Id ?
                { ...obj, isActive: value.isActive } :
                { ...obj, isActive: isSingleSelect ? false : obj.isActive }
        )
        onChange(Itemlist)
    }

    let isCheckAll =
        (!Itemlist.some(obj => obj.isActive === false)) ?
            1 :
            (!Itemlist.some(obj => obj.isActive === true)) ?
                0 :
                2;

    const ClickAll = (value) => {
        Itemlist =
            Itemlist.map((obj) => {
                return { ...obj, isActive: value }
            })
        onChange(Itemlist)
    }
    return (
        <>
                <ListHeaderCard3ColSel
                    Item={{ text1: '', text2: 'SelectAll', isActive: isCheckAll }}
                    onChange={ClickAll}
                />
            {
                Itemlist?.map((item, index) => (
                    <CheckboxCard Item={item} onClick={onClick} key={index} />
                ))
            }
        </>
    )
}

export default SelectallAddrecipents