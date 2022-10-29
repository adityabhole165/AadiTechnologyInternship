import { Box, Typography, styled, AccordionSummary } from '@mui/material';

export const AccordianHeader = styled(Box)(
  ({ theme }) => `
  
    cursor: pointer;
    display:flex;
    justify-content:space-between;
  `
);

export const Header1 = styled(Typography)(
  ({ theme, color }) => `
  margin-left: 5px;
  margin-top: 5px;
  align-items: center;
  font-size:14px;
  font-weight:bold;
  font-family: Roboto;
  color: ${color==='secondary'?theme.colors.gradients.accordianHeadercolor:''}
  `
);

export const Header2 = styled(Typography)(
  ({ theme }) => `
  float: right;
  margin-right: 10;
 
  `
);

export const CardDetail1 = styled(Typography)(
  ({ theme, align }) => `
  margin-top: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  font-family: Roboto
  font-size:12px;
  float:${align}
`);
export const CardDetail2 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;
  margin-right: 10px;
  font-family: Roboto;
  font-size:12px;
`;
export const CardDetail3 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;
  margin-left: 20px;
  font-family: Roboto;
  font-size:12px;
`;
export const CardDetail4 = styled(Typography)`
margin-top: 1px;
margin-left: 5px;
margin-bottom: 2px;
font-family: Roboto;
font-size:12px;
font-weight:bold;


`;

export const CardWrapper1 = styled(Typography)`
  border-top: 0.1px solid gray;
  display: flex;
  font-family: Roboto;
`;
export const CardDetail = styled(Box)`
  border-top: 0.1px solid gray;
  display: flex;
  justify-content: space-between;
  font-family: Roboto;
`;
export const CardDetailB = styled(Box)`
  border-bottom: 0.1px solid gray;
  display: flex;
  justify-content: space-between;
  font-family: Roboto;
`;
export const CardDetailH = styled(Box)`
  display: flex;
  font-family: Roboto;
`;

export const Accordionsummary = styled(AccordionSummary)`
 background-color:red;
 box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 margin-bottom: 10px;
 height:40px;
 min-height:40px;
`;
