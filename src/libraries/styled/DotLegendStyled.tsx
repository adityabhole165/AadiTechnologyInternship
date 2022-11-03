import { Box, styled } from "@mui/material";

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
        
        background: ${color === 'primary' ? theme.colors.gradients.listColor :
            color === 'secondary' ? theme.colors.gradients.HighlightedlistColor :
            color === 'warning' ? theme.colors.gradients.selectedlistColor :
            color === 'info' ? theme.colors.gradients.pageBackground :
            color === 'success' ? theme.colors.gradients.purple3 :
                    theme.colors.gradients.primayButton
        }
    `
);
export const DotLegendStyled1= styled(Box)(
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

