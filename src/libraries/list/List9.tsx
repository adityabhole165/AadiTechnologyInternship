import React from "react";
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style'
import { useState } from 'react';
import {  Container,useTheme, Box, Grow} from "@mui/material";
import Card13 from "../mainCard/Card13";

List9.propTypes = {
    Title: PropTypes.object,
    Acc:PropTypes.string,
    title:PropTypes.string,
    issue:PropTypes.string,
    returnn:PropTypes.string,
    parentissue:PropTypes.string,
}

function List9({Acc,title,issue,returnn,parentissue}) {
const [checked, setChecked] = useState(true);
const issuedate = new Date('11/11/2022 12:09:23');
console.log(issuedate,issue)
		const Day = issuedate.getDate();
		const Month = issuedate.toLocaleString("default", { month: 'short'});
		const Year = issuedate.getFullYear();
		const NewDateFormat = `${Day} ${Month} ${Year}`;

   const returndate = new Date(returnn);
   const Days = returndate.getDate();
   const Months = returndate.toLocaleString("default", { month: 'short'});
   const Years = returndate.getFullYear();
   const NewDateFormats = `${Days} ${Months} ${Years}`;


    return (
     <Container >
       <Grow in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>
         <Box>
       <Card13 Text1={title} Text3={NewDateFormat}  Text2={NewDateFormats} 
       Text4={parentissue}  Text5={Acc}/>
        </Box>
      </Grow>
        </Container>
  );
}

export default List9;