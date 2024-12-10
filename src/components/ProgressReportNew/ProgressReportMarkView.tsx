import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';

const ProgressReportMarkView = ({isFailCriteria,USlistStudentsDetails, totalCount, EntireDataList, ThirdHeaderRow, HeaderArray, SubHeaderArray, MarkDetailsList, ListDisplayNameDetails, ListTestTypeIdDetails, USListSchoolWiseTestNameDetail, IsTotalConsiderForProgressReport, USListMarkssDetails }) => {
 const [data, setData] = useState<any>([]);
    const getListDisplayName = (ShortName) => {
        let returnVal = "";
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName === ShortName)
                returnVal = Item.DisplayName;
        });
        return returnVal;
    };
        // f() to control visibility of Test Type  Columns
        function showTestTypeDetails(subId) {
            let subMatchLength = data.ListSubjectidDetails.filter((itemFind) => itemFind.Subject_Id === subId).length
            let flag = false;
            if(subMatchLength === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true' ) {
                return false;
            } else if (subMatchLength === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
            } else if (subMatchLength > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                return true;
            }  else if (subMatchLength > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
            }      
        }
        function showTestTypeDetails1 () {
            let flag = false;
            if(data.ListTestTypeIdDetails?.length === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true' ) {
                return false;
            } else if (data.ListTestTypeIdDetails?.length === 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
            } else if (data.ListTestTypeIdDetails?.length > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                return true;
            }  else if (data.ListTestTypeIdDetails?.length > 1 && IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
            }      
        }
        function getColSpan(subId) {
            let colSpan = 1;
            let subMatchLength = data.ListSubjectidDetails.filter((itemFind) => itemFind.Subject_Id === subId).length
            if (IsTotalConsiderForProgressReport.toLowerCase() === "true") {
                colSpan = (showTestTypeDetails1() ? subMatchLength : 0) + (subMatchLength !== 1 && 1);  // 🚩
                return colSpan;
            } else if (IsTotalConsiderForProgressReport.toLowerCase() === "false") {
                colSpan = subMatchLength;
                return colSpan;
            }
        }
    function parentSubColSpan(parentSubId){
        let colSpan = 1;
        let filteredArr = data.listSubjectsDetails.filter((item) => item.Parent_Subject_Id === parentSubId);
          if(IsTotalConsiderForProgressReport.toLowerCase() === "true"){
            if(data.ListTestTypeIdDetails?.length === 1) {
                colSpan = (filteredArr.length) + (data.ListTestTypeIdDetails?.length + 1);  // 3 + ( 1 + 1 ) 
                return colSpan;
            } else {
                colSpan = (filteredArr.length + 1) * (data.ListTestTypeIdDetails?.length + 1);  // 3 + 1 * ( 1 + 1 ) 
                return colSpan;
            }
          } else if(IsTotalConsiderForProgressReport.toLowerCase() === "false"){
            colSpan = (filteredArr.length +1) * data.ListTestTypeIdDetails?.length;
            return colSpan;
          }
    }
    function findRow2() {
        return data.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // Handle undefined or empty Parent_Subject_Id
                return { ...item, Subject_Name: '', rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            } else {
                return { ...item, rowSpan: 1, colSpan: getColSpan(item.Subject_Id) };//3 };
            }
        });
    }
    
    function findRow1() {
        let ParentSubArr = [];
        let ans = [];
        
        data.listSubjectsDetails?.map((item) => {
            if (item.Parent_Subject_Id === '0') { // For top-level subjects
                ans.push({ ...item, rowSpan: 2, colSpan: getColSpan(item.Subject_Id) }); // Corrected push syntax //3
            } else if (!ParentSubArr.includes(item.Parent_Subject_Id)) { // For child subjects with unique Parent_Subject_Id
                ParentSubArr.push(item.Parent_Subject_Id);
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
        if (Object.keys(EntireDataList).length > 0) {
            setData(EntireDataList);
        }
    }, [EntireDataList]);

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

    function getRemarkForGradeCell(cellRemark) {
        // html element type
        let result: any;
        let remarkList = data?.ListDisplayNameDetails?.filter((item) => item.ShortName === cellRemark);
        if (remarkList?.length > 0) {
          result = <span style={{ color: `${remarkList[0]?.ForeColor}`, fontWeight: 'bold' }}>{remarkList[0]?.DisplayName}</span>;
        }
        return result;
      }

      let ThirdHeaderList = data.listSubjectsDetails?.map((item, i) => {
        let finalList = [];
        let filterList = data.ListSubjectidDetails.filter((item1) => item1.Subject_Id === item.Subject_Id);
        if(filterList.length > 1) {
                finalList =  filterList.map(item2 => finalList = item2.ShortenTestType_Name );
        }
        if(filterList.length === 1) {
            if(IsTotalConsiderForProgressReport.toLowerCase() === 'false' ) {
                finalList =  filterList.map(item2 => finalList = item2.ShortenTestType_Name );
            }
        }
        if(IsTotalConsiderForProgressReport.toLowerCase() === 'true'  && filterList.length > 0) {
            finalList.push('Total')
        }
        if (IsTotalConsiderForProgressReport.toLowerCase() === 'true'  && filterList.length === 0 && item.Is_CoCurricularActivity === 'True') {
            finalList.push('Grade')
        }
        if (IsTotalConsiderForProgressReport.toLowerCase() === 'false'  && filterList.length === 0 && item.Is_CoCurricularActivity === 'True') {
            finalList.push('Grade')
        }
        return finalList;
    })


    return (
        <Box >
            {USlistStudentsDetails.length > 0  ?
            <Table  aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                <TableHead>
                    {HeaderParent.length > 1 && (
                        <>
                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                    <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={0}>
                                        Subjects &#9654;
                                    </Typography>
                                    <Typography variant={"h3"} textAlign={'center'} color={"black"}>
                                        &#9660; Exam
                                    </Typography>
                                </TableCell>
                                {findRow1().map((item, index) => (
                                    <TableCell
                                        key={index}
                                        colSpan={item.Total_Consideration == 'N' ? 1 : item.colSpan} rowSpan={item.rowSpan}
                                        sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center', minWidth:'130px' }}
                                    >
                                        <Typography color="black" textAlign="center" mx={0}>
                                             <b style={{ marginRight: "0px" }}>
                                                 {item.Subject_Name} 
                                         {item.Is_CoCurricularActivity === "True" && (
                                              <span style={{ color: 'red' }}>*</span>
                                                   )}
                                                     </b>
                                                </Typography>

                                    </TableCell>
                                ))}
                                     {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                    <>
                                        <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                            <Typography color="black" textAlign={'center'} px={3}>
                                                <b>Total</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                            <Typography color="black" textAlign={'center'} px={1}>
                                                <b>%</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3} sx={{ py:1, minWidth:'140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`}} >
                                            <Typography color="black" textAlign={'center'} px={0}>
                                                <b>Grade</b>
                                            </Typography>
                                        </TableCell>

                                    </>}
                                    <>
                                    {isFailCriteria === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true'  &&
                                    <TableCell rowSpan={3} sx={{ py:1, minWidth:'140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`}} >
                                            <Typography color="black" textAlign={'center'} px={0}>
                                                <b>Result</b>
                                            </Typography>
                                        </TableCell>}
                                        {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                        <TableCell rowSpan={3} sx={{ py:1, minWidth:'140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`}} >
                                            <Typography color="black" textAlign={'center'} px={0}>
                                                <b>Rank</b>
                                            </Typography>
                                        </TableCell> }
                                    </>
                            </TableRow>
                            <TableRow sx={{ bgcolor: '#F0F0F0', textAlign: 'center' }}>
                                {findRow2()?.map((item, index) => (
                                    <>
                                        {index > 0 && findRow2()[index - 1].Parent_Subject_Id !== "0" && item.Parent_Subject_Id === '0' && (
                                            <>
                                            {/* IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&  */}
                                                {ListTestTypeIdDetails?.map((item1, i) => {
                                                    return (
                                                        <TableCell key={i} rowSpan={2}   sx={{py:1, minWidth:'120px',textAlign:'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`, }}>  
                                                        <Typography  textAlign={'center'} sx={{color:'black', fontWeight: '700' }}>Total {item1.Text2}</Typography></TableCell>
                                                    )
                                                })}
                                                {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                                    <TableCell rowSpan={2} sx={{py:1, textAlign:'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>  <Typography sx={{ fontWeight: '700' }} color="black" textAlign={'center'} mr={4}>Total</Typography></TableCell>}
                                            </>
                                        )}
                                         {item.Subject_Name !== '' &&
                                        <TableCell key={index} colSpan={item.colSpan} rowSpan={item.rowSpan} sx={{py:1, textAlign:'center', border: (theme) => `1px solid ${theme.palette.grey[400]}`,   }}>
                                            <Typography color="black" textAlign={'center'} mr={0}>
                                                <b style={{ marginRight: "5px" }}>{item.Subject_Name}
                                                {item.Is_CoCurricularActivity == "True" && (
                                              <span style={{ color: 'red' }}>*</span>
                                                   )}


                                                </b>


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
                            <TableCell rowSpan={2} sx={{py:1,border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                <Typography variant={"h3"} textAlign={'center'} color={"black"} ml={0}>
                                    Subjects &#9654;
                                </Typography>
                                <Typography variant={"h3"} textAlign={'center'} color={"black"}>
                                    &#9660; Exam
                                </Typography>
                            </TableCell>
                            {findRow1().map((item, index) => (
                                <TableCell key={index} colSpan={item.colSpan} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, textAlign: 'center', minWidth:'180px' }}>
                                    <Typography color="black" textAlign={'center'} mr={0}>
                                        <b style={{ marginRight: "5px" }}>{item.Subject_Name} 

                                        {item.Is_CoCurricularActivity == "True" && (
                                              <span style={{ color: 'red' }}>*</span>
                                                   )}
                                        </b>
                                    </Typography>
                                </TableCell>
                            ))}
                                   {IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                    <>
                                        <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                            <Typography color="black" textAlign={'center'} px={2}>
                                                <b>Total</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                            <Typography color="black" textAlign={'center'} px={2}>
                                                <b>%</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell rowSpan={3} sx={{py:1, border: (theme) => `1px solid ${theme.palette.grey[400]}`}}>
                                            <Typography color="black" textAlign={'center'} px={2} minWidth={'180px'} maxWidth={'auto'}>
                                                <b>Grade</b>
                                            </Typography>
                                        </TableCell>
                                    </>}
                                    <>
                                    {isFailCriteria === 'N' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                    <TableCell rowSpan={3} sx={{ py:1, minWidth:'140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`}} >
                                            <Typography color="black" textAlign={'center'} px={0}>
                                                <b>Result</b>
                                            </Typography>
                                        </TableCell>}
                                        {totalCount !== '0' && IsTotalConsiderForProgressReport.toLowerCase() === 'true' &&
                                        <TableCell rowSpan={3} sx={{ py:1, minWidth:'140px', border: (theme) => `1px solid ${theme.palette.grey[400]}`}} >
                                            <Typography color="black" textAlign={'center'} px={0}>
                                                <b>Rank</b>
                                            </Typography>
                                        </TableCell>}
                                    </>
                        </TableRow>
                    )}

                    <TableRow>
                        <>
                            {ThirdHeaderList?.length > 0 && ThirdHeaderList?.map((item7, index) => (
                                <>
                                    {item7.length > 0 && item7.map((header, h) => (
                                        <TableCell key={`${index}-${h}`} sx={{py:1, alignItems: 'center', minWidth: '120px', border: (theme) => `1px solid ${theme.palette.grey[400]}`, backgroundColor: blue[50] }}>
                                            <Typography color="#38548A" textAlign={'center'} >
                                                <b style={{ marginRight: "0px" }}>{header}</b>
                                            </Typography>
                                        </TableCell>
                                    ))
                                    }
                                </>
                            ))}
                        </>
                    </TableRow>
                </TableHead>

                {MarkDetailsList.map((testItem, i) => (
    <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center',  }}>
        <TableRow >
            <TableCell  sx={{py:1, minWidth:'300px', textAlign:'center', maxWidth:'100%',  border: (theme) => `1px solid ${theme.palette.grey[400]}`,  }}>
                <b>{testItem.TestName || '-'}</b>
            </TableCell>
            {testItem.MarksArr.map((MarkItem, index) => (
                <TableCell key={index} sx={{py:1, textAlign:'center', backgroundColor: 'white', border: (theme) => `1px solid ${theme.palette.grey[200]}`}} >
                      <span style={{ fontWeight: MarkItem?.IsGrades === 'Y'? 'bold' : 'normal' , color:`${MarkItem?.MarksScored == "Pass" ? 'green' :  MarkItem?.MarksScored == "Fail" ? "red" : 'inherit'}`  }}>
                    {MarkItem == null || MarkItem?.MarksScored == ''
                        ? '-'   
                        : (MarkItem?.IsAbsent !== 'N'
                            ? getRemarkForGradeCell(MarkItem.IsAbsent)
                            : (MarkItem?.MarksScored == null || MarkItem?.TotalMarks == null
                                ? '-'
                                : MarkItem?.MarksScored + (MarkItem.TotalMarks === "-" ? "" : (" / " + MarkItem.TotalMarks))
                            )
                        )
                    }
                    </span>
                </TableCell>
            ))}
        </TableRow>
    </TableBody>
))}

            </Table> : <span></span>
            

            
            
            }



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
