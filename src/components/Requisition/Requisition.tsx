import AddTwoTone from '@mui/icons-material/AddTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TablePagination, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody,
  IGetDeleteRequisitionBody
} from 'src/interfaces/Requisition/IRequisition';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  CDADeleteRequisitionn,
  RequisitionListt,
  RequisitionStatus,
  resetMessage
} from 'src/requests/Requisition/RequestRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import RequisitionList1 from 'src/libraries/ResuableComponents/RequisitionList1';

const StatusRequisition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const [SelectResult, setSelectResult] = useState(0);
  const [SelectRequisition, setRequisiton] = useState(0);
  const [regNoOrName, setRegNoOrName] = useState('');
  const [PagedRequisition, setPagedRequisition] = useState([]);
  const [page1, setPage1] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: 'Code', SortOrder: "asc" },
    { Id: 2, Header: 'Requisiton' },
    { Id: 3, Header: 'Status' },
    { Id: 4, Header: 'Requestor' },
    { Id: 5, Header: 'Request Date' },
    { Id: 6, Header: 'Edit/view' },
    { Id: 7, Header: 'Delete' },
    { Id: 8, Header: 'Cancel' },
  ]);
  const Requision = useSelector(
    (state: RootState) => state.SliceRequisition.Requisition
  );

  const GetPagedRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.RequisitionList
  );

  const DeleteRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.ISDeleteRequisition
  );

  const Requisition: IGetRequisitionStatusBody = {
    asSchoolId: asSchoolId
  };
  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: page1 * rowsPerPage,
    asEndIndex: (page1 + 1) * rowsPerPage,
    asSortExp: 'ORDER BY Created_Date desc',
    asStatusID: SelectResult,
    asUserId: Number(asUserId)
  };
  const clickDelete = (Id) => {
    alert(Id)
    if (confirm('Are you sure you want to delete this Requisition?')) {
      const DeleteRequisitionBody: IGetDeleteRequisitionBody = {
        asRequisitionId:Id,
        asSchoolId:asSchoolId
      };
    dispatch(CDADeleteRequisitionn(DeleteRequisitionBody));

    }
  };

  const GetRequisitionStatusDropdown = (value) => {
    setSelectResult(value);
  };
  const ClickItem = (value) => { };

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
  const ClickHeader = (value) => {
    setHeaderPublish(value)
  }

 
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
    if (DeleteRequisition != '') {
      dispatch(resetMessage());
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
  }, [SelectResult, page1, rowsPerPage ]);


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
            defaultValue={SelectResult.toString()} // Convert number to string
            mandatory
            size={"small"}
          />
          <TextField
            sx={{ wdth: '25vw' }}
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
            // disabled={selectClasstecaher === '0'}
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
      <Box mb={1} sx={{ p: 2, background: 'white' }}>
        {PagedRequisition && PagedRequisition.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No Record Found.</b>
          </Typography>
        ) : (
          <RequisitionList1
          HeaderArray={HeaderPublish}
            ItemList={PagedRequisition}
            ClickHeader={ClickHeader}
            clickEdit={clickEdit}
            clickView={clickView}
            clickDelete={clickDelete}
            clickCancel={ClickHeader}
          />
        )}

               <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={PagedRequisition.length}
                    rowsPerPage={rowsPerPage}
                    page={page1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
      </Box>

      

    </Box>
  );
};
export default StatusRequisition;
