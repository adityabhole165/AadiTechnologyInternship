import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ViewResultAllTable = ({ stdFinalResult, key, IsTotalConsiderForProgressReport, ToppersCount }: any) => {
    const [ViewProgress, setViewProgress] = useState<any>([]);
    const [SubjectDetailsView, setSubjectDetailsView] = useState<any>([]);
    const [MarkDetailsView, setMarkDetailsView] = useState<any>([]);
    const [GradesDetailsView, setGradesDetailsView] = useState<any>([]);
    const [PercentageDetails, setPercentageDetails] = useState<any>([]);
    const [TotalPerGradeView, setTotalPerGradeView] = useState<any>([]);
    const [totalconsidration, setTotalconsidration] = useState<any>([]);
    const [showOnlyGrades, setShowOnlyGrades] = useState<any>();
    const [hasTopRanks, setHasTopRanks] = useState<any>();

    // useEffects();
    //--
    useEffect(() => {
        if (TotalPerGradeView) {
            setHasTopRanks(TotalPerGradeView.some((item) => [1, 2, 3].includes(item.rank)));
        }
    }, [TotalPerGradeView]);
    //--
    useEffect(() => {
        if (stdFinalResult) {
            dataFormatter(stdFinalResult);
        }
        console.log('deltas', stdFinalResult);
    }, [stdFinalResult]);
    // --
    useEffect(() => {
        if (SubjectDetailsView) {
            const result = SubjectDetailsView.filter((item) => item.Total_Consideration === "N");
            setTotalconsidration(result);
        }
    }, [SubjectDetailsView]);

    // print > IsTotalConsiderForProgressReport showOnlyGrades
    useEffect(() => {
        console.log('IsTotalConsiderForProgressReport', IsTotalConsiderForProgressReport);
        console.log('showOnlyGrades', showOnlyGrades);
    }, [IsTotalConsiderForProgressReport, showOnlyGrades]);

    // Data Formatter Function which takes Every mapped object of parent Comp. mapped Arr. and formats
    // data same like request code but locally in component.

    const dataFormatter = (data: any) => {
        const response = { data: data };

        //--
        let abc = response.data.listStudentDetail.map((item, i) => {
            return {
                Id: item.YearWise_Student_Id,
                Text1: item.Student_Name,
                Text2: item.Roll_No,
                Text3: item.Standard_Name,
                Text4: item.Division_Name,
                Text5: item.Academic_Year,
                Text6: item.School_Name,
                Text7: item.School_Orgn_Name,
                ShowOnlyGrades: item.ShowOnlyGrades,
                IsFailCriteriaNotApplicable: item.IsFailCriteriaNotApplicable
            };
        });
        // Data 1st Arr.
        setViewProgress(abc);

        //--
        let Subject = [];
        response.data.listSubjectDetails.map((item, i) => {
            Subject.push({
                Id: item.Subject_Id,
                Name: item.Subject_Name,
                Value: item.Subject_Id,
                IsAbsent: item.IsAbsent,
                Total_Consideration: item.Total_Consideration
            });
        });
        // Data 2nd Arr.
        setSubjectDetailsView(Subject);

        //--
        let Marks = [{ Id: '0', Name: 'Marks', Value: '0', IsAbsent: '0' }];
        response.data.listSubjectDetails.map((item, i) => {
            const marksScored = item.Marks_Scored.includes('.0') ? parseFloat(item.Marks_Scored) : item.Marks_Scored;
            Marks.push({
                Id: item.Subject_Id,
                Name: `${marksScored} / ${item.Subject_Total_Marks}`,
                Value: item.Subject_Id,
                IsAbsent: item.IsAbsent
            });
        });
        // Data 3rd Arr.
        setMarkDetailsView(Marks);

        //--
        let grades = [{ Id: '0', Name: 'Subject Grade', Value: '0', IsAbsent: '0' }];
        response.data.listSubjectDetails.map((item, i) => {
            grades.push({
                Id: item.Subject_Id,
                Name: item.Grade,
                Value: item.Subject_Id,
                IsAbsent: item.IsAbsent
            });
        });
        // Data 4th Arr.
        setGradesDetailsView(grades);

        //--
        let Total = response.data.listMarksDetails.map((item, i) => {
            const totalmarksScored = item.Total_Marks_Scored.includes('.0') ? parseFloat(item.Total_Marks_Scored) : item.Total_Marks_Scored;
            return {
                TotalMarks: `${totalmarksScored} / ${item.Subjects_Total_Marks}`,
                GradeName: item.Grade_Name,
                Percentage: item.Percentage,
                Grade_id: item.Grade_id,
                Result: item.Result.trim() ? item.Result.trim() : "-",
                rank: item.rank.trim() ? item.rank.trim() : "-",
            };
        });
        //--
        let PerCentDetails = response.data.listParcentageDetails.map((item, i) => {
            return {
                TotalMarks: item.Range,
                Grade: item.Grade,
                Remarks: item.Remarks,
                GradeConfId: item.Marks_Grades_Configuration_Detail_ID
            };
        });

        // Data 5th Arr. & 6th Arr.
        setPercentageDetails(PerCentDetails);
        setTotalPerGradeView(Total);
        setShowOnlyGrades(ViewProgress.filter((item) => item.ShowOnlyGrades.trim() === 'true').length > 0 ? true : false);
    }

    return (
        <>
            {stdFinalResult?.listMarksDetails?.length > 0 ?
                <>
                    <Box key={key} sx={{ mt: 2, background: 'white', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                        <Box>
                            {ViewProgress.length > 0 && (
                                <>
                                    <Typography variant="h4" textAlign={'center'} color={'primary'} mt={1} mb={1}>
                                        {ViewProgress[0].Text7}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h3" textAlign={'center'} color={'black'} mb={1}>
                                        {ViewProgress[0].Text6}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h4" textAlign={'center'} color={'black'} pb={1}>
                                        Final Result
                                    </Typography>
                                </>
                            )}

                            <Table>
                                <TableBody>
                                    {ViewProgress.map((item, i) => {
                                        return (
                                            <TableRow sx={{ bgcolor: '#38548A' }} key={i}>
                                                <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Roll No: <b>{item.Text2}</b></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Name: <b>{item.Text1}</b></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Class: <b>{item.Text3} - {item.Text4}</b></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Year: <b>{item.Text5}</b></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
                                    {totalconsidration.length > 0 && (
                                        <>
                                            <TableRow sx={{ bgcolor: 'white', p: 2 }}>
                                                <TableCell sx={{ pl: 10, py: 1, }}><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks. </TableCell>
                                            </TableRow>
                                        </>
                                    )}

                                </TableBody>
                            </Table>
                            <Box sx={{ overflowX: 'auto', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                <Table sx={{}}>
                                    <TableBody >
                                        <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                <Typography variant={"h4"} textAlign={'center'} color={"black"} ml={2}>
                                                    Subjects
                                                </Typography>
                                            </TableCell>
                                            {SubjectDetailsView.map((subject, i) => (

                                                <TableCell key={subject.Subject_Id} sx={{ py: 1, textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}><b>{subject.Name}  </b>
                                                    {(subject.Total_Consideration === "N") && <span style={{ color: 'red' }}>*</span>}
                                                </TableCell>
                                            ))}
                                            {IsTotalConsiderForProgressReport === "True" && !showOnlyGrades && (
                                                <>
                                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Total</TableCell>
                                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>%</TableCell>
                                                </>
                                            )}
                                            {IsTotalConsiderForProgressReport === "True" && (
                                                <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                                            )}
                                            {ToppersCount === 3 && hasTopRanks && (
                                                <TableCell
                                                    sx={{
                                                        py: 1,
                                                        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    Rank
                                                </TableCell>
                                            )}
                                            {ViewProgress.some((item) => item?.IsFailCriteriaNotApplicable === "N") && (
                                                <TableCell
                                                    sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}
                                                >
                                                    Result
                                                </TableCell>
                                            )}
                                        </TableRow>

                                        <TableRow>
                                            <>
                                                {/* <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                                Marks
                                                            </Typography>
                                                        </TableCell> */}
                                                <>
                                                    {MarkDetailsView.map((marks, i) => (
                                                        <TableCell
                                                            key={i}
                                                            sx={{
                                                                py: 1,
                                                                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {marks?.Name ? (marks.IsAbsent === '1' ? '-' : marks.Name) : '-'}
                                                        </TableCell>
                                                    ))}

                                                    {showOnlyGrades && (
                                                        <TableCell
                                                            sx={{
                                                                py: 1,
                                                                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            -
                                                        </TableCell>
                                                    )}
                                                </>

                                                {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && TotalPerGradeView.map((totalData, index) => {
                                                    if (index === 0) {
                                                        const matchingRemark = PercentageDetails?.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                        return (
                                                            <>
                                                                <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}>{totalData.TotalMarks}</TableCell>
                                                                <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}>{totalData.Percentage}%</TableCell>
                                                                <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }} >
                                                                    <Typography variant="body2">
                                                                        <Typography component="span" fontWeight="bold">
                                                                            {totalData.GradeName}
                                                                        </Typography>
                                                                        {matchingRemark && ` (${matchingRemark})`}
                                                                    </Typography>
                                                                </TableCell>

                                                            </>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                {ViewProgress.some((item) => item.IsFailCriteriaNotApplicable === "N") && TotalPerGradeView.map((resultData, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <TableCell
                                                                key={index}
                                                                sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold', color: `${resultData.Result.trim() == "Pass" ? 'green' : resultData.Result.trim() == "Fail" ? "red" : 'inherit'}` }}
                                                            >
                                                                {resultData.Result.trim() ? resultData.Result.trim() : '-'}
                                                            </TableCell>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </>

                                        </TableRow>
                                        {/* <TableRow>
                                                {MarkDetailsView.map((subject, i) => (
                                                    <TableCell key={i} align="center">  {subject.IsAbsent === '1' ? '-' : subject.Name}</TableCell>
                                                ))}
                                            </TableRow> */}
                                        <TableRow>
                                            {/* {GradesDetailsView.map((Grade, i) => (
                                                    <TableCell key={i} align="center"> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                                ))} */}
                                            {GradesDetailsView.map((Grade, i) => (
                                                <TableCell key={i} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                            ))}
                                            {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                <>
                                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                </>
                                            )}
                                            {showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                <>
                                                    {TotalPerGradeView.map((totalData, index) => {
                                                        if (index === 0) {
                                                            const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                            return (
                                                                <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }} >
                                                                    <Typography variant="body2">
                                                                        <Typography component="span" fontWeight="bold">
                                                                            {totalData.GradeName}
                                                                        </Typography>
                                                                        {matchingRemark && ` (${matchingRemark})`}
                                                                    </Typography>
                                                                </TableCell>
                                                            );
                                                        }
                                                        return null;
                                                    })}

                                                    {ViewProgress.some((item) => item.IsFailCriteriaNotApplicable === "N") && TotalPerGradeView.map((resultData, index) => {
                                                        if (index === 0) {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold', color: `${resultData.Result.trim() == "Pass" ? 'green' : resultData.Result.trim() == "Fail" ? "red" : 'inherit'}` }}
                                                                >
                                                                    {resultData.Result.trim() ? resultData.Result.trim() : '-'}
                                                                </TableCell>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </>
                                            )}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', my: 4, borderTop: '1px dotted black' }} />
                </>
                :
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" fontWeight="bold" sx={{ backgroundColor: '#324b84', color: 'white', padding: '8px 16px', mt: 4 }}>
                            Result not generated for this student : {stdFinalResult?.listStudentDetail[0]?.Roll_No} - {stdFinalResult?.listStudentDetail[0]?.Student_Name}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', my: 4, borderTop: '1px dotted black' }} />
                </>
            }
        </>
    )
}

export default ViewResultAllTable