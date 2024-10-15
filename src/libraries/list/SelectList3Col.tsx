import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, Typography } from '@mui/material';
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
  return (
    <Box sx={{ textAlign: 'center' }}>

      <Box sx={{
        display: 'flex', borderRadius: '7px', mb: 1, p: 1.5, background: (theme) => theme.palette.secondary.main,
        border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden'
      }}>
        {showcolumn('Delete') && <Box sx={{ color: 'white', ml: 0 }}>Delete</Box>}
        {showcolumn('Subject') && <Box onClick={() => { clickHeader('Subject') }} sx={{ color: 'white', ml: 6, display: 'flex' }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Subject
          </Typography>
          {SortExp === 'Subject' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('To') && <Box sx={{ color: 'white', ml: 26 }}>To</Box>}
        {showcolumn('Cc') && <Box sx={{ color: 'white', ml: 26 }}>Cc</Box>}
        {showcolumn('Read Receipt Information') && <Box sx={{ color: 'white', ml: 26 }}>Read Receipt Information</Box>}
        {showcolumn('Message Body') && <Box sx={{ color: 'white', ml: 44 }}>  Message Body</Box>}
        {showcolumn('From') && <Box sx={{ color: 'white', ml: 54 }}>From</Box>}
        {showcolumn('From1') && <Box sx={{ color: 'white', ml: 26 }}>From</Box>}
        {showcolumn('Attachment') && <Box sx={{ color: 'white', ml: 20 }}>Attachment</Box>}
        {showcolumn('Received Date1') && <Box sx={{ color: 'white', ml: 46, display: 'flex' }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Received Date
          </Typography>
          {/* {Datecolumn} */}
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white', }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Received Date') && <Box sx={{ color: 'white', ml: 18, display: 'flex' }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Received Date
          </Typography>
          {/* {Datecolumn} */}
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white', }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Sent Date') && <Box sx={{ color: 'white', ml: 18, display: 'flex' }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Sent Date
          </Typography>
          {/* {Datecolumn} */}
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}
        {showcolumn('Draft Date') && <Box sx={{ color: 'white', ml: 44, display: 'flex' }} onClick={() => { clickHeader('Insert_Date') }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '4px' }}>
            Draft Date
          </Typography>
          {/* {Datecolumn} */}
          {SortExp === 'Insert_Date' ? SortDirection === 'ASC' ?
            <ArrowCircleDown sx={{ fontSize: 20, color: 'white' }} /> :
            <ArrowCircleUpIcon sx={{ fontSize: 20, color: 'white' }} /> : null}</Box>}

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
