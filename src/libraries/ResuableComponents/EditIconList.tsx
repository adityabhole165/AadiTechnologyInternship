import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import EditOffIcon from '@mui/icons-material/EditOff';
import TaskIcon from '@mui/icons-material/Task';
import { Card } from '@mui/material';
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
  clicksubmit,
  clickEdit1
}) {
  console.log(ItemList, 'ItemList');

  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4dd0e1' }}>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize' }}
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
                    <CheckIcon />
                  ) : item.Text3 === '2' ? (
                    <TaskIcon onClick={() => clickEdit(item.Id)} />
                  ) : (
                    <EditOffIcon onClick={() => clickEdit1(item.Id)} />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text4 === '2' ? (
                    <AssignmentIcon
                      onClick={() =>
                        clicksubmit(item.SubjectId, item.StandardDivisionID)
                      }
                    />
                  ) : item.Text4 === '3' ? (
                    'Marks already submitted.'
                  ) : (
                    ' Mark Cannot be Submitted.'
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
