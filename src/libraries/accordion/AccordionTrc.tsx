import React, { useState } from 'react'
import { Accordion, AccordionDetails, useTheme } from '@mui/material';
import { Accordionsummary, Header1 } from '../styled/AccordianStyled';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { ListStyle } from '../styled/CardStyle';
import CardNew from '../card/CardNew';


function AccordionTrC({ header, handleChange, isExpanded, Name }) {

    const theme = useTheme();
    const classes = Styles();
    return (
        <div>
            <Accordion expanded={isExpanded}
             className={classes.background}
                onChange={handleChange}
                elevation={0}
                disableGutters>

                <Accordionsummary
                   expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                   aria-controls="panel1bh-content"
                   id="panel1bh-header"
                   sx={{
                       background: `${theme.colors.gradients.pink1}`,
                       boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                       mb: 1,
                       color: isExpanded
                           ? `${theme.colors.gradients.accordianHeadercolor}`
                           : ''
                   }}
                    >
                    {header}
                </Accordionsummary>
                <AccordionDetails sx={{ borderRadius: 1 ,mb: -1}}>
                    <CardNew/>
                </AccordionDetails>
            </Accordion>


        </div>
    )
}

export default AccordionTrC