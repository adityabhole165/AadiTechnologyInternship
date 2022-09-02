
import { Box, Typography, styled} from '@mui/material';

export const CardDetail1= styled(Typography)`
font-weight:bold;
font-size:12px;
  margin-left:5px;
  color:black;

  

`
export const CardDetail2= styled(Typography)`
font-size:12px;

color:black;

`
export const CardDetail3= styled(Typography)`
font-size:12px;
margin-left:5px;
color:black;

`
export const CardDetail= styled(Box)( ({ theme }) =>`
 display:flex;
 justify-content: space-between;
//  background: ${theme.colors.gradients.listColor};
 
`);

export const ListStyle= styled(Box)( ({ theme }) =>`

 background: ${theme.colors.gradients.listColor}; ${({GrowList}) => (GrowList ? GrowList() : null)};


 padding:6px;

 border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 
`);

// export const MotionDiv = styled(motion.div)`
//   background: ${props => props.GrowList ? 'red' : 'blue'};
//   ${({GrowList}) => (GrowList ? GrowList() : null)};
// `


// const GrowList = () => {
// bg:"red"
// }

export const BoxStyle = styled(Box)(
  ({ theme }) => `
  position: absolute;
    right: 6px;
   
    margin-top: -18px;
    transform: rotateZ(-36deg);
  
 float:right;
  `
);
