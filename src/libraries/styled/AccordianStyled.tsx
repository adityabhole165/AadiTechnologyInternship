
import { Box, Typography, styled } from '@mui/material';

export const AccordianHeader = styled(Box)(
  ({ theme }) => `
  
    cursor: pointer;
      // background: ${theme.colors.gradients.pink1};
      display:flex;
 justify-content:space-between;
  `
);

export const Header1 = styled(Typography)(
  ({ theme }) => `
  padding-top: 2px;
  padding-left: 10px;
  font-size:16px;
  font-weight:bold;
  font-family: 'Roboto'
  `
);

export const Header2 = styled(Typography)(
  ({ theme }) => `
  float: right;
  margin-right: 0.5;
  font-family: 'Roboto';
  `
);

export const CardDetail1= styled(Typography)`
  margin-top:8px;
  margin-left:5px;
  margin-bottom:4px;
  font-family: 'Roboto'
  

`
export const CardDetail2= styled(Typography)`
margin-top:8px;
margin-bottom:4px;
float: right;
margin-right:10px;
font-family: 'Roboto'

`
export const CardDetail= styled(Box)`
 border-top:0.1px 
 solid gray;
 display:flex;
 justify-content:space-between;
 font-family: 'Roboto'

 
`