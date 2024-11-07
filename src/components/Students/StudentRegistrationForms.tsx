import { QuestionMark, Visibility } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DocumentIcon from '@mui/icons-material/Description';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { IUpdateStudentBody } from 'src/interfaces/Students/IStudentUI';
import SingleFile from 'src/libraries/File/SingleFile3';
import { CDAUpdateStudent } from 'src/requests/Students/RequestStudentUI';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import Datepicker from '../MessageCenter/DatepickerMessage';
import AdditionalDetails from './AdditionalDetails';
import AddmissionDocumentInformation from './AddmissionDocumentInformation';
import AddNotePopupList from './AddNotePopupList';
import AdmissionDetails from './AdmissionDetails ';
import FamilyDetails from './FamilyDetails';
import PersonalDetails from './PersonalDetails'; // Assuming PersonalDetails is already created
import CheckboxList from './SiblingDetailsCheckBoxList';
import StudentProfileHeader from './StudentProfileHeader';
import StudentSubjectDetails from './StudentSubjectDetails';
const initialData = [
  { className: '10-B', date: '05-Nov-2024', description: 'qqq' }
  // Add more rows if needed
];

const StudentRegistrationForm = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(20);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const [IsConfirm, setIsConfirm] = useState('');
  const [IsConfirm1, setIsConfirm1] = useState('');
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const [tableData, setTableData] = useState(initialData);
  const { AssignedDate } = useParams();
  const handleSave = (isSuccessful: boolean) => {
    if (currentTab === 0) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        admissionDetails: isSuccessful
      }));
    } else if (currentTab === 1) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        personalDetails: isSuccessful
      }));
    }

    if (isSuccessful) {
      // Slide to the next tab automatically if the form is successfully saved
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  const handleNextTab = () => {
    setCurrentTab((prevTab) => Math.min(prevTab + 1, 5)); // Move to the next tab
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => Math.max(prevTab - 1, 0)); // Move to the previous tab
  };
  // Track the validation status for each tab
  const [status, setStatus] = useState({
    admissionDetails: null,
    personalDetails: null,
    admissionDocuments: null,
    familyDetails: null,
    additionalDetails: null,
    streamDetails: null
  });
  const handleOpenDialog = (isRecipients) => {
    setIsConfirm('');
    setShowRecipients(isRecipients);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsConfirm('true');
  };
  const handleOpenDialog1 = (isRecipients) => {
    setIsConfirm1('');
    setShowRecipients(isRecipients);
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setIsConfirm('true');
  };

  const ValidFileTypes = [
    'BMP',
    'DOC',
    'DOCX',
    'JPG',
    'JPEG',
    'PDF',
    'XLS',
    'XLSX'
  ];
  const MaxfileSize = 5000000;
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );

  const UpdateStudentBody: IUpdateStudentBody = {
    asSchoolId: 18, // Missing
    asStudentId: 3556, // Missing
    asInsertedById: 4463, // Missing
    asID: 0, // Missing
    asAcademicYearId: 55, // Missing
    asFormNumber: 4576, // Missing
    asPhoto_file_Path: "", // Missing
    asFirst_Name: "Pranjal",
    asMiddle_Name: "Pritam",
    asLast_Name: "Bajare",
    asMother_Name: "Rohini",
    asBlood_Group: "",
    asEnrolment_Number: "2495",
    asParent_Name: "Pritam",
    asParent_Occupation: "1",
    asOther_Occupation: "",
    asAddress: "Tower no. 100, Flat no. 504, Gateway Tower, Amanora Park Town, Hadapsar.",
    asCity: "Pune",
    asState: "Maharashtra",
    asPincode: "411028",
    asResidence_Phone_Number: "9224286937",
    asMobile_Number: "9224773766",
    asMobile_Number2: "9527208383",
    asOffice_Number: "9270362059",
    asNeighbour_Number: "1001001001",
    asUpdated_By_Id: "4463",
    asUpdate_Date: "2024-10-10",
    asDOB: "2011-03-21",
    asBirth_Place: "Vashi, Navi Mumbai",
    asNationality: "Indian",
    asSex: "F",
    asSalutation_Id: "6",
    asCategory_Id: "1",
    asCasteAndSubCaste: "Maratha",
    asAdmission_Date: "2014-01-03",
    asJoining_Date: "2014-06-09",
    asDateOfBirthInText: "Twenty One March Two Thousand Eleven",
    asOptional_Subject_Id: "0",
    asMother_Tongue: "Pali",
    asLastSchoolName: "",
    asLastSchoolAddress: "",
    asLastCompletedStd: "",
    asLastSchoolUDISENo: "",
    asLastCompletedBoard: "",
    asIsRecognisedBoard: "True",
    asAadharCardNo: "748788202981",
    asNameOnAadharCard: "Pranjal Pritam Bajare",
    asAadharCard_Photo_Copy_Path: "16837343102883781539044089618529202351021292145.jpg",
    asFamily_Photo_Copy_Path: "",
    asUDISENumber: "2014272505108050285",
    asBoardRegistrationNo: "",
    asIsRiseAndShine: "False",
    asAdmissionSectionId: "0",
    asGRNumber: "",
    asStudentUniqueNo: "",
    asSaralNo: "",
    asIsOnlyChild: "False",
    asMinority: "False",
    asRoll_No: 1,
    asRule_Id: 0,
    asIsStaffKid: 0,
    asHeight: 0,
    asWeight: 0,
    asUpdated_By_id: 4463,
    asRTECategoryId: 0,
    asSecondLanguageSubjectId: 1760,
    asThirdLanguageSubjectId: 1763,
    asIsForDayBoarding: false,
    asFeeCategoryDetailsId: 0,
    asRTEApplicationFormNo: "",
    asAnnualIncome: 0,
    asStandard_Id: 1082, // Missing
    asDivision_Id: 1299, // Missing
    asReligion: "Hindu",
    asYearWise_Student_Id: 40467,
    asParentUserId: 0
  }

  useEffect(() => {

    dispatch(CDAUpdateStudent(UpdateStudentBody));

  }, []);

  const onSelectDate = (value) => {
    SetSelectDate(value);
  };
  const handleEdit = (rowIndex: number) => {
    console.log(`Edit row ${rowIndex}`);
  };
  const handleDelete = (rowIndex: number) => {
    console.log(`Delete row ${rowIndex}`);
    setTableData((prevData) =>
      prevData.filter((_, index) => index !== rowIndex)
    );
  };
  // const validateAllTabs = () => {
  //     const updatedStatus = {
  //         admissionDetails: validateAdmissionDetails(),
  //         personalDetails: validatePersonalDetails(),
  //         admissionDocuments: validateAdmissionDocuments(),
  //         familyDetails: validateFamilyDetails(),
  //         additionalDetails: validateAdditionalDetails(),
  //         streamDetails: validateStreamDetails(),
  //     };
  //     setStatus(updatedStatus);

  //     // Return true if all tabs are valid
  //     return Object.values(updatedStatus).every((isValid) => isValid);
  // };
  // const handleSaveClick = () => {
  //     const allValid = validateAllTabs();
  //     if (!allValid) {
  //         // Show an alert if any tab has unfilled required fields
  //         alert('Some fields are missing or incorrect.');
  //     } else {
  //         alert('All required fields are filled, saving draft!');
  //     }
  // };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/Students/StudentRegistrationForm'
          }
        ]}
        rightActions={
          <>
            <Tooltip title={'Add/Edit student details and click on "Save".'}>
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
            </Tooltip>

            <Tooltip title={'Add  Sibling Details'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <PeopleOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Add Note'}>
              <IconButton
                onClick={() => handleOpenDialog(true)}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <NoteAddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Save'}>
              <IconButton
                onClick={() => handleOpenDialog1(true)}
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
      <Box sx={{ backgroundColor: 'white', p: 1 }}>
        <StudentProfileHeader />
      </Box>

      {/* Profile Completion Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 1,
          backgroundColor: 'white',
          p: 2
        }}
      >
        <Typography variant="body1" sx={{ mr: 2 }}>
          Completeness
        </Typography>
        <LinearProgress
          variant="determinate"
          value={profileCompletion}
          sx={{ flexGrow: 1, height: 10 }}
        />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {profileCompletion}%
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          minHeight: '100px',
          display: 'flex',
          justifyContent: 'center',
          mb: 0
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false} // Disable the scroll arrows
          aria-label="Student Registration Tabs"
          sx={{
            '& .MuiTab-root': {
              minHeight: '60px',
              borderRadius: '10px',
              textTransform: 'none',
              color: '#38548A',
              backgroundColor: grey[200],

              // backgroundColor: tabValidity.admissionDetails ? green[100] : grey[200],
              '&:hover': {
                color: '#38548A',
                backgroundColor: grey[400]
              },
              '&.Mui-selected': {
                backgroundColor: blue[300],
                color: 'white'
              },
              '&.Mui-focusVisible': {
                outline: '2px solid blue'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<SchoolIcon />}
            label="Admission Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<AccountCircleIcon />}
            label="Personal Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<DocumentIcon />}
            label="Admission Documents"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<FamilyRestroomIcon />}
            label="Family Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<GroupAddIcon />}
            label="Additional Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200, borderRadius: '100%' }}
            icon={<LocalLibraryIcon />}
            label="Stream Details"
          />
        </Tabs>
      </Box>

      <Box>
        {currentTab === 0 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* {status.admissionDetails !== null && (
                                <Alert severity={status.admissionDetails ? 'success' : 'error'}>
                                    {status.admissionDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AdmissionDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <PersonalDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {/* Add additional tab contents here */}
        {currentTab === 2 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AddmissionDocumentInformation onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 3 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <FamilyDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 4 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AdditionalDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 5 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <StudentSubjectDetails onSave={handleSave} />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' }, // Center buttons on smaller screens
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on smaller screens
          gap: 2, // Add some space between buttons
          p: { xs: 1, sm: 2 }, // Adjust padding for smaller screens
          backgroundColor: 'white'
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousTab}
          disabled={currentTab === 0}
          sx={{
            backgroundColor: grey[100],
            color: 'blue',
            '&:hover': { color: 'blue', backgroundColor: blue[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextTab}
          disabled={currentTab === 5} // Disable if on the last tab
          sx={{
            backgroundColor: grey[100],
            color: 'green',
            '&:hover': { color: 'green', backgroundColor: green[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Next
        </Button>
      </Box>
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: '15px'
            }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon
              onClick={handleCloseDialog}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red'
                }
              }}
            />
          </DialogTitle>
          <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
            Student Achievement/Punishment Details
          </Typography>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="RegistrationNumber"
                  label="Registration Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="StudentName"
                  label="Student Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Datepicker
                  DateValue={SelectDate}
                  onDateChange={onSelectDate}
                  // label={'Start Date'}
                  size={'medium'}
                  label={'Joining Date'}
                  minDate={undefined}
                  maxDate={undefined}
                  display={undefined}
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title="Supports only .JPG, .JPEG, .PNG, .BMP, .PDF file type.
                   File size should not exceed 1MB."
                >
                  <SingleFile
                    ValidFileTypes={ValidFileTypes}
                    MaxfileSize={MaxfileSize}
                    // FileName={form.aadharCardScanCopy}
                    // ChangeFile={handleImageChange}
                    FileLabel={'Attachment'}
                    isMandatory={false}
                    height={'52px'}
                    width="100%"
                    ChangeFile={undefined}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <>
                  <Tooltip title={'View'}>
                    <IconButton
                      onClick={() => ''}
                      sx={{
                        color: '#223354',
                        mt: 0.7,
                        '&:hover': {
                          color: '#223354',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={'Delete'}>
                    <IconButton
                      onClick={() => ''}
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
                </>
              </Grid>
            </Grid>
            <Grid xs={12} spacing={2} mt={2}>
              <Grid item>
                <ResizableTextField
                  name="description"
                  label={<span>Description</span>}
                  sx={{
                    resize: 'both'
                  }}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box py={2}>
              <AddNotePopupList
                data={tableData}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleCloseDialog} color={'error'}>
              Close
            </Button>
            <Button
              onClick={undefined}
              sx={{
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
            >
              save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        <Dialog
          open={openDialog1}
          onClose={handleCloseDialog1}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: '15px'
            }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon
              onClick={handleCloseDialog1}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red'
                }
              }}
            />
          </DialogTitle>
          <Typography variant="h3" sx={{ pt: 1, pl: 3 }}>
            Sibling Details
          </Typography>
          <DialogContent>
            <Card sx={{ p: 1, mb: 1 }}>
              <b>Note : </b>If you click on save button selected Sibling Details will be
              replaced to the following sibling(s) :
              <b> Master Aadvik Prashant Dalavi</b>
            </Card>
            <Box>
              <CheckboxList />
            </Box>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>

            <Button onClick={handleCloseDialog1} color={'error'}>
              Close
            </Button>
            <Button
              onClick={undefined}
              sx={{
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
            >
              save
            </Button>
          </DialogActions>

        </Dialog>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;
