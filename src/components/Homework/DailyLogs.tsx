import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getHomeworkDailyLogs } from 'src/requests/Homework/RequestHomeworkNew';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';

function DailyLogs() {
  const dispatch = useDispatch();
  let {
    DateFrommon,
    DateFromyear
  } = useParams();

  // Decode in-place
  DateFrommon = decodeURL(DateFrommon);
  DateFromyear = decodeURL(DateFromyear);


  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = sessionStorage.getItem('StandardDivisionId');
  const GetHomeworkDailyLogs = useSelector(
    (state: RootState) => state.HomeworkNew.HomeworkDailyLogs
  );
  const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('en-US', { month: 'short' });

    const Month_num = new Date(date).getMonth();

    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month} ${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });

    setAssignedYear(DateFromyear);
    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    setCurrentDate();
  }, []);

  useEffect(() => {
    if (DateFrommon || DateFromyear != undefined) {
      SetassignedMonth_num(DateFrommon);
      setAssignedYear(DateFromyear);
    }
  }, [DateFrommon, DateFromyear]);

  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      const HomeworkDailyBody = {
        aiSchoolId: asSchoolId,
        aiAcademicYearId: asAcademicYearId,
        aiStandardDivisionId: asStandardDivision,
        aiMonthId: assignedMonth_num,
        asYear: assignedYear
      };

      dispatch(getHomeworkDailyLogs(HomeworkDailyBody));
    }
  }, [assignedMonth_num]);

  const getPreviousDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-')
      ? selectedDate.split('-')
      : selectedDate.split(' ');
    const updatedDate = Date.parse(dateValues[0] + '01,' + dateValues[1]);
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-')
      ? selectedDate.split('-')
      : selectedDate.split(' ');
    const updatedDate = Date.parse(dateValues[0] + '01,' + dateValues[1]);
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() + 1);
    setCurrentDate(currentDayInMilli);
  };

  return (
    <div>
      <Box sx={{ px: 2 }}>
        <BackButton FromRoute="/Student/Homework"></BackButton>
        <PageHeader heading={'Daily Logs'} subheading={''} />
        <MonthSelector
          date={date.selectedDate}
          PrevDate={getPreviousDate}
          NextDate={getNextDate}
          Close={undefined}
        />
        {loading ? (
          <SuspenseLoader />
        ) : (
          <>
            {GetHomeworkDailyLogs.length === 0 ? (
              <>
                <ErrorMessages Error={'No records found'} />
              </>
            ) : (
              <>
                {GetHomeworkDailyLogs.map((item, i) => (
                  <div key={i}>
                    <Card
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                      component={Box}
                      mt={i === 0 ? -0.5 : 1}
                      p={1}
                    >
                      <Typography mt={0.5}>{item.Header}</Typography>
                      <a
                        href={localStorage.getItem('SiteURL') + item.Text1}
                        rel="noreferrer"
                        target="_blank"
                        style={{ textDecoration: 'none' }}
                      >
                        <FileDownloadOutlinedIcon />
                      </a>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
}

export default DailyLogs;
