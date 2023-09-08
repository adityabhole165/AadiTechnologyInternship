import { Typography, Card, Box ,Button, IconButton} from '@mui/material';
import { useEffect, useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
const CardNotice = ({ text1, text2,downloadNotice,id}) => {

    const [isCardVisible, setIsCardVisible] = useState(true);
    const handleCheckboxChange = () => {
        setIsCardVisible(!isCardVisible);
      };

  return (
    <>
 
    <Box  sx={{   display: 'flex', justifyContent:"space-between"}} >
    {isCardVisible && 
      <Card sx={{   width: '1000px', height: '60px'  , display: 'flex', alignItems: 'center', p: 1.5, mt: 0.7 }}>
        <Typography>{text1}</Typography>
        <div style={{ flex: '1' }}></div>
         <FileDownloadOutlinedIcon onClick={()=>{downloadNotice(id
          )}} />
     </Card>}
      {isCardVisible &&
      <DoNotDisturbOnIcon onClick={handleCheckboxChange} sx={{mt:"15px" , mr:"18px", color:"red",fontSize:"38px"}}/>
      }
    </Box>
    </>
  );
};

export default CardNotice;
