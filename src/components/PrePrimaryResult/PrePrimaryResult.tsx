import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from 'src/store';
import { IGetPrePrimaryResultBody,IGetAssessmentBody,IGetTeacherXseedSubjectsBody } from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';
import {PrePrimary,AssessmentList,TeacherXseedSubjects} from 'src/requests/PrePrimaryResult/RequestPrePrimaryResult';
import { string } from 'prop-types';
import Dropdown from 'src/libraries/dropdown/Dropdown'
import PageHeader from 'src/libraries/heading/PageHeader'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import DynamicList2 from 'src/libraries/list/DynamicList2';
import DropDown from 'src/libraries/list/DropDown';
// import { Container } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const PrePrimaryResult = () => {
    const dispatch = useDispatch();
  
  
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    
    // const asSchoolId = Number(localStorage.getItem('localSchoolId'));
   
  // const [ClassId , setClassId] = useState('')
  const [SelectResult,setSelectResult]= useState(0)
  const [AssessmentResult,setAssessmentResult]= useState(0)
  
  const HeaderList = ["Subject","Edit"]
const IconList = [

  {
      Id: 1,
      Icon: (<AssignmentIcon />),
      Action: "AssignmentIcon"
  },
]
    const PrePrimaryResultt = useSelector(
      (state: RootState) => state.PrePrimaryResult.PrePrimaryResult
    );
    console.log(PrePrimaryResultt, 'GetClassTeacherss');

    const Assessmentt = useSelector((state: RootState) => state.PrePrimaryResult.Assessment );
    console.log(Assessmentt, 'GetTestwiseTerm');

    const GetTeacherXseedSubjects = useSelector(
      (state: RootState) => state.PrePrimaryResult.TeacherXseedSubjects
    );
    console.log(GetTeacherXseedSubjects, 'GetTeacherXseedSubjects');
  
    const PrePrimaryResult: IGetPrePrimaryResultBody = {
      asSchoolId:asSchoolId,
      asAcademicYearId:asAcademicYearId
      };
      useEffect(() => {
        dispatch(PrePrimary(PrePrimaryResult));
      }, []);

      const AssessmentLists: IGetAssessmentBody = {
        asAcademicYearId:asAcademicYearId,
        asSchoolId:asSchoolId
      };
        useEffect(() => {
          dispatch(AssessmentList(AssessmentLists));
        }, []);

        const SubjectsList: IGetTeacherXseedSubjectsBody = {
          asSchoolId:asSchoolId,
          asAcademicYear_ID:asAcademicYearId,
          asTeacherId:SelectResult,
          asAssessmentId:AssessmentResult
        };
          useEffect(() => {
            dispatch(TeacherXseedSubjects(SubjectsList));
          }, [SelectResult,AssessmentResult]);

      const GetPrPriResultDropdown=(value)=>{
        setSelectResult(value);
      }
      const GetAssessmentDropdown=(value)=>{
        setAssessmentResult(value);
      }
      const ClickItem = (value) => {

      }

return (
 <Container>
  <br></br>
  <br></br>
  <PageHeader heading='Pre-Primary Result' />
            <Grid container spacing={0.5} alignItems="center">
            <Grid item xs={3}>
                    <Typography margin={'25px'}>
                        <b>Assessment:</b>
                    </Typography>
                    </Grid>
                    <Grid item xs={3} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        
  <DropDown itemList={Assessmentt} ClickItem={GetAssessmentDropdown} DefaultValue={AssessmentResult} Label={'--Select--'} />
  </Box>
   </Grid>
   
                <Grid item xs={3}>
                    <Typography margin={'20px'}>
                        <b>Select Class Teacher:</b>
                    </Typography>
                    </Grid>
                    <Grid item xs={3} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        
  <DropDown itemList={PrePrimaryResultt} ClickItem={GetPrPriResultDropdown} DefaultValue={SelectResult} Label={'--Select--'} />
  </Box>
  </Grid>
               
 </Grid>
 <DynamicList2 HeaderList={HeaderList} ItemList={GetTeacherXseedSubjects}
                        IconList={IconList} ClickItem={ClickItem} />

 </Container>
)
}

  

export default PrePrimaryResult;