import { Box, Typography, styled } from '@mui/material';

export const ProfileDetail1 = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 10px;
`;
export const ProfileDetailHeader = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  margin-left: 10px;

  margin-bottom: 10px;
`;
export const ProfileDetail2 = styled(Typography)`
  margin-bottom: 10px;
  margin-top: -7px;
  font-size: 12px;
`;
export const ProfileDetail3 = styled(Typography)`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 7px;
`;
export const ProfileDetail4 = styled(Typography)`
  margin-top: 10px;
  margin-left: 3px;
  font-size: 12px;
`;
export const ProfileWrapper = styled(Typography)`
  display: flex;
`;

export const ListStyle = styled(Box)(
  ({ theme, color }) => `
    position:relative;
    padding:8px;
    border-radius: 6px;

    margin-bottom: 8px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
 
 `
);
