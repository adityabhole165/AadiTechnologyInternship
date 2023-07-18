import { useEffect, useState } from 'react';
import { RootState } from 'src/store';
import { getDateMonthYearFormatted, getHomeworkDateFormatted, getNextDate } from '../Common/Util';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material'

import SelectedDateCalendar from 'src/libraries/DateSelector/SelectedDateCalendar';

import { CardDetail7 } from 'src/libraries/styled/CardStyle'
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled'
import { Styles } from 'src/assets/style/student-style';

import { getHomeworkDates } from 'src/requests/Homework/RequestHomeworkNew';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Card30 from 'src/libraries/card/Card30';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
function Homework() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = Styles();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const [assignedDate, setAssignedDate] = useState('')
  const [startdate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [itemList, setItemList] = useState([]);
  const [prevNext, setPrevNext] = useState(0)

  const GetHomeworkDetails = useSelector((state: RootState) => state.HomeworkNew.GetHomeworkDetails);
  const GetHomeworkDates = useSelector((state: RootState) => state.HomeworkNew.GetHomeworkDates);
  const ButtonState = useSelector((state: RootState) => state.HomeworkNew.ButtonState);
  const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);

  useEffect(() => {
    setStartDate(assignedDate)
    setEndDate(getHomeworkDateFormatted(new Date()))
  }, [])

  useEffect(() => {
    const HomeworkBody =
    {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStandardDivisionId: asStandardDivision,
      asStartdate: startdate,
      asEnddate: endDate
    }
    dispatch(getHomeworkDates(HomeworkBody))
  }, [startdate, endDate])

  useEffect(() => {
    if (GetHomeworkDates.length > 0) {
      let itemLength = GetHomeworkDates.length;
      setAssignedDate(GetHomeworkDates[itemLength-1].Value)
      setItemList(GetHomeworkDates.map((item, index) => {
        return index === itemLength-1 ?
        { ...item, IsActive: true } :
        { ...item, IsActive: false }
      }))
    }
    else {
      setAssignedDate('')
      setItemList([])
    }
  }, [GetHomeworkDates])

  const clickDate = (value) => {
    let returnDate = assignedDate
    value.map((item) => {
      if (item.IsActive)
        returnDate = item.Value
    });
    setAssignedDate(returnDate);
    setItemList(value);
  }

  const clickPrevNext = (value) => {
    setPrevNext(value)

    if (value === -1) {
      setStartDate('')
      setEndDate(getNextDate(itemList[0].Value, -1))
    } else
      if (value === 1) {
        setStartDate(getNextDate(itemList[itemList.length - 1].Value, 1))
        setEndDate('')
      }
  }
  const filterData = () =>{
    const arrParent = []
    GetHomeworkDetails.map((item)=>{
    const arrChild = []
        
        item.Child.map((obj)=>{
            if(getDateMonthYearFormatted(obj.AssignedDate) === assignedDate){
                arrChild.push(obj)
            }
        })
        if(arrChild.length>0){
            arrParent.push(
                {Id: item.Id,
                    Name: item.Name,
                    AssignedDate: item.Value,
                    Child: arrChild
                }
            )
        }
    })
    return arrParent;
  }

  const onNavigateDailyLog=()=>{
    navigate ('DailyLogs')
  }
  return (
    <div>

      <Container>
        <PageHeader heading={'Homework'} subheading={''} />
        <div>
          <DotLegend1>
            <DotLegendStyled1 className={classes.border} style={{ background: 'pink' }} />
            <CardDetail7>Completed By Date</CardDetail7>
          </DotLegend1>

        </div>{' '}
        <br />
        {loading ?
          (<SuspenseLoader />) :
          itemList.length === 0 ?
            (<ErrorMessages Error={'Homework is not available'} />) :
            (<>
              <SelectedDateCalendar DefaultDate={assignedDate}
                itemList={itemList} clickDate={clickDate} clickPrevNext={clickPrevNext}
                />
              {/* <Card30 header={GetHomeworkDetails.filter((item)=>{return getDateMonthYearFormatted(item.AssignedDate) === assignedDate})} /> */}
              <Card30 header={filterData()} />
            </>)
        }
          <ButtonPrimary sx={{float:"right"}} onClick={onNavigateDailyLog}>Daily Logs</ButtonPrimary>
      </Container>
    </div>
  )
}

export default Homework