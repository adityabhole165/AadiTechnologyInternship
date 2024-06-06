import AddTwoTone from '@mui/icons-material/AddTwoTone';
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import QuestionMark from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TablePagination, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import {
  IGetCancelRequisitionBody,
  IGetDeleteRequisitionBody,
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody
} from 'src/interfaces/Requisition/IRequisition';
import RequisitionList1 from 'src/libraries/ResuableComponents/RequisitionList1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDACancelRequisition,
  CDADeleteRequisitionn,
  RequisitionListt,
  RequisitionStatus,
  resetMessageCancelRequisition,
  resetMessageDeleteRequisitionn
} from 'src/requests/Requisition/RequestRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const StatusRequisition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const [SelectResult, setSelectResult] = useState(0);
  const [openPublishDialogall, setOpenPublishDialogall] = useState(false);
  const [textall, setTextall] = useState('');
  const [PagedRequisition, setPagedRequisition] = useState([]);
  const [SelectRequisition, setRequisiton] = useState(0);
  const [regNoOrName, setRegNoOrName] = useState('');
  const [page1, setPage1] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [RequisitionId, SetRequisitionId] = useState();
  const [sortExpression, setSortExpression] = useState('Created_Date desc');

  const [headerArray, setHeaderArray] = useState([
    { Id: 1, Header: 'Code', SortOrder: null, sortKey: 'RequisitionCode' },
    { Id: 2, Header: 'Requisition', SortOrder: null, sortKey: 'RequisitionName' },
    { Id: 3, Header: 'Status', SortOrder: null, sortKey: 'StatusName' },
    { Id: 4, Header: 'Requestor', SortOrder: null, sortKey: 'CreaterName' },
    { Id: 5, Header: 'Request Date', SortOrder: 'desc', sortKey: 'Created_Date' },
    { Id: 6, Header: 'Edit/view' },
    { Id: 7, Header: 'Delete' },
    { Id: 8, Header: 'Cancel' },
  ]);

  const handleHeaderClick = (updatedHeaderArray) => {
    setHeaderArray(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    setSortExpression(newSortExpression);
  };

  const Requision = useSelector(
    (state: RootState) => state.SliceRequisition.Requisition
  );

  const GetPagedRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.RequisitionList
  );

  const DeleteRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.ISDeleteRequisition
  );
  const USCancelRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.ISCancelRequisition
  );
  const Requisition: IGetRequisitionStatusBody = {
    asSchoolId: asSchoolId
  };
  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: page1 * rowsPerPage,
    asEndIndex: (page1 + 1) * rowsPerPage,
    asSortExp: `ORDER BY ${sortExpression}`,
    asStatusID: SelectResult,
    asUserId: Number(asUserId)
  };
  const Clickok = (Id) => {
    SetRequisitionId(Id)
    setOpenPublishDialogall(true)
  };
  const ClickClose = (Id) => {
    setOpenPublishDialogall(false)
  };


  const clickcancel = () => {
    const CancelRequisitionBody: IGetCancelRequisitionBody = {
      asRequisitionId: RequisitionId,
      asReasonText: textall,
      asSchoolId: asSchoolId,
      asUpdatedById: Number(asUserId),
      asCanceledById: 0
    };

    dispatch(CDACancelRequisition(CancelRequisitionBody));
  };

  const RequisitionCode = () => {
    let classStudentName = '';
    GetPagedRequisition.map((item) => {
      if (item.Id == RequisitionId) classStudentName = item.RequisitionCode;
    });
    return classStudentName;
  };

  const RequisitionName = () => {
    let classStudentName = '';
    GetPagedRequisition.map((item) => {
      if (item.Id == RequisitionId) classStudentName = item.RequisitionName;
    });
    return classStudentName;
  };

  const StatusName = () => {
    let classStudentName = '';
    GetPagedRequisition.map((item) => {
      if (item.Id == RequisitionId) classStudentName = item.StatusName;
    });
    return classStudentName;
  };
  const CreaterName = () => {
    let classStudentName = '';
    GetPagedRequisition.map((item) => {
      if (item.Id == RequisitionId) classStudentName = item.CreaterName;
    });
    return classStudentName;
  };
  const Detailschnageall = (event) => {
    setTextall(event.target.value)
  }
  const clickDelete = (Id) => {
    if (confirm('Are you sure you want to delete this Requisition?')) {
      const DeleteRequisitionBody: IGetDeleteRequisitionBody = {
        asRequisitionId: Id,
        asSchoolId: asSchoolId
      };
      dispatch(CDADeleteRequisitionn(DeleteRequisitionBody));
    }
  };

  const GetRequisitionStatusDropdown = (value) => {
    setSelectResult(value);
  };

  const clickView = () => {
    navigate('/extended-sidebar/Teacher/AddRequisition');
  };

  const clickEdit = () => {
    navigate('/extended-sidebar/Teacher/AddRequisition');
  };
  const clickReset = () => {
    setPagedRequisition(GetPagedRequisition);
    setRegNoOrName('');
  };

  const handleChangePage = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const clickSearch = () => {
    if (regNoOrName === '') {
      setPagedRequisition(GetPagedRequisition);
    } else {
      setPagedRequisition(
        GetPagedRequisition.filter((item) => {
          const text1Match = item.RequisitionCode.toLowerCase().includes(
            regNoOrName.toLowerCase()
          );
          const text2Match = item.RequisitionName.toLowerCase().includes(
            regNoOrName.toLowerCase()
          );
          return text1Match || text2Match;
        })
      );
    }
  };

  const handleRegNoOrNameChange = (value) => {
    setRegNoOrName(value);
  };

  const AddRequisition = (value) => {
    navigate('/extended-sidebar/Teacher/AddRequisition');
  };


  useEffect(() => {
    if (GetPagedRequisition) {
      setPagedRequisition(GetPagedRequisition);
    }
  }, [GetPagedRequisition]);

  useEffect(() => {
    if (DeleteRequisition != '') {
      toast.success(DeleteRequisition);
      dispatch(resetMessageDeleteRequisitionn());
      dispatch(RequisitionListt(RequisitionList));
    }
  }, [DeleteRequisition]);

  useEffect(() => {
    if (USCancelRequisition != '') {
      toast.success(USCancelRequisition);
      dispatch(resetMessageCancelRequisition());
      dispatch(RequisitionListt(RequisitionList));
    }
  }, [DeleteRequisition]);


  useEffect(() => {
    if (Requision.length > 0) {
      setSelectResult(Requision[0].Value);
    }
  }, [Requision]);
  useEffect(() => {
    setPagedRequisition(GetPagedRequisition);
  }, [GetPagedRequisition]);

  useEffect(() => {
    dispatch(RequisitionStatus(Requisition));
  }, []);

  useEffect(() => {
    dispatch(RequisitionListt(RequisitionList));
  }, [sortExpression, page1, rowsPerPage, SelectResult]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' }
        ]}
        rightActions={<>
          <SearchableDropdown
            sx={{ minWidth: '15vw' }}
            ItemList={Requision}
            onChange={GetRequisitionStatusDropdown}
            label={'Status'}
            defaultValue={SelectResult.toString()}
            mandatory
            size={"small"}
          />
          <TextField
            sx={{ width: '15vw' }}
            fullWidth
            label="Item Code/Name"
            value={regNoOrName}
            variant={'outlined'}
            size={"small"}
            onChange={(e) => {
              handleRegNoOrNameChange(e.target.value);
            }}
          />


          <IconButton
            onClick={clickSearch}
            sx={{
              background: (theme) => theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark
              }
            }}
          >
            <SearchTwoTone />
          </IconButton>
          <Box>
            <Tooltip title={'Here you can see list of existing requisition according to status.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title={'Reset'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: red[600]
                }
              }}
              onClick={clickReset} >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Add'}>
            <IconButton
              onClick={AddRequisition}
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }
              }}
            >
              <AddTwoTone />
            </IconButton>
          </Tooltip>
        </>}
      />

      <Dialog open={openPublishDialogall} onClose={() => setOpenPublishDialogall(false)} fullWidth
        maxWidth={'sm'}>
        <DialogTitle sx={{ fontSize: '20px !important', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Cancel Approved Requisition Popup !!!
          <IconButton
            onClick={ClickClose}
            color="error">
            <CloseTwoTone />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 4 }}>
          <Grid container spacing={1} alignItems="center">

            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '25vw', bgcolor: '#f0e68c' }}
                label={'RequisitionCode'}
                size={"small"}
                value={RequisitionCode()} />
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '25vw', bgcolor: '#f0e68c' }}
                label={'RequisitionName'}
                size={"small"}
                value={RequisitionName()} />
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '25vw', bgcolor: '#f0e68c' }}
                label={'RequisitionName'}
                size={"small"}
                value={StatusName()} />
            </Grid>
          </Grid>
          <br></br>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '25vw', bgcolor: '#f0e68c' }}
                label={'RequisitionName'}
                size={"small"}
                value={CreaterName()} />
            </Grid>
          </Grid>
          <br></br>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Unpublish Reason  <Typography component="span" sx={{ color: red[500] }}>*</Typography>
          </Typography>
          <TextField
            multiline
            rows={3}
            type="text"
            value={textall}
            onChange={Detailschnageall}
            sx={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button onClick={() => {
            setOpenPublishDialogall(false)
          }} color={'error'}>
            Cancel
          </Button>
          <Button onClick={clickcancel} variant={'contained'} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box mb={1} sx={{ p: 2, background: 'white' }}>
        {PagedRequisition && PagedRequisition.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No Record Found.</b>
          </Typography>
        ) : (
          <RequisitionList1
            HeaderArray={headerArray}
            ItemList={PagedRequisition}
            ClickHeader={handleHeaderClick}
            clickEdit={clickEdit}
            clickView={clickView}
            clickDelete={clickDelete}
            clickCancel={Clickok}
          />
        )}
        {
          PagedRequisition.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={PagedRequisition.length}
              rowsPerPage={rowsPerPage}
              page={page1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          ) : (
            <span></span>

          )
        }

      </Box>
    </Box>
  );
};

export default StatusRequisition;