import { Box, Typography, styled} from '@mui/material';

export const HeadingStyle= styled(Typography)( ({ theme }) =>`

font-weight: 500;
font-size: 25px;
color: black;
margin: auto;
text-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
font-family: roboto;
@media (min-width: 280px) and (max-width: 320px)  {
  font-size: 18px;
};
`);