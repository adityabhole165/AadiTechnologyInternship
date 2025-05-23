import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IGetClassTeachersBody,
  IGetOptionalSubjectsForMarksTransferBody,
  IGetStudentsToTransferMarksBody,
  ITransferOptionalSubjectMarksBody
} from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectMarkList from 'src/libraries/ResuableComponents/SubjectMarkList';
import {
  CDAGetClassTeachers,
  CDAOptionalSubjectsForMarksTransfer,
  CDAStudentsToTransferMarks,
  CDATransferOptionalSubjectMarks,
  CDAresetMessage
} from 'src/requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const TransferOptionalSubjectMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [personName, setPersonName] = useState<string[]>([]);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const UserId = Number(localStorage.getItem('UserId'));
  const [selectClasstecaher, setselectClasstecaher] = useState('0');
  const [Title, setTitle] = useState('');
  const [SubjectList, setSubjectList] = useState([]);
  const [SearchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [IsDirty, setIsDirty] = useState(false);
  const USClassTeacherList = useSelector(
    (state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers
  );
  const USStudentsToTransferMarks = useSelector(
    (state: RootState) =>
      state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks
  );
  const USStudentsToTransferMarks1: any = useSelector(
    (state: RootState) =>
      state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks1
  );
  const countArray = USStudentsToTransferMarks1.map((item: any) => item.Count);
  const USOptionalSubjectsForMarksTransfer: any = useSelector(
    (state: RootState) =>
      state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer
  );
  const ISTransferOptionalSubjectMarks = useSelector(
    (state: RootState) =>
      state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks
  );
  const [StudentsList, setStudentsList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [success, setsuccess] = useState('');
  const [OptionalSubjects, setOptionalSubjects] = useState([]);
  const [defaultSubjects, setdefaultSubjects] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState(1);
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [ParentOptionalSubjects, setParentOptionalSubjects] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsDirty(false);
    setSelectedStudents(USOptionalSubjectsForMarksTransfer);
  }, [USOptionalSubjectsForMarksTransfer]);

  const HeaderPublish = [
    { Id: 1, Header: ' Reg. No.	' },
    { Id: 2, Header: 'Roll No. 	' },
    { Id: 3, Header: '	Student Name' },
    { Id: 4, Header: 'Current Applicable Subjects' }
  ];

  const Note1 = [
    'At least 2 optional subjects should have been configured to transfer marks.'
  ];
  const Header1 = ['Note1 :'];

  const Note2 = [
    'If marks are not assigned to current subject(s) for selected student and if you change to new subject(s) then only new subject(s) will be assigned to student.'
  ];
  const Header2 = ['Note2 :'];

  const Note3 = [
    '	If marks are assigned to current subject(s) for selected student and if you change to new subject(s) then along with new subject(s) assignment, marks of current subject(s) will be transferred to new subject(s).'
  ];
  const Header3 = ['Note3 :'];

  const Note4 = ['Marks cannot be transferred across the subject groups.'];
  const Header4 = ['Note4 :'];

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTeacherId: Number(selectClasstecaher)
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const GetStudentsToTransferMarksBody: IGetStudentsToTransferMarksBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(selectClasstecaher),
    asName: SearchText,
    asEndIndex: endIndex,
    asStartRowIndex: startIndex
  };

  const GetOptionalSubjectsForMarksTransferBody: IGetOptionalSubjectsForMarksTransferBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(selectClasstecaher)
  };

  const getSubjectId = () => {
    let returnVal = [];
    returnVal = StudentsList.map((Item) => {
      if (Item.IsActive) {
        return {
          SubjectId: Item.SubjectId,
          SubjectGroupId: Item.SubjectGroupId
        };
      }
    });
    return returnVal;
  };
  const getXML = () => {
    let sXML =
      '<ArrayOfTransferSubjectMarksInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

    StudentsList.map((Item, i) => {
      if (Item.IsActive) {
        OptionalSubjects.map((Obj, Index) => {
          if (Obj.isActive) {
            if (Obj.SubjectId === '0') {
              defaultSubjects.map((defaultObj) => {
                sXML +=
                  '<TransferSubjectMarksInfo>' +
                  '<StudentId>' +
                  Item.StudentId +
                  '</StudentId>' +
                  '<StandardDivisionId>' +
                  selectClasstecaher +
                  '</StandardDivisionId>' +
                  '<SubjectId>' +
                  defaultObj.SubjectId +
                  '</SubjectId>' +
                  '<SubjectGroupId>' +
                  defaultObj.SubjectGroupId +
                  '</SubjectGroupId>' +
                  '</TransferSubjectMarksInfo>';
              });
            } else {
              sXML +=
                '<TransferSubjectMarksInfo>' +
                '<StudentId>' +
                Item.StudentId +
                '</StudentId>' +
                '<StandardDivisionId>' +
                selectClasstecaher +
                '</StandardDivisionId>' +
                '<SubjectId>' +
                Obj.SubjectId +
                '</SubjectId>' +
                '<SubjectGroupId>' +
                Obj.SubjectGroupId +
                '</SubjectGroupId>' +
                '</TransferSubjectMarksInfo>';
            }
          }
        });
      }
    });

    sXML += '</ArrayOfTransferSubjectMarksInfo>';

    return sXML;
  };

  useEffect(() => {
    let IsExists = false;
    let arr = [];
    setOptionalSubjects(USOptionalSubjectsForMarksTransfer);
    USOptionalSubjectsForMarksTransfer.map((Item) => {
      IsExists = false;
      arr.map((ParentItem) => {
        if (
          ParentItem.ParentOptionalSubjectId == Item.ParentOptionalSubjectId
        ) {
          IsExists = true;
        }
      });
      if (IsExists == false)
        arr.push({
          ParentOptionalSubjectId: Item.ParentOptionalSubjectId,
          OptionalSubjectName: Item.OptionalSubjectName,
          NoOfSubjects: Item.NoOfSubjects
        });
    });
    setParentOptionalSubjects(arr);
  }, [USOptionalSubjectsForMarksTransfer]);

  useEffect(() => {
    const activeSubjects = USOptionalSubjectsForMarksTransfer.filter(
      (item) => item.OptionalSubjectsId === '0'
    );
    setdefaultSubjects(activeSubjects);
  }, [USOptionalSubjectsForMarksTransfer]);

  //console.log(defaultSubjects, 'defaultSubjects---');

  const SubjectSelection = (subjectId) => {
    setIsDirty(true);
    setOptionalSubjects(
      OptionalSubjects.map((Item) => {
        return Item.SubjectId == subjectId
          ? { ...Item, isActive: !Item.isActive }
          : Item;
      })
    );
  };

  const ClickSelctTecher = (value) => {
    if (selectClasstecaher != '') {
      const confirmMessage =
        'Modified data on the current page will be lost. Do you want to continue?';
      let confirmed = false;
      if (IsDirty) {
        confirmed = window.confirm(confirmMessage);

        if (confirmed) {
          setselectClasstecaher(value);
          setPage(1);
          setRowsPerPage(20);
        }
      } else setselectClasstecaher(value);
      setPage(1);
      setRowsPerPage(20);
    } else {
      setselectClasstecaher(value);
      setPage(1);
      setRowsPerPage(20);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  // const itemsPerPage = 20;

  // const startIndex = (page - 1) * itemsPerPage + 1;
  // const endIndex = startIndex + itemsPerPage - 1;
  // useEffect(() => {
  //     const startIndex = (page - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;

  //     const newGetStudentsToTransferMarksBody: IGetStudentsToTransferMarksBody = {
  //         ...GetStudentsToTransferMarksBody,
  //         asStartRowIndex: startIndex,
  //         asEndIndex: endIndex
  //     };

  //     dispatch(CDAStudentsToTransferMarks(newGetStudentsToTransferMarksBody));
  // }, [page, selectClasstecaher]);

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, countArray);
  const pagecount = Math.ceil(countArray / rowsPerPage);
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
  }, [page, selectClasstecaher, rowsPerPage]);

  const changeSearchText = () => {
    if (SearchText === '') {
      setStudentsList(USStudentsToTransferMarks);
    } else {
      setStudentsList(
        USStudentsToTransferMarks.filter((item) => {
          return (
            item.Text3.toLowerCase().includes(SearchText.toLowerCase()) ||
            item.Text1.toLowerCase().includes(SearchText.toLowerCase())
          );
        })
      );
    }
  };

  const SearchNameChange = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    setIsDirty(false);

    setStudentsList(USStudentsToTransferMarks);
    setErrorMessage('');
  }, [USStudentsToTransferMarks]);

  useEffect(() => {
    if (USClassTeacherList.length > 0) {
      setselectClasstecaher(USClassTeacherList[0].Value);
    }
  }, [USClassTeacherList]);

  const Changevalue = (value) => {
    setIsDirty(true);
    setStudentsList(value);
    setErrorMessage('');
  };

  const ExamResultBase = (value) => {
    navigate('/RITeSchool/Teacher/ExamResultBase', { state: { fromInternal: true } });
  };
  useEffect(() => {
    dispatch(CDAGetClassTeachers(GetClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(
      CDAOptionalSubjectsForMarksTransfer(
        GetOptionalSubjectsForMarksTransferBody
      )
    );
  }, [selectClasstecaher]);

  const TransferOptionalSubjectMarksBody: ITransferOptionalSubjectMarksBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    asStudentTransferMarksXml: getXML()
  };
  const clickTransfer = () => {
    let errorMessages = [];
    if (!StudentsList.some((Item) => Item.IsActive)) {
      showAlert({
        title: 'Please Confirm',
        message: 'At least one student subject should be selected.',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          closeAlert();
        }
      });
    } else {
      ParentOptionalSubjects.forEach((item) => {
        let selectedSubjectsCount = OptionalSubjects.filter((subItem) => {
          return (
            subItem.ParentOptionalSubjectId === item.ParentOptionalSubjectId &&
            subItem.isActive
          );
        }).length;

        if (selectedSubjectsCount < item.NoOfSubjects) {
          errorMessages.push(
            `At least ${item.NoOfSubjects} subject(s) should be selected for optional subject ${item.OptionalSubjectName}.`
          );
        }
        if (selectedSubjectsCount > item.NoOfSubjects) {
          errorMessages.push(
            `At most ${item.NoOfSubjects} subject(s) can be selected for optional subject ${item.OptionalSubjectName}.`
          );
        }
      });

      if (errorMessages.length > 0) {
        setErrorMessage(errorMessages.join('\n'));
      } else {
        dispatch(
          CDATransferOptionalSubjectMarks(TransferOptionalSubjectMarksBody)
        );
      }
    }
  };

  useEffect(() => {
    if (
      ISTransferOptionalSubjectMarks == 'Subjects transferred successfully.'
    ) {
      toast.success('Subjects transferred successfully.');
      dispatch(CDAresetMessage());
      dispatch(
        CDAOptionalSubjectsForMarksTransfer(
          GetOptionalSubjectsForMarksTransferBody
        )
      );
      dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
      setErrorMessage('');
      setsuccess('');
    }
  }, [ISTransferOptionalSubjectMarks]);

  useEffect(() => {
    if (
      ISTransferOptionalSubjectMarks != 'Subjects transferred successfully.'
    ) {
      setsuccess(ISTransferOptionalSubjectMarks);
    }
  }, [ISTransferOptionalSubjectMarks]);
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Exam Results',
              path: '/RITeSchool/Teacher/ExamResultBase'
            },
            {
              title: 'Transfer Optional Subject Marks',
              path: '/RITeSchool/Teacher/TransferOptionalSubjectMarks'
            }
          ]}
          rightActions={
            <>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="left"
                gap={1}
                sx={{
                  mt: { xs: 0, sm: 0 },
                  flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                }}
              >
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <SearchableDropdown
                    sx={{ width: { xs: '70vw', sm: '20vw' } }}
                    ItemList={USClassTeacherList}
                    onChange={ClickSelctTecher}
                    label={'Select Teacher'}
                    defaultValue={selectClasstecaher}
                    mandatory
                    size={'small'}
                  /></Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <TextField
                    sx={{ width: { xs: '70vw', sm: '15vw' } }}
                    fullWidth
                    label="Student Name / Reg.No. "
                    value={SearchText}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Tab') {
                        changeSearchText();
                      }
                    }}
                    variant={'outlined'}
                    size={'small'}
                    onChange={(e) => {
                      SearchNameChange(e.target.value);
                    }}
                  /></Grid>
                <Grid
                  item
                  xs={12}
                  gap={1}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                >
                  <IconButton
                    onClick={changeSearchText}
                    disabled={selectClasstecaher === '0'}
                    sx={{
                      background: (theme) => theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark
                      }
                    }}
                  >
                    <SearchTwoTone />
                  </IconButton>
                  <Box>
                    <Tooltip
                      title={
                        "Transfer student's marks from one optional subject to another optional subject"
                      }
                    >
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: grey[500],
                          height: '36px !important',
                          ':hover': { backgroundColor: grey[600] }
                        }}
                      >
                        <QuestionMarkIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {StudentsList.length > 0 && (
                    <Tooltip title={'Transfer'}>
                      <IconButton
                        onClick={clickTransfer}
                        disabled={selectClasstecaher === '0'}
                        sx={{
                          background: green[500],
                          color: 'white',
                          '&:hover': {
                            backgroundColor: green[600]
                          }
                        }}
                      >
                        <Save />
                      </IconButton>
                    </Tooltip>
                  )}</Grid>
              </Stack>
            </>
          }
        />

        <ErrorMessage1 Error={success}></ErrorMessage1>
        {errorMessage && (
          <>
            <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
          </>
        )}
        {StudentsList.length > 0 && (
          <Paper sx={{ marginTop: '10px' }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>
                  Important Notes
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}
              >
                <Alert variant="filled" severity="info">
                  {Note1}
                </Alert>
                <Alert variant="filled" severity="info">
                  {Note2}
                </Alert>
                <Alert variant="filled" severity="info">
                  {Note3}
                </Alert>
                <Alert variant="filled" severity="info">
                  {Note4}
                </Alert>
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}
        {StudentsList?.length > 0 && (
          <Grid container spacing={2} sx={{ padding: isMobile ? 0 : 0 }}>
            <Grid item xs={12} sm={4}>
              {StudentsList.length > 0 && (
                <Paper sx={{ mt: 1 }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography
                        style={{
                          fontWeight: 'normal',
                          fontSize: isMobile ? '16px' : '20px'
                        }}
                      >
                        Optional Subjects
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: isMobile ? '100%' : '250px'
                        }}
                      >
                        {ParentOptionalSubjects.map((subject, index) => (
                          <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              {subject.OptionalSubjectName} (Select any{' '}
                              {subject.NoOfSubjects})
                            </AccordionSummary>
                            <AccordionDetails>
                              <ul>
                                {OptionalSubjects.filter((objParent) => {
                                  return (
                                    objParent.ParentOptionalSubjectId ===
                                    subject.ParentOptionalSubjectId &&
                                    objParent.OptionalSubjectsId !== '0'
                                  );
                                }).map((subItem, subIndex) => (
                                  <li
                                    key={subIndex}
                                    style={{
                                      listStyleType: 'none',
                                      margin: isMobile ? '5px 0' : '10px 0'
                                    }}
                                  >
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={subItem.isActive}
                                        onChange={() =>
                                          SubjectSelection(subItem.SubjectId)
                                        }
                                      />
                                      {subItem.SubjectName}
                                      {OptionalSubjects.filter(
                                        (objChildItem) => {
                                          return (
                                            objChildItem.ParentOptionalSubjectId ===
                                            subject.ParentOptionalSubjectId &&
                                            objChildItem.OptionalSubjectsId ===
                                            '0' &&
                                            objChildItem.SubjectGroupId ===
                                            subItem.SubjectGroupId
                                          );
                                        }
                                      ).map((objChild, objChildIndex) => (
                                        <ul key={objChildIndex}>
                                          <label>{objChild.SubjectName}</label>
                                        </ul>
                                      ))}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              )}
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  p: isMobile ? 1 : 2,
                  mt: isMobile ? 0 : 1,
                  width: '100%'
                }}
              >
                <Box>
                  {StudentsList.length > 0 ? (
                    <Typography
                      variant="subtitle1"
                      sx={{ margin: '5px 0', textAlign: 'center' }}
                    >
                      <Box component="span" fontWeight="fontWeightBold">
                        {startRecord} to {endRecord}
                      </Box>{' '}
                      out of{' '}
                      <Box component="span" fontWeight="fontWeightBold">
                        {countArray}
                      </Box>{' '}
                      {countArray === 1 ? 'record' : 'records'}
                    </Typography>
                  ) : (
                    <span></span>
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {StudentsList.length > 0 && (
                    <SubjectMarkList
                      ItemList={StudentsList}
                      HeaderArray={HeaderPublish}
                      clickchange={Changevalue}
                      clickTitle={''}
                    />
                  )}
                </Box>

                {selectClasstecaher !== '0' ? (
                  StudentsList.length > 0 ? (
                    <span></span>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: 'center',
                        mt: 1,
                        backgroundColor: '#324b84',
                        padding: 1,
                        borderRadius: 2,
                        color: 'white'
                      }}
                    >
                      <b>No record found.</b>
                    </Typography>
                  )
                ) : null}

                {endRecord > 19 ? (
                  <ButtonGroupComponent
                    rowsPerPage={rowsPerPage}
                    ChangeRowsPerPage={ChangeRowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    PageChange={PageChange}
                    pagecount={pagecount}
                  />
                ) : (
                  <span></span>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default TransferOptionalSubjectMarks;
