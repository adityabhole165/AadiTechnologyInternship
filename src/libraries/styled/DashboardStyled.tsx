import { Badge, Box, Card, Typography, styled } from '@mui/material';
export const CardHeading = styled(Typography)`
  margin-left: 10px;
  margin-top: 3px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;
export const CardStyle = styled(Card)`
  margin-top: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 18px;
`;

export const IconCard = styled(Box)`
  box-shadow: 1px 4px 5px 2px rgba(0, 0, 0, 0.2);
  height: 80px;
  width: 150px;
  border-radius: 10px;
  text-align: center;
`;
export const IconCardSize = styled(Box)`
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
`;

export const Text1 = styled(Typography)`
margin-top: -3px;
text-align: center;
font-size: 12px;
@media (max-width: 320px)  {
  font-size: 10px;
};
@media (max-width: 280px) {
  font-size: 9px;
  margin-top: -8px;
},
text-decoration:none;
color:black;
line-height: 1rem;
`;
export const Text2 = styled(Typography)`
margin-top: -5px;
text-align: center;
font-size: 12px;
@media (max-width: 320px)  {
  font-size: 10px;
};
@media (max-width: 280px) {
  font-size: 9px;
  margin-top: -8px;
},
text-decoration:none;
color:black;
line-height: 1.3rem;
`;
export const BadgeStyle = styled(Badge)`
  margin-top: 10px;
  // margin-left: 15px;
  // margin-right: 30px;
`;
