import {
  Box,
  Card,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  styled
} from '@mui/material';

export const CardDetail1 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  // margin-left: 5px;
  color: black;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardDetail2 = styled(Typography)`
  font-size: 12px;
  color: black;

  cursor: pointer;
`;

export const NewCard = styled(Typography)`
  font-size: 12px;

  margin-left: -20px;
`;
export const DateWidth = styled(Typography)`
  font-size: 12px;
  color: black;

  cursor: pointer;
  margin-right: -5px;
  width: 75px;
`;
export const DateWidth1 = styled(Typography)`
  font-size: 12px;
  color: black;

  cursor: pointer;
  margin-right: -5px;
  width: 40px;
`;
export const HelperText = styled(FormHelperText)`
  font-weight: normal;
  margin-left: 2px;
  color: rgba(34, 51, 84, 0.7);
  font-size: 11px;
`;
export const CardDetail7 = styled(Typography)`
  font-size: 12px;
  color: black;

  margin-left: -5px;
  margin-top: -3px;

  @media (max-width: 320px) {
    font-size: 11px;
  }

  @media (max-width: 280px) {
    font-size: 10px;
  } ;
`;
export const CardDetailB = styled(Typography)`
  font-size: 12px;
  color: black;

  margin-left: 5px;
  margin-top: -3px;

  @media (max-width: 320px) {
    font-size: 11px;
  }

  @media (max-width: 280px) {
    font-size: 10px;
  } ;
`;
export const CardDetail8 = styled(Typography)`
  font-size: 12px;
  color: black;

  @media (max-width: 320px) {
    font-size: 11px;
  }

  @media (max-width: 280px) {
    font-size: 10px;
  } ;
`;

export const Wordbreak = styled(Typography)`
  font-size: 12px;
  color: black;

  @media (max-width: 320px) {
    width: 250px;
    word-wrap: break-word;
  }
  @media (max-width: 280px) {
    width: 200px;
    word-wrap: break-word;
  }
  @media (min-width: 322px) and (max-width: 360px) {
    width: 270px;
    word-wrap: break-word;
  }
  @media (min-width: 362px) and (max-width: 416px) {
    width: 300px;
    word-wrap: break-word;
  } ;
`;

export const Wordbreak1 = styled(Typography)`
  font-size: 12px;
  color: black;

  padding: 10px;
  overflow: scroll;

  @media (max-width: 320px) {
    width: 250px;
    word-wrap: break-word;
    padding: 10px;
  }

  @media (max-width: 280px) {
    width: 200px;
    word-wrap: break-word;
    padding: 10px;
  }
  @media (min-width: 322px) and (max-width: 360px) {
    width: 270px;
    word-wrap: break-word;
    padding: 10px;
  }
  @media (min-width: 362px) and (max-width: 416px) {
    width: 300px;
    word-wrap: break-word;
    padding: 10px;
  } ;
`;
export const BoxContent = styled(Box)`
  height: 150px;
  overflow: scroll;
  border: 1px solid gray;
  margin-bottom: 10px;
`;
export const CardDetail3 = styled(Typography)`
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const BoxDetail1 = styled(Typography)`
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const BoxDetail2 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  width: 200px;
  color: black;

  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

export const CardD = styled(Typography)`
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  word-wrap: break-word;
`;
export const CardDetail5 = styled(Typography)`
  font-size: 12px;
  margin-right: -50px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardDetail4 = styled(Typography)`
  font-size: 12px;
  margin-left: 5px;
  margin-top: 5px;
`;
export const CardDetailA = styled(Typography)`
  font-size: 12px;
  margin-left: 10px;
  margin-top: 6px;
`;
export const CardDetailR = styled(Typography)`
  font-size: 12px;
  margin-left: 16px;
  margin-top: 6px;
`;

export const CardDetail6 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  margin-left: 5px;
  color: black;
`;

export const CardDetail9 = styled(Typography)`
  font-size: 12px;
  // margin-left: 5px;
`;

export const CardDetail = styled(Box)(
  ({ theme }) => `
 display:flex;
justify-content: space-between;
font-size: 12px;
color: black;
font-family: Roboto


`
);

export const CardWrapper = styled(Box)(
  ({ theme }) => `
 display:flex;
 margin-top:5px;
 `
);
export const BoxWrapper = styled(Box)(
  ({ theme }) => `
margin:10px;
 `
);

