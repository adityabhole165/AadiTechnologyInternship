import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// ... (your other imports)

function Assignhomeworklist({ ItemList, clickAssign, HeaderArray, MySubject }) {
  return (
    <div>
      <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }}>
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
                    width: item?.width ? item?.width : 'auto',
                  }}
                  align={item?.align ? item?.align : 'left'}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow
                key={item.Id}
              // sx={{
              //   backgroundColor: item.Text3 === 'True' ? '#bae1f5' : '#b1b2b3'
              // }}
              >
                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}

                >
                  {item.Text1}
                </TableCell>
                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}

                >
                  {item.Text2}
                </TableCell>

                <TableCell
                  sx={{ textTransform: 'capitalize', py: 0.5 }}
                  align="center"
                >
                  <Tooltip title={'Add Homework'}>
                    <IconButton
                      sx={{
                        color: '#223354',
                        '&:hover': {
                          bgcolor: 'grey.300'
                        }
                      }}
                      onClick={() => {
                        clickAssign(
                          {
                            SubjectId: item.SubjectId,
                            StandardDivisionId: item.StandardDivisionId,
                            SubjectName: item.Text2,
                            StandardDivision: item.Text1
                          },
                          MySubject);
                      }}
                    ><EditTwoTone /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Assignhomeworklist;
