import { useState } from 'react';
import { Container, Card } from '@mui/material';

import Card32 from './Card32';
import List23 from '../list/List23';
import { Styles } from 'src/assets/style/student-style';
import Card28 from './Card28';
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
        <Card28 Student={header.Students}/>
        <Container>
            {header.Header!= undefined ?
                header.Header.map((Header) => (

                    <Card key={Header.Id} sx={{ mt: 1}} className={classes.ListStyle1}>

                        <Card32
                            Id={Header.Id}
                            Name={Header.Name}
                            expand={expand} />

                        {
                            enableRow === Header.Id &&
                            <List23 data={Header.Child}/>
                        }
                    </Card>
                ))
            :null}
        </Container>
        </>
    )
}
export default Card30;