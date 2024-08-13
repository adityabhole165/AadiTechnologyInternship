import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'

const ProgressReportMarkView = ({ HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {
    const getListDisplayName = (ShortName) => {
        let returnVal = ""
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == ShortName)
                returnVal = Item.DisplayName
        })
        return returnVal

    }
    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                        <TableCell rowSpan={2}>
                            <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5} >
                                Subjects &#9654;
                            </Typography>
                            <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                                &#9660; Exam
                            </Typography></TableCell>
                        {HeaderArray.map((item) => (
                            <TableCell colSpan={item.colSpan}>
                                <Typography color="black" textAlign={'left'} mr={5}  >
                                    <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                </Typography></TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {SubHeaderArray.map((item) => (
                            <><TableCell >
                                <Typography color="#38548A" textAlign={'center'} mr={9}  >
                                    <b style={{ marginRight: "5px" }}>{item.TestTypeName}</b>
                                </Typography>
                            </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                {MarkDetailsList.map((testItem, i) => (
                    <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                        <TableRow>
                            <TableCell sx={{}}>
                                <b> {testItem.TestName}</b>
                            </TableCell>

                            {testItem.MarksArr.map((MarkItem) => (<>
                                <TableCell sx={{ backgroundColor: 'white' }}>
                                    {
                                        MarkItem.IsAbsent == "N" ?
                                            MarkItem.MarksScored + (MarkItem.MarksScored == "-" ? "" : (" / " + MarkItem.TotalMarks)) :
                                            // MarkItem.MarksScored + (MarkItem.MarksScored == "" ? "" : (" / " + MarkItem.TotalMarks)) :
                                            MarkItem.IsAbsent == "Y" ?
                                                <TextField></TextField>
                                                :
                                                getListDisplayName(MarkItem.IsAbsent)}
                                </TableCell>

                            </>))}


                            {/* <TableCell sx={{ backgroundColor: 'white' }}>
                  Total
                </TableCell> */}

                        </TableRow>
                    </TableBody>
                ))}
                {
                    IsTotalConsiderForProgressReport == "True" ?
                        <span>

                            <TableHead>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell>%</TableCell>
                                    <TableCell>Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {USListMarkssDetails.map((outcome) => (
                                    USListSchoolWiseTestNameDetail.filter(row => outcome.Marks_Grades_Configuration_Detail_ID === row.Grade_id)
                                        .map((row, index) => (
                                            <TableRow key={row.YearwiseStudentId}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.Total}</TableCell>
                                                <TableCell>{row.Percentage}</TableCell>
                                                <TableCell>{row.Grade_Name}{outcome.Remarks}</TableCell>

                                            </TableRow>
                                        ))
                                ))}
                            </TableBody>


                        </span> : <span></span>

                }
            </Table>
        </Box>
    )
}

export default ProgressReportMarkView