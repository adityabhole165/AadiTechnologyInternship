import { Box, styled } from '@mui/material';

export const DotLegendStyled = styled(Box)(
  ({ theme, color }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        @media (min-width: 280px) and (max-width: 320px)  {
          width: ${theme.spacing(1)};
          height: ${theme.spacing(1)};
        };
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
        border: 1px #303030   solid;
        
        background: ${
          color === 'primary'
            ? theme.colors.gradients.listColor
            : color === 'secondary'
            ? theme.colors.gradients.HighlightedlistColor
            : color === 'warning'
            ? theme.colors.gradients.selectedlistColor
            : color === 'info'
            ? theme.colors.gradients.pageBackground
            : color === 'success'
            ? theme.colors.gradients.purple1
            : color === 'error'
            ? theme.colors.gradients.orange3
            : theme.colors.gradients.primayButton
        }
    `
);
export const DotLegendStyledTeacher = styled(Box)(
  ({ theme, color }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        @media (min-width: 280px) and (max-width: 320px)  {
          width: ${theme.spacing(1)};
          height: ${theme.spacing(1)};
        };
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
        border: 1px #303030   solid;
    
    `
);

export const AttandaceCalender = styled(Box)(
  ({ theme, color }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        @media (min-width: 280px) and (max-width: 320px)  {
          width: ${theme.spacing(1)};
          height: ${theme.spacing(1)};
        };
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
        border: 1px #303030   solid;
        
        background: ${
          color === 'primary'
            ? 'Green'
            : color === 'info'
            ? '#9e9e9e'
            : color === 'Holiday'
            ? '#ef5350'
            : color === 'Warning'
            ? 'red'
            : color === 'Suceess'
            ? '#f06292'
            : '#f06292'
        }
    `
);

export const DotAnnualPlanerLegend = styled(Box)(
  ({ theme, color }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        @media (min-width: 280px) and (max-width: 320px)  {
          width: ${theme.spacing(1)};
          height: ${theme.spacing(1)};
        };
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
        border: 1px #303030   solid;
        
        background: ${
          color === 'primary'
            ? 'Green'
            : color === 'Holiday'
            ? 'red'
            : color === 'Exam'
            ? '#4caf50'
            : color === 'Events'
            ? '#01579b'
            : color === 'info'
            ? '#f06292'
            : '#f06292'
        }
    `
);

export const DotLegendStyled1 = styled(Box)(
  ({ theme, color }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        @media (min-width: 280px) and (max-width: 320px)  {
          width: ${theme.spacing(1)};
          height: ${theme.spacing(1)};
        };
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
        border: 1px #303030   solid;
        
      
    `
);

export const DotLegend1 = styled(Box)`
  display: flex;
  margin-bottom: 4.5px;
`;
