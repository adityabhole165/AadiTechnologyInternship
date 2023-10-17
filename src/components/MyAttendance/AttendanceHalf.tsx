import React ,{useState} from 'react'
import {Box, Divider, Grid , Typography,Container} from "@mui/material"
import { ListStyle, ListStyleA } from 'src/libraries/styled/CardStyle'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import  { IGetSummaryCountforAttendanceBody } from "src/interfaces/Teacher/TAttendanceList";
import {GetSummaryCountforAttendanceBodyCDA} from "src/requests/TAttendance/TAttendance"
import GetTAttendanceListApi from "src/api/TAttendance/TAttendance";
import Calendar from 'react-calendar';
import CardCalender from 'src/libraries/ResuableComponents/CardCalender';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendace';
import { useEffect } from 'react'
import { RootState } from 'src/store';
import { useSelector,  } from 'react-redux';
import { useDispatch } from 'src/store';

const ItemList = [
{id:1 , Name:"1" ,value:1 , IsActive:false, category:"1" ,categoryName:"Holiday"},
{id:2 , Name:"2" ,value:2, IsActive:false , category:"3" ,categoryName:"Present"},
{id:3 , Name:"3" ,value:3, IsActive:false,category:"3" ,categoryName:"Present"}, 
{id:4, Name:"4" , value:4 ,IsActive:false,category:"3" ,categoryName:"Present"},
{id:5 , Name:"5" ,value:5 , IsActive:false ,category:"3" ,categoryName:"Present"},
{id:6 , Name:"6" ,value:0, IsActive:false ,category:"2",categoryName:"Weekend"} ,
{id:7 ,value:0, Name:"7",IsActive:false,category:"2" ,categoryName:"Weekend"},
{id:8 ,value:8, Name:"8",IsActive:false,category:"3" ,categoryName:"Present"},
{id:9 ,value:9, Name:"9",IsActive:false,category:"3" ,categoryName:"Present"},
{id:10 ,value:10, Name:"10",IsActive:false,category:"4" ,categoryName:"Absent"},
{id:11 ,value:11, Name:"11",IsActive:false,category:"5" ,categoryName:"Attendance Unavailable"},
{id:12 ,value:12, Name:"12",IsActive:false,category:"5",categoryName:"Attendance Unavailable"},
{id:13 ,value:0, Name:"13",IsActive:false,category:"2" ,categoryName:"Weekend"},
{id:14 ,value:0, Name:"14",IsActive:false,category:"2" ,categoryName:"Weekend"},
{id:15,value:15, Name:"15",IsActive:false,category:"3" ,categoryName:"Present"},
{id:16 ,value:16, Name:"16",IsActive:false,category:"3" ,categoryName:"Present"},
{id:17 ,value:17, Name:"17",IsActive:false,category:"3",categoryName:"Present"},
{id:18 ,value:18, Name:"18",IsActive:false,category:"3",categoryName:"Present"},
{id:19 ,value:19, Name:"19",IsActive:false,category:"3",categoryName:"Present"},
{id:20 ,value:0, Name:"20",IsActive:false,category:"2",categoryName:"Weekend"},
{id:21 ,value:0, Name:"21",IsActive:false,category:"2",categoryName:"Weekend"},
{id:22 ,value:22, Name:"22",IsActive:false,category:"3" ,categoryName:"Present"},
{id:23, value:23, Name:"23",IsActive:false,category:"3" ,categoryName:"Present"},
{id:24 ,value:24, Name:"24",IsActive:false,category:"3",categoryName:"Present"},
{id:25 ,value:25, Name:"25",IsActive:false,category:"3",categoryName:"Present"},
{id:26 ,value:26, Name:"26",IsActive:false,category:"3",categoryName:"Present"},
{id:27 ,value:27, Name:"27",IsActive:false,category:"2",categoryName:"Weekend"},
{id:28 ,value:28, Name:"28",IsActive:false,category:"2",categoryName:"Weekend"},
{id:29, value:29, Name:"29",IsActive:false,category:"1",categoryName:"Hoilday"},
{id:30 ,value:30, Name:"30",IsActive:false,category:"4",categoryName:"Absent"},
{id:31 ,value:0, Name:"31",IsActive:false,category:"4",categoryName:"Absent"},]

 
function AttandaceHalf() {
       const dispatch = useDispatch();
       const [ItemList1 , setItemList1]=useState(ItemList)

            const SummaryCountforAttendanceBodyUS = useSelector(
              (state: RootState) => state.AttendanceList.ISGetSummaryCountforAttendanceBody
            );

            const SummaryCountforAttendanceBody: IGetSummaryCountforAttendanceBody = {
              "asSchoolId":18,
              "asAcademicYearId":54,
              "asStandardDivisionId":1229,
              "asAttendanceDate":"03-Oct-2023",
              "asUserId":1
          }

          useEffect(() => {
              dispatch(GetSummaryCountforAttendanceBodyCDA(SummaryCountforAttendanceBody));
          
            }, [])

       const ClickItemList=(value)=>{
              alert(value)
          
         
          }
       const [date, setDate] = useState(new Date());
       const formattedDate = ` ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
         
       const handlePrevMonth = () => {
         const newDate = new Date(date);
         newDate.setMonth(newDate.getMonth() - 1);
             setDate(newDate);
       };
       
       const handleNextMonth = () => {
         const newDate = new Date(date);
         newDate.setMonth(newDate.getMonth() +1);
             setDate(newDate);
       }
             const HeaderArray = [
              {Id:1, Header:""},
              {Id:2, Header:"Boys"},
              {Id:3, Header:"Girls"} ,
              {Id:4, Header:"Total"}
               ]
  return (
    <div>
      
          <CardCalender ItemList={ItemList1} 
      ClickItemList={ClickItemList} 
      handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} 
      formattedDate={formattedDate}/>
        <Grid container spacing={1}>
        
        <Grid item lg={5.5} > 
                <ListStyle sx={{ml:"16px" , mt:"26px" , backgroundColor:"#e1bee7"}}>
                    <Box sx={{display:"flex"}}>
                        <Typography >Present Student/Total Student</Typography>
                        <Typography pl={3} >
                      
                            32/45
                         
                            </Typography>
                    </Box>
                </ListStyle>
                
                 </Grid>
                 
                 <Grid item lg={6.5} > 
                <ListStyle sx={{ mt:"26px" , backgroundColor:"#e1bee7"}} >
                    <Box sx={{display:"flex"}}>
                        <Typography   >Attendaced Marked Classes/Total Student</Typography>
                        <Typography  pl={2}>
                         
                           23/45
                        
                           
                            
                            </Typography>
                    </Box>
                </ListStyle>
                
                 </Grid>
                
                 <Grid item lg={3}/> 
                    <Grid item lg={3} >
                    <ButtonPrimary fullWidth>Individual Attandace</ButtonPrimary>
                    </Grid>
                    <Grid item lg={3}>
                    <ButtonPrimary fullWidth>MonthWise Attandace</ButtonPrimary>
                    </Grid>
                    <Grid item lg={3}/>
                   <Grid item xs={12} sx={{ml:"16px"}}>
                   
                        {/* <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Present Student</Typography> */}
                        {/* <Divider sx={{backgroundColor:"black" , my:0.5}}></Divider> */}
                        {/* <Box sx={{display:"flex" , justifyContent:"space-between"}}> */}
                   {/* <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          12
                 </Typography>
                 <Typography>
          23
                 </Typography>
                 <Typography>
          35
                 </Typography>
         
                        </Box>
                        
                        </ListStyleA> 
                      
              
                        <ListStyleA>
                        <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Absent Student</Typography>
                        <Divider sx={{backgroundColor:"black" , my:0.5}}></Divider>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          1
                 </Typography>
                 <Typography>
          2
                 </Typography>
                 <Typography>
          3
                 </Typography>
         
                        </Box>
                        
                        </ListStyleA>

                        <ListStyleA>
                        <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Present Student Avarge of Selected Month</Typography>
                        <Divider sx={{my:0.5 , backgroundColor:"black"}}></Divider>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          12
                 </Typography>
                 <Typography>
          23
                 </Typography>
                 <Typography>
          35
                 </Typography>
          */}
                        {/* </Box> */}

                       
            <TableAttendace  ItemList={SummaryCountforAttendanceBodyUS} HeaderArray={HeaderArray} />

                        
                      
                     
                    </Grid>

                </Grid>
      
           
    </div>
  )
}

export default AttandaceHalf