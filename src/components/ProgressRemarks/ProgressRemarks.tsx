import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Grid, IconButton, Modal, Pagination, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllGradesForStandardBody,
  IGetAllStudentsForProgressRemarkBody,
  IGetAllStudentswiseRemarkDetailsNewBody,
  IGetFinalPublishedExamStatusBody,
  IGetRemarkTemplateDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import RemarkList from 'src/libraries/ResuableComponents/RemarkList';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAGetAllStudentswiseRemarkDetails,
  CDAGetClassTeachers,
  CDAGetFinalPublishedExamStatus,
  CDAGetRemarkTemplateDetails,
  CDAGetRemarksCategory,
  CDAGetTestwiseTerm,
  CDAGradeDropDown,
  CDAStudentListDropDown,
  CDAStudentswiseRemarkDetailsToExport,
  CDAUpdateAllStudentsRemarkDetails,
  CDAresetSaveMassage
} from 'src/requests/ProgressRemarks/ReqProgressRemarks';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import ProgressRemarkTerm from './ProgressRemarkTerm';
import ProgressRemarksNotes from './ProgressRemarksNotes';

const ProgressRemarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SelectTerm, SetSelectTerm] = useState();
  const [SelectGrade, SetSelectGrade] = useState();
  const [page, setPage] = useState(1)
  const [StudentList, SetStudentList] = useState('');
  const [showScreenOne, setShowScreenOne] = useState(true);
  const [open, setOpen] = useState(false);
  const [Itemlist, setItemlist] = useState([]);
  
   
  

  const [StudentId, setStudentId] = useState([]);
  const [Remark, setRemark] = useState('')
  const [remarkTemplates, setRemarkTemplates] = useState([]);
  const toggleScreens = () => { setShowScreenOne(!showScreenOne); };
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );


  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Progress Remarks') perm = item.IsFullAccess;
    });
    return perm;
  };

  const determineInitialState = () => {
    return GetScreenPermission() === 'Y' ? '0' : sessionStorage.getItem('TeacherId') || '';
  };
  
  const [selectTeacher, SetselectTeacher] = useState(determineInitialState);

  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: '', SortOrder: "desc" },
    { Id: 2, Header: 'Remark Template' },
  ]);
  const [HeaderArray, setHeaderArray] = useState([]);

  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm
  );

  const USClassTeachers: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers
  );

  const StudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport
  );
  const StudentswiseRemarkDetails1: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport1
  );
  const StudentswiseRemarkDetails2: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport2
  );

  const UpdateAllStudentsRemarkDetail: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISUpdateAllStudentsRemarkDetailsBody
  );

  const USStudentListDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISStudentListDropDown
  );
  const GradeDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGradesForStandard
  );

  const USRemarksCategory: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarksCategoryList
  );

  const USRemarkTemplateDetails: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarkTemplateDetail
  );

  const USGetAllStudentsForProgressRemark: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetAllStudentsForProgressRemark
  );

  const USGetFinalPublishedExamStatus: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISRGetFinalPublishedExamStatus
  );

  const USGetAllStudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails
  );

  console.log(USGetAllStudentswiseRemarkDetails,"USGetAllStudentswiseRemarkDetails");
  
  const USRemarkDetailsHeaderList: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISRemarkDetailsHeaderList
  );

  useEffect(() => {
    let headerArray = [
      { Id: 1, Header: 'Roll No.' },
      { Id: 2, Header: 'Name' },
      ...(SelectTerm == 2 ? [{ Id: 3, Header: 'Old Remarks' }] : []),
    ]
    USRemarkDetailsHeaderList.map((Item, i) => {
      headerArray.push({ Id: i + 3, Header: Item.RemarkName })
    })
    setHeaderArray(headerArray)
  }, [USRemarkDetailsHeaderList])


  const getXML = () => {
    let sXML =
      '<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

    Itemlist.forEach((Item) => {
      Item.Remarks.forEach((remark) => {
        sXML +=
          '<StudentwiseRemarkConfigDetails>' +
          '<YearwiseStudentId>' + Item.Text11 + '</YearwiseStudentId>' +
          '<StudentwiseRemarkId>' + Item.Text12 + '</StudentwiseRemarkId>' +
          '<Remark>' + remark.Text3 + '</Remark>' +
          '<RemarkConfigId>' + remark.Text6 + '</RemarkConfigId>' +
          '<RemarkMaster><RemarkConfigId>' + remark.Text6 + '</RemarkConfigId></RemarkMaster>' +
          '<SalutationId>' + Item.Text8 + '</SalutationId>' +
          '<IsPassedAndPromoted>' + Item.Text9 + '</IsPassedAndPromoted>' +
          '<IsLeftStudent>' + Item.Text10 + '</IsLeftStudent>' +
          '</StudentwiseRemarkConfigDetails>';
      });
    });

    sXML += '</ArrayOfStudentwiseRemarkConfigDetails>';
    return sXML;
  };





  // const getXML = () => {
  //   let sXML =
  //     '<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
  //   Itemlist.map((Item) => {
  //     sXML =
  //       sXML +
  //       '<StudentwiseRemarkConfigDetails>' +
  //       '<YearwiseStudentId>' + Item.Text11 + '</YearwiseStudentId>' +
  //       '<StudentwiseRemarkId>' + Item.Text12 + '</StudentwiseRemarkId>' +
  //       '<Remark>' + Item.Text3 + '</Remark>' +
  //       '<RemarkConfigId>' + Item.Text7 + '</RemarkConfigId>' +
  //       '<RemarkMaster><RemarkConfigId>' + Item.Text6 + '</RemarkConfigId></RemarkMaster>' +
  //       '<SalutationId>' + Item.Text8 + '</SalutationId>' +
  //       '<IsPassedAndPromoted>' + Item.Text9 + '</IsPassedAndPromoted>' +
  //       '<IsLeftStudent>' + Item.Text10 + '</IsLeftStudent> ' +
  //       '</StudentwiseRemarkConfigDetails>';
  //   });
  //   sXML = sXML + '</ArrayOfStudentwiseRemarkConfigDetails>';


  //   return sXML;
  // };

 

  const getStdDivisionId = () => {
    let returnVal = 0
    USClassTeachers.map((Item) => {
      if (Item.Value == selectTeacher)
        returnVal = Number(Item.Id)
    })
    return returnVal
  }
  const RemarkCategoryBody: IGetRemarksCategoryBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId
  };

  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId
  };
  const ClassTeachersBody: IAllPrimaryClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: Number(GetScreenPermission() == 'Y' ? 0 : asUserId
    )
  };

  const ExportButton = () => {
    const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
    {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivId: getStdDivisionId(),
      asStudentId: Number(StudentList),
      asTermId: SelectTerm
    };
    dispatch(
      CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody)
    );
  };

  const GetAllGradesForStandardBody: IGetAllGradesForStandardBody = {
    asSchool_Id: asSchoolId,
    asAcademic_Year_Id: asAcademicYearId,
    asStandard_Id: 0,
    asSubjectId: 0,
    asTest_Id: 0
  }

  const RemarkTemplateDetailsBody: IGetRemarkTemplateDetailsBody = {
    asSchoolId: asSchoolId,
    asRemarkId: Number(Remark),
    asSortExpression: "Template",
    asSortDirection: ' ' + HeaderPublish[0].SortOrder,
    asFilter: '',
    asAcadmicYearId: asAcademicYearId,
    asMarksGradesConfigurationDetailsId: SelectGrade,
    asStandardId: getStdDivisionId()
  }
  const AllStudentsForProgressRemarkBody: IGetAllStudentsForProgressRemarkBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: Number(selectTeacher),
    asStudentId: Number(StudentList),
    asTermId: Number(SelectTerm),
    asStartIndex: 0,
    asEndIndex: 20,
    asSortExp: "Roll_No"
  }
  const StudentListDropDowntBody: IStudentListDropDowntBody = {
    asStandard_Division_Id: getStdDivisionId(),
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTerm_Id: SelectTerm
  };

  const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsNewBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: getStdDivisionId(),
    asStudentId: Number(StudentList),
    asTermId: Number(SelectTerm),
    TeacherId: Number(selectTeacher),
    asStartIndex: startIndex,
    asEndIndex: endIndex,
  };

  const GetFinalPublishedExamStatusBody: IGetFinalPublishedExamStatusBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: getStdDivisionId(),
    asTerm_Id: Number(SelectTerm)
  };



  const getActiveTexts = () => {
    return remarkTemplates.filter(item => item.IsActive).map(item => item.Text1);
  }
  const [ColIndex, SetColIndex] = useState([-1])

  const TextChange1 = () => {
    setItemlist(prevItemlist =>
      prevItemlist.map(item => {
        if (item.Id === StudentId) {
          const activeTexts = getActiveTexts().join(' ');
          return {
            ...item,
            Remarks: item.Remarks.map((remark, i) => {
              const newText3 = remark.Text3 + activeTexts;
              return { ...remark, Text3: (i == ColIndex) ? newText3.slice(0, 300) : remark.Text3 };
            })
          };
        }
        return item;
      })
    );
  };




  const SelectClick = () => {
    TextChange1()
    setOpen(false)
    dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody))

  };

  const TextValues = (value) => {
    setItemlist(value);

  };

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };
  const clickGrade = (value) => {
    SetSelectGrade(value);
  };


  const clickSelectClass = (value) => {
    SetselectTeacher(value);
  };

  const clickRemark = (value) => {
    setRemark(value);
  };

  const clickStudentList = (value) => {
    SetStudentList(value);
  };

  const getStudentName = () => {
    let classStudentName = '';
    USGetAllStudentswiseRemarkDetails.map((item) => {
      if (item.Value == StudentId) classStudentName = item.Name;
    });
    return classStudentName;
  };

     

  const FStudentName = () => {
    let classStudentName = '';
    Itemlist.map((item) => {
      if (item.Value == StudentId) classStudentName = item.FName;
    });
    return classStudentName;
  };

  const GEtSalutation = () => {
    let classStudentName = '';
    Itemlist.map((item) => {
      if (item.Value == StudentId) classStudentName = item.SalutationId;
    });
    return classStudentName;
  };


  
  

  const StudentFName = FStudentName()
  const PassSalutationId = GEtSalutation()

  
  


  const studentName = getStudentName();
  const ClickAppropriate = (Id, Index) => {
    setStudentId(Id)
    SetColIndex(Index)
    dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody))
    dispatch(CDAGradeDropDown(GetAllGradesForStandardBody));
    dispatch(CDAGetRemarksCategory(RemarkCategoryBody));
    setOpen(!open)

  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {

    const AllStudentsForProgressBody: IGetAllStudentswiseRemarkDetailsNewBody = {
      ...GetAllStudentswiseRemarkDetailsBody,
      asStartIndex: startIndex,
      asEndIndex: endIndex

    };

    dispatch(CDAGetAllStudentswiseRemarkDetails(AllStudentsForProgressBody));
  }, [page, selectTeacher, SelectTerm, StudentList]);


  const Changevalue = (value) => {
    setRemarkTemplates(value);
  };

  const ClickHeader = (value) => {
    setHeaderPublish(value)
  }


  useEffect(() => {
    if (USRemarkTemplateDetails) {
      setRemarkTemplates(USRemarkTemplateDetails);
    }
  }, [USRemarkTemplateDetails]);
  useEffect(() => {
    setItemlist(USGetAllStudentswiseRemarkDetails);
  }, [USGetAllStudentswiseRemarkDetails]);
  console.log(USGetAllStudentswiseRemarkDetails, "USGetAllStudentswiseRemarkDetails");

  useEffect(() => {
    if (UpdateAllStudentsRemarkDetail != '') {
      toast.success(UpdateAllStudentsRemarkDetail);
      dispatch(CDAresetSaveMassage());
      dispatch(
        CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)
      );
    }
  }, [UpdateAllStudentsRemarkDetail]);
  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
    }
  }, [USGetTestwiseTerm]);
  useEffect(() => {
    if (GradeDropDown.length > 0) {
      SetSelectGrade(GradeDropDown[0].Value);
    }
  }, [GradeDropDown]);

  useEffect(() => {
    if (USRemarksCategory.length > 0) {
      setRemark(USRemarksCategory[0].Value);
    }
  }, [USRemarksCategory]);

  useEffect(() => {
    dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody));
  }, [SelectGrade, Remark, HeaderPublish]);

  const UpdateRemark = () => {
    const UpdateAllStudentsRemarkDetailsBody: IUpdateAllStudentsRemarkDetailsBody =
    {
      StudentwiseRemarkXML: getXML(),
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asInsertedById: Number(selectTeacher),
      asStandardDivId: getStdDivisionId(),
      asTermId: Number(SelectTerm)
    };

    dispatch(
      CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody)
    );[page, selectTeacher, SelectTerm, StudentList]
  };

  useEffect(() => {
    dispatch(CDAGetFinalPublishedExamStatus(GetFinalPublishedExamStatusBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetClassTeachers(ClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAStudentListDropDown(StudentListDropDowntBody));
  }, [SelectTerm]);

  useEffect(() => {
    dispatch(
      CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)
    );
  }, [selectTeacher, SelectTerm, StudentList]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' },
          { title: 'Progress Remarks', path: '/extended-sidebar/Teacher/ProgressRemarks' }
        ]}
        rightActions={<>
        
          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '350px' }}
            ItemList={ USClassTeachers}
            onChange={clickSelectClass }
            defaultValue={selectTeacher}
            size={"small"}
            DisableClearable={GetScreenPermission() == 'N'}
            disabled={GetScreenPermission() == 'N'}
          />


          <SearchableDropdown
            ItemList={USGetTestwiseTerm}
            sx={{ minWidth: '200px' }}
            onChange={clickSelectTerm}
            defaultValue={SelectTerm}
            label={'Term'}
            size={"small"}
          />

          <SearchableDropdown
            ItemList={USStudentListDropDown}
            sx={{ minWidth: '300px' }}
            onChange={clickStudentList}
            defaultValue={StudentList}
            label={'StudentList'}
            size={"small"}
          />

          <Box>
            <Tooltip title={'Add/Edit/Delete student progress remarks.'}>
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
          </Box>
          <Box>
            <Tooltip title={'Export'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
          <Box> {USGetFinalPublishedExamStatus.IsPublishedStatus == 1 &&
            <Tooltip title={'Save'}>
              <IconButton
                onClick={UpdateRemark}
                sx={{
                  color: 'white',
                  backgroundColor: 'green'
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          }

          </Box>
        </>}
      />
      <Paper sx={{ mb: '10px' }}>
        <ProgressRemarksNotes />
      </Paper>
      <Box sx={{ background: 'white', p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ProgressRemarkTerm.Provider value={SelectTerm}>
                <ResizableCommentsBox
                  HeaderArray={HeaderArray}
                  ItemList={Itemlist}
                  NoteClick={ClickAppropriate}
                  setTextValues={TextValues}
                />
              </ProgressRemarkTerm.Provider>
              <Box sx={{ margin: '8px' }} style={{ display: 'flex', justifyContent: 'end' }}>
                <Pagination
                  count={5}
                  variant={"outlined"}
                  shape='rounded' showFirstButton
                  showLastButton
                  onChange={(event, value) => {
                    handlePageChange(value);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"} variant='h4' mb={1}>
              Legends
            </Typography>
            <Typography fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}>
              <Box sx={{ height: '20px', width: '20px', background: red[500] }} />
              <Box>Left Students</Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={ClickAppropriate}
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box>
              <Box>
                <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>Select Appropriate Template</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, margin: '12px' }}>

                <TextField
                  size={"small"}
                  fullWidth
                  label={"StudentList"}
                  value={studentName}
                  sx={{ bgcolor: '#f0e68c' }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <SearchableDropdown
                  ItemList={USRemarksCategory}
                  sx={{ minWidth: '230px' }}
                  onChange={clickRemark}
                  defaultValue={Remark}
                  label={'Remark Category'}
                  size={"small"}
                />
                <SearchableDropdown
                  ItemList={GradeDropDown}
                  sx={{ minWidth: '230px' }}
                  onChange={clickGrade}
                  defaultValue={SelectGrade}
                  label={'Grades'}
                  size={"small"}
                />

              </Box>

              <Box sx={{ padding: 1, marginBottom: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                {remarkTemplates.length > 0 ? (
                  <ProgressRemarkTerm.Provider value={{ StudentFName, StudentId, PassSalutationId }}>
                    <RemarkList
                      ItemList={remarkTemplates}
                      HeaderArray={HeaderPublish}
                      onChange={Changevalue}
                      ClickHeader={ClickHeader}
                    />
                  </ProgressRemarkTerm.Provider>
                ) : (
                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', width: '700px' }}>
                    <b>No Record Found.</b>
                  </Typography>
                )}
              </Box>

            </Box>
            <Box>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#5ec479',
                  color: 'White',
                  marginRight: '10px'
                }}
                onClick={SelectClick} >
                SELECT
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#de554b',
                  color: 'White',
                  marginRight: '10px'
                }}
                onClick={() => setOpen(!open)}
              >
                CLOSE
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
};

export default ProgressRemarks;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: '#EAF1F5',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


