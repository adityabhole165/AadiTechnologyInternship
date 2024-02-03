import { Box, Modal } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import Model from './Model';

const nameCellStyle = {
  width: '900px',
  fontSize: '5px',
  py: 1,
  cursor: 'pointer'
};

const rowStyle = {
  ' &:hover': {
    backgroundColor: 'lightblue'
  }
};

const dangercellstyle = {
  py: 1,
  px: 1
};

export default function TableAttendace({ ItemList, HeaderArray }) {
  const [user, setuser] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setuser(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      {ItemList.length === 0 ? (
        <>
          {' '}
          <ErrorMessages Error={'No record found'} />
        </>
      ) : (
        <>
          <Box sx={{ backgroundColor: 'white' }}>
            <Table
              className="font-roboto"
              sx={{ fontFamily: 'inherit', padding: '300px' }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {HeaderArray.map((item, i) => (
                    <TableCell
                      key={i}
                      scope={item.scope ? item.scope : 'a'}
                      sx={{
                        textTransform: 'capitalize',
                        color: 'white',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        py: 1
                      }}
                      align={item?.align || 'center'}
                    >
                      {' '}
                      <b>{item.Header}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {ItemList.map((item, i) => (
                  <>
                    <TableRow key={i} sx={rowStyle}>
                      {item.Text17 > 75 ? (
                        <>
                          <TableCell
                            align="center"
                            sx={{ py: 1 }}
                            dangerouslySetInnerHTML={{ __html: item.Text1 }}
                          ></TableCell>
                          <TableCell
                            align="left"
                            dangerouslySetInnerHTML={{ __html: item.Text2 }}
                            scope="row"
                            sx={nameCellStyle}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ paddingX: '8px', py: 1 }}
                            dangerouslySetInnerHTML={{ __html: item.Text3 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text4 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text5 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text6 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text7 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text8 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text9 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text10 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text11 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text12 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text13 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text14 }}
                            sx={{ py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            scope="row"
                            dangerouslySetInnerHTML={{ __html: item.Text15 }}
                            sx={{ fontWeight: 'bold', width: '200px', py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text16 }}
                            sx={{ fontWeight: 'bold', width: '200px', py: 1 }}
                          ></TableCell>

                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text17 }}
                            sx={{ fontWeight: 'bold', py: 1 }}
                          ></TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text1 }}
                            sx={{ color: 'red', py: 1 }}
                          ></TableCell>
                          <TableCell
                            align="left"
                            dangerouslySetInnerHTML={{ __html: item.Text2 }}
                            scope="row"
                            sx={{ color: 'red', ...nameCellStyle }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text3 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text4 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text5 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text6 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text7 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text8 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text9 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text10 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text11 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text12 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text13 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: 'red', ...dangercellstyle }}
                            dangerouslySetInnerHTML={{ __html: item.Text14 }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            scope="row"
                            dangerouslySetInnerHTML={{ __html: item.Text15 }}
                            sx={{
                              fontWeight: 'bold',
                              width: '200px',
                              color: 'red',
                              ...dangercellstyle
                            }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text16 }}
                            sx={{
                              fontWeight: 'bold',
                              width: '200px',
                              color: 'red',
                              ...dangercellstyle
                            }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            dangerouslySetInnerHTML={{ __html: item.Text17 }}
                            sx={{
                              color: 'red',
                              fontWeight: 'bold',
                              ...dangercellstyle
                            }}
                          ></TableCell>
                        </>
                      )}
                    </TableRow>
                  </>
                ))}
              </TableBody>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Model data={user} />
              </Modal>
            </Table>
          </Box>
        </>
      )}
    </>
  );
}

const table = (item) => {};
