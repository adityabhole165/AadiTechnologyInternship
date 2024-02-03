import { Box, styled } from '@mui/material';

export const NoteStyle = styled(Box)(
  ({ theme }) => `

 background: ${theme.colors.gradients.HighlightedlistColor};
 padding:6px;
margin-top:5px;
 border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
   font-family: 'Roboto';
   fon-size:12px;
`
);
