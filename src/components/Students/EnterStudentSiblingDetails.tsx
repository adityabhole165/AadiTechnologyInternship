import { SearchTwoTone } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import SquareIcon from '@mui/icons-material/Square';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteStudentSiblingDetailsBody, IGetStudentDetailsForSiblingBody, IGetStudentSiblingListBody, IGetStudentsListBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { CDADeleteStudentSiblingDetailsMsg, CDAGetStudentDetailsForSiblingPop, CDAGetStudentSiblingList, CDASearchStudentsList, ResetDeleteStudentSiblingDetailsMsg } from 'src/requests/StudentDetails/RequestStudentDetails';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddSiblingStudentTable from './AddSiblingStudentTable';
import StudentTable from './StudentTable';

const EnterStudentSiblingDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    Name,
    standardId,
    DivisionId,
    YearWise_Student_Id,
    SchoolWise_Student_Id,
    StandardDivision_Id,
    Enrolment_Number,
    Joining_Date
  } = location.state || {};
  //console.log('LOcation', location.state);

  // Session & Local Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const teacherId = sessionStorage.getItem('Id');
  const { showAlert, closeAlert } = useContext(AlertContext);

  const students = [
    { id: 2057, name: 'Master Pranav Digambar Dubal', class: '10 - D' },
    { id: 2060, name: 'Miss Ishita Dattatray Gaikwad', class: '10 - A' },
    { id: 2061, name: 'Miss Sanskruti Dilip Gaikwad', class: '10 - A' },
    { id: 2063, name: 'Miss Arya Krushnakumar Garde', class: '10 - D' },
    { id: 2065, name: 'Miss Nirmayee Nagesh Ghatpande', class: '10 - A' },
    { id: 2066, name: 'Master Harshwardhan Vijay Ghule', class: '10 - D' },
    { id: 2067, name: 'Miss Rajlaxmi Vijay Ghule', class: '10 - B' },
    { id: 2068, name: 'Master Shambhuraj Abhijit Ghule', class: '10 - A' },
    { id: 2069, name: 'Master Shlok Ashwinkumar Gilda', class: '10 - A' }
  ];
  //StudentName
  const StudentDetailsForSibling = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentDetailsForSibling);
  const oStudentDetailsForSibling: any = StudentDetailsForSibling;
  const StudentName = oStudentDetailsForSibling?.StudentFullName;         //Student Name
  console.log('1️⃣StudentName', StudentName);
  //Sibling List
  const GetStudentSiblingList = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentSiblingList);
  console.log('2️⃣GetStudentSiblingList', GetStudentSiblingList);
  //Search List
  const SearchStudentsList = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentsList);
  console.log('3️⃣SearchStudentsList', SearchStudentsList);
  //DeleteMsg
  const DeleteStudentSiblingDetailsMsg = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISDeleteStudentSiblingDetailsMsg);
  console.log('5️⃣DeleteStudentSiblingDetailsMsg', DeleteStudentSiblingDetailsMsg);

  const GetStudentSiblingListBody: IGetStudentSiblingListBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asYearwiseStudentId: YearWise_Student_Id
  }

  useEffect(() => {
    //document.title = 'Enter Student Sibling Details';
    const GetStudentDetailsForSiblingBody: IGetStudentDetailsForSiblingBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asYearwiseStudentId: YearWise_Student_Id
    }
    dispatch(CDAGetStudentDetailsForSiblingPop(GetStudentDetailsForSiblingBody))
    dispatch(CDAGetStudentSiblingList(GetStudentSiblingListBody))
  }, []);

  useEffect(() => {
    const GetStudentsListBody: IGetStudentsListBody = {
      "asSchoolId": Number(schoolId),
      "asAcademicYearId": Number(academicYearId),
      "asYearwiseStudentId": YearWise_Student_Id,
      "asFilter": "tupe",
      "asStartIndex": 0,
      "asEndIndex": 20,
      "asSortExpression": "RegNo"

    }
    dispatch(CDASearchStudentsList(GetStudentsListBody))
  }, []);

  const handleDelete = (StudentSiblingId) => {
    const DeleteStudentSiblingDetailsBody: IDeleteStudentSiblingDetailsBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asYearwiseSiblingStudentId: YearWise_Student_Id,
      asSiblingStudentId: Number(StudentSiblingId),
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteStudentSiblingDetailsMsg(DeleteStudentSiblingDetailsBody))
        closeAlert();
      }
    });
  };
  useEffect(() => {
    if (DeleteStudentSiblingDetailsMsg !== '') {
      toast.success(DeleteStudentSiblingDetailsMsg);
      dispatch(ResetDeleteStudentSiblingDetailsMsg());

      dispatch(CDAGetStudentSiblingList(GetStudentSiblingListBody))
    }
  }, [DeleteStudentSiblingDetailsMsg]);


  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/StudentRegistrationForms'
          },
          {
            title: 'Enter Student Sibling Details',
            path: '/extended-sidebar/Teacher/EnterStudentSiblingDetails'
          }
        ]}
        rightActions={
          <>
            <TextField
              sx={{ width: '18vw' }}
              fullWidth
              name="StudentName"
              label={'Student Name'}
              value={StudentName || ''}
              variant="outlined"
              size="small"
            />
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Name / Reg. No.<span style={{ color: 'red' }}> </span>
                </span>
              }
              variant="outlined"
              size="small"
            //   value={searchTerm}
            //   onChange={(e) => handleSearch(e.target.value)}
            />
            <Tooltip title="Search">
              <IconButton
                // onClick={() => handleSearch(searchTerm)}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  marginLeft: '0.5rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <SearchTwoTone />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title={'Add/Edit student details and click on "Save".'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip> */}

            <Tooltip title={'Save'}>
              <IconButton
                // onClick={handleFormSubmission}
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ background: 'white', p: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <SquareIcon style={{ color: '#F0F0F0', fontSize: 25, position: 'relative', top: '-2px' }} />
              <Typography variant='h6'>Deactivated User </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
        <Typography variant="h4" sx={{ py: 1 }}>

          Sibling Details
        </Typography>
        <AddSiblingStudentTable itemList={GetStudentSiblingList} onDelete={handleDelete} />
      </Box>

      <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
        <StudentTable students={SearchStudentsList} />
      </Box>
    </Box>
  );
};
export default EnterStudentSiblingDetails;
