import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, TablePagination, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { GetScreenPermission, isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

function GradeConfigurationList({
  configurationList,
  HeaderArray,
}) {
  
  
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
                 
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {configurationList.map((item, i) => (
            <TableRow key={i}>
              <TableCell sx={{ textTransform: 'capitalize' }} >
                {item.Text1}
              </TableCell>

              <TableCell sx={{ textTransform: 'capitalize',  textAlign: 'center',  }} >
                {item.Text2}
              </TableCell>

              <TableCell sx={{ textTransform: 'capitalize' }} >
                {item.Text3}
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}

export default GradeConfigurationList;
