import AssignmentIcon from '@mui/icons-material/Assignment';
import Person from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IClassTeacherListBody,
  IGetPagedStudentBody
} from 'src/interfaces/FinalResult/IFinalResult';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  ClassTechersList,
  GetStudentResultList
} from 'src/requests/FinalResult/RequestFinalResult';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
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
            />
          </Box>
          <Box>
            <Tooltip title={"Toppers"}>
              <IconButton
                onClick={Toppers}
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <Person />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />
      <Box sx={{ background: 'white', p: 2 }}>
        {GetStudentLists != undefined && (
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={GetStudentLists}
            IconList={IconList}
            ClickItem={ClickItem}
          />
        )}
        <Stack direction={"row"} gap={2} mt={2} justifyContent={"center"}>
          <Button
            variant="contained"
          >
            GENERATE ALL
          </Button>
          <Button
            variant="contained"
          >
            VIEW RESULT ALL
          </Button>
          <Button
            variant="contained"
          >
            PUBLISH
          </Button>
          <Button
            onClick={onClickUnpublish}
            variant="contained"
          >
            UNPUBLISH
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FinalResult;
