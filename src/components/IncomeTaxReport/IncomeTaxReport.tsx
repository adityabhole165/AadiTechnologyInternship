import { Box, FormControl, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllAcademicYearsApiBody,
  GetFinancialYearDetailsBody,
  IGetITRFileNameBody
} from 'src/interfaces/Student/IIncomeTaxReport';
import Note from 'src/libraries/Note/Note';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import {
  getAllAcademicYears,
  getAllFinancialYears,
  getAllFinancialYearsifAcademic,
  getIncomeTaxReport,
  resetReciept
} from 'src/requests/IncomeTaxReport/RequestIncomeTax';
import { RootState } from 'src/store';

// import 'src/assets/style/BdayCard.css';

const note = ['1) Gives income tax statement for paid fees'];

function IncomeTaxReport() {
  const dispatch = useDispatch();

  const [financialYear, setFinancialYear] = useState('0');
  // console.log("financialYear",financialYear);

  const [acadamicYear, setAcadamicYear] = useState('0');
  const [parentName, setParentName] = useState('0');

  const IncomeTaxReport: any = useSelector(
    (state: RootState) => state.IncomeTaxReport.GetIncomeTaxReport
  );

  const AcadamicYear: any = useSelector(
    (state: RootState) => state.IncomeTaxReport.YearList
  );

  const FinancialYearList: any = useSelector(
    (state: RootState) => state.IncomeTaxReport.GetFinancialYear
  );

  //   console.log("FinancialYearList",FinancialYearList);

  const StudentName = sessionStorage.getItem('StudentName');
  const Standard = sessionStorage.getItem('Class');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const filePath = IncomeTaxReport.replace(/\\/g, '/');
  let sitePathURL = localStorage.getItem('SiteURL');
  let downloadPathOfReceipt = sitePathURL + filePath;

  const GetITRFileNameBody: IGetITRFileNameBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStudentId: asStudentId,
    aiFinancialStartYear: financialYear,
    SelectAcademicYearId: acadamicYear,
    ITRCategoryId: parentName,
    aiLoginUserId: asUserId
  };

  const body1: GetAllAcademicYearsApiBody = {
    aiSchoolId: asSchoolId,
    aiYearwiseStudentId: asStudentId
  };
  const body2: GetFinancialYearDetailsBody = {
    aiSchoolId: asSchoolId
  };
  useEffect(() => {
    // console.log(downloadPathOfReceipt,"downloadPathOfReceipt")
    if (IncomeTaxReport !== '') window.open(downloadPathOfReceipt);
    dispatch(resetReciept());
  }, [IncomeTaxReport]);

  useEffect(() => {
    if (FinancialYearList.length > 0)
      setFinancialYear(FinancialYearList[0].Value);
  }, [FinancialYearList]);

  useEffect(() => {
    dispatch(getAllAcademicYears(body1));
  }, []);
  //console.log('acadamicYear', acadamicYear);

  useEffect(() => {
    if (acadamicYear == '0') {
      dispatch(getAllFinancialYearsifAcademic(body2));
    } else {
      dispatch(getAllFinancialYears(body2));
    }
  }, [acadamicYear]);

  const UserArray2 = [
    {
      Name: 'All',
      Id: '0',
      Value: '0'
    },
    {
      Name: 'Father',
      Id: '2',
      Value: '1'
    },
    {
      Name: 'Mother',
      Id: '3',
      Value: '2'
    }
  ];

  const clickAcadamicYear = (value) => {
    setAcadamicYear(value);
    setFinancialYear('0');
  };

  const clickFinacialYear = (value) => {
    setFinancialYear(value);
    setAcadamicYear('0');
  };

  const clickParentName = (value) => {
    setParentName(value);
  };

  const ClickDisplay = () => {
    dispatch(getIncomeTaxReport(GetITRFileNameBody));
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <PageHeader heading={'Income Tax Report'} subheading={''} />
        <Note NoteDetail={note} />
        <ListStyle>
          <Typography> Name</Typography>
          <TextField
            fullWidth
            variant="standard"
            size="small"
            value={StudentName + ' ' + '(' + Standard + ')'}
            sx={{ mb: '10px' }}
          />
          <Typography> Select Financial Year</Typography>
          <FormControl fullWidth>
            <Dropdown
              Array={FinancialYearList}
              handleChange={clickFinacialYear}
              defaultValue={financialYear}
            />
          </FormControl>

          <Typography sx={{ mt: '10px' }}> Select Academic Year</Typography>
          <FormControl fullWidth>
            <Dropdown
              Array={AcadamicYear}
              handleChange={clickAcadamicYear}
              defaultValue={acadamicYear}
            />
          </FormControl>

          <Typography sx={{ mt: '10px' }}> Select Category</Typography>
          <FormControl fullWidth sx={{ mt: '2px' }}>
            {/* <InputLabel variant="standard">Select Category</InputLabel> */}
            <Dropdown
              Array={UserArray2}
              handleChange={clickParentName}
              defaultValue={parentName}
            />
          </FormControl>
          <br />
          <br />
          <ButtonPrimary fullWidth onClick={ClickDisplay}>
            Display Report
          </ButtonPrimary>
        </ListStyle>
      </Box>
    </>
  );
}

export default IncomeTaxReport;
