import { useState } from 'react';
import { Container, Card } from '@mui/material';

import Card32 from './Card32';
import List23 from '../list/List23';
import { Styles } from 'src/assets/style/student-style';
import Card28 from './Card28';
import { ListStyle } from '../styled/CardStyle';
export const Card30 = ({ header}) => {
    const [enableRow, setEnableRow] = useState(-1)
    const expand = (index) => {
        if (enableRow === index)
            setEnableRow(-1)
        else
            setEnableRow(index)
    }
    const classes = Styles();
    return (
        <>
        {header.Students===undefined?null:
            <Card28 Student={header.Students}/>}
      
            {header.Header!= undefined ?
                header.Header.map((Header, index) => (

                    <ListStyle key={index}>

                        <Card32
                            Id={index}
                            Name={Header.Name}
                            expand={expand} 
                            isActive={enableRow === index}/>

                        {
                            enableRow === index &&
                            <List23 data={Header.Child}/>
                        }
                    </ListStyle>
                ))
            :null}

        </>
    )
}
export default Card30;