import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ProgressReportMarkView = ({ HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {
    const getListDisplayName = (ShortName) => {
        let returnVal = ""
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == ShortName)
                returnVal = Item.DisplayName
        })
        return returnVal

    }
    let HeaderParent = []
    let PrevParentId = "0", SubjectName = ""
    let HeaderCount = 0
    HeaderArray.map((item) => {
        // if (item.ParentSubjectId != "0") {
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
                                {HeaderArray.map((item) => (
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
                            {HeaderArray.map((item) => (
                                <TableCell colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                    <Typography color="black" textAlign={'left'} mr={5}  >
                                        <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                    </Typography></TableCell>
                            ))}
                        </TableRow>
                        )}
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
                                    {MarkItem?.MarksScored +
                                        (MarkItem?.TotalMarks == "-" ? "" :
                                            (" / " + MarkItem?.TotalMarks))}
                                </TableCell>

                            </>))}


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

export default ProgressReportMarkView