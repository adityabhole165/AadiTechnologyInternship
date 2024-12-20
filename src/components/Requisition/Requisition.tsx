import AddTwoTone from '@mui/icons-material/AddTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';

import { ClearIcon } from '@mui/x-date-pickers';
import {
  IGetCancelRequisitionBody,
  IGetDeleteRequisitionBody,
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody
} from 'src/interfaces/Requisition/IRequisition';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
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
  const [RequisitionId, SetRequisitionId] = useState();
  const [sortExpression, setSortExpression] = useState('Created_Date desc');
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [page, setPage] = useState(1);
  const [headerArray, setHeaderArray] = useState([
    { Id: 1, Header: 'Code', SortOrder: null, sortKey: 'RequisitionCode' },
    { Id: 2, Header: 'Requisition', SortOrder: null, sortKey: 'RequisitionName' },
    { Id: 3, Header: 'Status', SortOrder: null, sortKey: 'StatusName' },
    { Id: 4, Header: 'Requestor', SortOrder: null, sortKey: 'CreaterName' },
    { Id: 5, Header: 'Request Date', SortOrder: 'desc', sortKey: 'Created_Date' },
    { Id: 6, Header: 'Expiry Date', SortOrder: null, sortKey: 'ExpiryDate' },
    { Id: 7, Header: 'Edit/view' },
    { Id: 8, Header: 'Delete' },
    { Id: 9, Header: 'Cancel' },
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
  const CountGetPagedRequisition: any = useSelector(
    (state: RootState) => state.SliceRequisition.RequisitionListCount

  );
  console.log(CountGetPagedRequisition.TotalCount / rowsPerPage, "CountGetPagedRequisition----");



  const DeleteRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.ISDeleteRequisition
  );
  const USCancelRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.ISCancelRequisition
  );
  const Requisition: IGetRequisitionStatusBody = {
    asSchoolId: asSchoolId
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: startIndex,
    asEndIndex: endIndex,
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
    // Prepare the cancellation body
    const CancelRequisitionBody: IGetCancelRequisitionBody = {
      asRequisitionId: RequisitionId,
      asReasonText: textall,
      asSchoolId: asSchoolId,
      asUpdatedById: Number(asUserId),
      asCanceledById: Number(asUserId),
    };


    if (textall.trim() == '') {
      showAlert({
        title: 'Please Confirm',
        message: 'Reason should not be blank.',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          closeAlert();
        },
      });
      return;
    }


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

    const DeleteRequisitionBody: IGetDeleteRequisitionBody = {
      asRequisitionId: Id,
      asSchoolId: asSchoolId
    };

    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this requisition?  ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteRequisitionn(DeleteRequisitionBody));

        closeAlert();
      }
    });




  };

  const GetRequisitionStatusDropdown = (value) => {
    setSelectResult(value);
    setRowsPerPage(20)
    setPage(1);
  };

  const clickView = (ViewId) => {
    navigate('/RITeSchool/Teacher/RequistionView/' + btoa(ViewId));
  };

  // const clickEdit = (Value) => {
  //   setasRequisitionId(Value)
  //   navigate('/RITeSchool/Teacher/AddRequisition');

  // };


  const clickEdit = (asRequisitionId) => {
    navigate('/RITeSchool/Teacher/AddRequisition/' + asRequisitionId);
  };

  const clickReset = () => {
    setPagedRequisition(GetPagedRequisition);
    setRegNoOrName('');
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
    navigate('/RITeSchool/Teacher/AddRequisition');
  };

  useEffect(() => {
    if (GetPagedRequisition) {
      setPagedRequisition(GetPagedRequisition);
    }
  }, [GetPagedRequisition]);

  useEffect(() => {
    if (DeleteRequisition != "") {
      toast.success(DeleteRequisition);
      dispatch(resetMessageDeleteRequisitionn());
      dispatch(RequisitionListt(RequisitionList));
    }
  }, [DeleteRequisition]);

  useEffect(() => {
    if (USCancelRequisition != "") {
      toast.success(USCancelRequisition);
      dispatch(resetMessageCancelRequisition());
      setTextall('')
      setOpenPublishDialogall(false)
      dispatch(RequisitionListt(RequisitionList));
    }
  }, [USCancelRequisition]);


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


  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, CountGetPagedRequisition.TotalCount);
  const pagecount = Math.ceil(CountGetPagedRequisition.TotalCount / rowsPerPage);
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(RequisitionListt(RequisitionList));
  }, [page, SelectResult, sortExpression, rowsPerPage]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Requisition', path: '/RITeSchool/Teacher/Requisition' }
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
            label="Item Code/ Requisition"
            value={regNoOrName}
            variant={'outlined'}
            size={"small"}
            onChange={(e) => {
              handleRegNoOrNameChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                clickSearch();
              }
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


          <Tooltip title={'Reset'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }}
              onClick={clickReset} >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip title={'Add Requisition'}>
            <IconButton
              onClick={AddRequisition}
              sx={{
                color: 'white',
                backgroundColor: green[500],
                height: '36px !important',
                ':hover': { backgroundColor: green[600] },

              }}
            >
              <AddTwoTone />
            </IconButton>
          </Tooltip>



        </>}
      />



      <Dialog
        open={openPublishDialogall}
        maxWidth={'sm'}
        fullWidth
        onClose={() => setOpenPublishDialogall(false)}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon onClick={ClickClose}
            sx={{
              color: 'white',
              // background:'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
                //  backgroundColor: red[100]

              }
            }} />

        </DialogTitle>

        <DialogContent  >

          <h1>
            Cancel Approved Requisition
          </h1>

          <Box sx={{ background: 'white', pl: 4.6, top: '1px' }}>
            <Grid container spacing={1} alignItems="center">

              <Grid item xs={2}>
                <TextField
                  sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                  label={'Requisition Code'}
                  variant="outlined"

                  value={RequisitionCode()}
                  inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}
                />
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                  label={'Requisition Name'}

                  value={RequisitionName()}
                  inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}

                />
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                  label={'Requisition Status'}

                  value={StatusName()}
                  inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}

                />
              </Grid>
            </Grid>
            <br></br>

            <Grid container spacing={1} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                  label={'Requester'}

                  value={CreaterName()}
                  inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}

                />
              </Grid>
            </Grid>
            <br></br>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Reason to cancel   <Typography component="span" sx={{ color: red[500] }}>*</Typography>
            </Typography>
            <TextField
              multiline
              rows={3}
              type="text"
              value={textall}
              onChange={Detailschnageall}
              sx={{ width: '90%' }}
            />

          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={ClickClose}
          >
            Cancel
          </Button>
          <Button

            onClick={clickcancel}
            // color={'success'}
            // variant={'contained'}
            sx={{
              color: 'green',
              //  backgroundColor: grey[500],
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
          >
            Save
          </Button>

        </DialogActions>
      </Dialog>
      <Box mb={1} sx={{ p: 2, background: 'white' }}>

        {
          PagedRequisition.length > 0 ? (
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                <Box component="span" fontWeight="fontWeightBold">
                  {startRecord} to {endRecord}
                </Box>
                {' '}out of{' '}
                <Box component="span" fontWeight="fontWeightBold">
                  {CountGetPagedRequisition.TotalCount}
                </Box>{' '}
                {CountGetPagedRequisition.TotalCount === 1 ? 'record' : 'records'}
              </Typography>
            </div>

          ) : (
            <span></span>

          )
        }
        {PagedRequisition && PagedRequisition.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No record found.</b>
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

        {/* {
          CountGetPagedRequisition.TotalCount > rowsPerPage ? (

            <ButtonGroupComponent
              rowsPerPage={rowsPerPage}
              ChangeRowsPerPage={ChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              PageChange={PageChange}
              pagecount={pagecount}
            />
          ) : (
            <span></span>
          )
        } */}

        {
          endRecord > 19 ? (
            <ButtonGroupComponent
              rowsPerPage={rowsPerPage}
              ChangeRowsPerPage={ChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              PageChange={PageChange}
              pagecount={pagecount}
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


