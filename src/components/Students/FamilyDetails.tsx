import { Box } from '@mui/material';
import { useState } from 'react';


const FamilyDetails = ({ onSave }) => {

  const [form, setForm] = useState({
    // Father's Information
    fatherQualification: '',
    fatherEmail: '',
    fatherOfficeName: '',
    fatherOfficeAddress: '',
    fatherDesignation: '',
    fatherDOB: '',
    fatherPhoto: '',
    fatherWeight: '',
    fatherHeight: '',
    fatherBloodGroup: '',
    fatherAadharCard: '',
    fatherAnnualIncome: '',

    // Mother's Information
    motherOccupation: '',
    motherQualification: '',
    motherEmail: '',
    motherOfficeName: '',
    motherOfficeAddress: '',
    motherDesignation: '',
    motherDOB: '',
    motherPhoto: '',
    motherWeight: '',
    motherHeight: '',
    motherAadharCard: '',
    motherBloodGroup: '',
    motherAnnualIncome: '',

    // Family Information
    marriageAnniversaryDate: '',
    localGuardianPhoto: '',
    familyMonthlyIncome: '',
    cwsn: '',
    relativeFullName: '',
    residencePhoneNumber: '',
    officePhoneNumber: '',
    familyPhoto: ''
  });
  return (
    <Box>

    </Box>
  );
};

export default FamilyDetails;


