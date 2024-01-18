import { Box, Container, FormControlLabel, Grid, Radio, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IGetClassDropdownBodyCT, IGetexamDropdownBodyCT, IGetClassSubjectDropdownBodyCT, IGetClassToppersListBOdyCT } from 'src/interfaces/FinalResult/IFinalResultToppers'
import { ClassdropdownListCT, ClassExamListCT, ClassSubjectListCT, ClassTopperListCT } from 'src/requests/FinalResult/RequestFinalResultToppers'
import { IGetStandardExamDropdownBodyST, IGetSubjectDropdownBodyST, IGetStandardToppersListBOdyST, IGetStandardDropdownBodyST } from 'src/interfaces/FinalResult/IStandardToppers';
import { StandardDropdownListST, StandardExamListST, StandardSubjectListST, StandardTopperListST } from 'src/requests/FinalResult/RqstandardToppers';

import { RootState, useDispatch } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useNavigate, useParams } from 'react-router';
import ToppersList from 'src/libraries/list/ToppersList';
import IOSStyledSwitch from 'src/libraries/ResuableComponents/IOSStyledSwitch';

const FinalResultToppers = () => {
    const dispatch = useDispatch();
    const { TeacherId } = useParams();
    const navigate  = useNavigate();
    //alert(TeacherId)

    const [SelectClassCT, setClassCT] = useState(TeacherId);
    const [SelectExamCT, setExamCT] = useState("0");
    const [SelectSubjectCT, setSubjectCT] = useState("0");
    const [StandardRadioCT, setStandardRadioCT] = useState();
    const [SelectStandardST, setStandardST] = useState(TeacherId);
    const [SelectExamST, setExamST] = useState("0");
    const [SelectSubjectST, setSubjectST] = useState("0");
    const [showScreenOne, setShowScreenOne] = useState(true);
    const [radioBtn, setRadioBtn] = useState('1');

   
   

    const RadioListCT = [{ Value: "1", Name: "Class Toppers" },
       { Value: "2", Name: "Standard Toppers" }]

    const HeaderListCT = ["Rank", "Roll No.", "Student Name", "Marks"];
    const HeaderList1CT = ["Roll No.", "Student Name"];
    const HeaderListST = ["Rank", "Class", "Roll No.", "Student Name", "Marks"];
    const HeaderList1ST = ["Roll No.", "Student Name"];


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asTeacherId = Number(sessionStorage.getItem('TeacherId'));

    const GetClassdropdownCT = useSelector((state: RootState) => state.FinalResultToppers.ClassDropdownListCT);
    const GetExamdropdownCT = useSelector((state: RootState) => state.FinalResultToppers.ExamDropdownListCT);
    const GetSubjectdropdownCT: any = useSelector((state: RootState) => state.FinalResultToppers.SubjectDropdownListCT);
    const GetToppersListCT = useSelector((state: RootState) => state.FinalResultToppers.ClassToppersCT);
    const GetSubjectToppersListCT = useSelector((state: RootState) => state.FinalResultToppers.SubjectToppersCT);
//

const GetStandarddropdownST = useSelector((state: RootState) => state.StandardToppers.StandardDropdownST);
const GetExamdropdownST = useSelector((state: RootState) => state.StandardToppers.ExamDropdownListST);
const GetSubjectdropdownST = useSelector((state: RootState) => state.StandardToppers.SubjectDropdownListST);
const GetStandardToppersListST = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppersST);
       console.log(GetStandardToppersListST,"GetStandardToppersListST");
