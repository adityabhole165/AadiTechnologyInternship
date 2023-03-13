import { useState } from 'react';
import Card36 from './Card36';
import Card28 from './Card28';
import { ListStyle } from '../styled/CardStyle';
import AttendanceCard from '../mainCard/AttendanceCard';
import { Box } from '@mui/material';
export const Card35 = ({ header }) => {
    const [enableRow, setEnableRow] = useState(-1)

    const expand = (index) => {
        setEnableRow(enableRow === index ? -1 : index)
    }

    return (
        <>
           {
                header.Header != undefined &&
                header.Header.map((Header, index) => (
                    <ListStyle key={index}>
                        <Card36 Id={index} Rank={Header.Rank}
                            Name={Header.Name} Rollno={Header.Rollno}
                            Presentdays={Header.PresentDays} Percentage={Header.Percentage}
                            expand={expand} isActive={enableRow === index} />
                          <Box sx={{mt:"10px"}}>
                          {enableRow === index && (
                            Header.Child.map((Item, index) =>
                                <AttendanceCard Item={Item} key={index} />
                            ))
                        } 
                            
                            </Box>  
                     
                    </ListStyle>
                ))
            }
        </>
    )
}
export default Card35;