import { styled, Button } from '@mui/material';

export const ButtonPrimary = styled(Button)(
  ({ theme, color }) => `
color: white;
font-size: 12px;
font-family: 'Roboto';

background: ${color === 'primary' ? theme.colors.gradients.primayButton :
      color === 'secondary' ? theme.colors.gradients.secondaryButton :
        color === 'warning' ? theme.colors.gradients.disableButton :
          theme.colors.gradients.primayButton
    };
&:hover {
    background: ${color === 'primary' ? theme.colors.gradients.primayButton :
      color === 'secondary' ? theme.colors.gradients.secondaryButton :
        color === 'warning' ? theme.colors.gradients.disableButton :
          theme.colors.gradients.primayButton
    };
  }
border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

`
);




