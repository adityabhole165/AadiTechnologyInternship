import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeworkCard from 'src/libraries/card/HomeworkCard';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import {
  getHomeworkDates,
  getHomeworkDetails
} from 'src/requests/Homework/RequestHomeworkNew';
import { RootState } from 'src/store';

function HomeworkNew() {
  const dispatch = useDispatch();
  const [startDate, setStartdate] = useState();
  const [endDate, setEnddate] = useState();
  // const [itemList, setItemList] = useState([]);
  const [itemList, setItemList] = useState([
    { Id: '1', Name: '2 Feb', Value: '2 feb', IsActive: true },
    { Id: '2', Name: '3 Feb', Value: '3 feb', IsActive: false },
    { Id: '3', Name: '4 Feb', Value: '4 feb', IsActive: false },
    { Id: '4', Name: '5 Feb', Value: '5 feb', IsActive: false },
    { Id: '5', Name: '6 Feb', Value: '6 feb', IsActive: false },
    { Id: '6', Name: '7 Feb', Value: '15 feb', IsActive: false }
  ]);

  const GetHomeworkDetails = useSelector(
    (state: RootState) => state.HomeworkNew.GetHomeworkDetails
  );

  const GetHomeworkDates = useSelector(
    (state: RootState) => state.HomeworkNew.GetHomeworkDates
  );
  //console.log('GetHomeworkDates', GetHomeworkDates);

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = sessionStorage.getItem('StandardDivisionId');

  const HomeworkBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStandardDivisionId: asStandardDivision,
    asStartdate: startDate,
    asEnddate: endDate
  };

  useEffect(() => {
    dispatch(getHomeworkDetails(HomeworkBody));
  }, []);
  useEffect(() => {
    dispatch(getHomeworkDates(HomeworkBody));
  }, []);

  const clickItem = (value) => {
    setItemList(value);
  };
  const [index, setIndex] = useState(0);
  const arrowClick = (value) => {
    const maxlength = itemList.length - 1;
    const min = 0;
    if (value === -1 && index === 0) {
      setIndex(maxlength);
    } else if (value === 1 && index === maxlength) {
      setIndex(min);
    } else {
      setIndex(index + value);
    }
  };
  return (
    <div>
      <Box sx={{ px: 2 }}>
        <PageHeader heading={'Homework'} subheading={''} />

        <Grid container spacing={1} alignItems={'center'}>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            <ListStyle>
              <ArrowLeft onClick={() => arrowClick(-1)} />
            </ListStyle>
          </Grid>
          <Grid item xs={8}>
            <HomeworkCard ItemList={itemList} clickItem={clickItem} />
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            <ListStyle>
              <ArrowRight onClick={() => arrowClick(1)} />
            </ListStyle>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomeworkNew;
