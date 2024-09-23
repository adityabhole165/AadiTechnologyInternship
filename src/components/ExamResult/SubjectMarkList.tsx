import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Divider, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DataTable, { Column } from "src/components/DataTable";
import {
  GetFirstThreeToopersBody,
  GetStudentsForSubjectMarkMouseOverBody,
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import {
  firstthreetopperslist,
  gettestmarklist
} from 'src/requests/ExamResult/RequestSubjectMarkList';
import { RootState, useSelector } from 'src/store';
import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
import GoldMedal from '../../assets/img/medals/gold-medal.png';
import SilverMedal from '../../assets/img/medals/silver-medal.png';
import CommonPageHeader from '../CommonPageHeader';

const SubjectMarkList = () => {
  const dispatch = useDispatch();
  const { SubjectId, TestId, StandardDivisionId, getExamName, getTeacherName, getSubjectName } = useParams();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const Note: string = "Displays brief mark list with toppers for selected class-subject."
  const HoverNote: string = "To view the student name take your cursor on the roll number."

  const TestMarkList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.listTestMark);
  const HeaderListTestMark: any = useSelector(
    (state: RootState) => state.SubjectMarkList.HeaderListTestMark);

  const TestMarkListNew: any = useSelector(
    (state: RootState) => state.SubjectMarkList.listTestMarkNew);
  console.log(TestMarkList, "abcd");
  const HeaderList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.HeaderList);
  // console.log(HeaderList, "HeaderList");
  const StudentNamelistMouseOver: any = useSelector(
    (state: RootState) => state.SubjectMarkList.StudentNameMouseOver);
  const ListLegend: any = useSelector(
    (state: RootState) => state.SubjectMarkList.legend);
  const FirstThreeToppers: any = useSelector(
    (state: RootState) => state.SubjectMarkList.ThreeToppersList);

  const GetTestMarkBody: IGetTestMarkBody = {
    asSchoolId: Number(asSchoolId),
    asStandardDivision_Id: Number(StandardDivisionId),
    asSubject_Id: Number(SubjectId),
    asTestId: Number(TestId),
    asAcademicYearID: Number(asAcademicYearId),
    asShowTotalAsPerOutOfMarks: "Y"
  }
  const GetStudentsForSubjectMarkMouseOver: GetStudentsForSubjectMarkMouseOverBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(StandardDivisionId),
    asNoOfRecord: 15,
    asTestId: Number(TestId),
    asSubjectId: Number(SubjectId),

  }
  const GetFirstThreeToopers: GetFirstThreeToopersBody = {
    "asAcademicYearID": Number(asAcademicYearId),
    "asSchoolId": Number(asSchoolId),
    "asStandardDivision_Id": Number(StandardDivisionId),
    "asSubject_Id": Number(SubjectId),
    "asTestId": Number(TestId)
  }
  useEffect(() => {
    dispatch(firstthreetopperslist(GetFirstThreeToopers));
  }, []);

  // useEffect(() => {
  //   dispatch(gettestmarklist(GetStudentsForSubjectMarkMouseOver));
  // }, []);
  useEffect(() => {
    console.log(GetTestMarkBody, "GetTestMarkBody");

    dispatch(gettestmarklist(GetTestMarkBody));
  }, []);

  const formatRollNo = (RollNo) => {

    let returnVal = RollNo.toString()
    if (returnVal.length < 2)
      returnVal = "0" + returnVal + " "
    return returnVal
  }
  const [Columns, setColumns] = React.useState<Column[]>([
    // let Columns = [
    {
      id: 'rollNo',
      label: 'Roll No.',
      renderCell: (rowData) => <>
        <Stack direction={"row"} alignItems={'center'} gap={2}>
          {/* Student Roll no. */}
          {rowData.rollNo && (
            <Tooltip title={rowData.MoueOverText1 != undefined ? rowData.MoueOverText1 : ""} >
              <span>{formatRollNo(rowData.rollNo)}</span>
            </Tooltip>)}

          {rowData.rank === "1" &&
            <img src={GoldMedal} alt="Gold Medal" height={20} />
          }

          {/* If student rank is 2 */}
          {rowData.rank === "2" &&
            <img src={SilverMedal} alt="Silver Medal" height={20} />
          }

          {/* If student rank is 3 */}
          {rowData.rank === "3" &&
            <img src={BronzeMedal} alt="Bronze Medal" height={20} />
          }
        </Stack>
      </>
    }])

    console.log(Columns,"value");
    
  useEffect(() => {
    if (HeaderListTestMark.length > 0) {
      let Columncpy = [...Columns];

      HeaderListTestMark.map((Item, i) => {
        Columncpy.push({
          id: 'theory',
          label: Item.substring(0, 1),
          renderCell: (rowData) => (
            <>
              <Stack direction={"row"} alignItems={'center'} gap={2}>
                {rowData.Marks[i].theoryType && (

                  rowData.Marks[i].theoryType === "Ex" && (
                    <span style={{ color: 'brown', fontWeight: 'bold' }}>{rowData.Marks[i].theoryType}</span>
                  )

                  || rowData.Marks[i].theoryType === "-" && (
                    <span style={{ color: 'green', fontWeight: 'bold', backgroundColor: green[100], margin:'0px', paddingLeft:'5px', paddingRight:'5px' }}>{rowData.Marks[i].theoryType}</span>
                  )

                  || rowData.Marks[i].theoryType === "Ab" && (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>{rowData.Marks[i].theoryType}</span>
                  )
                )}


                {!rowData.Marks[i].theoryType && parseFloat(rowData.Marks[i].theory)}
              </Stack>
            </>
          )
        });
      });

      Columncpy.push({
        id: 'total',
        label: 'Total',
        renderCell: (rowData) => <span>{parseFloat(rowData.total)}</span>
      });

      setColumns(Columncpy);
    }
  }, [HeaderListTestMark]);
  let totalRecords = TestMarkListNew.length
  let recordsPerPage = 10
  let pageCount = Math.ceil(totalRecords / recordsPerPage)
  let startIndex = 0, endIndex = recordsPerPage - 1
  let arrPages = []
  for (let i = 0; i < pageCount; i++) {
    arrPages.push({ startIndex: startIndex, endIndex: endIndex });
    startIndex += recordsPerPage
    endIndex += recordsPerPage
  }
  let gridIndex = 12 / pageCount
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Exam Result',
              path: '/extended-sidebar/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId
            },
            {
              title: 'Subject Mark List',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Box sx={{ width: '250px' }}>
                <TextField
                  fullWidth
                  label={"Class"}
                  InputLabelProps={{ shrink: true }}
                  sx={{ bgcolor: '#F0F0F0' }}
                  value={getTeacherName}
                  size={"small"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box sx={{ width: '250px' }}>
                <TextField
                  fullWidth
                  label={"Subject Name"}
                  InputLabelProps={{ shrink: true }}
                  sx={{ bgcolor: '#F0F0F0' }}
                  value={getSubjectName}
                  size={"small"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box sx={{ width: '250px' }}>
                <TextField
                  fullWidth
                  label={"Exam "}
                  InputLabelProps={{ shrink: true }}
                  sx={{ bgcolor: '#F0F0F0' }}
                  value={getExamName}
                  size={"small"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box>
                <Tooltip title={HoverNote}>
                  <IconButton

                    sx={{
                      color: 'white',
                      backgroundColor: yellow[700],
                      '&:hover': {
                        backgroundColor: yellow[800]
                      }
                    }}
                  >
                    <PriorityHighIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={Note}>
                  <IconButton

                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      '&:hover': {
                        backgroundColor: grey[500]
                      }
                    }}
                  >
                    <QuestionMark />
                  </IconButton>
                </Tooltip>

              </Box>
            </>
          }
        />
        <Box >
        <Box sx={{backgroundColor:'white', p:1,mb:2}}>
            
            <Stack direction={"row"} gap={2} alignItems={'center'} mt={1}>
              <Box>
                <Typography variant='h5'>
                  Legend:
                </Typography>
              </Box>
              {HeaderListTestMark.map((Item, i) => (
                <Box key={i}>
                  <span
                    style={{
                      color: 'blue',
                      fontWeight: 'bold'
                    }}
                  >
                    {Item.substring(0, 1)} : {Item}
                  </span>
                </Box>
              ))}

              <Box>
                <span
                  style={{
                    color: 'brown',
                    fontWeight: 'bold'
                  }}
                >
                  Ex : Exempted
                </span>
              </Box>
              <Box>
                <span
                  style={{
                    color: 'green',
                    fontWeight: 'bold'
                  }}
                >
                  - : Late Joinee
                </span>
              </Box>
              <Box>
                <span
                  style={{
                    color: 'red',
                    fontWeight: 'bold'
                  }}
                >
                  Ab : Absent
                </span>
              </Box>
              <Box>
                <Divider
                  sx={{ height: 20 }}
                  orientation='vertical'
                />
              </Box>
              <Box>
                <Typography variant='h5'>
                  Toppers of the class:
                </Typography>
              </Box>
              <Box>
                <img src={GoldMedal} alt="Gold Medal" width={18} />
              </Box>
              <Box>
                <img src={SilverMedal} alt="Silver Medal" width={18} />
              </Box>
              <Box>
                <img src={BronzeMedal} alt="Bronze Medal" width={18} />
              </Box>
            </Stack>
          </Box>
        <Box sx={{ p: 2, background: 'white' }}>
          {/* New Table */}
          <Grid container spacing={2}>
            {arrPages.map((arrItem) => {
              return (
                <Grid item xs={gridIndex}>
                  <DataTable
                    columns={Columns}
                    data={TestMarkListNew.filter((item) => { return (item.Index >= arrItem.startIndex && item.Index <= arrItem.endIndex
                    ) })}
                    isPagination={false}
                  />
                </Grid>
              )
            })}</Grid>

          
        </Box>
        </Box>
        {/* New Table End */}


        {/* {(HeaderList.length > 0) &&
          (<Grid container>
            <Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return item.Index < 15 })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid>
            <Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return (item.Index > 14 && item.Index < 30) })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid><Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return (item.Index > 29 && item.Index < 45) })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid>

          </Grid>)
        } */}
      </Box>
    </>
  )
}

export default SubjectMarkList