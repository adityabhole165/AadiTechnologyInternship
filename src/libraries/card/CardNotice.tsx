import { Typography, Card, Box ,Button, IconButton} from '@mui/material';
import { useEffect, useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
const CardNotice = ({item,downloadNotice}) => {

    const [isCardVisible, setIsCardVisible] = useState(true);
    const handleCheckboxChange = () => {
        setIsCardVisible(!isCardVisible);
      };

  return (
    <>
 
    <Box  sx={{   display: 'flex', justifyContent:"space-between"}} >
 
      <Card sx={{   width: '1000px'  , display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}>
        <Typography>{item.header}</Typography>
        <div style={{ flex: '1' }}></div>
         <FileDownloadOutlinedIcon onClick={()=>{downloadNotice(item.FileName,item.IsImageNotice)}} />
     </Card>
    </Box>
    </>
  );
};

export default CardNotice;
