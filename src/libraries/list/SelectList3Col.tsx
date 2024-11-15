import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckboxImg from '../card/CheckboxImg';
import ListCard4ColSel from '../card/ListCard4ColSel';
const SelectList3Col = ({
  Itemlist, refreshData, ActiveTab, DeleteDraft,
  clickSortExp, clickSortDirection, SortExp, SortDirection
}) => {
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
  };
  const [Datecolumn, setDatecolumn] = useState('')
  useEffect(() => {
    if (ActiveTab === 'Inbox' || ActiveTab === 'Trash') {
      setDatecolumn('Received Date')
    } else if (ActiveTab === 'Sent') {
      setDatecolumn('Sent Date')
    } else if (ActiveTab === 'Draft') {
      setDatecolumn('Draft Date')
    }
  }, [ActiveTab])
  const showcolumn = (columnName) => {
    if (columnName === 'Subject') {
      return true;
    }
    else if (columnName === 'Cc') {
      if (ActiveTab === 'Sent') {
        return true;
      }
    } else if (columnName === 'Cc1') {
      if (ActiveTab === 'Trash') {
        return true;
      }
    }
    else if (columnName === 'Attachment' && ActiveTab === 'Inbox') {
      return true;
    } else if (columnName === 'Date') {
      return true;
    } else if (columnName === 'From') {
      if (ActiveTab === 'Inbox') {
        return true;
      }
    } else if (columnName === 'From1') {
      if (ActiveTab === 'Trash') {
        return true
      }
    } else if (columnName === 'To') {
      if (ActiveTab === 'Sent') {
        return true
      }
    } else if (columnName === 'Read Receipt Information') {
      if (ActiveTab === 'Sent') {
        return true
      }
    } else if (columnName === 'Message Body') {
      if (ActiveTab === 'Draft') {
        return true;
      }
    } else if (columnName === 'Delete') {
      if (ActiveTab === 'Draft') {
        return true;
      }
    } else if (columnName === 'Received Date') {
      if (ActiveTab === 'Inbox') {
        return true;
      }
    } else if (columnName === 'Received Date1') {
      if (ActiveTab === 'Trash') {
        return true;
      }
    } else if (columnName === 'Draft Date') {
      if (ActiveTab === 'Draft') {
        return true;
      }
    } else if (columnName === 'Sent Date') {
      if (ActiveTab === 'Sent') {
        return true;
      }
    }
    return false;
  }
  const clickHeader = (columnName) => {
    clickSortDirection(SortDirection == 'ASC' ? 'DESC' : 'ASC')
    clickSortExp(columnName)

  }
  const onCheckAll = (value) => {
    Itemlist = Itemlist.map(item => ({ ...item, isActive: value }));
    refreshData(Itemlist);
  }
  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* <Box sx={{
        display: 'flex', borderRadius: '7px', mb: 1, p: 1.5, background: (theme) => theme.palette.secondary.main,
        border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden',
      }}>
        {ActiveTab !== 'Draft' && (
          <Box ml={0.5}>
            <CheckboxImg
              name={"All"}
              value={"All"}
              checked={Itemlist.every(item => item.isActive === true)}
              onChange={(value) => { onCheckAll(value.checked) }}
            /></Box>)}
        {showcolumn('Delete') && <Box sx={{ color: 'white', ml: 0, pt: 0.5 }}>Delete</Box>}
        {showcolumn('Subject') && <Box onClick={() => { clickHeader('Subject') }} sx={{ color: 'white', ml: 5, display: 'flex', pt: 0.5 }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Subject
          </Typography>
          {SortExp === 'Subject' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('To') && <Box sx={{ color: 'white', ml: 31, pt: 0.5 }}>To</Box>}
        {showcolumn('Cc') && <Box sx={{ color: 'white', ml: 22, pt: 0.5 }}>Cc</Box>}
        {showcolumn('Read Receipt Information') && <Box sx={{ color: 'white', ml: 16, pt: 0.5 }}>Read Receipt Information</Box>}
        {showcolumn('Message Body') && <Box sx={{ color: 'white', ml: 34 }}>  Message Body</Box>}
        {showcolumn('From') && <Box sx={{ color: 'white', ml: 40, pt: 0.5 }}>From</Box>}
        {showcolumn('From1') && <Box sx={{ color: 'white', ml: 40, pt: 0.5 }}>From</Box>}
        {showcolumn('Cc1') && <Box sx={{ color: 'white', ml: 24, pt: 0.5 }}>Cc</Box>}
        {showcolumn('Attachment') && <Box sx={{ color: 'white', ml: 30, pt: 0.5 }}>Attachment</Box>}
        {showcolumn('Received Date1') && <Box sx={{ color: 'white', ml: 28, display: 'flex', pt: 0.5 }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Received Date
          </Typography>
         
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white', }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Received Date') && <Box sx={{ color: 'white', ml: 18, display: 'flex', pt: 0.5 }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Received Date
          </Typography>
          
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white', }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Sent Date') && <Box sx={{ color: 'white', ml: 8, display: 'flex', pt: 0.5 }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Sent Date
          </Typography>
         
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Draft Date') && <Box sx={{ color: 'white', ml: 61, display: 'flex', pt: 0.5 }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Draft Date
          </Typography>
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white', }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}

      </Box> */}
      <Box sx={{
        display: 'flex',
        borderRadius: '7px',
        mb: 1,
        p: 1.5,
        background: (theme) => theme.palette.secondary.main,
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        overflow: 'hidden',
      }}>
        <Grid container alignItems="center" spacing={2}>
          {ActiveTab !== 'Draft' && (
            <Grid item xs={12} sm={1} md={0.5} lg={0.5} xl={0.5} sx={{ textAlign: 'center', ml:0.5 }}>
              <CheckboxImg
                name={"All"}
                value={"All"}
                checked={Itemlist.every(item => item.isActive === true)}
                onChange={(value) => { onCheckAll(value.checked) }}
              />
            </Grid>
          )}

          {showcolumn('Delete') && (
            <Grid item xs={12} sm={1} md={0.5} lg={0.5} xl={0.5} sx={{ color: 'white', textAlign: 'center' }}>
              Delete
            </Grid>
          )}

          {showcolumn('Subject') && (
            <Grid item xs={12} sm={1} md={2} lg={2.6} xl={2} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Subject') }}>
              <Typography variant="body1" sx={{ color: 'white', ml:2 }}>
                Subject
              </Typography>
              {SortExp === 'Subject' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}

          {showcolumn('To') && (
            <Grid item xs={12} sm={3.5} md={3.5} lg={2.6} xl={1} sx={{ color: 'white', textAlign: 'center',  ml:-2}}>
              To
            </Grid>
          )}

          {showcolumn('Cc') && (
            <Grid item xs={12} sm={0.5} md={0.5} lg={1.2} xl={0.5} sx={{ color: 'white', textAlign: 'left',ml:4 }}>
              Cc
            </Grid>
          )}


          {showcolumn('Read Receipt Information') && (
            <Grid item xs={12} sm={2} md={2} lg={2.8} xl={3} sx={{  color: 'white', textAlign: 'center' , justifyContent: 'center', whiteSpace: 'wrap',}}>
              Read Receipt Information
            </Grid>
          )}

          {showcolumn('Message Body') && (
            <Grid item xs={12} sm={5} md={5} lg={5} xl={6} sx={{ml:12,  color: 'white', textAlign: 'left' }}>
              Message Body
            </Grid>
          )}

          {showcolumn('From') && (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{ml:11,  color: 'white', textAlign: 'left' }}>
              From
            </Grid>
          )}
          {showcolumn('From1') && (
            <Grid item xs={12} sm={2} md={2} lg={2.7} xl={3.5} sx={{ml:11,  color: 'white', textAlign: 'left' }}>
              From
            </Grid>
          )}
          {showcolumn('Cc1') && (
            <Grid item xs={12} sm={2} md={2} lg={2} xl={1} sx={{color: 'white', textAlign: 'left',ml:-3 }}>
              Cc
            </Grid>
          )}

          {showcolumn('Attachment') && (
            <Grid item xs={12} sm={2} md={2} lg={1.7} xl={1.5} sx={{  color: 'white', textAlign: 'center' }}>
              Attachment
            </Grid>
          )}

          {showcolumn('Received Date') && (
            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{  ml: { xs: 1, sm: 3, md: 7 }, display: 'flex', justifyContent: 'left', alignItems: 'left', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white' }}>
                Received Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}
          {showcolumn('Received Date1') && (
            <Grid item xs={12} sm={1.5} md={1.5} lg={1.5} xl={1} sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer',ml:4}} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white' }}>
                Received Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}

          {showcolumn('Sent Date') && (
            <Grid item xs={12} sm={1.2} md={1.2} lg={1.2} xl={1.2} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{  color: 'white', ml:-3}}>
                Sent Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}

          {showcolumn('Draft Date') && (
            <Grid item xs={12} sm={2.5} md={2.5} lg={2} xl={1} sx={{  display: 'flex', justifyContent: 'left', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white', }}>
                Draft Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}
        </Grid>
      </Box>



       {/* <Table sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden'
        }}>
    <TableHead>
      <TableRow sx={{ color: theme => theme.palette.common.white, background: theme => theme.palette.secondary.main, }}>
        {ActiveTab !== 'Draft' && (
          <TableCell align="left" sx={{width:'70px'}}>
            <CheckboxImg
              name={"All"}
              value={"All"}
              checked={Itemlist.every((item) => item.isActive === true)}
              onChange={(value) => {
                onCheckAll(value.checked);
              }}
            />
          </TableCell>
        )}
        {showcolumn('Delete') && (
          <TableCell align="left" sx={{ color: 'white', width:'70px' }}>
            Delete
          </TableCell>
        )}
        {showcolumn('Subject') && (
          <TableCell align="left"
            sx={{ color: 'white', cursor: 'pointer', Width:'180px'  }}
            onClick={() => clickHeader('Subject')}
          >    
          <Typography variant="body1" sx={{ display: 'inline', color: 'white'}}>
              Subject</Typography>
            {SortExp === 'Subject' && (
              SortDirection === 'ASC' ? (
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} />
              ) : (
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              )
            )}
          </TableCell>
        )}
        {showcolumn('To') && (
          <TableCell sx={{ color: 'white', textAlign:'right',  width:'210px' }}>To</TableCell>
        )}
       
        {showcolumn('Cc') && (
          <TableCell sx={{ color: 'white', textAlign:'right',  width:'190px'  }}>Cc</TableCell>
        )}
       
        {showcolumn('Read Receipt Information') && (
          <TableCell align="center" sx={{ color: 'white',position:'fixed',  textAlign:'center',  }}>
            Read Receipt Information
          </TableCell>
        )}
        {showcolumn('Message Body') && (
          <TableCell sx={{ color: 'white', textAlign:'left',maxWidth:'145px' }}> <span style={{ paddingLeft:'30px'}}>Message Body</span></TableCell>
        )}
        {showcolumn('From') && (
          <TableCell sx={{ color: 'white', textAlign:'center', width:'200px' }}>From</TableCell>
        )}
         {showcolumn('From1') && (
          <TableCell sx={{ color: 'white',  textAlign:'left', width:'180px'  }}>From</TableCell>
        )}
          {showcolumn('Cc1') && (
          <TableCell sx={{ color: 'white' , textAlign:'center', width:'180px' }}><span style={{marginLeft:"70px"}}>Cc</span></TableCell>
        )}
        {showcolumn('Attachment') && (
          <TableCell align="right" sx={{maxWidth:'300px', color: 'white'}}>
           <span style={{}}>Attachment</span> 
          </TableCell>
        )}
        {showcolumn('Received Date') && (
          <TableCell  align='center'
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => clickHeader('Insert_Date')}
          >
            <Typography variant="body1" sx={{ display: 'inline', color: 'white' }}>
              Received Date
            </Typography>
            {SortExp === 'Insert_Date' && (
              SortDirection === 'ASC' ? (
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} />
              ) : (
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              )
            )}
          </TableCell>
        )}
         {showcolumn('Received Date1') && (
          <TableCell align='center'
            sx={{ color: 'white', cursor: 'pointer' ,}}
            onClick={() => clickHeader('Insert_Date')}
          >
            <Typography  sx={{ display: 'inline-block', color: 'white' }}>
              Received Date
            </Typography>
            {SortExp === 'Insert_Date' && (
              SortDirection === 'ASC' ? (
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} />
              ) : (
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              )
            )}
          </TableCell>
        )}
        {showcolumn('Sent Date') && (
          <TableCell
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => clickHeader('Insert_Date')}
          >
            <Typography variant="body1" sx={{ display: 'inline', color: 'white' }}>
              Sent Date
            </Typography>
            {SortExp === 'Insert_Date' && (
              SortDirection === 'ASC' ? (
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} />
              ) : (
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              )
            )}
          </TableCell>
        )}
        {showcolumn('Draft Date') && (
            <TableCell  sx={{pl:-2}} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography align='left' sx={{ display: 'inline', color: 'white', }}>
                Draft Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </TableCell>
          )}
      </TableRow>
    </TableHead>
  </Table> */}


      {
        Itemlist.map((item, index) => (
          <ListCard4ColSel
            key={index}
            Item={item}
            onChange={clickSingle}
            ActiveTab={ActiveTab}
            DeleteDraft={DeleteDraft}
          />
        ))
      }
    </Box >
  );
};

export default SelectList3Col;
