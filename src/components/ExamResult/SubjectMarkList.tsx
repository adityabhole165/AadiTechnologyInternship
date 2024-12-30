import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
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
import Legend from 'src/libraries/Legend/Legend';
import {
  firstthreetopperslist,
  gettestmarklist
} from 'src/requests/ExamResult/RequestSubjectMarkList';
import { RootState, useSelector } from 'src/store';
import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
import GoldMedal from '../../assets/img/medals/gold-medal.png';
import SilverMedal from '../../assets/img/medals/silver-medal.png';
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const SubjectMarkList = () => {
  const dispatch = useDispatch();
  let {
    SubjectId,
    TestId,
    StandardDivisionId,
    getExamName,
    getTeacherName,
    getSubjectName
  } = useParams();

  // Decode in-place
  SubjectId = decodeURL(SubjectId);
  TestId = decodeURL(TestId);
  StandardDivisionId = decodeURL(StandardDivisionId);
  getExamName = decodeURL(getExamName);
  getTeacherName = decodeURL(getTeacherName);
  getSubjectName = decodeURL(getSubjectName);

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
  //console.log(TestMarkList, "abcd");
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
    //console.log(GetTestMarkBody, "GetTestMarkBody");

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

  //console.log(Columns, "value");

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
                    <span style={{ color: 'green', fontWeight: 'bold', backgroundColor: green[100], margin: '0px', paddingLeft: '5px', paddingRight: '5px' }}>{rowData.Marks[i].theoryType}</span>
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
  const LegendArray = [
    ...HeaderListTestMark.slice(-1).map((Item, i) => ({
      id: 1, // Unique ID for the last item that will now appear first
      Name: `Legend for ${Item}`,
      color: 'blue', // Color for the Name
      fontWeight: 'bold',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <span
            style={{
              color: 'blue',
              fontWeight: 'bold'
            }}
          >
            {Item.substring(0, 1)} : {Item}
          </span>
        </Box>
      )
    })),
    {
      id: 2,
      Name: 'Exempted',
      color: 'brown', // Color for the Name
      fontWeight: 'bold',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <span style={{ color: 'brown', fontWeight: 'bold' }}>Ex :</span>
        </Box>
      )
    },
    {
      id: 3,
      Name: 'Late Joinee',
      color: 'green', // Color for the Name
      fontWeight: 'bold',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <span style={{ color: 'green', fontWeight: 'bold' }}>- :</span>
        </Box>
      )
    },
    {
      id: 4,
      Name: 'Absent',
      color: 'red', // Color for the Name
      fontWeight: 'bold',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <span style={{ color: 'red', fontWeight: 'bold' }}>Ab :</span>
        </Box>
      )
    },
    {
      id: 5,
      Name: '',
      color: 'black', // Color for the Name
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="h5">Toppers of the class :</Typography>
          <img src={GoldMedal} alt="Gold Medal" width={17} />
          <img src={SilverMedal} alt="Silver Medal" width={17} />
          <img src={BronzeMedal} alt="Bronze Medal" width={17} />
        </Box>
      )
    },
  ];

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Exam Result',
              path: '/RITeSchool/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId
            },
            {
              title: 'Subject Mark List',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="left"
                gap={1}
                sx={{
                  mt: { xs: 0, sm: 0 },
                  flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                }}
              >
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <TextField
                    fullWidth
                    label={"Class"}
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: '#F0F0F0', width: { xs: '60vw', sm: '17vw' } }}
                    value={getTeacherName}
                    size={"small"}
                    InputProps={{
                      readOnly: true,
                    }}
                  /></Grid>

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <TextField
                    fullWidth
                    label={"Subject Name"}
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: '#F0F0F0', width: { xs: '60vw', sm: '17vw' } }}
                    value={getSubjectName}
                    size={"small"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <TextField
                    fullWidth
                    label={"Exam "}
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: '#F0F0F0', width: { xs: '60vw', sm: '18vw' } }}
                    value={getExamName}
                    size={"small"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  gap={1}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                >
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

                </Grid>
              </Stack>
            </>
          }
        />
        <Box >

          <Box sx={{ background: 'white', p: 1, mb: 2 }}>
            <Legend LegendArray={LegendArray} />
          </Box>
          <Box sx={{ p: 2, background: 'white' }}>
            {/* New Table */}
            <Grid container spacing={2}>
              {arrPages.map((arrItem) => {
                return (
                  <Grid item xs={gridIndex}>
                    <DataTable
                      columns={Columns}
                      data={TestMarkListNew.filter((item) => {
                        return (item.Index >= arrItem.startIndex && item.Index <= arrItem.endIndex
                        )
                      })}
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