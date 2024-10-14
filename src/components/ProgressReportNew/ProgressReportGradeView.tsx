import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ProgressReportGradeView = ({ USlistSubjectsDetails, USListSubjectidDetails, USlistTestDetailsArr, IsTotalConsiderForProgressReport }) => {

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[600]}` }}>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F0F0F0' }}>
            <TableCell rowSpan={2}>
              <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5} >
                Subjects &#9654;
              </Typography>
              <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                &#9660; Exam
              </Typography></TableCell>
            {USlistSubjectsDetails.map((item) => (
              <TableCell key={item.id}>
                <b>
                  {item.Total_Consideration === 'N' ? (
                    <span>
                      {item.Subject_Name} <span style={{ color: 'red' }}>*</span>
                    </span>
                  ) : (
                    <span>{item.Subject_Name}</span>
                  )}
                </b>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {USListSubjectidDetails.map((item) => (
              <TableCell sx={{ backgroundColor: 'white' }}>
                {
                  IsTotalConsiderForProgressReport == "True"
                    ? <Typography color="#38548A" textAlign={'left'} mr={5}  >
                      <b style={{ marginRight: "9px" }}>{"Total"}</b>
                    </Typography> : <Typography color="#38548A" textAlign={'left'} mr={5}  >
                      <b style={{ marginRight: "9px" }}>{item.ShortenTestType_Name}</b>
                    </Typography>

                }


              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {USlistTestDetailsArr.map((testItem) => (
          <TableBody key={testItem.id}>
            <TableRow sx={{ backgroundColor: 'white' }}>
              <TableCell sx={{ backgroundColor: '#F0F0F0' }}>{testItem.Test_Name}</TableCell>
              {testItem.subjectIdArr.map((subjectItem) => (
                <TableCell>{subjectItem.Grade}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        ))}


        {/* {USlistTestDetails.map((testItem) => (
                    <TableBody key={testItem.id}>
                      <TableRow>
                        <TableCell>{testItem.Test_Name}</TableCell>
                        {Data3.map((subjectItem) => (
                          <TableCell>{subjectItem.Grade}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  ))} */}
      </Table>
    </Box>
  )
}

export default ProgressReportGradeView