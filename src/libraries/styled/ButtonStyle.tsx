
import {  styled, Button } from '@mui/material';


export const ButtonPrimary = styled(Button)( ({ theme }) =>`
color: white;
font-size: 12px;

padding: 3px 1px;
background: ${theme.colors.gradients.primayButton};
border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);


// background-color:red;
 
`);

export const ButtonSecondary = styled(Button)( ({ theme }) =>`
color: white;
font-size: 12px;

padding: 3px 1px;
background: ${theme.colors.gradients.secondaryButton};
border-radius: 3px;

box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

 
`);
export const ButtonDisable = styled(Button)( ({ theme }) =>`
color:white;
font-size: 12px;
margin: 1px;
padding: 3px 1px;
background: ${theme.colors.gradients.disableButton};
border-radius: 3px;
float:right;

 
`);


