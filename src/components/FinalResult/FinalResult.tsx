import React, { useState } from 'react'
import { IClassTeacherListBody, IGetPagedStudentBody } from 'src/interfaces/FinalResult/IFinalResult'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClassTechersList, GetStudentResultList } from 'src/requests/FinalResult/RequestFinalResult'
import { RootState } from 'src/store'
import Dropdown from 'src/libraries/dropdown/Dropdown';
//import DynamicList from 'src/libraries/list/DynamicList'


import { Box, Container, Grid, Typography } from '@mui/material'
import DropdownNew from 'src/libraries/dropdown/DropdownNew'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import DynamicList2 from 'src/libraries/list/DynamicList2'
import EditIcon from '@mui/icons-material/Edit';
const FinalResult = () => {
    const dispatch = useDispatch();
    const [SelectTeacher, setSelectTeacher] = useState("0");
    const HeaderList = ["Roll No.","Student Name","Marks","Percentage",
    "Grade Name","View"]
    const IconList = [
        {
          Id: 1,
          Icon: (<EditIcon />),
          Action: "Edit"
        },
      ]
    // const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    // const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));


    const GetClassTeachers = useSelector((state: RootState) => state.FinalResult.ClassTeachers);
    console.log("GetClassTeachersS", GetClassTeachers)

    const GetStudentLists = useSelector((state: RootState) => state.FinalResult.StudentResultList);
    console.log("GetStudentLists", GetStudentLists)

    useEffect(() => {
        dispatch(ClassTechersList(ClassTeachersBody))
    }, [])

    useEffect(() => {
        dispatch(GetStudentResultList(PagedStudentBody))
    }, [])

    const ClassTeachersBody: IClassTeacherListBody = {
        asSchoolId: 18,
        asAcademicYearId: 54
    }
    const PagedStudentBody: IGetPagedStudentBody = {
        asSchoolId: "18",
        asAcademicyearId: "54",
        asStandardDivisionId: "1266",
        SortExp: "ORDER BY Roll_No" ,
        prm_StartIndex: 0,
        PageSize: 20
    }
    const clickTeacherDropdown = (value) => {

        setSelectTeacher(value)
    }
    const ClickItem = (value) => {

    }
    
    return (
        <Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                    <Typography margin={'1px'}>
                        <b>Select Teacher:</b>
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown
                            Array={GetClassTeachers}
                            handleChange={clickTeacherDropdown}
                            defaultValue={SelectTeacher}
                            label={SelectTeacher}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <ButtonPrimary variant='contained' style={{ marginLeft: "60px", backgroundColor: 'Red' }}>
                        Toppers
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={12} >
                    <ButtonPrimary variant='contained' style={{ marginLeft: "60px", backgroundColor: 'Blue' }}>
                        Generate All
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={12}>
                    <ButtonPrimary variant='contained' style={{ marginLeft: "60px", backgroundColor: 'Blue' }}>
                        View Result All
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={12}>
                    <ButtonPrimary variant='contained' style={{ marginLeft: "60px", backgroundColor: 'Blue' }}>
                        Publish
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={12}>
                    <ButtonPrimary variant='contained' style={{ marginLeft: "60px", backgroundColor: 'Blue' }}>
                        Unpublish
                    </ButtonPrimary>
                </Grid>
            </Grid>
              <DynamicList2 HeaderList={HeaderList} ItemList={GetStudentLists}
        IconList={IconList} ClickItem={ClickItem} />  
        </Container>
    )
}

export default FinalResult



// import React, { useEffect, useState } from 'react'
// import PageHeader from 'src/library/heading/pageHeader'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { RootState } from 'src/store';
// import { IGetClassDivisionListBody } from 'src/Interface/GetClassDivisionList/IGetClassDivisionList';
// import { GetClassDivisionList22 } from 'src/requests/GetClassDivisionList/RequestGetClassDivisionList';
// import { Container } from '@mui/material';
// import DropDown from 'src/library/DropDown/DropDown';


// function GetClassDivisionList() {
//   const dispatch = useDispatch();
//   const [CLassDivisionName, setCLassDivisionName] = useState('')
//   const GetClassList = useSelector(
//     (state:RootState) => state.GetDivisionList.ClassDivisionList);
//   console.log("GetClassList", GetClassList)

//   const GetClassDivisionListBody: IGetClassDivisionListBody = {
//     "ClassId": 0
//   }
//   useEffect(() => {
//     dispatch(GetClassDivisionList22(GetClassDivisionListBody));
//   }, []);

//   const cllckDivisionName = (value) => {
//     setCLassDivisionName(value)
//   }
//   return (
//     <Container>
//       <h1>Class Division List</h1>
//       {/* <PageHeader heading={'Student Details List'} /> */}
//       <DropDown itemList={GetClassList} ClickItem={cllckDivisionName} DefaultValue={CLassDivisionName} Label={"ClassDivision"} />
//     </Container>)
// }


// export default GetClassDivisionList



