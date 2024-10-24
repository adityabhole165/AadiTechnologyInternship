import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { useState } from 'react';
import SingleFile from 'src/libraries/File/SingleFile';

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
    fatherWeight: 0,
    fatherHeight: 0,
    fatherBloodGroup: '',
    fatherAadharCard: '',
    fatherAnnualIncome: 0,

    // Mother's Information
    motherOccupation: '',
    motherQualification: '',
    motherEmail: '',
    motherOfficeName: '',
    motherOfficeAddress: '',
    motherDesignation: '',
    motherDOB: '',
    motherPhoto: '',
    motherWeight: 0,
    motherHeight: 0,
    motherAadharCard: '',
    motherBloodGroup: '',
    motherAnnualIncome: 0,

    // Family Information
    marriageAnniversaryDate: '',
    localGuardianPhoto: '',
    familyMonthlyIncome: 0.00,
    cwsn: '',
    relativeFullName: '',
    residencePhoneNumber: '',
    familyPhoto: ''
  });
  const [siblings, setSiblings] = useState([
    { name: '', age: 0, institution: '', standard: '' }
  ]);

  const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
  const MaxfileSize = 5000000;

  const [errors, setErrors] = useState({
    fatherQualification: false,
    fatherEmail: false,
    fatherOfficeName: false,
    fatherOfficeAddress: false,
    fatherDesignation: false,
    fatherDOB: false,
    fatherPhoto: false,
    fatherWeight: false,
    fatherHeight: false,
    fatherBloodGroup: false,
    fatherAadharCard: false,
    fatherAnnualIncome: false,

    // Mother's Information
    motherOccupation: false,
    motherQualification: false,
    motherEmail: false,
    motherOfficeName: false,
    motherOfficeAddress: false,
    motherDesignation: false,
    motherDOB: false,
    motherPhoto: false,
    motherWeight: false,
    motherHeight: false,
    motherAadharCard: false,
    motherBloodGroup: false,
    motherAnnualIncome: false,

    // Family Information
    marriageAnniversaryDate: false,
    localGuardianPhoto: false,
    familyMonthlyIncome: false,
    cwsn: false,
    relativeFullName: false,
    residencePhoneNumber: false,
    familyPhoto: false
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === 'checkbox' ? checked : type === 'file' ? (files ? files[0] : null) : value;
    setForm({ ...form, [name]: fieldValue });

    // Remove error when the user starts filling the field
    setErrors({ ...errors, [name]: false });
  };

  const handleAddSibling = () => {
    setSiblings([...siblings, { name: '', age: 0, institution: '', standard: '' }]);
  };

  const handleRemoveSibling = (index) => {
    const newSiblings = siblings.filter((_, i) => i !== index);
    setSiblings(newSiblings);
  };

  const handleChange = (index, field, value) => {
    const newSiblings = siblings.map((sibling, i) => {
      if (i === index) {
        return { ...sibling, [field]: value };
      }
      return sibling;
    });
    setSiblings(newSiblings);
  };

  const handleSave = () => {
    // Call the onSave function passed as a prop
    onSave(form);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherQualification"
            label="Father Qualification "
            variant="outlined"
            value={form.fatherQualification}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherEmail"
            label="Father Email"
            variant="outlined"
            value={form.fatherEmail}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherOfficeName"
            label="Father Office Name"
            variant="outlined"
            value={form.fatherOfficeName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherOfficeAddress"
            label="Father Office Address"
            variant="outlined"
            value={form.fatherOfficeAddress}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherDesignation"
            label="Father Designation"
            variant="outlined"
            value={form.fatherDesignation}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherDOB"
            label="Father DOB"
            variant="outlined"
            type="date" // Optional: use a date input
            value={form.fatherDOB}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* fatherPhoto */}
        <Grid item xs={12} md={3}>
          <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            FileName={form.fatherPhoto}
            ChangeFile={handleInputChange}
            FileLabel={'Father Photo'}
            width={'100%'}
            height={"52px"}
            isMandatory={false}
          />
        </Grid>


        <Grid item xs={12} md={3}>
          <TextField
            name="fatherWeight"
            label="Father Weight (Kg)"
            variant="outlined"
            value={form.fatherWeight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherHeight"
            label="Father Height (Cm)"
            variant="outlined"
            value={form.fatherHeight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherBloodGroup"
            label="Father Blood Group"
            variant="outlined"
            value={form.fatherBloodGroup}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherAadharCard"
            label="Father Aadhar Card Number"
            variant="outlined"
            value={form.fatherAadharCard}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="fatherAnnualIncome"
            label="Father Annual Income"
            variant="outlined"
            value={form.fatherAnnualIncome}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Mother's Information */}
        <Grid item xs={12} md={3}>
          <TextField
            name="motherOccupation"
            label="Mother Occupation"
            variant="outlined"
            value={form.motherOccupation}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherQualification"
            label="Mother Qualification"
            variant="outlined"
            value={form.motherQualification}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherEmail"
            label="Mother Email"
            variant="outlined"
            value={form.motherEmail}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherOfficeName"
            label="Mother Office Name"
            variant="outlined"
            value={form.motherOfficeName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherOfficeAddress"
            label="Mother Office Address"
            variant="outlined"
            value={form.motherOfficeAddress}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherDesignation"
            label="Mother Designation"
            variant="outlined"
            value={form.motherDesignation}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherDOB"
            label="Mother DOB"
            variant="outlined"
            type="date" // Optional: use a date input
            value={form.motherDOB}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* motherPhoto */}
        <Grid item xs={12} md={3}>
          <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            FileName={form.motherPhoto}
            ChangeFile={handleInputChange}
            FileLabel={'Mother Photo'}
            width={'100%'}
            height={"52px"}
            isMandatory={false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherWeight"
            label="Mother Weight (Kg)"
            variant="outlined"
            value={form.motherWeight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherHeight"
            label="Mother Height (Cm)"
            variant="outlined"
            value={form.motherHeight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherBloodGroup"
            label="Mother Blood Group"
            variant="outlined"
            value={form.motherBloodGroup}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherAadharCard"
            label="Mother Aadhar Card Number"
            variant="outlined"
            value={form.motherAadharCard}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="motherAnnualIncome"
            label="Mother Annual Income"
            variant="outlined"
            value={form.motherAnnualIncome}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="marriageAnniversaryDate"
            label="Marriage Anniversary Date"
            variant="outlined"
            type="date" // Optional: use a date input
            value={form.marriageAnniversaryDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* localGuardianPhoto */}
        <Grid item xs={12} md={3}>
          <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            FileName={form.localGuardianPhoto}
            ChangeFile={handleInputChange}
            FileLabel={'Local Guadian Photo'}
            width={'100%'}
            height={"52px"}
            isMandatory={false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            name="familyMonthlyIncome"
            label="Family Monthly Income"
            variant="outlined"
            value={form.familyMonthlyIncome}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="cwsn"
            label="CWSN"
            variant="outlined"
            value={form.cwsn}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="relativeFullName"
            label="Relative Full Name"
            variant="outlined"
            value={form.relativeFullName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="residencePhoneNumber"
            label="Residence Phone Number"
            variant="outlined"
            value={form.residencePhoneNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* familyPhoto */}
        <Grid item xs={12} md={3}>
          <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            FileName={form.familyPhoto}
            ChangeFile={handleInputChange}
            FileLabel={'Family Photo'}
            width={'100%'}
            height={"52px"}
            isMandatory={false}
          />
        </Grid>

      </Grid>

      {/* Sibling Details */}
      <Typography variant="h4" color="initial" py={2}>Details of Brothers and Sisters of the Student</Typography>


      {siblings.map((sibling, index) => (
        <Grid container spacing={2} sx={{ pb: 2 }} >

          <Grid item xs={12} md={3}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={sibling.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={2.5}>
            <TextField
              name="name"
              label="Age"
              variant="outlined"
              value={sibling.age}
              onChange={(e) => handleChange(index, 'age', parseInt(e.target.value) || 0)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              name="institution"
              label="Institution"
              variant="outlined"
              value={sibling.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              name="standard"
              label="Standard"
              variant="outlined"
              value={sibling.standard}
              onChange={(e) => handleChange(index, 'standard', e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={.5}>
            {siblings.length > 1 && (
              <Tooltip title={"Delete"}>
                <IconButton
                  onClick={() => handleRemoveSibling(index)}
                  sx={{
                    color: '#223354',
                    mt: 0.7,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>

        </Grid>
      ))}

      <Grid item xs={12} pt={2} >
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleAddSibling}>
          Add Sibling
        </Button>
      </Grid>


      {/* Save & Next Button */}
      <Grid item xs={12} pt={2} >
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleSave}>
          Save And Next
        </Button>
      </Grid>

    </Box>
  );
};

export default FamilyDetails;


