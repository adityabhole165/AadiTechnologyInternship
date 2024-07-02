import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import EditOffIcon from '@mui/icons-material/EditOff';
import TaskIcon from '@mui/icons-material/Task';
import { Box, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function EditIconList({
  ItemList,
  clickEdit,
  HeaderArray,
  clicksubmit
}) {
  console.log(ItemList, 'ItemList');

  return (
    <div>
      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text3 === '3' ? (
                    <Tooltip title="Marks entry completed">
                      <CheckIcon onClick={() => clickEdit(item.Text3, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  ) : item.Text3 === '2' ? (
                    <Tooltip title="Marks entry partially done">
                      <TaskIcon onClick={() => clickEdit(item.Text3, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Marks entry not started">
                      <EditOffIcon onClick={() => clickEdit(item.Text3, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text4 === '2' ? (
                    <Tooltip title="Submit Marks To Class Teacher">
                      <AssignmentIcon
                        onClick={() =>
                          clicksubmit(item.SubjectId, item.StandardDivisionID)
                        } sx={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  ) : item.Text4 === '3' ? (
                    <span>Marks already submitted.</span>
                  ) : (
                    <span>Mark Cannot be Submitted.</span>
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

export default EditIconList;