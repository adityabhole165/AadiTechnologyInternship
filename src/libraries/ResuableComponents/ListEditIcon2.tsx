import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckIcon from '@mui/icons-material/Check';
import EditOff from '@mui/icons-material/EditOff';
import TaskIcon from '@mui/icons-material/Task';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import { Box, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EventBusyIcon from '@mui/icons-material/EventBusy';

function ListEditIcon2({ ItemList, clickEdit, HeaderArray, clickSubmit = undefined }) {
  const cellStyle = {
    padding: '6px 8px', // Adjust these values to reduce the height
  };
  
  return (
    <div>
      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
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
                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} >
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} >
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', ...cellStyle }} align="center">
                  {item.STATUS === 'Not Started' && (
                    <Tooltip title={'Marks entry not started'}>
                      <EditOff style={{ color: '#f44336', cursor: 'pointer' }}
                        onClick={() => clickEdit({
                          SubjectId: item.SubjectId,
                          StandardDivisionId: item.StandardDivisionId,
                          StandardId: item.StandardId,
                          IsMonthConfig: item.IsMonthConfig,
                          IsSubmitted: item.Is_Submitted
                        })} />
                    </Tooltip>
                  )}
                  {item.STATUS === 'Partial' && (
                    <Tooltip title={'Marks entry partially done.'}>
                      <DesignServicesIcon style={{ color: '#ff9800', cursor: 'pointer' }}
                        onClick={() => clickEdit({
                          SubjectId: item.SubjectId,
                          StandardDivisionId: item.StandardDivisionId,
                          StandardId: item.StandardId,
                          IsMonthConfig: item.IsMonthConfig,
                          IsSubmitted: item.Is_Submitted
                        })} />
                    </Tooltip>
                  )}
                  {(item.STATUS === 'Complete' || item.STATUS === 'Submitted'
                    || item.STATUS === 'Published') && (
                      <Tooltip title={'Marks entry completed'}>
                        <CheckIcon style={{ color: '#07bc0c', cursor: 'pointer' }}
                          onClick={() => clickEdit({
                            SubjectId: item.SubjectId,
                            StandardDivisionId: item.StandardDivisionId,
                            StandardId: item.StandardId,
                            IsMonthConfig: item.IsMonthConfig,
                            IsSubmitted: item.Is_Submitted
                          })} />
                      </Tooltip>
                    )}
                  {item.STATUS === 'No Student' && (
                    <Tooltip title={item.StatusDescription}>
                      <FaceRetouchingOffIcon style={{ color: '#34a4eb' }} />
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: '', ...cellStyle }} align="center">
                  {item.STATUS === 'Not Started' ? (
                    <Tooltip title={'Marks cannot be submitted.'}>
                      <span>Marks cannot be submitted.</span>
                    </Tooltip>
                  ) : item.STATUS === 'Partial' ? (
                    item.Is_Submitted === 'Y' ? (
                      <Tooltip title={item.StatusDescription}>
                        <CheckIcon style={{ color: '#07bc0c' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title={item.StatusDescription}>
                        <span>Marks cannot be submitted.</span>
                      </Tooltip>
                    )
                  ) : (
                    item.STATUS === 'Complete' || item.STATUS === 'Submitted' || item.STATUS === 'Published' ? (
                      item.Subject_Id !== -1 ? (
                        item.Is_Submitted === 'Y' ? (
                          <Tooltip title={'unsubmit marks'}>
                            <EventBusyIcon style={{ color: '#0f0f0f' }}
                              onClick={() => clickSubmit({
                                asSubjectId: item.SubjectId,
                                asStandardDivisionId: item.StandardDivisionId,
                                asIsSubmitted: "N"
                              })} />
                          </Tooltip>
                        ) : (
                          <Tooltip title={'Submit Marks To Class Teacher'}>
                            <EventAvailableIcon style={{ color: '#25e67b' }}
                              onClick={() => clickSubmit({
                                asSubjectId: item.SubjectId,
                                asStandardDivisionId: item.StandardDivisionId,
                                asIsSubmitted: "Y"
                              })} />
                          </Tooltip>
                        )
                      ) : (
                        item.Is_Submitted === 'Y' ? (
                          <Tooltip title={item.StatusDescription}>
                            <EventAvailableIcon style={{ color: '#25e67b' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title={item.StatusDescription}>
                            <CheckIcon style={{ color: '#07bc0c' }} />
                          </Tooltip>
                        )
                      )
                    ) : <span>Marks cannot be submitted.</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  );
}

export default ListEditIcon2;
