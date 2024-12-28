import CheckIcon from '@mui/icons-material/Check';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOffIcon from '@mui/icons-material/EditOff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Box, IconButton, Tooltip } from '@mui/material';
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
  clickUnSubmit,
}) {
  //console.log(ItemList, 'ItemList');
  const cellStyle = {
    padding: '0.2em 1.5em', // Adjust these values to reduce the height
  };

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
          <TableBody >
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} align="center">
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} align="center">
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} align="center">
                  {item.Text3 === '3' ? (
                    <IconButton>
                      <Tooltip title="Marks entry completed">
                        <CheckIcon onClick={() => clickEdit(item.Text4, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID, item.IsXseed, item.Text6)} sx={{ cursor: 'pointer', color: '#07bc0c' }} />
                      </Tooltip>
                    </IconButton>
                  ) : item.Text3 === '2' ? (
                    <IconButton>
                      <Tooltip title="Marks entry partially done">
                        <DesignServicesIcon onClick={() => clickEdit(item.Text4, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID, item.IsXseed, item.Text6)} sx={{ cursor: 'pointer', color: 'orange' }} />
                      </Tooltip>
                    </IconButton>
                  ) : (
                    <IconButton>
                      <Tooltip title="Marks entry not started">
                        <EditOffIcon onClick={() => clickEdit(item.Text4, item.Text1, item.Text2, item.SubjectId, item.StandardDivisionID, item.IsXseed, item.Text6)} sx={{ cursor: 'pointer', color: '#f44336' }} />
                      </Tooltip>
                    </IconButton>
                  )}
                </TableCell>
                <TableCell sx={{ textTransform: 'none', ...cellStyle }} align="center">
                  {item.Text4 === '2' ? (
                    <IconButton>
                      <Tooltip title="Submit exam Marks to the class teacher">
                        <EventAvailableIcon
                          onClick={() =>
                            clicksubmit(item.SubjectId, item.StandardDivisionID, item.Text5)
                          } sx={{ cursor: 'pointer', color: '#25e67b' }}
                        />
                      </Tooltip>
                    </IconButton>
                  ) : item.Text4 === '3' && item.Text6 === 'N' ? (
                    <IconButton>
                      <Tooltip title="Unsubmit exam marks">
                        <EventBusyIcon onClick={() =>
                          clickUnSubmit(item.SubjectId, item.StandardDivisionID, item.Text5, item.Text6)
                        } sx={{ cursor: 'pointer', color: 'black' }} />
                      </Tooltip>
                    </IconButton>
                  ) : item.Text4 === '3' && item.Text6 === 'Y' ? (<span>Marks are already published.</span>) : (
                    <span>Marks cannot be submitted.</span>
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