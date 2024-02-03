import { Box, Button, FormControlLabel, Paper, styled } from '@mui/material';

export const ButtonPrimary = styled(Button)(
  ({ theme, color }) => `
color: white;
font-size: 12px;
font-family: 'Roboto';
text-decoration: none;
height:30px;
@media (max-width: 230px) {
  font-size: 10px;
};



background: ${
    color === 'primary'
      ? theme.colors.gradients.primayButton
      : color === 'secondary'
      ? theme.colors.gradients.secondaryButton
      : color === 'warning'
      ? theme.colors.gradients.disableButton
      : color === 'error'
      ? '#DC143C'
      : theme.colors.gradients.primayButton
  };
&:hover {
    background: ${
      color === 'primary'
        ? theme.colors.gradients.primayButton
        : color === 'secondary'
        ? theme.colors.gradients.secondaryButton
        : color === 'warning'
        ? theme.colors.gradients.disableButton
        : color === 'error'
        ? '#DC143C'
        : theme.colors.gradients.primayButton
    };
  }
border-radius: 3px;


box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

`
);

export const ButtonPrimaryLab = styled(Button)(
  ({ theme, color }) => `
color: white;
font-size: 12px;
font-family: 'Roboto';
text-decoration: none;
height:30px;
@media (max-width: 230px) {
  font-size: 10px;
};

@media (min-width: 900px) {
  height:88px;
};


background: ${
    color === 'primary'
      ? theme.colors.gradients.primayButton
      : color === 'secondary'
      ? theme.colors.gradients.secondaryButton
      : color === 'warning'
      ? theme.colors.gradients.disableButton
      : color === 'error'
      ? '#DC143C'
      : theme.colors.gradients.primayButton
  };
&:hover {
    background: ${
      color === 'primary'
        ? theme.colors.gradients.primayButton
        : color === 'secondary'
        ? theme.colors.gradients.secondaryButton
        : color === 'warning'
        ? theme.colors.gradients.disableButton
        : color === 'error'
        ? '#DC143C'
        : theme.colors.gradients.primayButton
    };
  }
border-radius: 3px;


box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

`
);

export const Buttontab = styled(Box)(
  ({ theme, color }) => `

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
 text-align:center;
  font-size: 10px;
  color:black;
  @media (max-width: 280px) {
    font-size: 9px;
  };
 padding:4px;
border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
};
`
);

export const Item = styled(Paper)(
  ({ theme, color }) => `
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
  
  padding: 8px;
  text-align: center;
  color: black;
  border-radius: 4px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  height:40px;
 
`
);
export const FormControlLabel1 = styled(FormControlLabel)(
  ({ theme, color }) => `
font-size:10px;
 
`
);
