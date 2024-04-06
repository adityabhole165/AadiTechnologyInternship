import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody
} from 'src/interfaces/Requisition/IRequisition';
import PageHeader from 'src/libraries/heading/PageHeader';
import DropDown from 'src/libraries/list/DropDown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  RequisitionListt,
  RequisitionStatus
} from 'src/requests/Requisition/RequestRequisition';
import { RootState } from 'src/store';

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

  return (
    <Box sx={{ px: 2 }}>
      <br></br>
      <br></br>
      <PageHeader heading="Requisition" />
      <Grid container spacing={0.5} alignItems="center">
        <Grid item xs={3}>
          <Typography margin={'25px'}>
            <b>Status:</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ marginRight: '0px', width: '110%', padding: '0.9px' }}>
            <DropDown
              itemList={Requision}
              ClickItem={GetRequisitionStatusDropdown}
              DefaultValue={SelectResult}
              Label={'--Select--'} width={undefined} />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Typography margin={'1px'}>
          <b>Requisition Name/Requestor:</b>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          label=""
          value={regNoOrName}
          onChange={(e) => {
            handleRegNoOrNameChange(e.target.value);
          }}
          fullWidth
        />
        <br></br>
      </Grid>
      <Grid item xs={2}>
        <ButtonPrimary
          onClick={clickSearch}
          variant="contained"
          style={{ marginRight: '150px', backgroundColor: 'green' }}
        >
          Search
        </ButtonPrimary>
      </Grid>
      <Grid item xs={2}>
        <ButtonPrimary
          onClick={clickReset}
          variant="contained"
          style={{ marginRight: '150px', backgroundColor: 'green' }}
        >
          Reset
        </ButtonPrimary>
      </Grid>
      <ButtonPrimary variant="contained" onClick={onClickAdd}>
        Add
      </ButtonPrimary>
      <ButtonPrimary
        variant="contained"
        onClick={onClickBack}
        style={{ backgroundColor: 'Red', color: 'white' }}
      >
        BACK
      </ButtonPrimary>
      <DynamicList2
        HeaderList={HeaderList}
        ItemList={PagedRequisition}
        IconList={IconList}
        ClickItem={ClickItem}
      />
    </Box>
  );
};
export default StatusRequisition;
