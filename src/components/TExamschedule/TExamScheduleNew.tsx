import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import Exam from '../Holidays/Exam';

const TExamScheduleNew = () => {
  const dispatch = useDispatch();

  const getstandard = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectStandard
  );
  const getExamlist = useSelector(
    (state: RootState) => state.StandardAndExamList.ExamData
  );
  console.log(getExamlist, "getExamlist");

  const SubList = useSelector(
    (state: RootState) => state.StandardAndExamList.VeiwAllData
  );
  const loading = useSelector(
    (state: RootState) => state.StandardAndExamList.Loading
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const asStandardId = sessionStorage.getItem('StandardId');


  const [std, setStd] = useState('0'); // Default to '0' for "All"
  const [showCardData, setShowCardData] = useState(false);
  const Data4 = getExamlist.filter((item) => item.SchoolWise_Test_Name == "")

  const getstandardList_body = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const ExamList_body = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: std
  };

  useEffect(() => {
    dispatch(GetSelectStandardRes(getstandardList_body));
    if (RoleId === '3') {
      setStd(asStandardId);
    }
  }, []);

  const stdChange = (value) => {
    setStd(value);
    setShowCardData(false); // Reset the card data visibility on standard change
  };

  useEffect(() => {
    if (std !== '') {
      dispatch(ViewExamDataRess(ExamList_body));
    }
  }, [std]);

  useEffect(() => {
    if (getstandard.length > 0) {
      setStd(getstandard[0].id);
    }
  }, [getstandard]);

  const getTime = (startTime, endTime) => {
    const [startHours, startMinutes, startPeriod] = startTime.split(/:|\s/);
    let adjustedStartHours =
      parseInt(startHours, 10) + (startPeriod === 'PM' ? 12 : 0);
    const [endHours, endMinutes, endPeriod] = endTime.split(/:|\s/);
    let adjustedEndHours =
      parseInt(endHours, 10) + (endPeriod === 'PM' ? 12 : 0);

    const startDate = new Date();
    startDate.setHours(adjustedStartHours);
    startDate.setMinutes(parseInt(startMinutes, 10));

    const endDate = new Date();
    endDate.setHours(adjustedEndHours);
    endDate.setMinutes(parseInt(endMinutes, 10));

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const hours1 = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes2 = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return hours1 + ' hrs ' + minutes2 + ' mins';
  };

  const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

  const getExamName = () => {
    const selectedExam = getExamlist.find((Item) => Item.Value === Exam);
    return selectedExam ? selectedExam.Text1 : '';
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Exam Schedule',
            path: ''
          }
        ]}
        rightActions={
          <>
            <Box sx={{ width: '200px', mr: 2 }}>
              {RoleId !== '3' && (
                <Dropdown
                  Array={getstandard}
                  handleChange={stdChange}
                  label={'Select Standard'}
                  size={'small'}
                  variant="outlined"
                  defaultValue={std}
                />
              )}
            </Box>
            <Box>
              <Tooltip title="Display Standardwise Exam Schedule.">
                <IconButton sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}>
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />

      {SubList.length > 0 && (
        <Box
          sx={{
            mt: 2,
            cursor: 'pointer',
            backgroundColor: '#FFC0CB',
            padding: '7px',
            border: '1px solid brown',
            borderRadius: '3px',
          }}
          onClick={() => setShowCardData(!showCardData)}
        >
          <Typography variant="h6" sx={{ color: '#654321' }}>
            <b>{getExamName()}</b>
            {Data4}
          </Typography>
        </Box>
      )}

      {showCardData && getExamlist.length > 0 ? (
        <Box sx={{ background: 'white', p: 2, mt: 2 }}>
          {loading ? (
            <SuspenseLoader />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time & Duration</TableCell>
                    {std === '0' && classList.map((className) => (
                      <TableCell key={className}>{className}</TableCell>
                    ))}
                    {std !== '0' && <TableCell>Subject</TableCell>}
                    <TableCell>Description</TableCell>

                    <TableCell>Instructions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {SubList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.text3 || '--'}</TableCell>
                      <TableCell>
                        {item.startTime} - {item.endTime}
                        <br />
                        ({getTime(item.startTime, item.endTime)})
                      </TableCell>
                      {std === '0' ? (
                        classList.map((className) => (
                          <TableCell key={`${className}-${index}`}>
                            {item.Standard_Name === className ? item.header || '--' : '--'}
                          </TableCell>
                        ))
                      ) : (
                        <TableCell>{item.header || '--'}</TableCell>
                      )}
                      <TableCell >{item.Description || '--'}</TableCell>
                      <TableCell sx={{ color: 'blue' }}>{item.Instructions || '--'}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
          <b>No exam has been scheduled</b>
        </Typography>
      )}
    </Box>
  );
};

export default TExamScheduleNew;