const GetSubjectToppersListST = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppersST);
//


    useEffect(() => {
        dispatch(ClassdropdownListCT(ClassDropdownBodyCT))
    }, [TeacherId])
    useEffect(() => {
        dispatch(ClassExamListCT(ExamDropdownBodyCT))
    }, [SelectClassCT])
    useEffect(() => {
        dispatch(ClassSubjectListCT(SujectDropdownBodyCT))
    }, [SelectClassCT, SelectExamCT])
    useEffect(() => {
        dispatch(ClassTopperListCT(ToppersListBodyCT))
    }, [SelectClassCT, SelectExamCT, SelectSubjectCT])


    useEffect(() => {
        if (GetClassdropdownCT.length > 0)
            setClassCT(GetClassdropdownCT[0].Id)
    }, [GetClassdropdownCT]);

    useEffect(() => {
        if (GetExamdropdownCT.length > 0)
            setExamCT(GetExamdropdownCT[0].Id)
    }, [GetExamdropdownCT]);

    useEffect(() => {
        if (GetSubjectdropdownCT.length > 0)
            setSubjectCT(GetSubjectdropdownCT[0].Id)
    }, [GetSubjectdropdownCT]);


    //
    useEffect(() => {
        dispatch(StandardDropdownListST(StandardDropdownBodyST))
    }, [TeacherId])
    useEffect(() => {
        dispatch(StandardExamListST(ExamDropdownBodyST))
    }, [SelectStandardST])
    useEffect(() => {
        dispatch(StandardSubjectListST(SujectDropdownBodyST))
    }, [SelectStandardST,SelectExamST])
    useEffect(() => {
        dispatch(StandardTopperListST(StandardToppersBodyST))
    }, [SelectStandardST,SelectExamST, SelectSubjectST])

     useEffect(() => {
        if (GetStandarddropdownST.length > 0)
        setStandardST(GetStandarddropdownST[0].Id)
    }, [GetStandarddropdownST]);

    useEffect(() => {
        if (GetExamdropdownST.length > 0)
        setExamST(GetExamdropdownST[0].Id)
    }, [GetExamdropdownST]);
    
    useEffect(() => {
        if (GetSubjectdropdownST.length > 0)
        setSubjectST(GetSubjectdropdownST[0].Id)
    }, [GetSubjectdropdownST]);



    const ClassDropdownBodyCT: IGetClassDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId: Number(TeacherId)
    }
    const ExamDropdownBodyCT: IGetexamDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(SelectClassCT)
    }
    const SujectDropdownBodyCT: IGetClassSubjectDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(SelectClassCT),
        asExamId: Number(SelectExamCT)
    }
    const ToppersListBodyCT: IGetClassToppersListBOdyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(SelectClassCT),
        asExamId: Number(SelectExamCT),
        asSubjectId: Number(SelectSubjectCT)
    }
    //

    const StandardDropdownBodyST: IGetStandardDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId:Number(TeacherId)
    }
    const ExamDropdownBodyST: IGetStandardExamDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST)
    }
    const SujectDropdownBodyST: IGetSubjectDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST),
        asExamId:Number(SelectExamST)
    }
    const StandardToppersBodyST: IGetStandardToppersListBOdyST = {
        asSchoolId:asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST),
        asExamId:Number(SelectExamST),
        asSubjectId:Number(SelectSubjectST)
    }
    const clickClassDropdownCT = (value) => {
        setClassCT(value)
    }
    const clickExamDropdownCT = (value) => {
        setExamCT(value)
    }
    const clickSubjectDropdownCT = (value) => {
        setSubjectCT(value)
    } 
    //

    const clickStandardDropdownST = (value) => {
        setStandardST(value)
    }
    const clickExamDropdownST = (value) => {
        setExamST(value)
    }
    const clickSubjectDropdownST = (value) => {
        setSubjectST(value)
    }
    const ClickItemST = () => {

    }
   
    const ClickRadio = (value) => {
        setRadioBtn(value);
        
      }


    const ClickItem = () => {

    }
    return (
        <>
               
               <br></br>
        <br></br>
        <br></br>
  <div>
                <RadioButton1 Array={RadioListCT} ClickRadio={ClickRadio} defaultValue={radioBtn} Label={""} />
            </div>
  {
        radioBtn === "1" ?
        <Container>
       



        <PageHeader heading='Toppers' />
        

        <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Class:</b>
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                    <Dropdown Array={GetClassdropdownCT} handleChange={clickClassDropdownCT} defaultValue={SelectClassCT} label={SelectClassCT} />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Select Exam:</b>
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                    <Dropdown Array={GetExamdropdownCT} handleChange={clickExamDropdownCT} defaultValue={SelectExamCT} label={SelectExamCT} />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography margin={'1px'}>
                    <b>Subject:</b>
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                    <Dropdown Array={GetSubjectdropdownCT} handleChange={clickSubjectDropdownCT} defaultValue={SelectSubjectCT} label={"All"} />
                </Box>
            </Grid>

            <DynamicList2 HeaderList={HeaderListCT} ItemList={GetToppersListCT}
                IconList={[]} ClickItem={ClickItem} />

            <PageHeader heading=' Subject Toppers' />
            <Grid container>
                {
                    GetSubjectToppersListCT.map((item, i) => {
                        return (<>
                            {!(i % 3) && (
                                <Grid container item xs={12} justifyContent="center">

                                    {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                                    {/* <Container> */}
                                    {item.Subject}
                                    {/* </Container> */}
                                </Grid>
                            )}

                            <Grid item xs={4} xl={4} justifyContent="center">
                                <Container>
                                    <img src={item.Rank_Image} /> MarKs:{item.Marks}
                                </Container>
                                <br></br>
                                <ToppersList headers={HeaderList1CT}
                                    data={item.Students} />
                            </Grid>

                        </>)
                    })
                }
            </Grid>


        </Grid>
    </Container> :
          <Container>
          <PageHeader heading='StandardToppers' />
          <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                  <Typography margin={'1px'}>
                      <b>Select Standard:</b>
                  </Typography>
              </Grid>
              <Grid item xs={6} >
                  <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                      <Dropdown Array={GetStandarddropdownST} handleChange={clickStandardDropdownST} defaultValue={SelectStandardST} label={SelectStandardST} />
                  </Box>
              </Grid>
              <Grid item xs={6}>
                  <Typography margin={'1px'}>
                      <b>Select Exam:</b>
                  </Typography>
              </Grid>
              <Grid item xs={6} >
                  <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                      <Dropdown Array={GetExamdropdownST} handleChange={clickExamDropdownST} defaultValue={SelectExamST} label={SelectExamST} />
                  </Box>
              </Grid>
              <Grid item xs={6}>
                  <Typography margin={'1px'}>
                      <b>Subject:</b>
                  </Typography>
              </Grid>
              <Grid item xs={6} >
                  <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                      <Dropdown Array={GetSubjectdropdownST} handleChange={clickSubjectDropdownST} defaultValue={SelectSubjectST} label={"All"} />
                  </Box>
              </Grid>
              <DynamicList2 HeaderList={HeaderListST} ItemList={GetStandardToppersListST}
                  IconList={[]} ClickItem={ClickItemST} />
          
              <PageHeader heading=' Subject Toppers' />
              <Grid container>
                  {
                      GetSubjectToppersListST.map((item, i) => {
                          return (<>
                              {!(i % 3) && (
                                  <Grid container item xs={12} justifyContent="center">
          
                                      {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                                      {/* <Container> */}
                                      {item.Subject}
                                      {/* </Container> */}
                                  </Grid>
                              )}
          
                              <Grid item xs={4} xl={4} justifyContent="center">
                                  <Container>
                                      <img src={item.Rank_Image} /> MarKs:{item.Marks}
                                  </Container>
                                  <br></br>
                                  <ToppersList headers={HeaderList1ST}
                                      data={item.Students} />
                              </Grid>
          
                          </>)
                      })
                  }
              </Grid>
          
          </Grid>
          </Container>
      }
 
</>
    )
}

export default FinalResultToppers
