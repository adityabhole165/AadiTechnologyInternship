import AssignmentIcon from '@mui/icons-material/Assignment';
import Autorenew from '@mui/icons-material/Autorenew';
import CheckCircle from '@mui/icons-material/CheckCircle';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import MilitaryTech from '@mui/icons-material/MilitaryTech';
import QuestionMark from '@mui/icons-material/QuestionMark';
import TextSnippet from '@mui/icons-material/TextSnippet';
import Unpublished from '@mui/icons-material/Unpublished';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert, Box, IconButton, Tooltip } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import FinalResultUnpublish from 'src/components/FinalResultUnpublish/FinalResultUnpublish';
import {
  IClassTeacherListBody,
  IConfiguredTestPublishedBody,
  IGenerateAllBody,
  IGenerateBody,
  IGetPagedStudentBody,
  IPublishBody,
  IUnpublishBody,
  IUnpublishedTestexamBody,
  IViewBody,
  IconfiguredExamBody,
  isAtleastOneResultGeneratedBody,
  isResultPublishedBody,
  isTestPublishedBody
} from 'src/interfaces/FinalResult/IFinalResult';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
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
  resetPublishResult,
  resetUnpublishResult
} from 'src/requests/FinalResult/RequestFinalResult';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import DataTable, { Column } from '../DataTable';
const FinalResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [Open, setOpen] = useState(false);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));

  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'))
    ;
  const asUpdatedById = localStorage.getItem('Id');

  const TeacherId = Number(sessionStorage.getItem('TeacherId'));

  const [SelectTeacher, setSelectTeacher] = useState();

  // const [selectTeacherNew, setSelectTecherNew] = useState(sessionStorage.getItem('TeacherId') || '')
  // console.log(TeacherId, "---", selectTeacherNew);

  // console.log(TeacherId, " ----", SelectTeacher);

  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const [Reason, setReason] = useState('');

  const [standardDivisionId, setstandardDivisionId] = useState('');

  const [asStdDivId, setasStdDivId] = useState();
  const [asUnPublishReason, setasUnPublishReason] = useState();
  const asUserId = Number(localStorage.getItem('UserId'));
  const [asUseAvarageFinalResult, asasUseAvarageFinalResult] = useState();
  const [asStudentId, setasStudentId] = useState();
  const [asInsertedById, setasInsertedById] = useState();
  const [asWithGrace, setasWithGrace] = useState();
  const Exam = ['Final Result'];

  console.log(SelectTeacher, "SelectTeacher", StandardDivisionId, "StandardDivisionId");

  const getDropdownName = (List, value) => {
    let returnVal = ""
    List.map((Item) => {
      if (Item.Value == value)
        returnVal = Item.Name
    })
    return returnVal
  };

  const FinalResultFullAccess = GetScreenPermission('Final Result')

  const AssignmentClickIcon = (value) => {
    navigate('/extended-sidebar/Teacher/StudentProgressReport/' + asUserId + '/' + asStudentId)
  }

  const VisibilityClickIcon = (value) => {
    navigate('/extended-sidebar/Teacher/StudentProgressReport/' + asStudentId)
  }

  const GetResultGenerated = useSelector(
    (state: RootState) => state.FinalResult.GetResultPublishd
  );

  console.log("GetResultGenerated", GetResultGenerated)

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
      cellProps: {
        align: 'center'
      },
      headerCellProps: {
        align: 'center'
      },
      renderCell: (row) => <>
        <AssignmentIcon onClick={() => {
          navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Student_Id)
        }} />
      </>
    },
    {
      id: 'view',
      label: 'View',
      cellProps: {
        align: 'center'
      },
      headerCellProps: {
        align: 'center'
      },
      renderCell: (row) =>
        <>
          <VisibilityIcon onClick={() => {
            navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Id)
          }} />
        </>
    },
    {
      id: 'grace',
      label: 'Grace',
      renderCell: (row) => row.grace
    }
  ], []);
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

  const GetClassTeachers = useSelector(
    (state: RootState) => state.FinalResult.ClassTeachers
  );

  const GetStudentLists = useSelector(
    (state: RootState) => state.FinalResult.StudentResultList
  );
  console.log(GetStudentLists);

  const PublishResult = useSelector(
    (state: RootState) => state.FinalResult.PublishResult
  );
  console.log("PublishResult", PublishResult);

  const UnpublishResult = useSelector(
    (state: RootState) => state.FinalResult.UnpublishResult
  );
  console.log(UnpublishResult);

  const GenerateAll = useSelector(
    (state: RootState) => state.FinalResult.GenerateAll
  );
  console.log(GenerateAll);

  const ViewResult = useSelector(
    (state: RootState) => state.FinalResult.ViewResult
  );

  console.log("viewresult", ViewResult);

  const GenerateResult = useSelector(
    (state: RootState) => state.FinalResult.Generate
  );

  console.log("GenerateResult", GenerateResult)

  const GetConfiguredTestPublished = useSelector(
    (state: RootState) => state.FinalResult.GetConfiguredTestPublished
  );

  console.log("GetConfiguredTestPublished", GetConfiguredTestPublished);


  const GetTestPublished = useSelector(
    (state: RootState) => state.FinalResult.GetTestPublished
  );

  console.log("GetTestPublished", GetTestPublished)

  const GetAtleastOneResultGenerated: any = useSelector(
    (state: RootState) => state.FinalResult.GetAtleastOneResultGenerated
  );

  console.log("GetAtleastOneResultGenerated", GetAtleastOneResultGenerated)

  const Usisconfigred: any = useSelector((state: RootState) => state.FinalResult.iscofigred);
  console.log(Usisconfigred, "Usisconfigred");

  const Usunpublishedexam: any = useSelector((state: RootState) => state.FinalResult.unpublishexam);

  // console.log(Usunpublishedexam, "Usunpublishedexam");

  useEffect(() => {
    dispatch(ClassTechersList(ClassTeachersBody));
  }, []);

  useEffect(() => {
    if (GetClassTeachers.length > 0) {
      setSelectTeacher(GetClassTeachers[0].Value);
    }
  }, [GetClassTeachers])

  // useEffect(() => {
  //   dispatch(GetPublishResult(PublishResultBody));
  // }, []);

  // useEffect(() => {
  //   dispatch(GetUnpublishResult(UnpublishResultBody));
  // }, [])

  useEffect(() => {
    dispatch(GetGenerateAll(GenerateAllBody));
  }, []);

  useEffect(() => {
    dispatch(GetViewResult(ViewResultBody));
  }, [asStudentId])

  useEffect(() => {
    dispatch(GetGenerate(GenerateResultBody));
  }, [])

  useEffect(() => {
    if (SelectTeacher != '0') dispatch(GetStudentResultList(PagedStudentBody));
  }, [SelectTeacher]);




  // const UnpublishResultBody: IUnpublishBody = {
  //   asSchoolId: asSchoolId,
  //   asAcademicYearId: asAcademicYearId,
  //   asStandardDivId: StandardDivisionId,
  //   asUnPublishReason: asUnPublishReason
  // }


  const GenerateAllBody: IGenerateAllBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: asStdDivId,
    asUserId: asUserId,
    asUseAvarageFinalResult: asUseAvarageFinalResult
  }

  const ClassTeachersBody: IClassTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };
  const PagedStudentBody: IGetPagedStudentBody = {
    asSchoolId: asSchoolId.toString(),
    asAcademicyearId: asAcademicYearId.toString(),
    asStandardDivisionId: SelectTeacher,
    SortExp: 'ORDER BY Roll_No',
    prm_StartIndex: 0,
    PageSize: 20
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
    asStdDivId: SelectTeacher

  }

  const ResultPublishedBody: isResultPublishedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: SelectTeacher
  }

  const TestPublishedBody: isTestPublishedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: SelectTeacher
  }

  const AtleastOneResultGeneratedBody: isAtleastOneResultGeneratedBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asStdDivId: SelectTeacher
  }

  const iscofigred: IconfiguredExamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: SelectTeacher,
  };

  const unpublishexam: IUnpublishedTestexamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: SelectTeacher,
  };

  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);
    console.log(value, "clickTeacherDropdown");

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


  const standardId = getstandardId();

  const getTeacherId = () => {
    let TeacherId = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherId = item.Id;
    });
    return TeacherId;
  };

  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/ExamResultToppers/' + getTeacherId() + '/' + StandardDivisionId + '/' + standardId);
  };


  const getTeacherName = () => {
    let TeacherName = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherName = item.Name;
    });
    return TeacherName;
  };
  const ClickOpenDialogbox = () => {
    setOpen(true);

  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };
  const onClickUnpublish = (unPublish, Reason = '') => {

    if (asUnPublishReason !== '') {
      const UnpublishResultBody: IUnpublishBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: SelectTeacher,
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
      asAcadmicYearId: asAcademicYearId,
      asStdDivId: SelectTeacher,
      asUserId: asUserId,
      asUseAvarageFinalResult: asUseAvarageFinalResult
    }

    dispatch(GetGenerateAll(GenerateAllBody))

  };

  const onClickPublish = (publish) => {
    if (publish) {
      if (!window.confirm("Once you publish the result it will be visible to parents/students. Are you sure you want to continue?")) {
        return;
      }
      const PublishBody: IPublishBody = {
        asSchoolId: asSchoolId,
        asAcademicYrId: 55,
        asStandardDivision_Id: StandardDivisionId,
        asInsertedById: asUserId,
        asPublishById: 0
      }
      dispatch(GetPublishResult(PublishBody))
      dispatch(GetResultPublishd(ResultPublishedBody))
      dispatch(GetStudentResultList(PagedStudentBody))

      // dispatch(GetUnpublishResult(UnpublishResultBody))

    };

  }


  useEffect(() => {
    if (UnpublishResult !== '') {
      toast.success(UnpublishResult)
      dispatch(resetUnpublishResult())
      dispatch(GetStudentResultList(PagedStudentBody))
      dispatch(GetResultPublishd(ResultPublishedBody))
      dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
    }
  }, [UnpublishResult])

  useEffect(() => {
    if (PublishResult !== '')
      toast.success(PublishResult)
    dispatch(resetPublishResult())
    dispatch(GetStudentResultList(PagedStudentBody))
  }, [PublishResult])

  useEffect(() => {
    dispatch(getConfiguredTestPublished(ConfiguredTestPublishedBody))
  }, [SelectTeacher])

  // useEffect(() => {
  //   dispatch(GetResultPublishd(ResultPublishedBody))
  // }, [])


  useEffect(() => {
    dispatch(GetTestPublishedd(TestPublishedBody))
  }, [SelectTeacher])

  useEffect(() => {
    dispatch(GetAtleastOneResultGeneratedss(AtleastOneResultGeneratedBody))
  }, [SelectTeacher])

  // useEffect(() => {
  //   dispatch(GetStudentResultList(PagedStudentBody))
  // }, [onClickGenerateAll]);

  // useEffect(() => {
  //   if (GetResultGenerated) {
  //     dispatch(GetStudentResultList(PagedStudentBody));
  //   }
  // }, [GetResultGenerated])

  useEffect(() => {
    dispatch(getiscofigred(iscofigred));
    dispatch(getunpublishedexam(unpublishexam));
  }, []);

  const clickTeacher = (value) => {
    setstandardDivisionId(value);
  }

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
                , bgcolor: FinalResultFullAccess === 'N' ? '#f0e68c' : 'inherit'
              }}

              ItemList={GetClassTeachers}
              onChange={clickTeacherDropdown}
              label={'Teacher'}
              defaultValue={SelectTeacher}
              // DisableClearable={FinalResultFullAccess === 'N'}
              // disabled={TeacherId == Number(selectTeacherNew)}
              mandatory
              size={"small"}

            />
          </Box>



          <Box>
            <Tooltip title={"Display student list for their result generation. Click on &quot;Generate All&quot; to generate final result for all the students in selected class.  Click on &quot;Publish&quot; to publish final result of selected class. Click on “Publish All” to publish final results of all the classes in your school."}>
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
            <Tooltip title={"Toppers"}>
              <IconButton
                onClick={Toppers}
                disabled={!GetTestPublished && GetAtleastOneResultGenerated.AllowPublish == false}
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <MilitaryTech />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>

            <Tooltip title={"Generate All"}>
              <IconButton
                onClick={onClickGenerateAll}
                disabled={GetResultGenerated}
                sx={{
                  color: 'white',
                  backgroundColor: GetResultGenerated ? grey[200] : grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }

                }
                }
              >
                <Autorenew />
              </IconButton>
            </Tooltip>

          </Box>
          <Box>
            <Tooltip title={"View All Results"}>
              <IconButton
                onClick={() => {
                  navigate('/extended-sidebar/Teacher/ViewResultAll')

                }
                }
                disabled={GetAtleastOneResultGenerated.AllowPublish == false}
                sx={{
                  color: 'white',
                  backgroundColor: GetAtleastOneResultGenerated.AllowPublish == false ? grey[200] : grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <TextSnippet />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={"Unpublish"}>
              <IconButton
                onClick={ClickOpenDialogbox}
                disabled={!GetResultGenerated}
                sx={{
                  color: 'white',
                  backgroundColor: !GetResultGenerated ? grey[200] : grey[500],
                  '&:hover': {
                    backgroundColor: red[600]
                  }
                }}
              >
                <Unpublished />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={"Publish"}>
              <IconButton
                onClick={() => onClickPublish(true)}
                disabled={GetResultGenerated || GetAtleastOneResultGenerated.AllowPublish == false}
                sx={{
                  color: 'white',
                  backgroundColor: (GetResultGenerated || GetAtleastOneResultGenerated.AllowPublish == false) ? grey[200] : grey[500],
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
              >
                <CheckCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />

      {Usisconfigred.IsConfiged == 0 ? (
        <div>
          {Usunpublishedexam.length > 0 && (
            <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
              <b> All Configured exams are not published: {Usunpublishedexam.map((item) => item.SchoolWise_Test_Name).join(', ')}</b>
            </Alert>
          )}
        </div>
      ) : (
        <span> </span>
      )}


      {GetStudentLists && GetStudentLists.length > 0 && (
        <DataTable
          columns={columns}
          data={GetStudentLists}
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

      {Open && (
        <FinalResultUnpublish
          open={Open}
          setOpen={setOpen}
          ClickCloseDialogBox={ClickCloseDialogbox}
          onClickUnpublish={onClickUnpublish}
          ExamName={Exam}
          TeacherName={getDropdownName(GetClassTeachers, SelectTeacher)}
        />
      )}
    </Box>
  )

}

export default FinalResult;
