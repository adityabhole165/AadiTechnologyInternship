import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import EditOff from '@mui/icons-material/EditOff';
import TaskIcon from '@mui/icons-material/Task';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// ... (your other imports)

function ListEditIcon1({ ItemList, clickEdit, HeaderArray, clicksubmit }) {
  return (
    <div>
      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) => theme.colors.primary.main,
                color: (theme) => theme.palette.common.white
              }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: 'white' }}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text2}
                </TableCell>

                {/* <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text3 === 'Y' ? (
                    <CheckIcon style={{ color: '#607d8b' }} />
                  ) : (
                    <EditOff onClick={() => clickEdit({ SubjectId: item.SubjectId, StandardDivisionId: item.StandardDivisionId })} style={{ color: '#76ff03' }} />
                  )}
                </TableCell> */}
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text4 === 'Not Started' && (
                    <EditOff style={{ color: '#76ff03' }} />
                  )}
                  {item.Text4 === 'Partial' && (
                    <TaskIcon style={{ color: '#ff9800' }} />
                  )}
                  {(item.Text4 === 'Complete' || item.Text4 === 'Submitted'
                    || item.Text4 === 'Published') && (
                      <CheckIcon style={{ color: '#607d8b' }} />
                    )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text4 !== 'Complete' ? (
                    <AssignmentIcon onClick={() => clicksubmit(item.Id)} style={{ color: '#ff5722' }} />
                  ) : (
                    item.Text5
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListEditIcon1;
