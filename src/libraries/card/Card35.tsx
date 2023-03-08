import { useState } from 'react';
import { Container, Card,Box } from '@mui/material';

import Card36 from './Card36';
import List23 from '../list/List23';
import { Styles } from 'src/assets/style/student-style';
import Card28 from './Card28';

import { ListStyle } from '../styled/CardStyle';
import CardAtt from '../accordion/CardAtt';

export const Card35 = ({ header}) => {
   
    
    
    const [enableRow, setEnableRow] = useState(-1)
    const [checked, setChecked] = useState(true)
    const expand = (index) => {
        console.log(index)
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
                
                    <Box key={index}>
                        
                     
                        <Card36
                            Id={index}
                            Rank={Header.Rank}
                            Name={Header.Name}
                            Rollno={Header.Rollno}
                            Presentdays= {Header.PresentDays}
                            Percentage={Header.Percentage}
                            expand={() => setEnableRow(enableRow === index ? -1 : index)}
                            isActive={enableRow === index}
                            />

                        {
                            enableRow === index &&
                            <ListStyle>
                                 <CardAtt data={Header.Child}/>
                            </ListStyle>
                           
                        }
                    </Box>
                ))
            :null}

        </>
    )
}
export default Card35;