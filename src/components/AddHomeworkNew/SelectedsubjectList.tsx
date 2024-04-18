
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { RootState } from 'src/store';
const SelectedsubjectList = ({
  ItemList,
  HeaderArray,
  clickDelete,
  clickEdit,
  clickAttachment,
  clickVisibilityIcon,
  clickpublish,
  clickView
}) => {
  return (
    <div>
     
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
                    color: (theme) => theme.palette.common.white
                  }}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <Link href={''} onClick={() => clickView(item.Id)}>
                    {item.Text2}
                  </Link>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text3}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text4}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <Link href={''} onClick={() => clickAttachment(item.Text5)}>
                    {item.Text5}
                  </Link>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                  {item.Text9 == 0 ? null : (
                    <VisibilityIcon
                      style={{ color: 'black' }}
                      onClick={() => clickVisibilityIcon(item.Id)}
                    />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <ButtonPrimary onClick={() => {
                    clickpublish(item.Id)
                  }}>
                    {item.IsPublished == 'False' ? 'PUBLISH' : '  UNPUBLISH'}
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                  {item.Text7 == 'False' ? (
                    <Edit
                      style={{ color: 'black ' }}
                      onClick={() => clickEdit(item.Id)}
                    />
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                  {item.Text7 == 'False' ? (
                    <Delete
                      style={{ color: 'black ' }}
                      onClick={() => clickDelete(item.Id)}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SelectedsubjectList;

