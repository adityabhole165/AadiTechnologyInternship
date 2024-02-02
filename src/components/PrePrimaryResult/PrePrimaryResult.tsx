import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGetAssessmentBody,
  IGetClassTeacherXseedSubjectsBody,
  IGetPrePrimaryResultBody,
  IGetPublishResltBody
} from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';
import PageHeader from 'src/libraries/heading/PageHeader';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  AssessmentList,
  PrePrimary,
  Published,
  TeacherXseedSubjects
} from 'src/requests/PrePrimaryResult/RequestPrePrimaryResult';
import { RootState } from 'src/store';
// import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const PrePrimaryResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  // const asSchoolId = Number(localStorage.getItem('localSchoolId'));

  // const [ClassId , setClassId] = useState('')
  const [SelectTeacher, setSelectTeacher] = useState('');
  const [AssessmentResult, setAssessmentResult] = useState('');

  const HeaderList = ['Subject', 'Edit'];
  const IconList = [
    {
      Id: 1,
      Icon: <EditIcon />,
      Action: 'Edit'
    }
  ];
  const PrePrimaryResultt = useSelector(
    (state: RootState) => state.PrePrimaryResult.PrePrimaryResult
  );
  console.log(PrePrimaryResultt, 'GetClassTeacherss');

  const Assessmentt = useSelector(
    (state: RootState) => state.PrePrimaryResult.Assessment
  );
  console.log(Assessmentt, 'GetTestwiseTerm');

  const GetTeacherXseedSubjects = useSelector(
    (state: RootState) => state.PrePrimaryResult.TeacherXseedSubjects
  );
  console.log(GetTeacherXseedSubjects, 'GetTeacherXseedSubjects');

  const UnPublisheed = useSelector(
    (state: RootState) => state.PrePrimaryResult.Unpublish
  );
  console.log('UnPublishee', UnPublisheed);

  const Publisheed = useSelector(
    (state: RootState) => state.PrePrimaryResult.publish
  );
  console.log(Publisheed, 'Publisheed');

  const PrePrimaryResult: IGetPrePrimaryResultBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };
  useEffect(() => {
    dispatch(PrePrimary(PrePrimaryResult));
  }, []);

  const AssessmentLists: IGetAssessmentBody = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };
  useEffect(() => {
    dispatch(AssessmentList(AssessmentLists));
  }, []);

  const SubjectsList: IGetClassTeacherXseedSubjectsBody = {
    asSchoolId: asSchoolId,
    asAcadmeicYearId: asAcademicYearId,
    asStdDivId: Number(SelectTeacher),
    asAssessmentId: Number(AssessmentResult)
  };
  useEffect(() => {
    dispatch(TeacherXseedSubjects(SubjectsList));
  }, [SelectTeacher, AssessmentResult]);

  // const Unpublishee: IGetUnPublishResltBody = {
  //   "asXseedResultPublishStatusId":140,
  //   asSchoolId:asSchoolId,
  //   asAcademic_Year_Id:asAcademicYearId,
  //   "asAssessmentId":24,
  //   "asStandardDivisionId":1221,
  //   "asUnPublishReason":"kiran",
  //   "asIsPublished":"false",
  //   "asUpdatedById":455,
  //   "asUpdateDate":"2023-06-06"
  //   };
  // useEffect(() => {
  //   dispatch(UnPublished(Unpublishee));
  // }, []);

  const Publishee: IGetPublishResltBody = {
    asStandardDivisionId: 1240,
    asAssessmentId: 26,
    asIsPublished: 'true',
    asAcademic_Year_Id: 54,
    asSchoolId: 18,
    asInsertedById: 5654,
    asInsertDate: '2024-06-06'
  };
  useEffect(() => {
    dispatch(Published(Publishee));
  }, []);

  const GetPrPriResultDropdown = (value) => {
    setSelectTeacher(value);
  };
  const GetAssessmentDropdown = (value) => {
    setAssessmentResult(value);
  };
  const ClickItem = (value) => {};
  // const onClickunpublished =() =>{
  //   navigate('/extended-sidebar/Teacher/UnPublishReslt')

  // }

  const onClickpublished = () => {
    if (
      confirm(
        'Once you publish the result it will be visible to parents/students. Are you sure you want to continue?'
      )
    ) {
      const Publishee: IGetPublishResltBody = {
        asStandardDivisionId: 1240,
        asAssessmentId: 26,
        asIsPublished: 'false',
        asAcademic_Year_Id: 54,
        asSchoolId: 18,
        asInsertedById: 5654,
        asInsertDate: '2024-06-06'
      };
      dispatch(Published(Publishee));
    }

    if (Publisheed !== '') {
      toast.success(Publisheed, { toastId: 'success1' });
      //dispatch(Published());
    }
    dispatch(TeacherXseedSubjects(SubjectsList));
  };

  // const getIsPublish = (Id) => {

  //   let IsPublish = false
  //   GetTeacherXseedSubjects.map((item)=>{
  //     if(item.Id.toString()==Id.toString()){
  //       IsPublish = item.Text7=="False"?true:false
  //       return IsPublish;
  //   }
  //   })
  //   return IsPublish
  // }

  const onClickunpublished = () => {
    navigate(
      '/extended-sidebar/Teacher/UnpublishPrePrimaryResult/ ' +
        getClassName() +
        '/' +
        getClassName1()
    );
  };

  // const onClickunpublished = (Id) => {
  //   let IsPublish = getIsPublish(Id)
  //   if(IsPublish){
  //     navigate('/extended-sidebar/Teacher/UnPublishReslt/' + Id)
  // } else{
  //   const UnPublishBody: IGetUnPublishResltBody = {
  //     "asXseedResultPublishStatusId":140,
  //       asSchoolId:asSchoolId,
  //       asAcademic_Year_Id:asAcademicYearId,
  //       "asAssessmentId":24,
  //       "asStandardDivisionId":1221,
  //       "asUnPublishReason":"kiran",
  //       "asIsPublished":"false",
  //       "asUpdatedById":455,
  //       "asUpdateDate":"2023-06-06"
  //   }
  //   dispatch(UnPublished(UnPublishBody));

  //   }
  // }

  const getClassName = () => {
    let className = '';
    Assessmentt.map((item) => {
      if (item.Value == AssessmentResult) className = item.Name;
    });

    return className;
  };

  const getClassName1 = () => {
    let className = '';
    PrePrimaryResultt.map((item) => {
      if (item.Value == SelectTeacher) className = item.Name;
    });

    return className;
  };

  return (
    <Container>
      <br></br>
      <br></br>
      <PageHeader heading="Pre-Primary Result" />
      <Grid container spacing={0.9} alignItems="center">
        <Grid item xs={3}>
          <Typography margin={'25px'}>
            <b>Assessment:</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            ItemList={Assessmentt}
            onChange={GetAssessmentDropdown}
            defaultValue={AssessmentResult}
            label={'--Select Term--'}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography margin={'20px'}>
            <b>Select Class Teacher:</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <SearchableDropdown
            ItemList={PrePrimaryResultt}
            onChange={GetPrPriResultDropdown}
            defaultValue={SelectTeacher}
            label={'Subject Teacher'}
          />
        </Grid>
      </Grid>

      <DynamicList2
        HeaderList={HeaderList}
        ItemList={GetTeacherXseedSubjects}
        IconList={IconList}
        ClickItem={ClickItem}
      />

      <div>
        <Grid
          container
          spacing={2}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid item xs={1}>
            <ButtonPrimary onClick={onClickpublished} variant="contained">
              <b>PUBLISH</b>
            </ButtonPrimary>
          </Grid>

          <Grid item xs={1} style={{ margin: '0 10px' }}>
            {/* Adjust the margin value as needed */}
            <ButtonPrimary
              onClick={onClickunpublished}
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              UNPUBLISH
            </ButtonPrimary>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PrePrimaryResult;
