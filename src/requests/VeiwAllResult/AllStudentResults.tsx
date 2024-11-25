import { InfoOutlined } from "@mui/icons-material";
import { Alert, Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const AllStdResult = ({ dataList, index, isTotalConsider, isConfigured, isExamUnPublished }) => {
    // useState
    const [PerCentDetails, setPerCentDetails] = useState([]);
    const [Total, setTotal] = useState([]);
    const [Grades, setGrades] = useState([]);
    const [subject, setSubject] = useState([]);
    const [MarkList, setMarkList] = useState([]);
    const [StudentListAll, setStudentListAll] = useState([]);
    const [open, setOpen] = useState(false);
    let totalconsidration = [];
    let showOnlyGrades = undefined;

    useEffect(() => {
        if (Object.keys(dataList).length > 0) {
            GetsingleStudentResultVA(dataList);
        }
    }, [dataList])

    const GetsingleStudentResultVA = (dataValue) => {
        const response = dataValue;
        console.log(response, "response 🚩");

        // console.log(response, "respons");

        let StudentListAll = response?.listStudentDetail.map((item, i) => {
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
            // console.log(StudentListAll,"showonlygradess");

        });
        let MarkList = response?.listSubjectDetails?.map((item, i) => {
            const marksScored = item.Marks_Scored?.includes('.0') ? parseInt(item.Marks_Scored) : item.Marks_Scored;
            return {
                Id: item.Subject_Id,
                Name: `${marksScored} / ${item.Subject_Total_Marks}`,
                Value: item.Subject_Id
            };
        });
        let subject = response?.listSubjectDetails?.map((item, i) => {
            return {
                Id: item.Subject_Id,
                Name: item.Subject_Name,
                Value: item.Grade,
                Total_Consideration: item.Total_Consideration

            };
        });
        let Grades = response?.listSubjectDetails?.map((item, i) => {
            return {
                Id: item.ID_Num,
                Name: item.Grade,
                Value: item.Grade
            };
        });
        let Total = response?.listMarksDetails?.map((item, i) => {
            const totalmarksScored = item.Total_Marks_Scored.includes('.0') ? parseInt(item.Total_Marks_Scored) : item.Total_Marks_Scored;
            return {
                TotalMarks: `${totalmarksScored} / ${item.Subjects_Total_Marks}`,
                GradeName: item.Grade_Name,
                Percentage: item.Percentage,
                Grade_id: item.Grade_id,
                Result: item.Result,
            };
        });
        let PerCentDetails = response?.listParcentageDetails?.map((item, i) => {
            return {
                TotalMarks: item.Range,
                Grade: item.Grade,
                Remarks: item.Remarks,
                GradeConfId: item.Marks_Grades_Configuration_Detail_ID
            };
        });
        // dispatch(VeiwResultSlice.actions.PercentDetails(PerCentDetails));
        // give useState for all below
        // dispatch(VeiwResultSlice.actions.TotalPerGradeView(Total));
        // dispatch(VeiwResultSlice.actions.GradesDetailsView(Grades));
        // dispatch(VeiwResultSlice.actions.SubjectDetailsView(subject));
        // dispatch(VeiwResultSlice.actions.MarkDetailsView(MarkList));
        // dispatch(VeiwResultSlice.actions.singleStudentResultList(StudentListAll));
        // console.log(StudentListAll, 'StudentListnamealll');
        setPerCentDetails(PerCentDetails);
        setTotal(Total);
        setGrades(Grades);
        setSubject(subject);
        setMarkList(MarkList);
        setStudentListAll(StudentListAll);
        totalconsidration = subject?.filter((item) => item.Total_Consideration === "N");
        showOnlyGrades = StudentListAll?.some((item) => item.ShowOnlyGrades.trim() === 'true');
        console.log(PerCentDetails, 'PerCentDetails');
        console.log(Total, 'Total');
        console.log(Grades, 'Grades');
        console.log(subject, 'subject');
        console.log(MarkList, 'MarkList');
        console.log(StudentListAll, 'StudentListAll');
        console.log(totalconsidration, 'totalconsidration');
        console.log(showOnlyGrades, 'showOnlyGrades');
        setOpen(true);


    };

    return (
        <> {open && (
            <Box >
                {5 > 0 ? (
                    <Box>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <hr />
                            {StudentListAll?.length > 0 && (
                                <>
                                    <Typography variant="h4" textAlign={'center'} color={'primary'} mb={1}>
                                        {StudentListAll[0].Text7}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h3" textAlign={'center'} color={'black'} mb={1}>
                                        {StudentListAll[0].Text6}
                                    </Typography>
                                    <hr />
                                    <Typography variant="h4" textAlign={'center'} color={'black'} pb={1}>
                                        Final Result
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <Table>
                            <TableBody>
                                {StudentListAll?.map((item) => (
                                    <TableRow key={item.id} sx={{ bgcolor: '#38548A' }}>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {item.Text2} </b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name :  {item.Text1} </b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {item.Text3} - {item.Text4} </b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {item.Text5} </b></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Table>
                            <TableBody>
                                {totalconsidration.length > 0 && (
                                    <>
                                        <TableRow sx={{ bgcolor: 'white', p: 2, }}>
                                            <TableCell><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks </TableCell>
                                        </TableRow>
                                    </>
                                )}

                            </TableBody>
                        </Table>

                        <Box sx={{ overflowX: 'auto' }}>
                            <Table>
                                <TableBody>
                                    <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                        <TableCell sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={1} ml={1}>
                                                Subjects
                                            </Typography>
                                        </TableCell>
                                        {subject?.map((subject) => (
                                            <TableCell key={subject.Subject_Id} sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                <b>{subject.Name}</b>
                                                {subject.Total_Consideration === "N" && <span style={{ color: 'red' }}>*</span>}
                                            </TableCell>
                                        ))}

                                        {isTotalConsider === "True" && !showOnlyGrades && (
                                            <>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>Total</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>%</TableCell>
                                            </>
                                        )}
                                        {isTotalConsider === "True" && (
                                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>Grade</TableCell>
                                        )}
                                        {StudentListAll?.some((item) => item.IsFailCriteriaNotApplicable === "N") && (
                                            <TableCell
                                                sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}
                                            >
                                                Result
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {!showOnlyGrades && (
                                            <>
                                                <TableCell sx={{ backgroundColor: '#F0F0F0', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                                    <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                        Marks
                                                    </Typography>
                                                </TableCell>

                                                {MarkList?.map((marks) => (
                                                    <TableCell key={marks.Name} sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
                                                        {marks.Name}
                                                    </TableCell>
                                                ))}

                                                {isTotalConsider === "True" && Total.map((totalData, index) => {
                                                    if (index === 0) {
                                                        const matchingRemark = PerCentDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                        return (
                                                            <>
                                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>{totalData.TotalMarks}</TableCell>
                                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>{totalData.Percentage}%</TableCell>
                                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
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
                                                {StudentListAll?.some((item) => item.IsFailCriteriaNotApplicable === "N") && Total.map((resultData, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <TableCell
                                                                key={index}
                                                                sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}
                                                            >
                                                                {resultData.Result || '-'}
                                                            </TableCell>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#F0F0F0', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                Subject Grade
                                            </Typography>
                                        </TableCell>
                                        {Grades?.map((Grade) => (
                                            <TableCell key={Grade.Name} sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>{Grade.Name}</TableCell>
                                        ))}
                                        {!showOnlyGrades && isTotalConsider === "True" && (
                                            <>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>-</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>-</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>-</TableCell>
                                            </>
                                        )}
                                        {showOnlyGrades && isTotalConsider === "True" && (
                                            <>
                                                {Total.map((totalData, index) => {
                                                    if (index === 0) {
                                                        const matchingRemark = PerCentDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                        return (
                                                            <TableCell sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
                                                                <Typography variant="body2">
                                                                    {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                                                </Typography>
                                                            </TableCell>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                {StudentListAll.some((item) => item.IsFailCriteriaNotApplicable === "N") && Total.map((resultData, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <TableCell
                                                                key={index}
                                                                sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}
                                                            >
                                                                {'-'}
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

                        <Typography variant={"h6"} textAlign={'center'} color={"primary"} mb={0}>
                            {isConfigured == 0 ? (
                                <div>
                                    {isExamUnPublished.length > 0 && (
                                        <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
                                            <b style={{ color: 'blue' }}> All configured exams are not published - {isExamUnPublished.map((item) => item.SchoolWise_Test_Name).join(', ')}</b>
                                        </Alert>
                                    )}
                                </div>
                            ) : (
                                <span> </span>
                            )}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>Result not generated for this student :  {StudentListAll?.length > 0 && StudentListAll[0]?.Text1}</b>
                    </Typography>
                )}
            </Box>)}

        </>
    )
}

export default AllStdResult;