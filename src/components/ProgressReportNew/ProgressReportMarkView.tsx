import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ProgressReportMarkView = ({ HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, ListTestTypeIdDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {

    const getListDisplayName = (ShortName) => {
        let returnVal = "";
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName === ShortName)
                returnVal = Item.DisplayName;
        });
        return returnVal;
    };

    let HeaderParent = [];
    let PrevParentId = "0", SubjectName = "";
    let HeaderCount = 0;

    HeaderArray.forEach((item) => {
        if (item.ParentSubjectId !== PrevParentId) {
            HeaderParent.push({
                SubjectName: SubjectName,
                colSpan: HeaderCount
            });
            SubjectName = item.ParentSubjectName;
            PrevParentId = item.ParentSubjectId;
            HeaderCount = 0;
        }
        SubjectName = item.ParentSubjectName;
        HeaderCount = HeaderCount + item.colSpan;
    });

    HeaderParent.push({
        SubjectName: SubjectName,
        colSpan: HeaderCount
    });

    // Track if there is any parent subject
    const hasParentSubjects = HeaderArray.some(item => item.ParentSubjectId !== "0");
    function showParentColumns() {

    }
    console.log('✨ HeaderArray', HeaderArray);

    console.log('✨ HeaderParent', HeaderParent);
    console.log('✨ SubHeaderArray', SubHeaderArray);
    console.log('✨ MarkDetailsList', MarkDetailsList);
    return (
        <Box>
            <Table>
                <TableHead>
                    {HeaderParent.length > 1 && (
                        <>
                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                <TableCell rowSpan={2}>
                                    <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5}>
                                        Subjects &#9654;
                                    </Typography>
                                    <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                                        &#9660; Exam
                                    </Typography>
                                </TableCell>

                                {HeaderParent.map((item, index) => (
                                    <TableCell key={index} colSpan={item.SubjectName !== '' ? item.colSpan + ListTestTypeIdDetails.length + 1 : item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                        <Typography color="black" textAlign={'left'} mr={5}>
                                            <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>

                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                {HeaderArray.map((item, index) => (
                                    <>
                                        {index > 0 && HeaderArray[index - 1].ParentSubjectId !== "0" && item.ParentSubjectId === '0' && (
                                            <>
                                                {ListTestTypeIdDetails?.map((item, i) => {
                                                    return (
                                                        <TableCell key={i} rowSpan={2} >  <Typography color="#38548A" textAlign={'center'} mr={5}>Total {item.Text2}</Typography></TableCell>
                                                    )
                                                })}
                                                <TableCell rowSpan={2} >  <Typography color="#38548A" textAlign={'center'} mr={5}>Total</Typography></TableCell>
                                            </>
                                        )}
                                        <TableCell key={index} colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                            <Typography color="black" textAlign={'left'} mr={5}>
                                                <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                            </Typography>
                                        </TableCell>

                                        {/* Check if the previous item has a parent and the current item doesn't */}

                                    </>
                                ))}
                            </TableRow>

                        </>
                    )}

                    {HeaderParent.length <= 1 && (
                        <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                            <TableCell rowSpan={2}>
                                <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5}>
                                    Subjects &#9654;
                                </Typography>
                                <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                                    &#9660; Exam
                                </Typography>
                            </TableCell>
                            {HeaderArray.map((item, index) => (
                                <TableCell key={index} colSpan={item.colSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                    <Typography color="black" textAlign={'left'} mr={5}>
                                        <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    )}

                    <TableRow>
                        <TableCell></TableCell>
                        {SubHeaderArray.map((item, index) => (
                            <TableCell key={index}>
                                <Typography color="#38548A" textAlign={'center'} mr={9}>
                                    <b style={{ marginRight: "5px" }}>{item.TestTypeName}</b>
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {MarkDetailsList.map((testItem, i) => (
                    <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                        <TableRow>
                            <TableCell>
                                <b>{testItem.TestName}</b>
                            </TableCell>

                            {testItem.MarksArr.map((MarkItem, index) => (
                                <TableCell key={index} sx={{ backgroundColor: 'white' }}>
                                    {MarkItem?.MarksScored + (MarkItem?.TotalMarks === "-" ? "" : (" / " + MarkItem?.TotalMarks))}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </Box>
    );
};

export default ProgressReportMarkView;
