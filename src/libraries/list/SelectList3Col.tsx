import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, Grid, Typography } from '@mui/material';
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
            <Grid item xs={12} sm={1} md={0.5} lg={0.5} xl={0.5} sx={{ textAlign: 'center' }}>
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
            <Grid item xs={12} sm={1} md={1.5} lg={1.5} xl={1.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Subject') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white' }}>
                Subject
              </Typography>
              {SortExp === 'Subject' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}

          {showcolumn('To') && (
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5} sx={{ ml: 4, color: 'white', textAlign: 'center' }}>
              To
            </Grid>
          )}

          {showcolumn('Cc') && (
            <Grid item xs={12} sm={0.5} md={0.5} lg={0.5} xl={0.5} sx={{ color: 'white', textAlign: 'center' }}>
              Cc
            </Grid>
          )}


          {showcolumn('Read Receipt Information') && (
            <Grid item xs={12} sm={2} md={2} lg={3} xl={3} sx={{ ml: 7, color: 'white', textAlign: 'center' }}>
              Read Receipt Information
            </Grid>
          )}

          {showcolumn('Message Body') && (
            <Grid item xs={12} sm={5} md={5} lg={5} xl={6} sx={{ ml:5, color: 'white', textAlign: 'center' }}>
              Message Body
            </Grid>
          )}

          {showcolumn('From') && (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ ml: 12, color: 'white', textAlign: 'center' }}>
              From
            </Grid>
          )}
          {showcolumn('From1') && (
            <Grid item xs={12} sm={3.5} md={3.5} lg={3.5} xl={3.5} sx={{ ml: 12, color: 'white', textAlign: 'center' }}>
              From
            </Grid>
          )}
          {showcolumn('Cc1') && (
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1} sx={{ml:2, mr: 7, color: 'white', textAlign: 'center' }}>
              Cc
            </Grid>
          )}

          {showcolumn('Attachment') && (
            <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{  color: 'white', textAlign: 'center' }}>
              Attachment
            </Grid>
          )}

          {showcolumn('Received Date') && (
            <Grid item xs={12} sm={1} md={1} lg={2} xl={2} sx={{ ml: 2, display: 'flex', justifyContent: 'right', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
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
            <Grid item xs={12} sm={2} md={2} lg={3} xl={3} sx={{  display: 'flex', justifyContent: 'right', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
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
            <Grid item xs={12} sm={1.2} md={1.2} lg={1.2} xl={1.2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white' }}>
                Sent Date
              </Typography>
              {SortExp === 'Insert_Date' ? (SortDirection === 'ASC' ?
                <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
                <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} />
              ) : null}
            </Grid>
          )}

          {showcolumn('Draft Date') && (
            <Grid item xs={12} sm={2.5} md={2.8} lg={4.1} xl={3} sx={{  display: 'flex', justifyContent: 'right', alignItems: 'center', color: 'white', cursor: 'pointer' }} onClick={() => { clickHeader('Insert_Date') }}>
              <Typography variant="body1" sx={{ marginRight: '4px', color: 'white' }}>
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
