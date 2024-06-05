import AddTwoTone from '@mui/icons-material/AddTwoTone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TablePagination, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetDeleteRequisitionBody,
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody,
} from 'src/interfaces/Requisition/IRequisition';
import RequisitionList1 from 'src/libraries/ResuableComponents/RequisitionList1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDADeleteRequisitionn,
  RequisitionListt,
  RequisitionStatus,
  resetMessage
} from 'src/requests/Requisition/RequestRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const StatusRequisition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const [SelectResult, setSelectResult] = useState(0);
  const [SelectRequisition, setRequisiton] = useState(0);
  const [regNoOrName, setRegNoOrName] = useState('');
  const [page1, setPage1] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
  const [sortExpression, setSortExpression] = useState('Created_Date desc');

  const handleHeaderClick = (updatedHeaderArray) => {
    setHeaderArray(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    setSortExpression(newSortExpression);
  };

  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: page1 * rowsPerPage,
    asEndIndex: (page1 + 1) * rowsPerPage,
    asSortExp: `ORDER BY ${sortExpression}`,
    asStatusID: SelectResult,
    asUserId: Number(asUserId)
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

  const Requisition: IGetRequisitionStatusBody = {
    asSchoolId: asSchoolId
  };
  const [PagedRequisition, setPagedRequisition] = useState([]);

  useEffect(() => {
    if (GetPagedRequisition) {
      setPagedRequisition(GetPagedRequisition);
    }
  }, [GetPagedRequisition]);

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
            sx={{ width: '25vw' }}
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
            HeaderArray={headerArray}
            ItemList={PagedRequisition}
            ClickHeader={handleHeaderClick}
            clickEdit={clickEdit}
            clickView={clickView}
            clickDelete={clickDelete}
            clickCancel={clickView}
          />
        )}
        {
          PagedRequisition.length > 0 ? (
            <TablePagination
          rowsPerPageOptions={[10,20,30]}
          component="div"
          count={PagedRequisition.length}
          rowsPerPage={rowsPerPage}
          page={page1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

          ):(
            <span></span>
            
          )
        }
        
      </Box>
    </Box>
  );
};

export default StatusRequisition;