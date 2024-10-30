

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';

const ProgressReportGradeView = ({ HeaderArray1, SubHeaderArray1, MarkDetailsList1, IsTotalConsiderForProgressReport }) => {
  // const getListDisplayName = (ShortName) => {
  //     let returnVal = ""
  //     ListDisplayNameDetails1.map((Item) => {
  //         if (Item.ShortName == ShortName)
  //             returnVal = Item.DisplayName
  //     })
  //     return returnVal

  // }

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

  }, [MarkDetailsList1])

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
                  {MarkItem?.MarksScored ?? '-'}
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