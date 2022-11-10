import { Grid,Box } from '@mui/material'
import React from 'react'
import CheckboxImg from '../card/CheckboxImg'
import { CardDetail2, ItemSize, ListStyle } from '../styled/CardStyle'

const CheckboxCard = ({Item, onClick}) => {
    const onChange = () => {
        onClick({Id:Item.Id, isActive:!Item.isActive})
    }
    return (
        <ListStyle>
     
                <Box sx={{display:"flex"}}>
                    <CheckboxImg
                        name={Item.Name}
                        value={Item.Value}
                        checked={Item.isActive}
                        onChange={onChange}
                    />
                    <ItemSize>
                    {Item.Name}
                    </ItemSize>
                 </Box>
               
         
        </ListStyle>
    )
}

export default CheckboxCard