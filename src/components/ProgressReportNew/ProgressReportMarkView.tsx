import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const ProgressReportMarkView = ({ EntireDataList, ThirdHeaderRow, HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, ListTestTypeIdDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {
 const [data, setData] = useState<any>([]);
    const getListDisplayName = (ShortName) => {
        let returnVal = "";
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName === ShortName)
                returnVal = Item.DisplayName;
        });
        return returnVal;
    };
    function getColSpan(){
        let colSpan = 1;
        if(IsTotalConsiderForProgressReport.toLowerCase() === "true"){
            colSpan = data.ListTestTypeIdDetails?.length + 1;
            return colSpan;
        } else if(IsTotalConsiderForProgressReport.toLowerCase() === "false"){
            colSpan = data.ListTestTypeIdDetails?.length;
            return colSpan;
        }
    }
    function parentSubColSpan(parentSubId){
        let colSpan = 1;
          let filteredArr = data.listSubjectsDetails.filter((item) => item.Parent_Subject_Id === parentSubId);
          if(IsTotalConsiderForProgressReport.toLowerCase() === "true"){
            colSpan = (filteredArr.length +1) * (data.ListTestTypeIdDetails?.length+1);
            return colSpan;
          } else if(IsTotalConsiderForProgressReport.toLowerCase() === "false"){
            colSpan = (filteredArr.length +1) * data.ListTestTypeIdDetails?.length;
            return colSpan;
          }
    }
    function findRow2() {
        return data.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // Handle undefined or empty Parent_Subject_Id
                return { ...item, Subject_Name: '', rowSpan: 1, colSpan: getColSpan() };//3 };
            } else {
                return { ...item, rowSpan: 1, colSpan: getColSpan() };//3 };
            }
        });
    }
    
    function findRow1() {
        let ParentSubArr = [];
        let ans = [];
        
        data.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // For top-level subjects
                ans.push({ ...item, rowSpan: 2, colSpan: getColSpan() }); // Corrected push syntax //3
            } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
                ParentSubArr.push(item.Parent_Subject_Id);
                console.log(item.Parent_Subject_Id);
                ans.push({ 
                    ...item, 
                    Subject_Name: findName(item.Parent_Subject_Id), 
                    rowSpan: 1, 
                    colSpan: parentSubColSpan(item.Parent_Subject_Id)
                });
            }
            // No need for return since map is only used for iteration
        });
        
        return ans; 
    }
    
    
    function findName(Id) {
        // Safeguard: Check if data.listTestIdDetails exists and filter properly
        if (!Array.isArray(data.listTestidDetails)) return 'No Name Available';
    
        const list1 = data.listTestidDetails.filter((item) => item.Parent_Subject_Id === Id);
        
        if (list1.length >= 1 && list1[0].Parent_Subject_Name) {
            return list1[0].Parent_Subject_Name; // Return the found Parent_Subject_Name
        }
        return 'No Name Available'; // Fallback if no valid name is found
    }
    useEffect(() => {
        console.log('>>', EntireDataList);
        if (Object.keys(EntireDataList).length > 0) {
            setData(EntireDataList);
            console.log('>>', EntireDataList);
            let ans1 = findRow1();
            console.log(`🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️`, ans1);
            console.log(findRow2());
        }
    }, [EntireDataList])

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
                                {findRow1().map((item, index) => (
                                    <TableCell
                                        key={index}
                                        colSpan={item.Is_CoCurricularActivity === 'True' ? 1 : item.colSpan} rowSpan={item.rowSpan}
                                        sx={{ border: '1px solid black', textAlign: 'center' }}
                                    >
                                        <Typography color="black" textAlign="left" mr={5}>
                                             <b style={{ marginRight: "5px" }}>
                                                 {item.Subject_Name} 
                                         {item.Is_CoCurricularActivity.toLowerCase() == "true" && (
                                              <span style={{ color: 'red' }}>*</span>
                                                   )}
                                                     </b>
                                                </Typography>

                                    </TableCell>
                                ))}
                                     {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                    <>
                                        <TableCell rowSpan={3}>
                                            <Typography color="#38548A" textAlign={'center'} px={3}>
                                                <b>Total</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3}>
                                            <Typography color="#38548A" textAlign={'center'} px={3}>
                                                <b>%</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3} >
                                            <Typography color="#38548A" textAlign={'center'} px={5}>
                                                <b>Grade</b>
                                            </Typography>
                                        </TableCell>
                                    </>}
                            </TableRow>
                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                {findRow2()?.map((item, index) => (
                                    <>
                                        {index > 0 && findRow2()[index - 1].Parent_Subject_Id !== "0" && item.Parent_Subject_Id === '0' && (
                                            <>
                                            {/* IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&  */}
                                                {ListTestTypeIdDetails?.map((item1, i) => {
                                                    return (
                                                        <TableCell key={i} rowSpan={2} >  <Typography color="#38548A" textAlign={'center'} mr={5}>Total {item1.Text2}</Typography></TableCell>
                                                    )
                                                })}
                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                    <TableCell rowSpan={2} >  <Typography sx={{ fontWeight: '800' }} color="#38548A" textAlign={'center'} mr={5}>Total</Typography></TableCell>}
                                            </>
                                        )}
                                         {item.Subject_Name !== '' &&
                                        <TableCell key={index} colSpan={item.colSpan} rowSpan={item.rowSpan} sx={{ border: '1px solid black', textAlign: 'center' }}>
                                            <Typography color="black" textAlign={'left'} mr={5}>
                                                <b style={{ marginRight: "5px" }}>{item.Subject_Name}</b>
                                            </Typography>
                                        </TableCell>}

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
                                        <b style={{ marginRight: "5px" }}>{item.SubjectName} </b>
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
//     let ans = [];
    
//     data.listSubjectsDetails.map((item) => {
//         if (item.Parent_Subject_Id === '0') { // For top-level subjects
//             ans.push({ ...item, rowSpan: 2, colSpan: 4 }); // Corrected push syntax
//         } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
//             ParentSubArr.push(item.Parent_Subject_Id);
//             console.log(item.Parent_Subject_Id);
//             ans.push({ 
//                 ...item, 
//                 Subject_Name: findName(item.Parent_Subject_Id), 
//                 rowSpan: 1, 
//                 colSpan: 16 
//             });
//         }
//         // No need for return since map is only used for iteration
//     });
    
//     return ans; 
// }


// function findName(Id) {
//     // Safeguard: Check if data.listTestIdDetails exists and filter properly
//     if (!Array.isArray(data.listTestidDetails)) return 'No Name Available';

//     const list1 = data.listTestidDetails.filter((item) => item.Parent_Subject_Id === Id);
    
//     if (list1.length >= 1 && list1[0].Parent_Subject_Name) {
//         return list1[0].Parent_Subject_Name; // Return the found Parent_Subject_Name
//     }
//     return 'No Name Available'; // Fallback if no valid name is found
// }
