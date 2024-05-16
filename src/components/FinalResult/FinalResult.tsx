
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
import {
  IClassTeacherListBody,
  IGetPagedStudentBody
} from 'src/interfaces/FinalResult/IFinalResult';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
  ClassTechersList,
  GetStudentResultList
} from 'src/requests/FinalResult/RequestFinalResult';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable, { Column } from '../DataTable';
const FinalResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SelectTeacher, setSelectTeacher] = useState();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUpdatedById = localStorage.getItem('Id');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

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
          navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Id)
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
      renderCell: (row) => <>
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
  ], [])
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


  useEffect(() => {
    dispatch(ClassTechersList(ClassTeachersBody));
  }, []);

  useEffect(() => {
    if (SelectTeacher != '0') dispatch(GetStudentResultList(PagedStudentBody));
  }, [SelectTeacher]);

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
  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);
  };
  const ClickItem = (value) => { };

  const getTeacherId = () => {
    let TeacherId = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherId = item.Id;
    });
    return TeacherId;
  };
  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/FinalResultToppers/' + getTeacherId());
  };

  const getTeacherName = () => {
    let TeacherName = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherName = item.Name;
    });
    return TeacherName;
  };
  const onClickUnpublish = () => {
    navigate(
      '/extended-sidebar/Teacher/FinalResultUnpublish/' +
      SelectTeacher +
      '/' +
      getTeacherName()
    );
  };
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
            <Dropdown
              Array={GetClassTeachers}
              handleChange={clickTeacherDropdown}
              defaultValue={SelectTeacher}
              label={'Select Class Teacher'}
              width={"250px"}
              variant={"outlined"}
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
                onClick={() => {
                  navigate('/extended-sidebar/Teacher/FinalResultToppers')
                }}
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
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <Autorenew />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={"View All Results"}>
              <IconButton
                onClick={(value) => {
                  navigate('/extended-sidebar/Teacher/ViewResultAll')
                }}
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
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
                onClick={onClickUnpublish}
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
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
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
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
      <Box sx={{ background: 'white', p: 2 }}>
        <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
          All configured exams are not published - Internal II, Subject Enrichment Analysis - I, Subject Enrichment Analysis II
        </Alert>

        {GetStudentLists != undefined && (
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
      </Box>
    </Box>
  );
};

export default FinalResult;