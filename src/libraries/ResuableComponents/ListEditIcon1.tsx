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
                  align={item.align ? item.align : 'left'}
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
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.STATUS === 'Not Started' && (
                    <EditOff style={{ color: '#76ff03', cursor: 'pointer' }} />
                  )}
                  {item.STATUS === 'Partial' && (
                    <TaskIcon style={{ color: '#ff9800', cursor: 'pointer' }} />
                  )}
                  {(item.STATUS === 'Complete' || item.STATUS === 'Submitted'
                    || item.STATUS === 'Published') && (
                      <CheckIcon style={{ color: '#607d8b', cursor: 'pointer' }} />
                    )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.STATUS === 'Not Started' ? (
                    item.Is_Submitted === 'Y' ? (
                      <CheckIcon style={{ color: '#607d8b' }} />
                    ) : (
                      'Marks cannot be submitted.' 
                    )
                  ) : item.STATUS === 'Partial' ? (
                    item.Is_Submitted === 'Y' ? (
                      <CheckIcon style={{ color: '#607d8b' }} />
                    ) : (
                      'Marks cannot be submitted.' 
                    )
                  ) : (
                    item.STATUS === 'Complete' || item.STATUS === 'Submitted' || item.STATUS === 'Published' ? (
                      item.Subject_Id !== -1 ? (
                        item.Is_Submitted === 'Y' ? (
                          <AssignmentIcon style={{ color: '#ff5722' }} />
                        ) : (
                          <CheckIcon style={{ color: '#607d8b' }} />
                        )
                      ) : (
                        item.Is_Submitted === 'Y' ? (
                          <AssignmentIcon style={{ color: '#ff5722' }} />
                        ) : (
                          <CheckIcon style={{ color: '#607d8b' }} />
                        )
                      )
                    ) : null 
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
