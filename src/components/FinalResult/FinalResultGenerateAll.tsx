import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    IGetStudentPrrogressReportBody, IUpdateStudentTestMarksBody, IViewBody
} from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import {
    StudentDetailsGA,
    UpdateStudentTestMarks, ViewResultGA
} from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const GenerateAll = ({ }) => {
    const [isResultGenerated, setIsResultGenerated] = useState(false); // State to track result generation
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { asStudentId, isGenerated, IsView } = useParams();
    //console.log("asStudentId", asStudentId);

    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const [Itemlist, setItemlist] = useState([]);

    const StudentDetailsUS = useSelector((state: RootState) => state.FinalResultGenerateAll.getStudentDetails);
    const ExamDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getExamDetails);
    const TestMarksDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getTestMarksGA);
    const SubjectDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetails);
    // console.log(SubjectDetails, 'SubjectDetails');
    const MarkDetailsList = useSelector((state: RootState) => state.FinalResultGenerateAll.MarkDetailsList);
    const HeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.HeaderArray);
    const SubHeaderArray = useSelector((state: RootState) => state.FinalResultGenerateAll.SubHeaderArray);
    const ShortenTestDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getShortenTestDetails);
    const ListDisplayNameDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.ListDisplayNameDetails);
    console.log(ListDisplayNameDetails, "rows");

    const ViewProgress = useSelector((state: RootState) => state.FinalResultGenerateAll.getViewResult);
    const MarkDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView);
    const SubjectDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView);
    const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);
    const showOnlyGrades = ViewProgress.some((item) => item.ShowOnlyGrades.trim() === 'true');
    const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
    const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
    const TotalPerGradeView = useSelector((state: RootState) => state.FinalResultGenerateAll.getTotalPerGradeView);
    const PercentageDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getPerDetails);
    const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');

    useEffect(() => {
        if (UsGetSchoolSettings != null)
            setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
    }, [UsGetSchoolSettings])

    const getListDisplayName = (ShortName) => {
        let returnVal = ""
        ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == ShortName)
                returnVal = Item.DisplayName
        })
        return returnVal

    }
    useEffect(() => {
        const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
            asSchoolId: Number(asSchoolId),
            asAcadmeicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asUserId: Number(asUserId)
        };
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody));
    }, []);

    useEffect(() => {
        const GetViewResultBody: IViewBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asWithGrace: 0,
        };
        dispatch(ViewResultGA(GetViewResultBody));
    }, []);

    const GetSchoolSettings: GetSchoolSettingsBody = {
        asSchoolId: Number(asSchoolId),
    };
    useEffect(() => {
        dispatch(CDAGetSchoolSettings(GetSchoolSettings));
    }, []);
    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/FinalResult');
    };

    const getXML = () => {
        let sXML =
            '<SchoolWiseStudentTestMarksDetails>';
        Itemlist.map((Item) => {
            sXML =
                sXML +
                '<SchoolWiseStudentTestMarksDetail >' +
                '<School_Id>' + asSchoolId + '</School_Id>' +
                '<Academic_Year_Id=>' + asAcadmeicYearId + '</Academic_Year_Id=>' +
                '<Student_Id>' + Item.Student_Id + '</Student_Id>' +
                '<TestWise_Subject_Marks_Id>' + Item.TestWise_Subject_Marks_Id + '</TestWise_Subject_Marks_Id>' +
                '<SchoolWise_Student_Test_Marks_Id>' + Item.SchoolWise_Student_Test_Marks_Id + '</SchoolWise_Student_Test_Marks_Id>' +
                '<TestType_Id>' + Item.TestType_Id + '</TestType_Id>' +
                '<Marks_Scored>' + Item.Marks_Scored + '</Marks_Scored> ' +
                '<Assigned_Grade_Id>' + Item.Grade_id + '</Assigned_Grade_Id> ' +
                '/>';
        });

        sXML = sXML + '</SchoolWiseStudentTestMarksDetails>';
        return sXML;
    };

    const onSaveGenerate = () => {
        const UpdateStudentTestMarksBody: IUpdateStudentTestMarksBody = {
            asschoolId: Number(asSchoolId),
            asStudentMarkDetails: getXML(),
            asUpdatedById: 0,
            asUseAvarageFinalResult: ""
        };
        dispatch(UpdateStudentTestMarks(UpdateStudentTestMarksBody));
        setIsResultGenerated(true); // Set the result as generated

    };

    // const handleVisibilityClick = () => {
    //     setShowProgressReport(!showProgressReport); // Toggle visibility
    // }

    const getStudentGrade = () => {
        let returnVal = true
        TestMarksDetails.map((item) => {
            if (item.Grade == 'Absent') {
                returnVal = false
            }
            else {
                returnVal = true
            }
        })
        return returnVal
    }
    const Grade = getStudentGrade();

    const getstandardDivId = () => {

        let returnVal = ''
        StudentDetailsUS.map((item, i) => {
            returnVal = item.standardDivId
        })
        return returnVal
    }

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/extended-sidebar/Teacher/FinalResult/' + getstandardDivId()
                    },
                    {
                        title: 'Generate/View Final Result',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Box>
                            <Tooltip title={"View result of selected student."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        '&:hover': {
                                            backgroundColor: grey[600]
                                        }
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>                    </>
                }
            />
            {StudentDetailsUS && (

                //  {showProgressReport && (
                <div >
                    {(IsView == 'false' && isGenerated) && (
                        <div>
                            <Box sx={{ background: 'white' }}>
                                <Box>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"primary"}>
                                        Pawar Public Charitable Trust's
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h3"} textAlign={'center'} color={"black"} mb={1}>
                                        PAWAR PUBLIC SCHOOL
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"black"} pb={1}>
                                        Progress Report
                                    </Typography>
                                    <Table>
                                        <TableBody>
                                            {StudentDetailsUS.map((item, i) => {
                                                return (
                                                    <TableRow sx={{ bgcolor: '#38548A' }} key={i}>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: {item.Text2}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: {item.Text1}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: {item.Text3} - {item.Text4}</b></TableCell>
                                                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: {item.Text5}</b></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    <Box sx={{ overflowX: 'auto', border: 1 }}>
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
                                                    {/* {SubjectDetails.map((item) => ( */}
                                                    {HeaderArray.map((item) => (
                                                        // <TableCell><b>{item.Name}</b></TableCell>
                                                        <TableCell colSpan={item.colSpan}>
                                                            <Typography color="black" textAlign={'left'} mr={5}  >
                                                                <b style={{ marginRight: "5px" }}>{item.SubjectName}</b>
                                                            </Typography></TableCell>
                                                    ))}
                                                </TableRow>
                                                <TableRow>
                                                    {/* {ShortenTestDetails.map((item) => ( */}
                                                    {SubHeaderArray.map((item) => (
                                                        <TableCell >
                                                            <Typography color="#38548A" textAlign={'center'} mr={9}  >
                                                                <b style={{ marginRight: "5px" }}>{item.TestTypeName}</b>
                                                            </Typography>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            {MarkDetailsList.map((testItem, i) => (
                                                <TableBody key={i} sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                                                    <TableRow>
                                                        <TableRow sx={{}}>
                                                            <b> {testItem.TestName}</b>
                                                        </TableRow>

                                                        {testItem.MarksArr.map((MarkItem) => (
                                                            <TableCell sx={{ backgroundColor: 'white' }}>
                                                                {
                                                                    MarkItem.IsAbsent == "N" ?
                                                                        MarkItem.MarksScored + " / " + MarkItem.TotalMarks :
                                                                        MarkItem.IsAbsent == "Y" ?
                                                                            <TextField></TextField>
                                                                            :
                                                                            getListDisplayName(MarkItem.IsAbsent)}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableBody>
                                            ))}
                                        </Table>
                                    </Box>

                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    onClick={onSaveGenerate}
                                    // variant="contained"
                                    // color="error"
                                    sx={{
                                        color: 'green',
                                        //   backgroundColor: green[500],
                                        '&:hover': {
                                            color: 'green',
                                            backgroundColor: green[100]
                                        }
                                    }}
                                >
                                    Save & Generate Result
                                </Button>
                            </Box>
                        </div>
                    )}
                    {(isResultGenerated || isGenerated == 'Y') && ( // Conditionally display the final result section
                        <Box sx={{ mt: 2, background: 'white' }}>
                            <Box>
                                <hr />
                                {ViewProgress.length > 0 && (
                                    <>
                                        <Typography variant="h4" textAlign={'center'} color={'primary'} mb={1}>
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
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Roll No: <b>{item.Text2}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Name: <b>{item.Text1}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Class: <b>{item.Text3} - {item.Text4}</b></TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: 'white' }}>Year: <b>{item.Text5}</b></TableCell>
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
                                                    <TableCell sx={{ pl: 10 }}><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks </TableCell>
                                                </TableRow>
                                            </>
                                        )}

                                    </TableBody>
                                </Table>
                                <Box sx={{ overflowX: 'auto', border: 1 }}>
                                    <Table >
                                        <TableBody >
                                            <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                                                <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={2} ml={2}>
                                                    Subjects
                                                </Typography>
                                                {SubjectDetailsView.map((subject, i) => (

                                                    <TableCell key={subject.Subject_Id} sx={{ textAlign: 'center' }}><b>{subject.Name}  </b>
                                                        {(subject.Total_Consideration === "N") && <span style={{ color: 'red' }}>*</span>}
                                                    </TableCell>
                                                ))}
                                                {IsTotalConsiderForProgressReport === "True" && !showOnlyGrades && (
                                                    <>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Total</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>%</TableCell>
                                                    </>
                                                )}
                                                {IsTotalConsiderForProgressReport === "True" && (
                                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                                                )}
                                            </TableRow>

                                            <TableRow>
                                                {!showOnlyGrades && (
                                                    <>
                                                        {/* <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                                Marks
                                                            </Typography>
                                                        </TableCell> */}

                                                        {MarkDetailsView.map((marks, i) => (
                                                            <TableCell key={i} sx={{ textAlign: 'center' }}>
                                                                {marks.IsAbsent === '1' ? '-' : marks.Name}
                                                            </TableCell>
                                                        ))}

                                                        {IsTotalConsiderForProgressReport === "True" && TotalPerGradeView.map((totalData, index) => {
                                                            if (index === 0) {
                                                                const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                                return (
                                                                    <>
                                                                        <TableCell sx={{ textAlign: 'center' }}>{totalData.TotalMarks}</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center' }}>{totalData.Percentage}%</TableCell>
                                                                        <TableCell sx={{ textAlign: 'center' }}>
                                                                            <Typography variant="body2">
                                                                                {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </>
                                                )}
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
                                                    <TableCell key={i} sx={{ textAlign: 'center' }}> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                                ))}
                                                {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                    <>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                                    </>
                                                )}
                                                {showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                                    <>
                                                        {TotalPerGradeView.map((totalData, index) => {
                                                            if (index === 0) {
                                                                const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                                return (
                                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                                        <Typography variant="body2">
                                                                            {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                                                        </Typography>
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
                    )}
                </div>
            )
            }

            {
                !StudentDetailsUS && (
                    <Box>
                        {StudentDetailsUS.map((item, i) => (
                            <Typography key={i}>
                                Progress Report is not available for the student:{item.Text2} {item.Text1}
                            </Typography>
                        ))}
                    </Box>
                )
            }
        </Box >

    );
};

export default GenerateAll;
