import { Box, Card, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    IGetAcademicYearsforFeeChallanBody,
    IGetAllFeeTypesForChallanImportBody,
    IGetAllPayableforChallanBody,
    IGetDetailsForChallanImportBody,
    IGetFileNameForSNSChallanBody
} from 'src/interfaces/Student/Fees';
import BackButton from 'src/libraries/button/BackButton';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
    getAcademicYearsforFeeChallan,
    getAllFeeTypesForChallanImport,
    getAllPayableforChallan,
    getDetailsForChallanImport,
    getFileNameForSNSChallan,
    resetRecieptChallan
} from 'src/requests/Fees/Fees';
import { RootState } from 'src/store';
function GenerateChallan() {
  const dispatch = useDispatch();

  const ChallanAcadamicYear = useSelector(
    (state: RootState) => state.Fees.AcademicYearsforFeeChallan
  );
  const AllFeeTypesForChallan = useSelector(
    (state: RootState) => state.Fees.AllFeeTypesForChallanImport
  );
  const AllPayableChallan = useSelector(
    (state: RootState) => state.Fees.AllPayableforChallan
  );
  const FileNameChallan: any = useSelector(
    (state: RootState) => state.Fees.FileNameForSNSChallan
  );
  const DetailsForChallanImport: any = useSelector(
    (state: RootState) => state.Fees.DetailsForChallanImport
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = sessionStorage.getItem('StandardDivisionId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardId = sessionStorage.getItem('StandardId');
  let sitePathURL = localStorage.getItem('SiteURL');
  let downloadPathOfReceipt = sitePathURL + FileNameChallan;

  const [year, setYear] = useState('');
  const [feeType, setFeeType] = useState('');
  const [Payable, setPayable] = useState('');

  const ClickYear = (value) => {
    setYear(value);
  };

  const ClickFeeType = (value) => {
    setFeeType(value);
  };

  const ClickPayable = (value) => {
    setPayable(value);
  };
  const ChallanBody: IGetAcademicYearsforFeeChallanBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStudentId: asStudentId
  };

  const AllFeeTypesForChallanBody: IGetAllFeeTypesForChallanImportBody = {
    aiSchoolId: asSchoolId,
    aiSelectedAcademicYearId: asAcademicYearId,
    aiStandardDivisionId: asStandardDivision,
    aiStandardId: asStandardId
  };

  const AllPayableforChallanBody: IGetAllPayableforChallanBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStandardId: asStandardId,
    aiOriginalFeeTypeId: feeType
  };

  const DetailsForChallanImportBody: IGetDetailsForChallanImportBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStudentId: asStudentId,
    aiSelectedAcademicYearId: year
  };
  useEffect(() => {
    dispatch(getAcademicYearsforFeeChallan(ChallanBody));
    dispatch(getAllFeeTypesForChallanImport(AllFeeTypesForChallanBody));
  }, []);

  useEffect(() => {
    dispatch(getAllPayableforChallan(AllPayableforChallanBody));
  }, [feeType]);

  useEffect(() => {
    dispatch(getDetailsForChallanImport(DetailsForChallanImportBody));
  }, [year]);

  useEffect(() => {
    if (FileNameChallan !== '') {
      window.open(downloadPathOfReceipt);
      dispatch(resetRecieptChallan());
    }
  }, [FileNameChallan]);

  const clickGenerate = () => {
    const FileNameForChallanBody: IGetFileNameForSNSChallanBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStandardId: DetailsForChallanImport.StandardId,
      aiStandardDivisionId: DetailsForChallanImport.StandardDivisionId,
      aiSchoolwiseStudentId: DetailsForChallanImport.SchoolwiseStudentId,
      aiFeeTypeId: feeType,
      asPayableFor: Payable,
      aiSelectedAcademicYearId: year
    };
    if (year !== '' && feeType !== '' && Payable !== '') {
      dispatch(getFileNameForSNSChallan(FileNameForChallanBody));
    }
  };
  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Generate Challan'} />
      <BackButton FromRoute={'/Student/Fees'} />
      <Card component={Box} p={2}>
        <Dropdown
          Array={ChallanAcadamicYear}
          handleChange={ClickYear}
          label={'Academic Year'}
          defaultValue={year}
        />
        <br></br> <br></br>
        <Dropdown
          Array={AllFeeTypesForChallan}
          handleChange={ClickFeeType}
          label={'Select School Type'}
          defaultValue={feeType}
        />
        <br></br> <br></br>
        <Dropdown
          Array={AllPayableChallan}
          handleChange={ClickPayable}
          label={'Select Payable'}
          defaultValue={Payable}
        />
        <br></br> <br></br>
        <ButtonPrimary
          onClick={clickGenerate}
          color={
            year !== '' && feeType !== '' && Payable !== ''
              ? 'primary'
              : 'warning'
          }
        >
          Generate
        </ButtonPrimary>
      </Card>
    </Box>
  );
}

export default GenerateChallan;
