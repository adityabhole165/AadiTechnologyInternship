import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Container, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeworkCard from 'src/libraries/card/HomeworkCard';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { RootState } from 'src/store';
import { ErrorDetail } from '../styled/ErrormessageStyled';

const SelectedDateCalendar = ({
  DefaultDate,
  itemList,
  clickDate,
  clickPrevNext
}) => {
  const dispatch = useDispatch();
  const [startDate, setStartdate] = useState('');
  const [endDate, setEnddate] = useState('');
  // const [itemList, setItemList] = useState([]);

  const GetHomeworkDetails = useSelector(
    (state: RootState) => state.HomeworkNew.GetHomeworkDetails
  );

  const GetHomeworkDates = useSelector(
    (state: RootState) => state.HomeworkNew.GetHomeworkDates
  );
  const ButtonState = useSelector(
    (state: RootState) => state.HomeworkNew.ButtonState
  );
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = sessionStorage.getItem('StandardDivisionId');
  const [errDates, setErrDates] = useState('');
  const [prevNext, setPrevNext] = useState(0);

  // useEffect(() => {
  //     if (GetHomeworkDates.length > 0) {

  //         setItemList(GetHomeworkDates.map((item, index) => {
  //             return index === 0 ?
  //                 { ...item, IsActive: true } :
  //                 { ...item, IsActive: false }
  //         }))
  //         setCurrentDate(GetHomeworkDates[0].Value)
  //         setErrDates('')
  //     } else {
  //         setCurrentDate('')
  //         if (prevNext === -1)
  //             setErrDates('Homework not available for previous date')
  //         else if (prevNext === 1)
  //             setErrDates('Homework not available for Next date')
  //     }
  // }, [GetHomeworkDates])

  // useEffect(() => {
  //     const HomeworkBody =
  //     {
  //         aiSchoolId: asSchoolId,
  //         aiAcademicYearId: asAcademicYearId,
  //         aiStandardDivisionId: asStandardDivision,
  //         asStartdate: startDate,
  //         asEnddate: getHomeworkDateFormatted(new Date())
  //     }
  //     dispatch(getHomeworkDates(HomeworkBody))
  // // }, [])

  // const clickItem = (value) => {
  //     let returnDate = DefaultDate
  //     value.map((item) => {
  //         if (item.IsActive)
  //             returnDate = item.Value
  //     });
  //     clickDate(returnDate)
  //     // setItemList(value);
  // }
  const [index, setIndex] = useState(0);
  // const arrowClick = (value) => {
  //     setPrevNext(value)

  //     if (value === -1) {
  //         const HomeworkBody =
  //         {
  //             aiSchoolId: asSchoolId,
  //             aiAcademicYearId: asAcademicYearId,
  //             aiStandardDivisionId: asStandardDivision,
  //             asStartdate: '',
  //             asEnddate: getNextDate(itemList[0].Value, -1)
  //         }
  //         dispatch(getHomeworkDates(HomeworkBody))
  //     } else
  //         if (value === 1) {
  //             const HomeworkBody =
  //             {
  //                 aiSchoolId: asSchoolId,
  //                 aiAcademicYearId: asAcademicYearId,
  //                 aiStandardDivisionId: asStandardDivision,
  //                 asStartdate: getNextDate(itemList[itemList.length - 1].Value, 1),
  //                 asEnddate: ''
  //             }
  //             dispatch(getHomeworkDates(HomeworkBody))
  //         }
  // }
  return (
    <div>
      <Container>
        {errDates !== '' ? (
          <ErrorDetail>{errDates}</ErrorDetail>
        ) : (
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <IconButton disabled={!ButtonState?.AllowPrevious}>
                <ListStyle>
                  <ArrowLeft onClick={() => clickPrevNext(-1)} />
                </ListStyle>
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <HomeworkCard ItemList={itemList} clickItem={clickDate} />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <IconButton disabled={!ButtonState?.AllowNext}>
                <ListStyle>
                  <ArrowRight onClick={() => clickPrevNext(1)} />
                </ListStyle>
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default SelectedDateCalendar;
