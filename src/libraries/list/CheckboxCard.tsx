import { Grid,Box } from '@mui/material'
import React from 'react'
import CheckboxImg from '../card/CheckboxImg'
import { CardDetail2, ItemSize, ListStyle,ListStyle1 } from '../styled/CardStyle'

const CheckboxCard = ({Item, onClick}) => {
    const onChange = () => {
        onClick({Id:Item.Id, isActive:!Item.isActive})
    }
    return (
        <ListStyle1>
     
                <Box sx={{display:"flex"}}>
                    <CheckboxImg
                        name={Item.Name}
                        value={Item.Value}
                        checked={Item.isActive}
                        onChange={onChange}
                    />
                    <ItemSize onClick={onChange}>
                    {Item.Name}
                    </ItemSize>
                 </Box>
               
         
        </ListStyle1>
    )
}

export default CheckboxCard