import AssignmentIcon from '@mui/icons-material/Assignment';
import Autorenew from '@mui/icons-material/Autorenew';
import CheckCircle from '@mui/icons-material/CheckCircle';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import QuestionMark from '@mui/icons-material/QuestionMark';
import TextSnippet from '@mui/icons-material/TextSnippet';
import Unpublished from '@mui/icons-material/Unpublished';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Alert, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import FinalResultUnpublish from 'src/components/FinalResultUnpublish/FinalResultUnpublish';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IClassTeacherListBody,
  IConfiguredTestPublishedBody,
  IGenerateAllBody,
  IGenerateBody,
  IGetPagedStudentBody,
  IUnpublishBody,
  IUnpublishedTestexamBody,
  IViewBody,
  IconfiguredExamBody,
  isAtleastOneResultGeneratedBody,
  isResultPublishedBody,
  isTestPublishedBody
} from 'src/interfaces/FinalResult/IFinalResult';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import { IGetUserDetailsBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import {
  ClassTechersList,
  GetAtleastOneResultGeneratedss,
  GetGenerate,
  GetGenerateAll,
  GetPublishResult,
  GetResultPublishd,
  GetStudentResultList,
  GetTestPublishedd,
  GetUnpublishResult,
  GetViewResult,
  getConfiguredTestPublished,
  getiscofigred,
  getunpublishedexam,
  resetGenerateAll,
  resetPublishResult,
  resetUnpublishResult
} from 'src/requests/FinalResult/RequestFinalResult';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { getUserDetailss } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';
import FinalResultTable from './FinalResultTable';
const FinalResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { StandardDivisionId1 } = useParams();

  const [Open, setOpen] = useState(false);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const { showAlert, closeAlert } = useContext(AlertContext);
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUpdatedById = localStorage.getItem('Id');

  const TeacherId = Number(sessionStorage.getItem('TeacherId'));

  // const [SelectTeacher, setSelectTeacher] = useState('');

  // const [selectTeacherNew, setSelectTecherNew] = useState(sessionStorage.getItem('TeacherId') || '')


  // const StandardDivisionId = Number(
  //   sessionStorage.getItem('StandardDivisionId')
  // );

  const [Reason, setReason] = useState('');
  const [showProgressReport, setShowProgressReport] = useState(true);
  const handleVisibilityClick = () => {
    setShowProgressReport(!showProgressReport); // Toggle visibility
  }
  const StandardDivisionIdse = (
    sessionStorage.getItem('StandardDivisionId')
  );



  const FinalResultFullAccess = GetScreenPermission('Final Result');

  const [asStdDivId, setasStdDivId] = useState();
  const [asUnPublishReason, setasUnPublishReason] = useState();
  const asUserId = Number(localStorage.getItem('UserId'));
  const [asUseAvarageFinalResult, asasUseAvarageFinalResult] = useState('Y');
  const [asStudentId, setasStudentId] = useState();
  const [asInsertedById, setasInsertedById] = useState();
  const [asWithGrace, setasWithGrace] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState(1);
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const Exam = ['Final Result'];


  const getDropdownName = (List, value) => {
    let returnVal = ""
    List.map((Item) => {
      if (Item.Value == value)
        returnVal = Item.Name
    })
    return returnVal
  };



  const AssignmentClickIcon = (value) => {
    navigate('/extended-sidebar/Teacher/StudentProgressReport/' + asUserId + '/' + asStudentId)
  }

  const VisibilityClickIcon = (value) => {
    navigate('/extended-sidebar/Teacher/StudentProgressReport/' + asStudentId)
  }


  const Loading = useSelector(
    (state: RootState) => state.FinalResult.Loading
  );
  const GetAtleastOneResultGenerated: any = useSelector(
    (state: RootState) => state.FinalResult.GetAtleastOneResultGenerated
  );

  const GetResultGenerated = useSelector(
    (state: RootState) => state.FinalResult.ISGetResultPublishd
  );
  const GetClassTeachers = useSelector(
    (state: RootState) => state.FinalResult.ClassTeachers


  );

  const [StandardDivisionId, setStandardDivisionId] = useState((FinalResultFullAccess === 'Y' ? '0' : StandardDivisionIdse));


  const buttonsDisabled = StandardDivisionId === '0';
  const HeaderList = [
    'Roll No.',
    'Student Name',
    'Total',
    '%',
    'Grade',
    'Result',
    'Generate',
    'View',
    'Grace'
  ];
  const columns = useMemo<Column[]>(() => [
    {
      id: 'rollNo',
      label: 'Roll No.',
      renderCell: (row) => row.Text1
    },
    {
      id: 'studentName',
      label: 'Student Name',
      renderCell: (row) => row.Text2
    },
    {
      id: 'total',
      label: 'Total',
      renderCell: (row) => row.Text3
    },
    {
      id: 'percentage',
      label: '%',
      renderCell: (row) => row.Text4
    },
    {
      id: 'grade',
      label: 'Grade',
      renderCell: (row) => row.Text5
    },
    {
      id: 'result',
      label: 'Result',
      renderCell: (row) => row.Text6
    },
    {
      id: 'generate',
      label: 'Generate',
      renderCell: (row) =>
        !GetResultGenerated || buttonsDisabled ? (
          <IconButton
            onClick={() => {
              navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Id + '/' + row.Text7 + '/' + false + '/' + StandardDivisionId);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ml: 2
            }}
          >
            <AssignmentIcon />
          </IconButton>
        ) : null // Renders nothing if the condition is false
    },
    {
      id: 'view',
      label: 'View',
      renderCell: (row) =>
        row.CanShowVisibility ? (
          <IconButton
            onClick={() => {
              navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Id + '/' + 'Y' + '/' + true + '/' + StandardDivisionId);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <VisibilityIcon />
          </IconButton>
        ) : null
    },
    {
      id: 'grace',
      label: 'Grace',
      renderCell: (row) => row.grace
    }
  ], [GetResultGenerated, buttonsDisabled]);

  const IconList = [
    {
      Id: 1,
      Icon: <AssignmentIcon />,
      Action: 'AssignmentIcon'
    },

    {
      Id: 2,
      Icon: <VisibilityIcon />,
      Action: 'VisibilityIcon'
    }
  ];
  // const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  // const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));


  const GetStudentLists = useSelector(
    (state: RootState) => state.FinalResult.StudentResultList
  );



  const GeneratedNA = GetStudentLists.map((item) => item.Is_ResultGenrated)
  const Bot = GeneratedNA[0];

  const GetStudentLists1: any = useSelector(
    (state: RootState) => state.FinalResult.StudentResultList1
  );

  const notGeneratedCount = GetStudentLists1.NotGenratedResultCount;

  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);

  const BlockExamPublish = UsGetSchoolSettings?.GetSchoolSettingsResult?.BlockExamPublish || '';
  const ShowTopppers = UsGetSchoolSettings?.GetSchoolSettingsResult?.ShowTopppers || '';

  console.log(BlockExamPublish, "-Test-", ShowTopppers);


  const PublishResult = useSelector(
    (state: RootState) => state.FinalResult.PublishResult
  );

  const UnpublishResult = useSelector(
    (state: RootState) => state.FinalResult.UnpublishResult
  );

  const GenerateAll = useSelector(
    (state: RootState) => state.FinalResult.GenerateAll
  );

  const ViewResult = useSelector(
    (state: RootState) => state.FinalResult.ViewResult
  );


  const GenerateResult = useSelector(
    (state: RootState) => state.FinalResult.Generate
  );

  const GetConfiguredTestPublished = useSelector(
    (state: RootState) => state.FinalResult.GetConfiguredTestPublished
  );



  const GetTestPublished = useSelector(
    (state: RootState) => state.FinalResult.GetTestPublished
  );




  const AtLeastResultGenerated = GetAtleastOneResultGenerated.length > 0 ? GetAtleastOneResultGenerated[0].AllowPublish : null;


  // console.log(AtLeastResultGenerated, "AtLeastResultGenerated", GetAtleastOneResultGenerated, "GetAtleastOneResultGenerated");


  const UserDetail: any = useSelector((state: RootState) => state.getSchoolSettings.getUserDetails);

  const Usisconfigred: any = useSelector((state: RootState) => state.FinalResult.iscofigred);

  const Usunpublishedexam: any = useSelector((state: RootState) => state.FinalResult.unpublishexam);

  const filteredList = GetStudentLists.filter((item) => item.TotalRows !== undefined);
  const TotalCount = filteredList.map((item) => item.TotalRows);
  const uniqueTotalCount = [...new Set(TotalCount)];
  const singleTotalCount = uniqueTotalCount[0];

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // useEffect(() => {
  //   if (GetClassTeachers.length > 0 && StandardDivisionId == undefined) {
  //     setStandardDivisionId(GetClassTeachers[0].Value);
  //   }
  // }, [GetClassTeachers])

  // useEffect(() => {
  //   dispatch(GetPublishResult(PublishResultBody));
  // }, []);

  // useEffect(() => {
  //   dispatch(GetUnpublishResult(UnpublishResultBody));
  // }, [])

  // useEffect(() => {
  //   dispatch(GetGenerateAll(GenerateAllBody));
  // }, []);

  useEffect(() => {
    dispatch(GetViewResult(ViewResultBody));
  }, [asStudentId])

  useEffect(() => {
    dispatch(GetGenerate(GenerateResultBody));
  }, [])


  useEffect(() => {
    const UserDetailBody: IGetUserDetailsBody = {
      asSchoolId: String(asSchoolId),
      asUserId: userId,
      asRoleId: RoleId
    };
    dispatch(getUserDetailss(UserDetailBody));
  }, []);



  // const UnpublishResultBody: IUnpublishBody = {
  //   asSchoolId: asSchoolId,
  //   asAcademicYearId: asAcademicYearId,
  //   asStandardDivId: StandardDivisionId,
  //   asUnPublishReason: asUnPublishReason
  // }
  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),

  };


  const getTeacherId = () => {
    let returnVal = 0
    GetClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) {
        returnVal = item.Id
      }
    })
    return returnVal
  };

  const [sortby, setSortBy] = useState('Roll No.');
  const [sortAsc, setSortAsc] = useState('Desc');


  const sortField =
    sortby === "Roll No." ? "Roll_No" :
      sortby === "Student Name" ? "Name" :
        sortby === "Total" ? "Marks" :
          sortby === "%" ? "Percentage" :
            sortby === "Grade" ? "Grade_Name" :
              sortby === "Result" ? "Result" : "";

  const sortDirection = sortAsc === 'Desc' ? ' Desc' : '';


  const ClickHeader = (value) => {
    setSortBy(value);
    if (value === sortby) {
      setSortAsc(sortAsc === 'Asc' ? 'Desc' : 'Asc');
    }

    const sortDirection = sortAsc === 'Desc' ? ' Desc' : '';

    const sortField =
      value === "Roll No." ? "Roll_No" :
        value === "Student Name" ? "Name" :
          value === "Total" ? "Marks" :
            value === "%" ? "Percentage" :
              value === "Grade" ? "Grade_Name" :
                value === "Result" ? "Result" : "";

    const PagedStudentBody = {
      asSchoolId: asSchoolId.toString(),
      asAcademicyearId: asAcademicYearId.toString(),
      asStandardDivisionId: StandardDivisionId,
      SortExp: `ORDER BY ${sortField}${sortDirection}`,
      prm_StartIndex: (page - 1) * rowsPerPage,
      PageSize: page * rowsPerPage,
    };

    dispatch(GetStudentResultList(PagedStudentBody));
  };


  const GenerateAllBody: IGenerateAllBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStdDivId: asStdDivId,
    asUserId: asUserId,
    asUseAvarageFinalResult: asUseAvarageFinalResult
  }

  const ClassTeachersBody: IClassTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    // asTeacherId: "2532"
    asTeacherId: FinalResultFullAccess == 'Y' ? '0' : TeacherId
  };



  const PagedStudentBody: IGetPagedStudentBody = {
    asSchoolId: asSchoolId.toString(),
    asAcademicyearId: asAcademicYearId.toString(),
    asStandardDivisionId: StandardDivisionId,
    SortExp: 'ORDER BY Roll_No',
    prm_StartIndex: startIndex,
    PageSize: endIndex,
  };

  const ViewResultBody: IViewBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStudentId: asStudentId,
    asInsertedById: 1,
    asWithGrace: 0

  };

  const GenerateResultBody: IGenerateBody = {
    asSchoolId: asSchoolId,
    asAcadmeicYearId: asAcademicYearId,
    asStudentId: asStudentId,
    asUserId: asUserId
  }
  const ConfiguredTestPublishedBody: IConfiguredTestPublishedBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId)

  }

  const ResultPublishedBody: isResultPublishedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId)
  }

  const TestPublishedBody: isTestPublishedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId)
  }

  const AtleastOneResultGeneratedBody: isAtleastOneResultGeneratedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId),
    asStandardId: 0
  }

  const iscofigred: IconfiguredExamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId),
  };

  const unpublishexam: IUnpublishedTestexamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: Number(StandardDivisionId),
  };

  const clickTeacherDropdown = (value) => {
    setStandardDivisionId(value);

  };
  const getstandardId = () => {
    let returnVal = false
    GetClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) {
        returnVal = item.StanderdId
      }
    })
    return returnVal
  }
  useEffect(() => {
    dispatch(ClassTechersList(ClassTeachersBody));
  }, [getTeacherId()]);

  const standardId = getstandardId();



  useEffect(() => {
    if (StandardDivisionId1 !== undefined)
      setStandardDivisionId(StandardDivisionId1);
  }, [StandardDivisionId1]);





  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));
  }, []);



  console.log(GetResultGenerated, "-t-", GetAtleastOneResultGenerated.AllowPublish);


  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/Toppers/' + getTeacherId() + '/' + StandardDivisionId + '/' + standardId + '/' + true);
  };



  // const [IsVisible, setIsVisible] = useState(false)

  // useEffect(() => {
  //   if (GetResultGenerated == true || GetAtleastOneResultGenerated.AllowPublish == false) {
  //     setIsVisible(false);
  //   } else {
  //     setIsVisible(true);
  //   }
  // }, [GetResultGenerated]);

  // console.log(IsVisible, "IsVisible", GetAtleastOneResultGenerated.AllowPublish, "GetAtleastOneResultGenerated?.AllowPublish", GetResultGenerated, "....")

  const getTeacherName = () => {
    let TeacherName = '';
    GetClassTeachers.map((item) => {
      if (item.Value == StandardDivisionId) TeacherName = item.Name;
    });
    return TeacherName;
  };
  const ClickOpenDialogbox = () => {
    setOpen(true);

  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };
  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page when changing rows per page
  };
  const onClickUnpublish = (unPublish, Reason = '') => {

    if (asUnPublishReason !== '') {
      const UnpublishResultBody: IUnpublishBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(StandardDivisionId),
        asUnPublishReason: unPublish ? null : Reason
      }
      dispatch(GetUnpublishResult(UnpublishResultBody))
      dispatch(GetResultPublishd(ResultPublishedBody))
      dispatch(GetStudentResultList(PagedStudentBody))
      // dispatch(GetPublishResult(PublishResultBody));
      // const PublishBody: IPublishBody = {
      //   asSchoolId: asSchoolId,
      //   asAcadmicYearId: asAcademicYearId,
      //   asStdDivId: asStdDivId
      // }
      // dispatch(GetPublishResult(PublishBody))

    }  // dispatch(GetPublishResult(PublishResultBody));
  };
  const onClickGenerateAll = () => {

    const GenerateAllBody: IGenerateAllBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStdDivId: Number(StandardDivisionId),
      asUserId: asUserId,
      asUseAvarageFinalResult: asUseAvarageFinalResult
    }

    dispatch(GetGenerateAll(GenerateAllBody))

  };

  // const onClickPublish = (publish) => {
  //   if (publish) {
  //     if (!window.confirm("Once you publish the result it will be visible to parents/students. Are you sure you want to continue?")) {
  //       return;
  //     }
  //     const PublishBody: IPublishBody = {
  //       asSchoolId: asSchoolId,
  //       asAcademicYrId: 55,
  //       asStandardDivision_Id: Number(StandardDivisionId),
  //       asInsertedById: asUserId,
  //       // asPublishById: 0
  //     }
  //     dispatch(GetPublishResult(PublishBody))
  //     dispatch(GetResultPublishd(ResultPublishedBody))

  //     // dispatch(GetUnpublishResult(UnpublishResultBody))

  //   };

  // }

  const onClickPublish = (publish) => {
    if (publish) {
      const GeneratedNA = GetStudentLists.map((item) => item.Is_ResultGenrated);
      const countNotY = GeneratedNA.filter((item) => item !== "Y").length;

      const PublishBody = {
        asSchoolId: asSchoolId,
        asAcademicYrId: asAcademicYearId,
        asStandardDivision_Id: Number(StandardDivisionId),
        asInsertedById: asUserId,
        // asPublishById: 0
      };

      // Dynamic message based on countNotY
      const message = notGeneratedCount > 0
        ? `Result of ${notGeneratedCount} students is not generated. Once you publish the result, it will be visible to parents/students. Are you sure you want to continue?`
        : 'Once you publish the result it will be visible to parents/students. Are you sure you want to continue?';

      showAlert({
        title: 'Please Confirm',
        message, // Use dynamic message here
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          dispatch(GetPublishResult(PublishBody));
          dispatch(GetResultPublishd(ResultPublishedBody));
          closeAlert();
        }
      });
    }
  };




  useEffect(() => {
    if (UnpublishResult !== '') {
      toast.success(UnpublishResult)
      dispatch(resetUnpublishResult())
      dispatch(GetStudentResultList(PagedStudentBody))
      dispatch(GetResultPublishd(ResultPublishedBody))
      dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
    }
  }, [page, rowsPerPage, UnpublishResult, startIndex, endIndex])

  useEffect(() => {
    if (GenerateAll !== '') {
      toast.success(GenerateAll)
      dispatch(resetGenerateAll())
      dispatch(GetStudentResultList(PagedStudentBody))
      dispatch(GetResultPublishd(ResultPublishedBody))
      dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
    }
  }, [page, rowsPerPage, GenerateAll, startIndex, endIndex])

  useEffect(() => {
    if (PublishResult !== '') {
      toast.success(PublishResult)
      dispatch(resetPublishResult())
      dispatch(GetStudentResultList(PagedStudentBody))
      dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))

    }
  }, [page, rowsPerPage, PublishResult, startIndex])

  useEffect(() => {
    if (StandardDivisionId != '0') {
      dispatch(getConfiguredTestPublished(ConfiguredTestPublishedBody))
      dispatch(GetTestPublishedd(TestPublishedBody))
      dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
      dispatch(getiscofigred(iscofigred));
      dispatch(getunpublishedexam(unpublishexam));
      dispatch(GetStudentResultList(PagedStudentBody));
    }
  }, [page, rowsPerPage, StandardDivisionId, startIndex, endIndex])

  // useEffect(() => {
  //   dispatch(GetStudentResultList(PagedStudentBody))
  // }, [onClickGenerateAll]);

  // useEffect(() => {
  //   if (GetResultGenerated) {
  //     dispatch(GetStudentResultList(PagedStudentBody));
  //   }
  // }, [GetResultGenerated])


  // const clickTeacher = (value) => {
  //   setstandardDivisionId(value);
  // }

  useEffect(() => {
    dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
  }, [StandardDivisionId])

  useEffect(() => {
    dispatch(GetResultPublishd(ResultPublishedBody))
  }, [StandardDivisionId])



  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={
        [
          {
            title: "Final Result",
            path: ''
          }
        ]
      }
        rightActions={<>
          <Box>
            {/* <Dropdown
              Array={GetClassTeachers}
              handleChange={clickTeacherDropdown}
              defaultValue={SelectTeacher}
              label={'Select Class Teacher'}
              width={"250px"}
              variant={"outlined"}
              size={"small"}
            /> */}
            <SearchableDropdown
              sx={{
                minWidth: '300px'
                , bgcolor: FinalResultFullAccess === 'N' && GetClassTeachers.length == 2 ? '#F0F0F0' : 'inherit'
              }}

              ItemList={GetClassTeachers}
              onChange={clickTeacherDropdown}
              label={'Teacher'}
              defaultValue={StandardDivisionId}
              DisableClearable={FinalResultFullAccess === 'N' && GetClassTeachers.length == 2}
              disabled={FinalResultFullAccess === 'N' && GetClassTeachers.length == 2}

              mandatory
              size={"small"}

            />
          </Box>


          <Box>
            <Tooltip title={"Display student list for their result generation. Click on \"Generate All\" to generate final results for all the students in the selected class. Click on \"Publish\" to publish the final result of the selected class. Click on \"Publish All\" to publish the final results of all the classes in your school."}>
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
            &nbsp;

            <Tooltip title={"Generate All"} disableHoverListener={false} disableFocusListener={false}>
              <span>
                <IconButton
                  onClick={onClickGenerateAll}
                  disabled={GetTestPublished == false || GetResultGenerated == true || buttonsDisabled}
                  sx={{
                    color: 'white',
                    backgroundColor: GetResultGenerated ? blue[200] : blue[500],
                    '&:hover': {
                      backgroundColor: blue[600]
                    },
                    ...(GetTestPublished == false || GetResultGenerated == true || buttonsDisabled) && {
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <Autorenew />
                </IconButton>
              </span>
            </Tooltip>
            &nbsp;
            <Tooltip title={"View Result All"} disableHoverListener={false} disableFocusListener={false}>
              <span>
                <IconButton
                  onClick={() => {
                    navigate('/extended-sidebar/Teacher/ViewResultAll/' + StandardDivisionId)
                  }}
                  disabled={GetAtleastOneResultGenerated?.AllowPublish == false || buttonsDisabled}
                  sx={{
                    color: 'white',
                    backgroundColor: GetAtleastOneResultGenerated?.AllowPublish == false ? blue[200] : blue[500],
                    '&:hover': {
                      backgroundColor: blue[600]
                    },
                    ...(GetAtleastOneResultGenerated?.AllowPublish == false || buttonsDisabled) && {
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <TextSnippet />
                </IconButton>
              </span>
            </Tooltip>
            &nbsp;
            {
              UserDetail.CanPublishUnpublishExam == true ?
                <span>
                  <Tooltip title={"Publish"} disableHoverListener={false} disableFocusListener={false}>
                    <span>
                      <IconButton
                        onClick={() => onClickPublish(true)}
                        disabled={(GetResultGenerated == true || GetAtleastOneResultGenerated.AllowPublish == false) || (BlockExamPublish || buttonsDisabled)}
                        sx={{
                          color: 'white',
                          backgroundColor: (GetResultGenerated == true || GetAtleastOneResultGenerated.AllowPublish == false) || (BlockExamPublish || buttonsDisabled) ? blue[200] : blue[500],
                          '&:hover': {
                            backgroundColor: blue[600]
                          },
                          ...(GetResultGenerated == true || GetAtleastOneResultGenerated.AllowPublish == false || buttonsDisabled) && {
                            pointerEvents: 'none'
                          }
                        }}
                      >
                        <CheckCircle />
                      </IconButton>
                    </span>
                  </Tooltip>
                  &nbsp;
                  <Tooltip title={"Unpublish"} disableHoverListener={false} disableFocusListener={false}>
                    <span>
                      <IconButton
                        onClick={ClickOpenDialogbox}
                        disabled={!GetResultGenerated || buttonsDisabled}
                        sx={{
                          color: 'white',
                          backgroundColor: !GetResultGenerated ? red[200] : red[500],
                          '&:hover': {
                            backgroundColor: red[600]
                          },
                          ...(!GetResultGenerated || buttonsDisabled) && {
                            pointerEvents: 'none'
                          }
                        }}
                      >
                        <Unpublished />
                      </IconButton>
                    </span>
                  </Tooltip>

                </span> : <span></span>
            }



            &nbsp;

            {
              ShowTopppers == true ?
                <Tooltip title={"Toppers"} disableHoverListener={false} disableFocusListener={false}>
                  <span>
                    <IconButton
                      onClick={Toppers}
                      disabled={(GetResultGenerated == false && GetAtleastOneResultGenerated.AllowPublish == false) || buttonsDisabled}
                      sx={{
                        color: 'white',
                        backgroundColor: blue[500],
                        '&:hover': {
                          backgroundColor: blue[600]
                        },
                        ...((GetResultGenerated == false && GetAtleastOneResultGenerated.AllowPublish == false) || buttonsDisabled) && {
                          pointerEvents: 'none'
                        }
                      }}
                    >

                      <WorkspacePremiumIcon />
                    </IconButton>
                  </span>
                </Tooltip> : <span></span>
            }






          </Box>


        </>
        }




      />
      {/* {
        Loading &&
        <SuspenseLoader />
      } */}

      {GetTestPublished == false ?
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
          <b>No exam of this class has been published for the current academic year.</b>
        </Typography>
        : null}


      {GetStudentLists.length > 0 && GetTestPublished == true ? <Box sx={{ background: 'white', p: 2 }}>
        <Typography variant={"h6"} textAlign={'center'} color={"primary"} mb={2}>
          {Usisconfigred.IsConfiged == 0 ? (
            <div>
              {Usunpublishedexam.length > 0 && (
                <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
                  <b style={{ color: 'blue' }}> All configured exams are not published - {Usunpublishedexam.map((item) => item.SchoolWise_Test_Name).join(', ')}</b>
                </Alert>
              )}
            </div>
          ) : (
            <span> </span>
          )}
        </Typography>

        {singleTotalCount > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
            <Box component="span" fontWeight="fontWeightBold">
              {startRecord} to {endRecord}
            </Box>
            {' '}out of{' '}
            <Box component="span" fontWeight="fontWeightBold">
              {singleTotalCount}
            </Box>{' '}
            {singleTotalCount === 1 ? 'record' : 'records'}
          </Typography>
        </div> : <span> </span>}

        {GetStudentLists && GetStudentLists.length > 0 && (
          <FinalResultTable
            columns={columns}
            data={GetStudentLists}
            clickHeader={ClickHeader}
            sortby={sortby}
            sortAsc={sortAsc}
          />
        )}

        {/* {GetStudentLists != undefined && (
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={GetStudentLists}
            IconList={IconList}
            ClickItem={ClickItem}
          />
        )} */}
        {
          endRecord > 19 ? (
            <ButtonGroupComponent
              rowsPerPage={rowsPerPage}
              ChangeRowsPerPage={ChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              PageChange={PageChange}
              pagecount={pagecount}
            />

          ) : (
            <span></span>

          )
        }

        {Open && (
          <FinalResultUnpublish
            open={Open}
            setOpen={setOpen}
            ClickCloseDialogBox={ClickCloseDialogbox}
            onClickUnpublish={onClickUnpublish}
            ExamName={Exam}
            TeacherName={getDropdownName(GetClassTeachers, StandardDivisionId)}
          />
        )}
      </Box>
        : <span></span>}



    </Box>
  )

}

export default FinalResult;

