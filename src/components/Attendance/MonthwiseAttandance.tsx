import React from 'react'
import { useState } from 'react'
import { Box, Container,Divider,Grid, IconButton, InputBase, ListItemSecondaryAction, Paper, } from '@mui/material';
import PageHeader from 'src/libraries/heading/PageHeader';
import { TextField } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance'
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import SearchIcon from '@mui/icons-material/Search';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import WebBackButton from 'src/libraries/button/WebBackButton';
import Iconhelp from 'src/libraries/icon/Iconhelp';
import DirectionsIcon from '@mui/icons-material/Directions';

const MonthwiseAttandance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const StudentId = Number(sessionStorage.getItem('StudentId'))
    const [search, setSearch] = useState(false)
    const HeaderArray = [{ Id: 1, Header: "Roll No." }, { Id: 2, Header: "Student Name" }, { Id: 3, Header: "Mar" }, { Id: 4, Header: "Apr" }, { Id: 5, Header: "May" }, { Id: 6, Header: "Jun" }
        , { Id: 7, Header: "Jul" }, { Id: 8, Header: "Aug" }, { Id: 9, Header: "Sep" }, { Id: 10, Header: "Oct" }, { Id: 10, Header: "Nov" }, { Id: 10, Header: "Dec" }, { Id: 11, Header: "Jan" }, { Id: 12, Header: "Feb" }, { Id: 13, Header: "Present Days" }, { Id: 14, Header: "Total Days" }, { Id: 15, Header: "%" }]
    const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([])
    const [SearchText, setSearchText] = useState("")
    const Note: string = "Displays students'  attendance for each month. Attendance is presented in the following format: number of days present/total attendance days."

    const MonthWiseAttendance = useSelector((state: RootState) => state.MonthwiseAttendance.GetMonthwiseAttendance);

    const GetMonthwiseAttendanceBody: IGetMonthwiseAttendanceBody = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asStanardDivisionId: StandardDivisionId,
        TopRanker: 1000,
        Student_Id: StudentId,
        SortExp: " ORDER BY [Roll_No] ASC",
        prm_StartIndex: 0,
        PageSize: 100
    };

    useEffect(() => {
        dispatch(getattendance(GetMonthwiseAttendanceBody));
    }, []);
    useEffect(() => {
        setMonthWiseAttendanceList(MonthWiseAttendance)
    }, [MonthWiseAttendance])

    const changeSearchText = (value) => {
        setSearchText(value)
        if (value == "") {

            setMonthWiseAttendanceList(MonthWiseAttendance)
        } else {
            setMonthWiseAttendanceList(MonthWiseAttendanceList.filter((item) => { return item.Text2.toLowerCase().includes(value.toLowerCase()) }))
        }

    }
    const click = () => {
        navigate('/extended-sidebar/Teacher/TAttendance');
    };
    return (
        <>
          <div style={{marginLeft:'70px', marginRight:'50px', marginTop:'15px'}}>
            {/* <Container sx={{marginTop:'20px'}} > */}
             
           <Grid sx={{margintop:'20vh'}} container >
           <Grid item margin={0} padding={0} xs={3} >
            <PageHeader heading={'Month Wise Attendance'}  subheading={''} />
              {/* <Box  sx={{float :'right'}} >
              
            <Iconhelp  Note={Note}/> */}
           {/* </Box> */}

           </Grid>
           
            <Grid sx={{mt:5, display:'flex', justifyContent:'flex-end', position:'relative' }} item xs={6}  >
            

                  
            {/* <Paper
            component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', position:'relative' }}
               > */}
       
          {search ? 
          <TextField label={'Search by Name'}
          name="SearchText" 
          type="text"
          size='small'
           variant="outlined"
         id="outlined-search"
          sx={(theme)=>({flex:1 })}

             value={SearchText} onChange={(e) => { changeSearchText(e.target.value) }} fullWidth

         />
        //  <InputBase
        //    sx={{ ml: 1, flex: 1,  }}
        // placeholder="Search Google Maps"
        //    inputProps={{ 'aria-label': 'search google maps' }}
        //    />
            :''}
          

      <IconButton  type="button" sx={{ position:'absolute', right:'8px' }} aria-label="search">
        {/* <SearchIcon /> */}
      </IconButton>
      
      {/* <Grid sx={{position:'relative'}} xs={1}> */}

      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton  sx={{ p: '10px' }} aria-label="directions"> */}
      {/* <Iconhelp   Note={Note}/> */}
      {/* </IconButton> */}
      {/* </Grid> */}
   </Grid>
   
    {/* </Paper> */}
            {/* <TextField label={'Search by Name'}
             name="SearchText" 
             type="text"
             size='small'
              variant="outlined"
            id="outlined-search"
             sx={(theme)=>({mt:5})}

                value={SearchText} onChange={(e) => { changeSearchText(e.target.value) }} fullWidth

            /> */}
            
            <Grid item xs={1}/>
            <Grid item sx={{position:'relative'}} xs={1}>
            <IconButton onClick={()=>setSearch(!search)} type="button" sx={{ position:'absolute', right:'8px', bottom:'12px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
            </Grid>
            {/* <Grid sx={(theme)=>({
                display:'flex',
                mt: 2,
                bgcolor:'primary.600'
             

            })} item xs={1}>
                
            
             
            <Box sx={{ }} >
              
              <Iconhelp  Note={Note}/>
           </Box>
            </Grid> */}
            <Grid item sx={{marginTop:'45px'}} xs={1}>
                <Grid container>
                    <Grid item xs={3}>
                     <Iconhelp  Note={Note}/>

                    </Grid>
                    {/* <Grid item xs={5}>
                      <WebBackButton FromRoute={'/Teacher/TAttendance/'} />
                    </Grid> */}
                    <Grid item xs={9}>
                      <Box sx={{ textAlign:"right", marginTop:''}} >
                <ButtonPrimary
                    style={{backgroundColor: '#ef5350', marginBottom:'20px'}}
                    onClick={click}
                    className='bold'
                >
                   Close
                </ButtonPrimary>
                      </Box>

                    </Grid>
                </Grid>
                
            </Grid>
           </Grid>
           {/* <Grid container>
            <Grid item xs={4} sm={4}>bbbbbbbbbbbb</Grid>
            <Grid item xs={4} sm={4}>bbbbbbbbbbbb</Grid>
            <Grid item xs={4} sm={4}>bbbbbbbbbbbb</Grid>
           </Grid> */}
           {/* </Container> */}
         
      
          
           

            <TableAttendace ItemList={MonthWiseAttendance} HeaderArray={HeaderArray} />

                </div>

            <Box sx={{ textAlign: "center", gap:'10px' }}  m={2}>
                {/* <ButtonPrimary sx={{paddingX:'20px', marginRight:'10px'}}
                >Back</ButtonPrimary> */}
                <ButtonPrimary
                    style={{backgroundColor: '#ef5350'}}
                    onClick={click}
                    className='bold'
                >
                   Close
                </ButtonPrimary>
            </Box>


        
        </>
    )
}
export default MonthwiseAttandance