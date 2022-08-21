
import { Grid, Typography, styled } from '@mui/material';

export const AccordianHeader = styled(Grid)(
  ({ theme }) => `
  padding: 8px;
    cursor: pointer;
      background: ${theme.colors.gradients.pink1};
  `
);

export const Header1 = styled(Typography)(
  ({ theme }) => `
  padding-top: 2px;
  padding-left: 10px;
  font-size:16px;
  font-weight:bold
  `
);

export const Header2 = styled(Typography)(
  ({ theme }) => `
  float: right;
  margin-right: 0.5;
  `
);

export const CardDetail1= styled(Typography)`
  margin-top:8px;
  margin-left:5px;
  margin-bottom:4px;
  

`
export const CardDetail2= styled(Typography)`
margin-top:8px;
margin-bottom:4px;
float: right;
margin-right:10px;

`
export const CardDetail= styled(Grid)`
 border-top:0.1px 
 solid gray;
 display:flex;
 justify-content:space-between;

 
`