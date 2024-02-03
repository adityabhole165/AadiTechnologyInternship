import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Card, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ChechBoX from './CheckBoX';
const CardNotice = ({ item, downloadNotice, clickSingle }) => {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const handleCheckboxChange = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <>
      <Grid container xs={12}>
        <Grid xs={10.8}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5, mt: 0.7 }}>
            <Typography>{item.header}</Typography>
            <div style={{ flex: '1' }}></div>
            <FileDownloadOutlinedIcon
              onClick={() => {
                downloadNotice(item.FileName, item.IsImageNotice);
              }}
            />
          </Card>
        </Grid>
        <Grid xs={1} sx={{ mt: '10px', ml: '5px' }}>
          <ChechBoX
            name={''}
            value={item.id}
            checked={item.isActive}
            onChange={clickSingle}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardNotice;