export const ListStyle = styled(Box)(
  ({ theme, color }) => `

//  background: ${theme.colors.gradients.listColor}; 
 background: ${
   color === 'primary'
     ? theme.colors.gradients.listColor
     : color === 'secondary'
     ? theme.colors.gradients.HighlightedlistColor
     : color === 'warning'
     ? theme.colors.gradients.selectedlistColor
     : color === 'info'
     ? theme.colors.gradients.purple1
     : color === 'success'
     ? theme.colors.gradients.orange3
     : color === 'error'
     ? theme.colors.gradients.pageBackground
     : color === 'red'
     ? theme.colors.gradients.red
     : color === 'green2'
     ? theme.colors.gradients.green2
     : color === 'green1'
     ? theme.colors.gradients.green1
     : color === 'pink2'
     ? theme.colors.gradients.pink2
     : theme.colors.gradients.listColor
 };
    position:relative;
 padding:8px;
border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 `
);

export const ListStyleA = styled(Box)(
  ({ theme, color }) => `

//  background: ${theme.colors.gradients.listColor}; 
 background: ${
   color === 'primary'
     ? theme.colors.gradients.listColor
     : color === 'secondary'
     ? theme.colors.gradients.HighlightedlistColor
     : color === 'warning'
     ? theme.colors.gradients.selectedlistColor
     : color === 'info'
     ? theme.colors.gradients.pageBackground
     : color === 'red'
     ? theme.colors.gradients.red
     : theme.colors.gradients.listColor
 };
    position:relative;
 padding:15px;
border-radius: 6px;
   margin-bottom: 8px;
   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 `
);
export const NewStyle = styled(Box)(
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
  position:relative;
  padding:1px;
  border-radius: 6px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 `
);
export const ListStyle1 = styled(Box)(
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
  position:relative;
  padding:10px;
   
 `
);

export const TabStyle = styled(Box)(
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
  position:relative;
  padding:1px;
  border-radius: 6px;
  box-shadow: 1px 4px 5px 2px rgba(0, 0, 0, 0.3);
 `
);

export const BoxStyle = styled(Box)(
  ({ theme }) => `
  position:absolute;
    right: -6px;
   margin-top: -18px;
    transform: rotateZ(-36deg);
  `
);

export const AttachmentIcon1 = styled(Box)(
  ({ theme }) => `
 margin-top:-10px;
  `
);
export const UsernameStyle = styled(InputLabel)(
  ({ theme }) => `
  color: #362b32cf;
  font-size: 16px;
  font-weight: bold;
  `
);
export const InputStyle = styled(Input)(
  ({ theme }) => `
  margin-top: 20px;
  font-size: 15px;
  `
);
export const CardDetail10 = styled(Typography)(
  ({ theme }) => `
  color: blue; 
  font-size: 15px;
  padding-top: 3 ;
  `
);

export const CardDetail11 = styled(Typography)(
  ({ theme }) => `
  color: blue; 
  font-size: 15px;
  float: right; 
  marginTop: 14px;
  `
);

export const BorderBox = styled(Box)(
  ({ theme }) => `
  border:2px solid gray;
  padding:4px;
  border-radius:6px;
 
  `
);

export const BorderBox1 = styled(Box)(
  ({ theme }) => `
  border:2px solid gray;
 margin-bottom:10px;

  border-radius:6px;
 
  `
);
export const BoxDetail = styled(Box)(
  ({ theme }) => `
  margin-left:10px;
  margin-top:5px;
  margin-bottom:7px;
 
  `
);
export const CardStyle1 = styled(Card)(
  ({ theme }) => `
  margin-bottom: 10px; 
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 
  `
);
export const ItemSize = styled(Box)(
  ({ theme }) => `
  font-size: 12px;
  color: black;
 
 cursor: pointer;
 margin-left:5px;

 @media (max-width: 280px) {
  font-size: 10px;
 
};
  `
);
export const Detail1 = styled(Typography)(
  ({ theme }) => `
  color: blue;
  font-weight: bold ;  `
);
export const RootWrapper = styled(Box)(
  ({ theme }) => `
  @media (min-width: 600px) {
    margin-top:-20px;
   
  };

  `
);
export const Cardbday = styled(Card)`
  background-image: url(${`/imges/school1.jpg`});
  flex: 1;
  width: 100%;
  background-size: cover;
  margin-bottom: 10px;
`;
