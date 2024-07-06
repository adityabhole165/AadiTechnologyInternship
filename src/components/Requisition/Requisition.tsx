import AddTwoTone from '@mui/icons-material/AddTwoTone';
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import QuestionMark from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
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
  const [page2, setPage2] = useState(1);
  const rowsPerPageOptions = [20, 50, 100, 200];
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
  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: (page2 - 1) * rowsPerPage,
    asEndIndex: page2 * rowsPerPage,
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
      asCanceledById: Number(asUserId)
    };
    if (textall == '') {
      alert('Reason Should not be blank.');
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
  const PageChange = (pageNumber) => {
    setPage2(pageNumber);
  };

  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage2(1); // Reset to the first page when changing rows per page
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

  useEffect(() => {
    dispatch(RequisitionListt(RequisitionList));
  }, [sortExpression, page2, rowsPerPage, SelectResult]);

  const startRecord = (page2 - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page2 * rowsPerPage, CountGetPagedRequisition.TotalCount);
  const pagecount = Math.ceil(CountGetPagedRequisition.TotalCount / rowsPerPage);
       
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
            label="Item Code/ Requisition"
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
              backgroundColor: blue[500],
              '&:hover': {
                backgroundColor: blue[600]
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
                backgroundColor: green[500],
                height: '36px !important',
                ':hover': { backgroundColor: green[600] },
                marginLeft: '-4px',
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
          Cancel Approved Requisition
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
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Requisition Code'}
                variant="outlined"
                size={"small"}
                value={RequisitionCode()}
                disabled inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
              />
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Requisition Name'}
                size={"small"}
                value={RequisitionName()}
                disabled inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}

              />
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Requisition Status'}
                size={"small"}
                value={StatusName()}
                disabled inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}

              />
            </Grid>
          </Grid>
          <br></br>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <TextField
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Requester'}
                size={"small"}
                value={CreaterName()}
                disabled inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}

              />
            </Grid>
          </Grid>
          <br></br>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Reason to cancel   <Typography component="span" sx={{ color: red[500] }}>*</Typography>
          </Typography>
          <TextField
            multiline
            rows={1}
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
          <Button onClick={clickcancel}
          //  variant={'contained'}
           sx={{
            // backgroundColor: green[100],
            color: 'green',
            ':hover': { backgroundColor: green[100] }
          }}
            >
            Confirm
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
        
        <br />
        {
          CountGetPagedRequisition.TotalCount > rowsPerPage ? (
            <ButtonGroupComponent
              PageChange={PageChange}
              numberOfButtons={pagecount}
              rowsPerPage={rowsPerPage}
              ChangeRowsPerPage={ChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
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