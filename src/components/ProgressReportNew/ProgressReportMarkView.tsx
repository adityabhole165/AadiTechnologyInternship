import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ProgressReportMarkView = ({ EntireDataList, ThirdHeaderRow, HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, ListTestTypeIdDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {

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
                                    <TableCell
                                        key={index}
                                        colSpan={
                                            item.SubjectName !== ''
                                                ? item.colSpan + ListTestTypeIdDetails.length + (IsTotalConsiderForProgressReport.toLowerCase() === 'true' ? 1 : 0)
                                                : item.colSpan
                                        }
                                        sx={{ border: '1px solid black', textAlign: 'center' }}
                                    >
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
                                            {/* IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&  */}
                                                {ListTestTypeIdDetails?.map((item, i) => {
                                                    return (
                                                        <TableCell key={i} rowSpan={2} >  <Typography color="#38548A" textAlign={'center'} mr={5}>Total {item.Text2}</Typography></TableCell>
                                                    )
                                                })}
                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                    <TableCell rowSpan={2} >  <Typography sx={{ fontWeight: '800' }} color="#38548A" textAlign={'center'} mr={5}>Total</Typography></TableCell>}
                                            </>
                                        )}
                                        <TableCell key={index} colSpan={item.colSpan - (IsTotalConsiderForProgressReport.toLowerCase() === 'false' ? 1 : 0)} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                            <Typography color="black" textAlign={'left'} mr={5}>
                                                <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                            </Typography>
                                        </TableCell>

                                        {/* Check if the previous item has a parent and the current item doesn't */}

                                    </>
                                ))}
                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                    <>
                                        <TableCell rowSpan={2}>
                                            <Typography color="#38548A" textAlign={'center'} px={3}>
                                                <b>Total</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={2}>
                                            <Typography color="#38548A" textAlign={'center'} px={3}>
                                                <b>%</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={2} >
                                            <Typography color="#38548A" textAlign={'center'} px={5}>
                                                <b>Grade</b>
                                            </Typography>
                                        </TableCell>
                                    </>}
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
                        {ThirdHeaderRow.map((item, index) => (
                            <>
                                {/* Render the normal TableCell */}
                                <TableCell key={index}>
                                    <Typography color="#38548A" textAlign={'center'} mr={9}>
                                        <b style={{ marginRight: "5px" }}>{item.ShortenTestType_Name}</b>
                                    </Typography>
                                </TableCell>
                                {/* Add a 'Total' TableCell after every dynamic number of cells */}
                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' && (index + 1) % ListTestTypeIdDetails.length === 0 && (
                                    <TableCell key={`total-${index}`}>
                                        <Typography color="#38548A" textAlign={'center'} mr={9}>
                                            <b>Total</b>
                                        </Typography>
                                    </TableCell>
                                )}

                            </>
                        ))}
                        <TableCell >
                            <Typography color="#38548A" textAlign={'center'} mr={9}>
                                <b>Grade</b>
                            </Typography>
                        </TableCell>
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


// function findRow2() {
//     return data.listSubjectsDetails.map((item) => {
//         if (item.Parent_Subject_Id === '0') { // Handle undefined or empty Parent_Subject_Id
//             return { ...item, Subject_Name: '', rowSpan: 1, colSpan: 4 };
//         } else {
//             return { ...item, rowSpan: 1, colSpan: 4 };
//         }
//     });
// }

// function findRow1() {
//     let ParentSubArr = [];
    
//     return data.listSubjectsDetails.map((item) => {
//         if (item.Parent_Subject_Id === '0') { // For top-level subjects
//             return { ...item, rowSpan: 2, colSpan: 4 };
//         } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
//             ParentSubArr.push(item.Parent_Subject_Id);
//             return { 
//                 ...item, 
//                 Subject_Name: findName(item.Parent_Subject_Id), 
//                 rowSpan: 1, 
//                 colSpan: 16 
//             };
//         }
//         return item; // Return the unchanged item if it's already processed
//     });
// }

// function findName(Id) {
//     // Safeguard: Check if data.listTestIdDetails exists and filter properly
//     if (!Array.isArray(data.listTestIdDetails)) return 'No Name Available';

//     const list1 = data.listTestIdDetails.filter((item) => item.Parent_Subject_Id === Id);
    
//     if (list1.length >= 1 && list1[0].Parent_Subject_Name) {
//         return list1[0].Parent_Subject_Name; // Return the found Parent_Subject_Name
//     }
//     return 'No Name Available'; // Fallback if no valid name is found
// }
