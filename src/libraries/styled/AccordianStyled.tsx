import { AccordionSummary, Box, Typography, styled } from '@mui/material';

export const AccordianHeader = styled(Box)(
  ({ theme, color }) => `
  
    cursor: pointer;
    display:flex;
    justify-content:space-between;
    background-color: ${
      color === 'primary'
        ? theme.colors.gradients.listColor
        : color === 'secondary'
        ? theme.colors.gradients.HighlightedlistColor
        : color === 'warning'
        ? theme.colors.gradients.selectedlistColor
        : color === 'info'
        ? theme.colors.gradients.pageBackground
        : color === 'red'
        ? theme.colors.gradients.red
        : theme.colors.gradients.listColor
    };
  `
);

export const Header1 = styled(Typography)(
  ({ theme, color }) => `
  margin-left: 7px;
  margin-top: 5px;
  align-items: center;
  font-size:12px;
  font-weight:bold;
  
  color: ${
    color === 'secondary' ? theme.colors.gradients.accordianHeadercolor : ''
  }
  `
);

export const HeaderAcc = styled(Typography)(
  ({ theme, color }) => `
  margin-left: 5px;
  margin-top: 5px;
  align-items: center;
  font-size:14px;

  
  color: ${
    color === 'secondary' ? theme.colors.gradients.accordianHeadercolor : ''
  }
  `
);

export const Header3 = styled(Typography)(
  ({ theme, color }) => `
  margin-left: 5px;
  margin-top: 5px;
   margin-bottom: 5px;
  align-items: center;
  
  color: ${
    color === 'secondary' ? theme.colors.gradients.accordianHeadercolor : ''
  }
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
  margin-left: 6px;
  margin-bottom: 2px;
  
  font-size:12px;
  float:${align};
`
);
export const CardDetail2 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;
  margin-right: 10px;

  font-size: 12px;
`;
export const CardDetail3 = styled(Typography)`
  margin-top: 8px;
  margin-bottom: 4px;
  margin-left: 20px;

  font-size: 12px;
`;
export const CardDetail4 = styled(Typography)`
  margin-top: 1px;
  margin-left: 5px;
  margin-bottom: 2px;

  font-size: 12px;
  font-weight: bold;
`;

export const CardWrapper1 = styled(Typography)`
  border-top: 0.1px solid gray;
  display: flex;
`;
export const CardDetail = styled(Box)`
  border-top: 0.1px solid gray;
  display: flex;
  justify-content: space-between;
`;

export const CardDetaiAtt = styled(Box)`
  border-bottom: 0.1px solid gray;
  display: flex;
`;
export const CardDetailB = styled(Box)`
  border-bottom: 0.1px solid gray;
  display: flex;
  justify-content: space-between;
`;
export const CardDetailH = styled(Box)`
  display: flex;
`;

export const Accordionsummary = styled(AccordionSummary)`
  background-color: red;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  height: 50px;
  min-height: 40px;
  font-size: 14px;
  @media (max-width: 280px) {
    font-size: 12px;
  } ;
`;

export const Accordionsummary1 = styled(AccordionSummary)`
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  //  height:60px;
  font-size: 14px;
  @media (max-width: 280px) {
    font-size: 12px;
  } ;
`;
export const CardDetailTopper = styled(Typography)`
  margin-top: 4px;
  margin-left: 30px;
  margin-bottom: 5px;
`;
export const CardDetailTopper1 = styled(Typography)`
  margin-top: 4px;
  margin-left: 10px;
  margin-bottom: 4px;
`;
