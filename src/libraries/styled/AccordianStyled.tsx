import { Box, Typography, styled } from '@mui/material';

export const AccordianHeader = styled(Box)(
  ({ theme }) => `
  
    cursor: pointer;

      display:flex;
 justify-content:space-between;
  `
);

export const Header1 = styled(Typography)(
  ({ theme, color }) => `

  padding-left: 10px;
  align-items: center;
  font-size:16px;
  font-weight:bold;
  font-family: Roboto;
  color: ${theme.colors.gradients.HighlightedlistColor};

  `
);

export const Header2 = styled(Typography)(
  ({ theme }) => `
  float: right;
  margin-right: 10;
 
  `
);

export const CardDetail1 = styled(Typography)`
  margin-top: 8px;
  margin-left: 10px;
  margin-bottom: 4px;
  font-family: Roboto;
`;
export const CardDetail2 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;

  margin-right: 10px;
  font-family: Roboto;
`;
export const CardDetail3 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;

  margin-left: 20px;
  font-family: Roboto;
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
