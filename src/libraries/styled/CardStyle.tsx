import { Box, Typography, styled } from '@mui/material';

export const CardDetail1 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  margin-left: 5px;
  color: black;
  font-family: Roboto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardDetail2 = styled(Typography)`
  font-size: 12px;
   color: black;
  font-family: Roboto;
  cursor: pointer;
  margin-left: 5px;
 
`;
export const CardDetail3 = styled(Typography)`
  font-size: 12px;
  margin-left: 5px;
  font-family: Roboto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardDetail5 = styled(Typography)`
  font-size: 12px;
  margin-right: -50px;
  font-family: Roboto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardDetail4 = styled(Typography)`
  font-size: 12px;
  margin-left: 5px;
  margin-top: 5px;
  font-family: Roboto;
`;
export const CardDetail6 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  margin-left: 5px;
  color: black;
  font-family: Roboto;
 
`;

export const CardDetail = styled(Box)(
  ({ theme }) => `
 display:flex;
justify-content: space-between;
font-size: 12px;
color: black;
font-family: Roboto


`
);

export const CardWrapper = styled(Box)(
  ({ theme }) => `
 display:flex;
 margin-top:5px;
 `
);
export const BoxWrapper = styled(Box)(
  ({ theme }) => `
margin:10px;
 `
);

export const ListStyle = styled(Box)(
  ({ theme, color }) => `

//  background: ${theme.colors.gradients.listColor}; 
 background: ${
   color === 'primary'
     ? theme.colors.gradients.listColor
     : color === 'secondary'
     ? theme.colors.gradients.HighlightedlistColor
     : color === 'warning'
     ? theme.colors.gradients.selectedlistColor
     : color === 'info'
     ? theme.colors.gradients.pageBackground
     : theme.colors.gradients.listColor
 };
    position:relative;
 padding:8px;
border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 `
);

export const BoxStyle = styled(Box)(
  ({ theme }) => `
  position:absolute;
    right: -6px;
   margin-top: -18px;
    transform: rotateZ(-36deg);
  `
);
