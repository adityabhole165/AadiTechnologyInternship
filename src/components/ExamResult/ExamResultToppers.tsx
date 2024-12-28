import {
    Box,
    Grid,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    IGetClassDropdownBodyCT,
    IGetClassSubjectDropdownBodyCT,
    IGetClassToppersListBOdyCT,
    IGetStandardDropdownBodyST,
    IGetStandardExamDropdownBodyST,
    IGetStandardToppersListBOdyST,
    IGetSubjectDropdownBodyST,
    IGetexamDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
import GoldMedal from '../../assets/img/medals/gold-medal.png';
import SilverMedal from '../../assets/img/medals/silver-medal.png';

import {
    ClassExamListCT,
    ClassSubjectListCT,
    ClassTopperListCT,
    ClassdropdownListCT,
    StandardDropdownListST,
    StandardExamListST,
    StandardSubjectListST,
    StandardTopperListST
} from 'src/requests/ExamResult/RequestExamResultToppers';


import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { RootState, useDispatch } from 'src/store';
import { decodeURL, getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { StyledTableCell, StyledTableRow } from '../DataTable';

const ExamResultToppers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {
        TeacherId,
        StandardDivisionId,
        TestId,
        standardId,
        examtopperProp,
        IsReadOnly
    } = useParams();

    // Decode in-place
    TeacherId = decodeURL(TeacherId);
    StandardDivisionId = decodeURL(StandardDivisionId);
    TestId = decodeURL(TestId);
    standardId = decodeURL(standardId);
    examtopperProp = decodeURL(examtopperProp);
    IsReadOnly = decodeURL(IsReadOnly);

    //console.log(standardId, 'sssssssstandardId');


    const [SelectClassCT, setClassCT] = useState(StandardDivisionId);
    const [SelectExamCT, setExamCT] = useState(TestId);
    const [SelectSubjectCT, setSubjectCT] = useState('0');
    const [StandardRadioCT, setStandardRadioCT] = useState();
    const [SelectStandardST, setStandardST] = useState(standardId);
    const [SelectExamST, setExamST] = useState('0');
    const [SelectSubjectST, setSubjectST] = useState('0');
    const [showScreenOne, setShowScreenOne] = useState(true);
    const [radioBtn, setRadioBtn] = useState('1');

    const SchoolConfiguration = JSON.parse(sessionStorage.getItem('SchoolConfiguration'));
    const ScreensAccessPermission = JSON.parse(
        sessionStorage.getItem('ScreensAccessPermission')
    );
    const [HighlightStudentId, setHighlightStudentId] = useState('0')
    let CanEdit = getSchoolConfigurations(78)

    const RadioListCT = [
        { Value: '1', Name: 'Class Toppers' },
        { Value: '2', Name: 'Standard Toppers' }
    ];

    const HeaderListCT = ['Rank', 'Roll No.', 'Student Name', 'Marks'];
    const HeaderList1CT = ['Roll No.', 'Student Name'];
    const HeaderListST = ['Rank', 'Class', 'Roll No.', 'Student Name', 'Marks'];
    const HeaderList1ST = ['Roll No.', 'Class', 'Student Name'];


    const data = [
        {
            rank: "1",
            students: [
                {
                    rank: "1",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "1",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "1",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "1",
                    rollNo: 3,
                    studentName: "Student Name",
                },
            ]
        },
        {
            rank: "2",
            students: [
                {
                    rank: "2",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "2",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "2",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "2",
                    rollNo: 3,
                    studentName: "Student Name",
                },
            ]
        },
        {
            rank: "3",
            students: [
                {
                    rank: "3",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "3",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "3",
                    rollNo: 3,
                    studentName: "Student Name",
                },
                {
                    rank: "3",
                    rollNo: 3,
                    studentName: "Student Name",
                },
            ]
        },
    ];


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asTeacherId = Number(sessionStorage.getItem('TeacherId'));
    const Note: string =
        'Display the first three class / standard toppers as well as subject toppers of your class / standard for the selected exam';
    const GetClassdropdownCT = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassDropdownListCT
    );
    const GetExamdropdownCT = useSelector(
        (state: RootState) => state.ExamResultToppers.ExamDropdownListCT
    );
    const GetSubjectdropdownCT: any = useSelector(
        (state: RootState) => state.ExamResultToppers.SubjectDropdownListCT
    );
    const GetClassToppersListCT = useSelector(
        (state: RootState) => state.ExamResultToppers.ClassToppersCT
    );
    const GetSubjectToppersListCT = useSelector(
        (state: RootState) => state.ExamResultToppers.SubjectToppersCT
    );
    //console.log(GetSubjectToppersListCT, 'aaaaaaaaaaaaaa')

    const GetStandarddropdownST = useSelector(
        (state: RootState) => state.ExamResultToppers.StandardDropdownST
    );
    //console.log(GetStandarddropdownST, "GetStandarddropdownST");

    const GetExamdropdownST = useSelector(
        (state: RootState) => state.ExamResultToppers.ExamDropdownListST
    );
    const GetSubjectdropdownST = useSelector(
        (state: RootState) => state.ExamResultToppers.SubjectDropdownListST
    );
    //console.log(GetSubjectdropdownST, 'GetSubjectdropdownSTttttt');

    const GetStandardToppersListST = useSelector(
        (state: RootState) => state.ExamResultToppers.StandardTopperST
    );
    const GetSubjectToppersListST = useSelector(
        (state: RootState) => state.ExamResultToppers.StandardSubjectToppersST
    );
    const [SubjectToppersListCT, setSubjectToppersListCT] = useState([])
    const [StandardToppersListST, setStandardToppersListST] = useState([])
    const [ClassToppersListCT, setClassToppersListCT] = useState([])
    const [SubjectToppersListST, setSubjectToppersListST] = useState([])
    //console.log("ClassToppersListCT", ClassToppersListCT);
    //
    useEffect(() => {
        setSubjectToppersListCT(GetSubjectToppersListCT)
    }, [GetSubjectToppersListCT])
    useEffect(() => {
        setSubjectToppersListST(GetSubjectToppersListST)
    }, [GetSubjectToppersListST])
    useEffect(() => {
        setStandardToppersListST(GetStandardToppersListST)
    }, [GetStandardToppersListST])
    useEffect(() => {
        setClassToppersListCT(GetClassToppersListCT)
    }, [GetClassToppersListCT])

    const GetScreenPermission = () => {
        let perm = 'N';
        ScreensAccessPermission?.map((item) => {
            if (item.ScreenName === 'LessonPlan') perm = item.IsFullAccess;
        });
        return perm;
    };
    // useEffect(() => {
    //     if (GetExamdropdownCT.length > 0) {
    //         setExamCT(GetExamdropdownCT[0].Id);
    //         setSelectedExamName(GetExamdropdownCT[0].Name); // Set the selected exam name
    //     }
    // }, [GetExamdropdownCT]);
    // useEffect(() => {
    //     if (GetExamdropdownST.length > 0) {
    //         setExamST(GetExamdropdownST[0].Id);
    //         setSelectedExamName(GetExamdropdownST[0].Name); // Set the selected exam name
    //     }
    // }, [GetExamdropdownST]);

    useEffect(() => {
        if (radioBtn === '1' && GetExamdropdownCT.length > 0) {
            const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === SelectExamCT);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);
                setExamST(SelectExamCT);
            }
        } else if (radioBtn === '2' && GetExamdropdownST.length > 0) {
            const selectedExam = GetExamdropdownST.find((exam) => exam.Id === SelectExamST);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);
                setExamCT(SelectExamST)
            }
        }
    }, [radioBtn, SelectExamCT, SelectExamST, GetExamdropdownCT, GetExamdropdownST]);




    useEffect(() => {
        dispatch(ClassdropdownListCT(ClassDropdownBodyCT));
    }, [TeacherId]);
    useEffect(() => {
        dispatch(ClassExamListCT(ExamDropdownBodyCT));
    }, [SelectClassCT]);
    useEffect(() => {
        dispatch(ClassSubjectListCT(SujectDropdownBodyCT));
    }, [SelectClassCT, SelectExamCT]);
    useEffect(() => {
        dispatch(ClassTopperListCT(ToppersListBodyCT));
    }, [SelectClassCT, SelectExamCT, SelectSubjectCT]);


    // useEffect(() => {
    //     if (GetExamdropdownCT.length > 0) setExamCT(GetExamdropdownCT[0].Id);
    // }, [GetExamdropdownCT]);

    useEffect(() => {
        if (GetSubjectdropdownCT.length > 0)
            setSubjectCT(GetSubjectdropdownCT[0].Id);
    }, [GetSubjectdropdownCT]);

    useEffect(() => {
        dispatch(StandardDropdownListST(StandardDropdownBodyST));
    }, [TeacherId]);
    useEffect(() => {
        dispatch(StandardExamListST(ExamDropdownBodyST));
    }, [SelectStandardST]);
    useEffect(() => {
        dispatch(StandardSubjectListST(SujectDropdownBodyST));
    }, [SelectStandardST, SelectExamST]);
    useEffect(() => {
        dispatch(StandardTopperListST(StandardToppersBodyST));
    }, [SelectStandardST, SelectExamST, SelectSubjectST]);

    // useEffect(() => {
    //     if (GetStandarddropdownST.length > 0)
    //         setStandardST(GetStandarddropdownST[0].Id);
    // }, [GetStandarddropdownST]);

    // useEffect(() => {
    //     if (GetExamdropdownST.length > 0) setExamST(GetExamdropdownST[0].Id);
    // }, [GetExamdropdownST]);

    // useEffect(() => {
    //     if (GetSubjectdropdownST.length > 0)
    //         setSubjectST(GetSubjectdropdownST[0].Id);
    // }, [GetSubjectdropdownST]);

    useEffect(() => {

        setClassToppersListCT(
            GetClassToppersListCT.map((Item) => {
                return {
                    ...Item,
                    IsHighlightStudent:
                        Item.Id == HighlightStudentId ? true : false
                }
            })
        )
        setStandardToppersListST(
            GetStandardToppersListST.map((Item) => {
                return {
                    ...Item,
                    IsHighlightStudent:
                        Item.Id == HighlightStudentId ? true : false
                }
            })
        )
        setSubjectToppersListCT(GetSubjectToppersListCT.map((Item) => {
            return {
                ...Item,
                Students: Item.Students.map((obj) => {
                    return {
                        ...obj,
                        IsHighlightStudent:
                            obj.Id == HighlightStudentId ? true : false
                    }
                })
            }
        }))
        setSubjectToppersListST(GetSubjectToppersListST.map((Item) => {
            return {
                ...Item,
                Students: Item.Students.map((obj) => {
                    return {
                        ...obj,
                        IsHighlightStudent:
                            obj.Id == HighlightStudentId ? true : false
                    }
                })
            }
        }))

    }, [HighlightStudentId])
    const ClassDropdownBodyCT: IGetClassDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId: 0
    };
    const ExamDropdownBodyCT: IGetexamDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(SelectClassCT)
    };
    const SujectDropdownBodyCT: IGetClassSubjectDropdownBodyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(SelectClassCT),
        asExamId: Number(SelectExamCT)
    };
    const ToppersListBodyCT: IGetClassToppersListBOdyCT = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(SelectClassCT),
        asExamId: Number(SelectExamCT),
        asSubjectId: Number(SelectSubjectCT)
    };

    const StandardDropdownBodyST: IGetStandardDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
    };
    const ExamDropdownBodyST: IGetStandardExamDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: Number(SelectStandardST)
    };
    const SujectDropdownBodyST: IGetSubjectDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: Number(SelectStandardST),
        asExamId: Number(SelectExamST)
    };
    const StandardToppersBodyST: IGetStandardToppersListBOdyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: Number(SelectStandardST),
        asExamId: Number(SelectExamST),
        asSubjectId: Number(SelectSubjectST)
    };
    const clickClassDropdownCT = (value) => {
        setClassCT(value);
    };
    // const clickExamDropdownCT = (value) => {
    //     setExamCT(value);
    // };
    const [selectedExamName, setSelectedExamName] = useState('');

    const clickExamDropdownCT = (value) => {
        setExamCT(value);
        const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === value);
        if (selectedExam) {
            setSelectedExamName(selectedExam.Name);
        }
        //console.log(SelectExamCT, 'SelectExamCT');

    };
    // useEffect(() => {
    //     if (GetExamdropdownCT.length > 0) {
    //         setExamCT(GetExamdropdownCT[0].Id);
    //         setSelectedExamName(GetExamdropdownCT[0].Name); // Set the selected exam name
    //     }
    // }, [GetExamdropdownCT]);


    const clickSubjectDropdownCT = (value) => {
        setSubjectCT(value);
    };
    //

    const clickStandardDropdownST = (value) => {
        setStandardST(value);
    };

    // const clickExamDropdownST = (value) => {

    //     setExamST(value);
    // };
    const clickExamDropdownST = (value) => {
        setExamST(value);
        const selectedExam = GetExamdropdownST.find((exam) => exam.Id === value);
        if (selectedExam) {
            setSelectedExamName(selectedExam.Name);
            setExamCT(value);
        }
    };

    const clickSubjectDropdownST = (value) => {
        setSubjectST(value);
    };
    const ClickItemST = () => { };
    useEffect(() => {
        if (radioBtn === '1') {
            const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === SelectExamCT);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);

            }
        } else {
            const selectedExam = GetExamdropdownST.find((exam) => exam.Id === SelectExamST);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);
                // setExamCT(GetExamdropdownCT[0].Id)
            }
        }
    }, [SelectExamCT, SelectExamST, radioBtn, GetExamdropdownCT, GetExamdropdownST]);

    const ClickRadio = (value) => {
        setRadioBtn(value);
        setHighlightStudentId('0')
        setSelectedExamName('');
    };
    const onClickClose = () => {
        navigate('/RITeSchool/Teacher/ExamResultBase');
    };
    const clickHighlightStudent = (value) => {
        if (
            (radioBtn === '1' && SelectSubjectCT == "0") ||
            (radioBtn === '2' && SelectSubjectST == "0")
        )
            setHighlightStudentId(value)
        else
            setHighlightStudentId('0')
    }

    const groupedBySubject = SubjectToppersListCT.reduce((acc, row) => {
        if (!acc[row.Subject]) {
            acc[row.Subject] = [];
        }
        acc[row.Subject].push(row);
        return acc;
    }, {});

    const groupedBySubject1 = SubjectToppersListST.reduce((acc, row) => {
        if (!acc[row.Subject]) {
            acc[row.Subject] = [];
        }
        acc[row.Subject].push(row);
        return acc;
    }, {});

    const ExamResultLink = {
        title: 'Exam Results',
        path: '/RITeSchool/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId
        //path: '/RITeSchool/Teacher/ExamResultBase'
    };

    const FinalResultLink = {
        title: 'Final Result ',
        path: '/RITeSchool/Teacher/FinalResult/' + TeacherId

    };

    const ClickItem = () => { };
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                // navLinks={[
                //     { title: 'Exam Results', path: '/RITeSchool/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId },
                //     { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/RITeSchool/Teacher/ExamResultToppers/' }
                // ]}
                navLinks={
                    IsReadOnly
                        ? (examtopperProp === "true"
                            ? [FinalResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/RITeSchool/Teacher/FinalResultToppers/' }]
                            : [ExamResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/RITeSchool/Teacher/ExamResultToppers/' }])

                        : (examtopperProp === "true"
                            ? [FinalResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/RITeSchool/Teacher/FinalResultToppers/' }]
                            : [ExamResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/RITeSchool/Teacher/ExamResultToppers/' }])
                }

                rightActions={<>
                    {radioBtn === '1' ? (
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            {CanEdit == 'Y' && (
                                <SearchableDropdown
                                    sx={{ pl: 0, minWidth: '10vw' }}
                                    ItemList={GetClassdropdownCT}
                                    onChange={clickClassDropdownCT}
                                    defaultValue={SelectClassCT}
                                    size={"small"}
                                    label='Select Class'
                                />
                            )}
                            <SearchableDropdown
                                sx={{ pl: 0, minWidth: '20vw' }}
                                ItemList={GetExamdropdownCT}
                                onChange={clickExamDropdownCT}
                                defaultValue={SelectExamCT}
                                size={"small"}
                                label='Select Exam'
                            />
                            <SearchableDropdown
                                sx={{ pl: 0, minWidth: '20vw' }}
                                ItemList={GetSubjectdropdownCT}
                                onChange={clickSubjectDropdownCT}
                                defaultValue={SelectSubjectCT}
                                size={"small"}
                                label='Subject'
                            />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            {CanEdit == 'Y' && (
                                <SearchableDropdown
                                    label='Select Standard'
                                    sx={{ pl: 0, minWidth: '10vw' }}
                                    ItemList={GetStandarddropdownST}
                                    onChange={clickStandardDropdownST}
                                    defaultValue={SelectStandardST}
                                    size={"small"}
                                />
                            )}
                            <SearchableDropdown
                                ItemList={GetExamdropdownST}
                                sx={{ pl: 0, minWidth: '20vw' }}
                                onChange={clickExamDropdownST}
                                defaultValue={SelectExamST}
                                label={'Select Exam'}
                                size={"small"}
                            />
                            <SearchableDropdown
                                ItemList={GetSubjectdropdownST}
                                sx={{ pl: 0, minWidth: '20vw' }}
                                onChange={clickSubjectDropdownST}
                                defaultValue={SelectSubjectST}
                                label={'Subject'}
                                size={"small"}
                            />
                        </Box>
                    )}
                    <Tooltip title={Note}>
                        <IconButton

                            sx={{
                                color: 'white',
                                backgroundColor: grey[500],
                                '&:hover': {
                                    backgroundColor: grey[500]
                                }
                            }}
                        >
                            <QuestionMark />
                        </IconButton>
                    </Tooltip>

                </>}
            />
            <Box sx={{ px: 2, pt: 1, background: 'white' }}>
                <RadioButton1
                    Array={RadioListCT}
                    ClickRadio={ClickRadio}
                    defaultValue={radioBtn}
                    Label={''}
                />
                {radioBtn === '1' ? (
                    <Box>
                        {GetClassToppersListCT.length > 0 ? (
                            <div>
                                <Typography variant={"h4"} my={2}>
                                    {selectedExamName}
                                </Typography>
                                <DynamicList2
                                    HeaderList={HeaderListCT}
                                    ItemList={ClassToppersListCT}
                                    IconList={[]}
                                    ClickItem={clickHighlightStudent}
                                />
                            </div>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>

                        )}
                        <Typography variant={"h4"} my={2}>
                            Subject Toppers
                        </Typography>

                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row" }}>
                            {Object.keys(groupedBySubject).map((subject, subjectIndex) => (
                                <Grid item key={subjectIndex} xs={12} sm={12} md={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <Typography variant={"h4"}>
                                                            {subject}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell>Rank</StyledTableCell>
                                                    <StyledTableCell align={"center"}>Roll No.</StyledTableCell>
                                                    <StyledTableCell>Student Name</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {groupedBySubject[subject].map((row, index) => (
                                                    row.Students.map((student, studentIndex) => (
                                                        <TableRow key={`${subjectIndex}-${index}-${studentIndex}`}>
                                                            {studentIndex === 0 && (
                                                                <TableCell rowSpan={row.Students.length}>
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number1.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={GoldMedal} width={"40"} alt="Gold Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number2.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={SilverMedal} width={"40"} alt="Silver Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number3.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={BronzeMedal} width={"40"} alt="Bronze Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                </TableCell>
                                                            )}
                                                            <TableCell sx={{ color: student.IsHighlightStudent ? 'red' : '' }} align={"center"}>{student.Text1}</TableCell>
                                                            <TableCell
                                                                sx={{ color: student.IsHighlightStudent ? 'red' : '' }}
                                                            >{student.Text2}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            ))}
                        </Grid>


                    </Box>
                ) : (
                    <Box>
                        {GetStandardToppersListST.length > 0 ? (
                            <div>
                                <Typography variant={"h4"} my={2}>
                                    {selectedExamName}
                                </Typography>
                                <DynamicList2
                                    HeaderList={HeaderListST}
                                    ItemList={StandardToppersListST}
                                    IconList={[]}
                                    ClickItem={clickHighlightStudent}
                                />
                            </div>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>

                        )}
                        <Typography variant={"h4"} my={2}>
                            Subject Toppers
                        </Typography>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row" }}>
                            {Object.keys(groupedBySubject1).map((subject, subjectIndex) => (
                                <Grid item key={subjectIndex} xs={12} sm={12} md={6}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <Typography variant={"h4"}>
                                                            {subject}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell>Rank</StyledTableCell>
                                                    <StyledTableCell>Class</StyledTableCell>
                                                    <StyledTableCell align={"center"}>Roll No.</StyledTableCell>
                                                    <StyledTableCell>Student Name</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {groupedBySubject1[subject].map((row, index) => (
                                                    row.Students.map((student, studentIndex) => (
                                                        <TableRow key={`${subjectIndex}-${index}-${studentIndex}`}>
                                                            {studentIndex === 0 && (
                                                                <TableCell rowSpan={row.Students.length}>
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number1.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={GoldMedal} width={"40"} alt="Gold Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number2.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={SilverMedal} width={"40"} alt="Silver Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                    {row.Rank_Image === "~/RITeSchool/images/Number3.gif" && (
                                                                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                                            <img src={BronzeMedal} width={"40"} alt="Bronze Medal" />
                                                                            <Typography variant={"h3"}>{row.Marks}</Typography>
                                                                        </Stack>
                                                                    )}
                                                                </TableCell>
                                                            )}
                                                            <TableCell sx={{ color: student.IsHighlightStudent ? 'red' : '' }} align={"center"}>{student.Text3}</TableCell>
                                                            <TableCell sx={{ color: student.IsHighlightStudent ? 'red' : '' }} align={"center"}>{student.Text1}</TableCell>
                                                            <TableCell sx={{ color: student.IsHighlightStudent ? 'red' : '' }}>{student.Text2}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            ))}
                        </Grid>



                    </Box>
                )}

            </Box>

        </Box >
    );
};

export default ExamResultToppers;
