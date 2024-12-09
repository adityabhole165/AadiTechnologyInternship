

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';

const ProgressReportGradeView = ({ isFailCriteria, totalCount, EntireDataList, HeaderArray1, SubHeaderArray1, MarkDetailsList1, IsTotalConsiderForProgressReport }) => {
  // const getListDisplayName = (ShortName) => {
  //     let returnVal = ""
  //     ListDisplayNameDetails1.map((Item) => {
  //         if (Item.ShortName == ShortName)
  //             returnVal = Item.DisplayName
  //     })
  //     return returnVal

  // }

  console.log(HeaderArray1, "HeaderArray1");




  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (Object.keys(EntireDataList).length > 0) {
      setData(EntireDataList);
    }
  }, [EntireDataList])
  let HeaderParent = []
  let PrevParentId = "0", SubjectName = ""
  let HeaderCount = 0
  HeaderArray1.map((item) => {
    // if (item.ParentSubjectId !=  "0") {
    if (item.ParentSubjectId != PrevParentId) {
      HeaderParent.push({
        SubjectName: SubjectName,
        colSpan: HeaderCount
      })
      SubjectName = item.ParentSubjectName
      PrevParentId = item.ParentSubjectId
      HeaderCount = 0
      // }
    }
    SubjectName = item.ParentSubjectName
    HeaderCount = HeaderCount + item.colSpan
  })
  HeaderParent.push({
    SubjectName: SubjectName,
    colSpan: HeaderCount
  })
  useEffect(() => {
    console.log('🦥🦥🦥🦥 >>>', MarkDetailsList1);
    console.log('✅😶⭐🔗❌', SubHeaderArray1);


  }, [MarkDetailsList1])
  function getRemarkForGradeCell(cellRemark) {
    // html element type
    let result: any;
    let remarkList = data?.ListDisplayNameDetails?.filter((item) => item.ShortName === cellRemark);
    if (remarkList?.length > 0) {
      result = <span style={{ color: `${remarkList[0]?.ForeColor}`, fontWeight: 'bold' }}>{remarkList[0]?.DisplayName}</span>;
    }
    return result;
  }
  function showGradeHeader(subId) {
    let flag = true;
    let filter = [];
    filter = EntireDataList?.ListSubjectidDetails?.filter((item) => item.Subject_Id === subId)
    if (filter?.length > 0) {
      flag = false;
    }
    return flag;
  }

  return (
    <Box>
      <Table>
        <TableHead>
          {HeaderParent.length > 1 &&
            (<>
              <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center', }}>
                <TableCell rowSpan={2} sx={{ py: 1 }}>
                  <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={2} >
                    Subjects &#9654;
                  </Typography>
                  <Typography variant={"h3"} textAlign={'center'} color={"black"}>
                    &#9660; Exam
                  </Typography></TableCell>

                {HeaderParent.map((item) => (
                  <TableCell colSpan={item.colSpan} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center' }}>
                    <Typography color="black" textAlign={'center'} mr={2}  >
                      <b style={{ marginRight: "5px" }}>{item.SubjectName}

                        {item.Is_CoCurricularActivity == "True" && (
                          <span style={{ color: 'red' }}>*</span>
                        )}
                      </b>
                    </Typography></TableCell>
                ))
                }
                <>
                  {isFailCriteria === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                    <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                      <Typography color="black" textAlign={'center'} px={0}>
                        <b>Result</b>
                      </Typography>
                    </TableCell>}
                  {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                    <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                      <Typography color="black" textAlign={'center'} px={0}>
                        <b>Rank</b>
                      </Typography>
                    </TableCell>}
                </>
              </TableRow>
              <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                {HeaderArray1.map((item) => (
                  <TableCell colSpan={item.colSpan} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center' }}>
                    <Typography color="black" textAlign={'center'} mr={2}  >
                      <b style={{ marginRight: "5px" }}>{item.SubjectName}
                        {item.Is_CoCurricularActivity == "True" && (
                          <span style={{ color: 'red' }}>*</span>
                        )}
                      </b>
                    </Typography></TableCell>
                ))
                }
              </TableRow>
            </>)}
          {HeaderParent.length <= 1 &&
            (<TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
              <TableCell rowSpan={2} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={5} >
                  Subjects &#9654;
                </Typography>
                <Typography variant={"h3"} textAlign={'center'} color={"black"}>
                  &#9660; Exam
                </Typography></TableCell>
              {HeaderArray1.map((item) => (
                <TableCell colSpan={item.colSpan} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center' }}>
                  <Typography color="black" textAlign={'center'} mr={0}  >
                    <b style={{ marginRight: "0px" }}>{item.SubjectName}
                      {item.Is_CoCurricularActivity == "True" && (
                        <span style={{ color: 'red' }}>*</span>
                      )}
                    </b>
                  </Typography></TableCell>
              ))}
              {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                <TableCell rowSpan={2} sx={{ py: 1, minWidth: '140px', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`, }}>
                  <Typography color="black" textAlign={'center'} mx={2}  >
                    <b style={{ marginRight: "0px" }}>Grade</b>
                  </Typography></TableCell>}
              <>
                {isFailCriteria === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                  <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                    <Typography color="black" textAlign={'center'} px={0}>
                      <b>Result</b>
                    </Typography>
                  </TableCell>}
                {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                  <TableCell rowSpan={3} sx={{ py: 1, minWidth: '140px', border: (theme) => `1px solid ${theme.palette.grey[400]}` }} >
                    <Typography color="black" textAlign={'center'} px={0}>
                      <b>Rank</b>
                    </Typography>
                  </TableCell>}
              </>
            </TableRow>
            )}

          <TableRow>
            {SubHeaderArray1.map((item) => (
              <><TableCell sx={{ py: 1, textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                <Typography color="#38548A" textAlign={'center'} mx={2} sx={{}} >
                  <b style={{ marginRight: "5px" }}>{item.TestTypeName}</b>
                </Typography>
              </TableCell>
              </>
            ))}
            {data?.listSubjectsDetails?.map((item, i) => (
              <>
                {item?.Is_CoCurricularActivity.toLowerCase() === 'true' && showGradeHeader(item.Subject_Id) &&
                  <TableCell key={i} sx={{ py: 1, textAlign: 'center' }}>
                    <Typography color="#38548A" textAlign={'center'} mx={0}>
                      <b>Grade</b>
                    </Typography>
                  </TableCell>
                }
              </>
            ))}
          </TableRow>
        </TableHead>
        {MarkDetailsList1.map((testItem, i) => (
          <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', textAlign: 'center' }}>
            <TableRow>
              <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center' }}>
                <b> {testItem.TestName}</b>
              </TableCell>
              {testItem.MarksArr.map((MarkItem) => (
                <TableCell sx={{ py: 1, textAlign: 'center', backgroundColor: 'white', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
                  <span style={{ fontWeight: MarkItem?.IsGrades === 'Y'? 'bold' : 'normal' , color:`${MarkItem?.MarksScored == "Pass" ? 'green' :  MarkItem?.MarksScored == "Fail" ? "red" : 'inherit'}`  }}>
                    {
                      MarkItem
                        ? (MarkItem.IsAbsent !== 'N'
                          ? getRemarkForGradeCell(MarkItem.IsAbsent)
                          : (MarkItem.MarksScored || MarkItem.MarksScored === 0)
                            ? MarkItem.MarksScored === '' ? '-' : MarkItem.MarksScored
                            : '-')
                        : '-'
                    }
                  </span>
                </TableCell>
              ))}

              {/* <TableCell sx={{ backgroundColor: 'white' }}>
                  Total
                </TableCell> */}

            </TableRow>
          </TableBody>
        ))}

      </Table>
    </Box>
  )
}

export default ProgressReportGradeView