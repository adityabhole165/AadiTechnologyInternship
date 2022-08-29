
import {  styled, Button } from '@mui/material';


export const ButtonPrimary = styled(Button)( ({ theme }) =>`
color: white;
font-size: 12px;
margin: 1px;
padding: 3px 1px;
background: ${theme.colors.gradients.primayButton};
border-radius: 3px;
float:right;


// background-color:red;
 
`);

export const ButtonSecondary = styled(Button)( ({ theme }) =>`
color: white;
font-size: 12px;
margin: 1px;
padding: 3px 1px;
background: ${theme.colors.gradients.secondaryButton};
border-radius: 3px;
float:right;

 
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

export const ButtonWrapper = styled(Button)( ({ theme }) =>`
display:flex;

margin-top:-10px;
float:right;
margin-right:-20px


 
`);
