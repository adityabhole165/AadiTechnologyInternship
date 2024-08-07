import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, DialogTitle, Grid, IconButton, Modal, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllGradesForStandardBody,
  IGetAllStudentswiseRemarkDetailsNewBody,
  IGetConfiguredMaxRemarkLengthBody,
  IGetFinalPublishedExamStatusBody,
  IGetRemarkTemplateDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import RemarkList from 'src/libraries/ResuableComponents/RemarkList';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAGetAllStudentswiseRemarkDetails,
  CDAGetClassTeachers,
  CDAGetConfiguredMaxRemarkLength,
  CDAGetFinalPublishedExamStatus,
  CDAGetRemarkTemplateDetails,
  CDAGetRemarksCategory,
  CDAGetTestwiseTerm,
  CDAGradeDropDown,
  CDAResetStudentDropdown,
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
  const [IsDirty, setIsDirty] = useState(false);
  const [page1, setPage1] = useState(0);
  const asStandardId = sessionStorage.getItem('StandardId');
  const [StudentId, setStudentId] = useState([]);
  const [Remark, setRemark] = useState('')
  const [remarkTemplates, setRemarkTemplates] = useState([]);
  const toggleScreens = () => { setShowScreenOne(!showScreenOne); };
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];

  const { StandardDivisionId, TestId } = useParams();

  const [selectTeacher, SetselectTeacher] = useState(StandardDivisionId == undefined ? "0" : StandardDivisionId);

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

  // const determineInitialState = () => {
  //   return GetScreenPermission() === 'Y' ? '0' : sessionStorage.getItem('StandardDivisionId') || '';
  // };


  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: '', SortOrder: "asc" },
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

  const countArray = USGetAllStudentsForProgressRemark.map((item: any) => item.TotalRows);
  console.log(countArray[0], "countArray");


  const USRemarkDetailsHeaderList: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISRemarkDetailsHeaderList
  );


  const USGetConfiguredMaxRemarkLength: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISGetConfiguredMaxRemarkLength
  );

  const maxRemarkLength = USGetConfiguredMaxRemarkLength?.MaxRemarkLength;

  console.log(maxRemarkLength, "---M1");


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

  const getStandardId = () => {
    let returnVal = 0
    USClassTeachers.map((Item) => {
      if (Item.Value == selectTeacher)
        returnVal = Item.asStandardId
    })
    return returnVal
  }


  const RemarkCategoryBody: IGetRemarksCategoryBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId
  };


  const GetConfiguredMaxRemarkLengthBody: IGetConfiguredMaxRemarkLengthBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: getStandardId(),
    asTermId: SelectTerm
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

  const StudentListDropDowntBody: IStudentListDropDowntBody = {
    asStandard_Division_Id: getStdDivisionId(),
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTerm_Id: SelectTerm
  };

  const startIndex = (page - 1) * rowsPerPage;

  const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsNewBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: getStdDivisionId(),
    asStudentId: Number(StudentList),
    asTermId: Number(SelectTerm),
    TeacherId: Number(selectTeacher),
    asStartIndex: startIndex,
    asEndIndex: Number(20),
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

  // const TextChange1 = () => {
  //   setItemlist(prevItemlist =>
  //     prevItemlist.map(item => {
  //       if (item.Id === StudentId) {
  //         const activeTexts = getActiveTexts().join(' ');
  //         return {
  //           ...item,
  //           Remarks: item.Remarks.map((remark, i) => {
  //             const newText3 = remark.Text3 + activeTexts;
  //             return { ...remark, Text3: (i == ColIndex) ? newText3.slice(0, 300) : remark.Text3  };
  //           })
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };
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
      CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody),

    );[page, selectTeacher, SelectTerm]
  };

  const TextChange1 = () => {
    let showAlert = false;
    setItemlist(prevItemlist =>
      prevItemlist.map(item => {
        if (item.Id === StudentId) {
          const activeTexts = getActiveTexts().join(' ');
          const updatedRemarks = item.Remarks.map((remark, i) => {
            if (i === ColIndex) {
              const newText3 = remark.Text3 + activeTexts;
              if (newText3.length > maxRemarkLength) {
                showAlert = true;
                return remark; // Return the original remark without changes
              } else {
                setIsDirty(true)
                return { ...remark, Text3: newText3 };
              }
            }
            return remark;
          });
          if (showAlert) {
            alert(`Remarks length should not be more than ${maxRemarkLength}`);
          }
          return {
            ...item,
            Remarks: updatedRemarks
          };
        }
        return item;
      })
    );
    return showAlert;
  };

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (USGetFinalPublishedExamStatus.IsPublishedStatus == 1) {
      <span> </span>
    }

    else {
      const autoSave = setInterval(() => {
        if (IsDirty) {
          UpdateRemark();
          setMessage("We are saving current progress remarks details.Please wait.");
        }
      }, 60000);

      return () => clearInterval(autoSave);

    }
  }, [IsDirty, UpdateRemark, USGetFinalPublishedExamStatus.IsPublishedStatus]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (IsDirty) {
          setMessage("");
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);



  const SelectClick = () => {
    const showAlert = TextChange1();
    if (!showAlert) {
      setOpen(false);
      dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody));
    }
  };



  const clickSelectTerm = (value) => {
    if (SelectTerm != '') {
      const confirmMessage = "Data modification for last minute is auto saved but entered progress remarks after auto save on the current page will get lost with your action. Do you want to continue?";
      let confirmed = false
      if (IsDirty) {
        confirmed = window.confirm(confirmMessage);

        if (confirmed) {
          SetSelectTerm(value);

        }
      }
      else
        SetSelectTerm(value);

    }


  };
  const clickGrade = (value) => {
    SetSelectGrade(value);
  };


  // const clickSelectClass = (value) => {
  //   SetselectTeacher(value);
  // };

  const clickSelectClass = (value) => {
    if (selectTeacher != '') {
      const confirmMessage = "Data modification for last minute is auto saved but entered progress remarks after auto save on the current page will get lost with your action. Do you want to continue?";
      let confirmed = false
      if (IsDirty) {
        confirmed = window.confirm(confirmMessage);

        if (confirmed) {
          SetselectTeacher(value);
          setRowsPerPage(20)
          setPage(1)
        }
      }
      else
        SetselectTeacher(value);
      setRowsPerPage(20)
      setPage(1)

    }
  };

  const TextValues = (value) => {
    setIsDirty(true)
    setItemlist(value);

  };

  const clickRemark = (value) => {
    setRemark(value);
  };

  const clickStudentList = (value) => {
    SetStudentList(value);
  };


  const Exportremark = () => {
    const confirmMessage = "This Action will show only saved details. Do you want to continue?";
    let confirmed = true
    confirmed = window.confirm(confirmMessage);

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




  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, countArray[0]);
  const pagecount = Math.ceil(countArray[0] / rowsPerPage);
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
  }, [page, selectTeacher, SelectTerm, rowsPerPage]);


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
    setIsDirty(false)
    setItemlist(USGetAllStudentswiseRemarkDetails);
  }, [USGetAllStudentswiseRemarkDetails]);


  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
    }
  }, [USGetTestwiseTerm]);

  useEffect(() => {
    if (USStudentListDropDown.length > 0) {
      SetStudentList(USStudentListDropDown[0].Value);
    }
  }, [USStudentListDropDown]);



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
    dispatch(CDAGetConfiguredMaxRemarkLength(GetConfiguredMaxRemarkLengthBody));
  }, [SelectTerm]);




  useEffect(() => {
    dispatch(CDAStudentListDropDown(StudentListDropDowntBody));
  }, [SelectTerm, selectTeacher]);

  useEffect(() => {
    if (StudentList === '') {
      dispatch(CDAResetStudentDropdown());
    } else {
      dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
    }
  }, [selectTeacher, SelectTerm, StudentList, page1, rowsPerPage]);

  useEffect(() => {
    if (UpdateAllStudentsRemarkDetail != '') {
      toast.success(UpdateAllStudentsRemarkDetail);
      setIsDirty(false)
      dispatch(CDAresetSaveMassage());
      CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)

    }
  }, [UpdateAllStudentsRemarkDetail]);

  const CustomTablePaginationActions = () => null;
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase/' + getStdDivisionId() + '/' + TestId },
          { title: 'Progress Remarks', path: '/extended-sidebar/Teacher/ProgressRemarks' }
        ]}
        rightActions={<>

          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '20vw', backgroundColor: GetScreenPermission() == 'N' ? '#F0F0F0' : '', }}
            ItemList={USClassTeachers}
            onChange={clickSelectClass}
            defaultValue={selectTeacher}
            mandatory
            size={"small"}
            DisableClearable={GetScreenPermission() == 'N'}
            disabled={GetScreenPermission() == 'N'}
          />


          <SearchableDropdown
            ItemList={USGetTestwiseTerm}
            sx={{ minWidth: '10vw' }}
            onChange={clickSelectTerm}
            defaultValue={SelectTerm}
            label={'Term'}
            size={"small"}
          />

          <SearchableDropdown
            ItemList={USStudentListDropDown}
            sx={{ minWidth: '20vw' }}
            onChange={clickStudentList}
            defaultValue={StudentList}
            label={'Student List'}
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
            {USGetAllStudentswiseRemarkDetails.length > 0 ?
              <Tooltip title={'Export'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                  onClick={Exportremark}  >
                  <Download />
                </IconButton>
              </Tooltip> : null
            }

          </Box>
          <Box>
            {USGetAllStudentswiseRemarkDetails.length > 0 ? (


              <Tooltip title={'Save'}>
                <IconButton
                  onClick={UpdateRemark}
                  sx={{
                    color: 'white',
                    backgroundColor: 'green'
                  }}
                  disabled={USGetFinalPublishedExamStatus.IsPublishedStatus == 1}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <span></span>
            )

            }

          </Box>
        </>}
      />
      <Paper sx={{ mb: '10px' }}>
        <ProgressRemarksNotes />
      </Paper>
      
      <Box sx={{  mb: 2, mt:2 }}>
        <Box sx={{ background: 'white', mb: 2, p: 2 }}>
        <Grid item xs={12}>
          <Typography fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}>
            <Typography fontWeight={"bold"} variant='h4' >Legend</Typography>
            <Box sx={{ height: '20px', width: '20px', background: red[500] }} />
            <Box>Left Students</Box>
          </Typography>
        </Grid>
        </Box>
        <Box sx={{ background: 'white', p:2 }}>
        <Grid container spacing={2}>
        
          {
            USGetAllStudentswiseRemarkDetails.length > 0 ? (
              <div style={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ margin: '10px 0', textAlign: 'center', pt: 2 }}>
                  <Box component="span" fontWeight="fontWeightBold">
                    {startRecord} to {endRecord}
                  </Box>
                  {' '}out of{' '}
                  <Box component="span" fontWeight="fontWeightBold">
                    {countArray[0]}
                  </Box>{' '}
                  {countArray[0] === 1 ? 'record' : 'records'}
                </Typography>
              </div>

            ) : (
              <span></span>

            )
          }

          <Grid item xs={12}>
            <Paper>

              {message && (
                <Typography style={{ position: "fixed", top: "50%", left: "50%", padding: "10px", backgroundColor: "#e8eaf6", border: "1px solid #ccc", zIndex: 9999, width: '500px', font: "20px" }}>
                  {message}
                </Typography>

              )}



              {USGetAllStudentswiseRemarkDetails.length > 0 ? (
                <ProgressRemarkTerm.Provider value={{ maxRemarkLength, SelectTerm }}>
                  <ResizableCommentsBox
                    HeaderArray={HeaderArray}
                    ItemList={Itemlist}
                    NoteClick={ClickAppropriate}
                    setTextValues={TextValues}
                  />
                </ProgressRemarkTerm.Provider>
              ) : (
                <span> </span>

              )}



            </Paper>
          </Grid>

        </Grid>
        {countArray[0] > rowsPerPage ? (
          <ButtonGroupComponent
            rowsPerPage={rowsPerPage}
            ChangeRowsPerPage={ChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            PageChange={PageChange}
            pagecount={pagecount}
          />

        ) : (
          <span> </span>

        )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={ClickAppropriate}

      >
        <Box sx={style}>
          <DialogTitle
            sx={{
              bgcolor: '#223354',
              color: (theme) => theme.palette.common.white,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}
          >
            <ClearIcon onClick={() => setOpen(!open)}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '7px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red',
                }
              }} />
          </DialogTitle>
          <Box sx={{ color: '#223354', position: 'relative', flexDirection: 'column', margin: '18px' }}>

            <h1>
              Select Appropriate Template
            </h1>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>

              <TextField
                size={"small"}
                fullWidth
                label={"Student Name"}
                value={studentName}
                sx={{ bgcolor: '#F0F0F0	', minWidth: '230px' }}
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

            <Box sx={{ pt: 1, marginBottom: '9px', maxHeight: '320px', overflowY: 'auto' }}>
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
          <Box sx={{ marginLeft: 70 }}>
            <Button
              sx={{
                mt: 2,
                color: 'red',
                '&:hover': {
                  color: 'red',
                  backgroundColor: red[100]
                }
              }}

              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
            <Button
              sx={{
                mt: 2,
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
              onClick={SelectClick}
              disabled={remarkTemplates.length === 0}
            >
              Select
            </Button>

          </Box>

        </Box>
      </Modal>

    </Box>
  );
};

export default ProgressRemarks;

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 800,
//   height: 500,
//   bgcolor: '#EAF1F5',
//   border: '2px solid #000',
// };


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 550,
  bgcolor: 'white',
  borderRadius: "15px",
};
