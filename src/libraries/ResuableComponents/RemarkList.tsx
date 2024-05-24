import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ProgressRemarkTerm from 'src/components/ProgressRemarks/ProgressRemarkTerm';
import React, { useContext } from 'react';

function RemarkList({
  ItemList,
  HeaderArray,
  onChange,
  ClickHeader
}) {
  const onClick = (value) => {
    const updatedItemList = ItemList.map((item) => {
      return item.Id === value ? { ...item, IsActive: !item.IsActive } : item;
    });
    onChange(updatedItemList);
  };

  const clickHeader = (value) => {
    if (value !== undefined) {
      const updatedHeaderArray = HeaderArray.map((item) => {
        return item.SortOrder === undefined ? item : { ...item, SortOrder: item.SortOrder === "desc" ? "asc" : "desc" }
      });
      ClickHeader(updatedHeaderArray);
    }
  }

  let List = useContext(ProgressRemarkTerm);
  
  const replaceText = (text) => {
    let replacedText = text.replace('%FNAME%', List.StudentId ? List.StudentFName : '');
    if (List.PassSalutationId == 6) {
      replacedText = replacedText.replace('%HE/SHE%', 'she');
    } else if (List.PassSalutationId == 5) {
      replacedText = replacedText.replace('%HE/SHE%', 'he');
    }
    if (List.PassSalutationId == 6) {
      replacedText = replacedText.replace('%HIS/HER%', 'her');
    } else if (List.PassSalutationId == 5) {
      replacedText = replacedText.replace('%HIS/HER%', 'his');
    }
  
    return replacedText;
  };
  

  return (
    <>
      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white,
                    py: 1,
                  }}
                  onClick={() => { clickHeader(item.Id) }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: item?.align ? 'center' : 'flex-start'
                  }}>
                    <b>{item.Header}</b>
                    {item.SortOrder !== undefined ?
                      item.SortOrder === "desc" ?
                        <ArrowDropDownCircleIcon /> :
                        <ArrowCircleUpIcon /> :
                      null
                    }
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Checkbox
                    checked={item.IsActive}
                    onChange={() => {
                      onClick(item.Id);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {replaceText(item.Text1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RemarkList;
