

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const ProgressReportGradeView = ({ EntireDataList, HeaderArray1, SubHeaderArray1, MarkDetailsList1, IsTotalConsiderForProgressReport }) => {
  // const getListDisplayName = (ShortName) => {
  //     let returnVal = ""
  //     ListDisplayNameDetails1.map((Item) => {
  //         if (Item.ShortName == ShortName)
  //             returnVal = Item.DisplayName
  //     })
  //     return returnVal

  // }
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
    console.log('', HeaderArray1);

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

  return (
    <Box>
      <Table>
        <TableHead>
          {HeaderParent.length > 1 &&
            (<>
              <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                <TableCell rowSpan={2}>
                  <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5} >
                    Subjects &#9654;
                  </Typography>
                  <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                    &#9660; Exam
                  </Typography></TableCell>

                {HeaderParent.map((item) => (
                  <TableCell colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                    <Typography color="black" textAlign={'left'} mr={5}  >
                      <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                    </Typography></TableCell>
                ))
                }
              </TableRow>
              <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                {HeaderArray1.map((item) => (
                  <TableCell colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                    <Typography color="black" textAlign={'left'} mr={5}  >
                      <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                    </Typography></TableCell>
                ))
                }
              </TableRow>
            </>)}
          {HeaderParent.length <= 1 &&
            (<TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
              <TableCell rowSpan={2}>
                <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5} >
                  Subjects &#9654;
                </Typography>
                <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                  &#9660; Exam
                </Typography></TableCell>
              {HeaderArray1.map((item) => (
                <TableCell colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                  <Typography color="black" textAlign={'left'} mr={5}  >
                    <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                  </Typography></TableCell>
              ))}
              {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                <TableCell rowSpan={2} sx={{ border: '1px solid black', textAlign: 'center' }}>
                  <Typography color="black" textAlign={'left'} mr={5}  >
                    <b style={{ marginRight: "5px" }}>Grade</b>
                  </Typography></TableCell>}
            </TableRow>
            )}
          <TableRow>
            {SubHeaderArray1.map((item) => (
              <><TableCell >
                <Typography color="#38548A" textAlign={'center'} mr={9}  >
                  <b style={{ marginRight: "5px" }}>{item.TestTypeName}</b>
                </Typography>
              </TableCell>
              </>
            ))}
            {data?.listSubjectsDetails?.map((item, i) => (
              <>
                {item?.Is_CoCurricularActivity.toLowerCase() === 'true' && item?.Total_Consideration === 'N' &&
                  <TableCell key={i} >
                    <Typography color="#38548A" textAlign={'center'} mr={9}>
                      <b>Grade</b>
                    </Typography>
                  </TableCell>
                }
              </>
            ))}
          </TableRow>
        </TableHead>
        {MarkDetailsList1.map((testItem, i) => (
          <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
            <TableRow>
              <TableCell sx={{}}>
                <b> {testItem.TestName}</b>
              </TableCell>
              {testItem.MarksArr.map((MarkItem) => (
                <TableCell sx={{ backgroundColor: 'white' }}>
                  {
                    MarkItem
                      ? (MarkItem.IsAbsent !== 'N'
                        ? getRemarkForGradeCell(MarkItem.IsAbsent)
                        : (MarkItem.MarksScored || MarkItem.MarksScored === 0)
                          ? MarkItem.MarksScored === '' ? '-' : MarkItem.MarksScored
                          : '-')
                      : '-'
                  }
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