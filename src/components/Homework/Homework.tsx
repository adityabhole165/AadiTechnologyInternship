import { useState } from 'react';
import Buttons from 'src/libraries/buttons/button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IHomework,
  IHomeworkSubject
} from 'src/interfaces/Student/Homework';
import {
  getHomeworkSubject
} from 'src/requests/Homework/Homework';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container, styled ,Grid , Card} from '@mui/material';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Card30 from 'src/libraries/card/Card30';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { Styles } from 'src/assets/style/student-style';
import DateSelector from 'src/libraries/buttons/DateSelector';
import { getDateFormatted } from '../Common/Util'
import { useParams } from 'react-router-dom';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { CardDetail7, ListStyle } from 'src/libraries/styled/CardStyle';
import DotLegend from 'src/libraries/summary/DotLegend';
import HomeworkNew from './HomeworkNew';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
function Homework() {
  const dispatch = useDispatch();
  const {DateFromHomework } = useParams();
  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedDate, setAssignedDate] = useState<string>();
  const [calanderSelected, setcalanderSelected] = useState(false);
  const [CalanderDate, setCalanderDate] = useState("");
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const Id = sessionStorage.getItem('Id');

  const HomeworkSubjectList = useSelector(
    (state: RootState) => state.Homework.HomeworkSubjectData
  );
  const loading = useSelector(
    (state: RootState) => state.Homework.Loading);



  const homework_Body: IHomework = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate}`,
    asLoginUserId: Id
  };

  const homeworkSubject_Body: IHomeworkSubject = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asDate: `${calanderSelected ? CalanderDate : assignedDate}`,
    asLoginUserId: Id
  };

  const getCurrentDate1 = (newDate?: Date) => {
    const date = `${calanderSelected ? CalanderDate : newDate || new Date()}`;
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Day} ${Month} ${Year}`;
   
    setDate({
      selectedDate: NewDateFormat
    });
    setAssignedDate(NewDateFormat);
    setcalanderSelected(false);
  };

  const getCurrentDate = (newDate?: Date) => {
    setAssignedDate(getDateFormatted(newDate).replace("-"," ").replace("-"," "));
    setcalanderSelected(false);
  };


  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    getCurrentDate();
  }, []);

  useEffect(() => {
    if (homeworkSubject_Body.asDate != "undefined")
      dispatch(getHomeworkSubject(homeworkSubject_Body));
  }, [assignedDate, CalanderDate]);

  useEffect(() => {
    if(DateFromHomework != undefined){
      setAssignedDate(DateFromHomework);
    }
  }, [DateFromHomework]);
  


  const getNextDate = (dayMultiple) => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay * dayMultiple;
    const next = new Date(nextDayInMilli);
    getCurrentDate(next);
  };


  const CalenderDateHandler = (e) => {
    const date = new Date(e);
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Day}-${Month}-${Year}`;
    setCalanderDate(NewDateFormat);
    setcalanderSelected(true);
  }
  const [itemList, setItemList] = useState([{ Id: "1", Name: "2 Feb", Value: "2 feb", IsActive: true },
  { Id: "2", Name: "3 Feb", Value: "3 feb", IsActive: false },
  { Id: "3", Name: "4 Feb", Value: "4 feb", IsActive: false },
  { Id: "4", Name: "5 Feb", Value: "5 feb", IsActive: false },
  { Id: "5", Name: "6 Feb", Value: "6 feb", IsActive: false },
  { Id: "6", Name: "7 Feb", Value: "15 feb", IsActive: false },
]);
  
  const clickItem = (value) => {
    setItemList(value);
  }
  const [index, setIndex] = useState(0);
  const arrowClick = (value) => {
    const maxlength = itemList.length -1;
    const min = 0;
    if (value === -1 && index === 0) {
      setIndex(maxlength)
    }else
    if (value === 1 && index === maxlength) {
      setIndex(min)
    }
    else {
      setIndex(index + value)
      
    }

  }
  const classes = Styles();
  return (
    <>
      <Container>
        <PageHeader heading={'Homework'} subheading={''} />
        <div>
        <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#8896FF' }}
            />
                   

            <CardDetail7>Completed By Date</CardDetail7>
          </DotLegend1>
        
        </div>{' '}
        <br />
        {/* <DateSelector date={assignedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector> */}

        {/* {loading ? (
          <SuspenseLoader />
        ) : HomeworkSubjectList.length === 0 ? (
          <ErrorMessages Error={'Homework is not available'} />
        ) : (


          <Card30 header={HomeworkSubjectList} />

        )} */}
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={2} sx={{textAlign:"center"}}>
            <ListStyle><ArrowLeft onClick={() => arrowClick(-1)}/></ListStyle>
         </Grid>
         <Grid item xs={8}>
        <HomeworkNew ItemList={itemList} clickItem={clickItem}/>
        </Grid>
         <Grid item xs={2} sx={{textAlign:"center"}}>
          <ListStyle>
          <ArrowRight onClick={() => arrowClick(1)} />
          </ListStyle>
         </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Homework;
