import React from 'react';
import Accordion5 from 'src/libraries/accordion/accordion5';
import { getClaimlist } from 'src/requests/Library/Library';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import {
  Button,
  CardHeader,
  Checkbox,
  Grid,
  Container,
  Typography,
  Box
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { RootState } from 'src/store';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';
import { IClaimList, GetClaimResult } from 'src/interfaces/Student/Library';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { Styles } from 'src/assets/style/student-style';

function Claim() {
  const dispatch = useDispatch();
  const ClaiM = useSelector((state: RootState) => state.library.ClaimList);
  const claim = { title: ' Show all claimed books by all users' };
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);

  const SchoolId = sessionStorage.getItem('SchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const asBookTittleName = sessionStorage.getItem('BookTittleName');
  const asUserName = sessionStorage.getItem('UserName');
  const asStartRowIndex = localStorage.getItem('StartRowIndex');
  const asSortRowIndexExpression = localStorage.getItem('SortRowIndexExpression');

  const classes = Styles();

  const Claim_body: IClaimList = {
    aiSchoolId: SchoolId,
    aiAcademicYearId: AcademicYearId,
    aiUserId: asUserId,
    asBookTitle: asBookTittleName,
    asUserName: asUserName,
    aiStartRowIndex: asStartRowIndex,
    aiEndIndex: 20,
    asSortExpression: asSortRowIndexExpression,
    aiAllUser: value
  };
  useEffect(() => {
    dispatch(getClaimlist(Claim_body));
  }, [value]);

  const handleChange = () => {
    setChecked(!checked);
    if (checked) {
      setValue(0);
    } else {
      setValue(1);
    }
  };

  return (
    <>
      <PageHeader heading={'Claimed Book Details'} subheading={''} />
    
        <BackButton FromRoute={"/Student/Library"}/>
     

      <Container>
      
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Checkbox
            value={1}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography className={classes.Listfont1} sx={{ marginTop: '10px' }}>
            {' '}
            Show all claimed books by all users
          </Typography>
        </Box>
      </Container>

      {ClaiM.map((items: GetClaimResult, i) => {
        return (
          <Accordion5
            key={i}
            Datee={items.ReservationDate}
            Title={items.Book_Title}
            username={items.UserName}
            desig={items.ClassNameDesignation}
            parents={items.IsForParent}
          />
        );
      })}
    </>
  );
}
export default Claim;
