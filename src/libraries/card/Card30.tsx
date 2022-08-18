import { useState } from 'react'
import { Container, Card, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Card31 from './Card31';
import Card32 from './Card32';
export const Card30 = ({ header }) => {
    const [enableRow, setEnableRow] = useState(-1)
    const expand = (index) => {
        if (enableRow === index)
            setEnableRow(-1)
        else
            setEnableRow(index)
    }
    return (
        <><Container>
            {
                header.map((Header) => (

                    <Card key={Header.Id} sx={{ mt: 1, bgcolor: 'white' }}>

                        <Card32
                            Id={Header.Id}
                            Name={Header.Name}
                            enableRow={enableRow}
                            expand={expand} />

                        {
                            Header.Child.map((Detail) => (
                                enableRow === Header.Id &&

                                <Card31 key={Detail.Id}
                                    Id={Detail.Id}
                                    Name={Detail.Name}
                                    Value={Detail.Value} />

                            ))
                        }
                    </Card>
                ))
            }
        </Container></>
    )
}
export default Card30;