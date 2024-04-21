import AddTwoTone from '@mui/icons-material/AddTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody
} from 'src/interfaces/Requisition/IRequisition';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  RequisitionListt,
  RequisitionStatus
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

  const HeaderList = [
    'Code',
    'Requisiton',
    'Status',
    'Requestor',
    'Request Date',
    'Edit/view',
    'Delete',
    'Cancel'
  ];
  const IconList = [
    {
      Id: 1,
      Icon: <EditIcon />,
      Action: 'Edit'
    },
    {
      Id: 2,
      Icon: <DeleteIcon />,
      Action: 'Delete'
    },
    {
      Id: 3,
      Icon: <CancelIcon />,
      Action: 'Cancel'
    }
  ];

  const Requision = useSelector(
    (state: RootState) => state.SliceRequisition.Requisition
  );
  console.log(Requision, 'StatusRequisition');

  const [PagedRequisition, setPagedRequisition] = useState([]);
  const GetPagedRequisition = useSelector(
    (state: RootState) => state.SliceRequisition.RequisitionList
  );
  useEffect(() => {
    setPagedRequisition(GetPagedRequisition);
  }, [GetPagedRequisition]);
  console.log(GetPagedRequisition, 'GetPagedRequisitionList');

  useEffect(() => {
    dispatch(RequisitionStatus(Requisition));
  }, []);
  useEffect(() => {
    dispatch(RequisitionListt(RequisitionList));
  }, [SelectResult]);

  const Requisition: IGetRequisitionStatusBody = {
    asSchoolId: asSchoolId
  };
  const RequisitionList: IGetPagedRequisitionBody = {
    asSchoolId: asSchoolId,
    asStartIndex: 0,
    asEndIndex: 15,
    asSortExp: 'ORDER BY Created_Date desc',
    asStatusID: SelectResult,
    asUserId: Number(asUserId)
  };

  const GetRequisitionStatusDropdown = (value) => {
    setSelectResult(value);
  };
  const ClickItem = (value) => { };
  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/ExamResultBase');
  };
  const onClickAdd = () => {
    navigate('/extended-sidebar/Teacher/ExamResultBase');
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
          const text1Match = item.Text2.toLowerCase().includes(
            regNoOrName.toLowerCase()
          );
          const text2Match = item.Text4.toLowerCase().includes(
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
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' }
        ]}
        rightActions={<>

          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={Requision}
            onChange={GetRequisitionStatusDropdown}
            label={'Category'}
            defaultValue={SelectResult.toString()} // Convert number to string
            mandatory
            size={"small"}
          />
          <TextField
            sx={{ wdth: '300px' }}
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
            >
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
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={PagedRequisition}
            IconList={IconList}
            ClickItem={ClickItem}
          />
        )}
      </Box>
    </Box>
  );
};
export default StatusRequisition;
