import { styled, Button } from '@mui/material';

export const ButtonPrimary = styled(Button)(
  ({ theme }) => `
color: white;
font-size: 12px;
// background: ${theme.colors.gradients.primayButton};
background: ${(props) => (props.secondary ? 'theme.colors.gradients.secondaryButton': 'theme.colors.gradients.primayButton')};


// &:hover {
//     background: ${theme.colors.gradients.primayButton};
//   }
border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);



 
`
);

export const Button1 = styled(Button)(
  ({ theme }) => `

font-size: 12px;
// background:red;

background: ${(props) => (props.color ? props.color: 'pink')};

border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);



 
`
);

export const ButtonSecondary = styled(Button)(
  ({ theme }) => `
color: white;
font-size: 12px;
// padding-left: 10px;
// padding-right: 10px;
// padding-top: 2px;
// padding-bottom: 2px;
background: ${theme.colors.gradients.secondaryButton};
&:hover {
    background: ${theme.colors.gradients.secondaryButton};
  }
border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

 
`
);
export const ButtonDisable = styled(Button)(
  ({ theme }) => `
color:white;
font-size: 12px;
margin: 1px;
padding: 3px 1px;
background: ${theme.colors.gradients.disableButton};
&:hover {
    background: ${theme.colors.gradients.disableButton};
  }
border-radius: 3px;
float:right;

 
`
);
