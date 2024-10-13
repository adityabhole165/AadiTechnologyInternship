import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import ChechBoX from './CheckBoX';

const CardNotice = ({ itemList, downloadNotice, clickSingle }) => {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const handleCheckboxChange = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <>
      {/* <Grid container>
      
        <Grid xs={12}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
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
      </Grid> */}

      <Box sx={{ backgroundColor: 'white', mb: 2 }}>
        <TableContainer component={Box} >
          <Table aria-label="simple table" sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.secondary.main, py: 1 }}>
                <TableCell sx={{ color: 'white', width: '480px' }}>
                  Checkbox
                </TableCell>
                <TableCell sx={{ color: 'white', }} >
                  Notice Name
                </TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center', py: 1 }}>
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map((item, index) => {
                return (
                  <>
                    <TableRow
                    // onClick={() => { clickCard(item.linkPath) }}
                    >
                      <TableCell sx={{ textTransform: 'capitalize', py: 0.5, pl: 3.5 }}>
                        <ChechBoX
                          name={''}
                          value={item.id}
                          checked={item.isActive}
                          onChange={clickSingle}
                        />
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize', py: 0.5, }}>
                        {item.header}
                      </TableCell>
                      {/* <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', minWidth:'120px'}}>
                      <IconButton>
                      <FileDownloadOutlinedIcon onClick={() => { downloadNotice(item.FileName, item.IsImageNotice) }} />
                      </IconButton></TableCell> */}
                      <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', minWidth: '170px' }}>
                        {item.FileName ? (
                          <IconButton onClick={() => downloadNotice(item.FileName, item.IsImageNotice)}>
                            <FileDownloadOutlinedIcon />
                          </IconButton>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </>
  );
};

export default CardNotice;
