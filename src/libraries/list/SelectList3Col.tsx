import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
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
      if (ActiveTab === 'Sent' || ActiveTab === 'Trash') {
        return true;
      }
    } else if (columnName === 'Attachment' && ActiveTab === 'Inbox') {
      return true;
    } else if (columnName === 'Date') {
      return true;
    } else if (columnName === 'From') {
      if (ActiveTab === 'Inbox' || ActiveTab === 'Trash') {
        return true;
      }
    } else if (columnName === 'To') {
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
    }
    return false;
  }
  const clickHeader = (columnName) => {
    clickSortDirection(SortDirection == 'ASC' ? 'DESC' : 'ASC')
    clickSortExp(columnName)

  }
  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* <Table aria-label="simple table" sx={{mb:1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
        <TableHead>
          <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
            <TableCell>
              Checkbox
            </TableCell>
            <TableCell>
              Subject
            </TableCell>
            <TableCell>
              To
            </TableCell>
            <TableCell>
            Attachment
            </TableCell>
            <TableCell>
            Date
            </TableCell>
          </TableRow>
        </TableHead>
      </Table> */}

      <Grid container
        sx={{
          borderRadius: '7px', mb: 1, p: 1.5, background: (theme) => theme.palette.secondary.main,
          border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden'
        }}>
        {showcolumn('Subject') && <Grid onClick={() => { clickHeader('Subject') }} xs={12} sm={2} md={2} sx={{ color: 'white' }}>
          Subject
          {SortExp === 'Subject' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}
        </Grid>}
        {showcolumn('Cc') && <Grid xs={12} sm={2} md={3} sx={{ color: 'white' }}>
          Cc
        </Grid>}
        {showcolumn('From') && <Grid xs={12} sm={2} md={2.5} sx={{ color: 'white' }}>
          From
        </Grid>}
        {showcolumn('Attachment') && <Grid xs={12} sm={2} md={2.5} sx={{ color: 'white' }}>
          Attachment
        </Grid>}
        {showcolumn('Date') && <Grid onClick={() => { clickHeader('Insert_Date') }} xs={12} sm={2} md={2} sx={{ color: 'white', }}>
          {Datecolumn}
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}
        </Grid>}
        {showcolumn('Message Body') && <Grid xs={12} sm={2} md={2} sx={{ color: 'white', }}>
          Message Body
        </Grid>}
        {showcolumn('Delete') && <Grid xs={12} sm={2} md={2} sx={{ color: 'white', }}>
          Delete
        </Grid>}
      </Grid>
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
