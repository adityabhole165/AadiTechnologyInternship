import { Accordion, AccordionDetails } from "@mui/material"
import Note from "../Note/Note"
import { Accordionsummary, Header1 } from "../styled/AccordianStyled"
import { useState } from "react";
import { useTheme, Grid } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import Card5 from "./card5";

const Card38 = ({FeesType, Fee, FeesObject,expanded,handleChange,internalFees}) => {
    const theme = useTheme();
    const classes = Styles();
    console.log("Fee",Fee);
    
    return (
        <>
 <Accordion
        className={classes.background}
        expanded={expanded === 'panel'}
        onChange={handleChange('panel')}
        elevation={0}
        disableGutters
      >
        <Accordionsummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            background: `${theme.colors.gradients.pink1}`, mb:1
          }}
        >
          <Header1
            color={expanded === 'panel' ? 'secondary' : ''}
          >
            <b>{FeesType}</b> &nbsp;:&nbsp;<b>{FeesObject.TotalFeesPaid}</b>
          </Header1>
        </Accordionsummary>
        {
          <AccordionDetails>
            {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
              0 ? (
              <ErrorMessages Error={'No fees has been paid'} />
            ) : Fee == undefined ? null : (
              Fee.map((item, i) => {
                  return item.FeeDetailsId !== 0  ? ( 
                  <>
                  <Card5
                   FileName={internalFees?item.FeeType + ":"+ " " + item.Amount:item.FeeType + ":"+ " " + item.FeesPaid}
                   Content={''}
                   Name={''}
                   key={i}
                  />
                  </>
                ) : null;
              })
            )}
          </AccordionDetails>
        }
      </Accordion>
        </>
    )
}
export default Card38