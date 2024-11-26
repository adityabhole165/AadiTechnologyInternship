import QuestionMark from '@mui/icons-material/QuestionMark';
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
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IGetClassDivandStandardDropdownBody, IGetClassandStandardToppersListBody, IGetLatestExamIdandDropdownBody, IGetSubjectDropdownBody } from 'src/interfaces/ExamResult/IToppers';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { ClassExamdropdownListCT, ClassSubjectdropdownListCT, ClassToppersList, ClassdropdownListCT, LatestClassExam, LatestStandardExam, StandardExamdropdownListST, StandardSubjectdropdownListST, StandardToppersList, StandarddropdownListST } from 'src/requests/ExamResult/RequestToppers';
import { RootState, useDispatch } from 'src/store';
import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
import GoldMedal from '../../assets/img/medals/gold-medal.png';
import SilverMedal from '../../assets/img/medals/silver-medal.png';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { StyledTableCell, StyledTableRow } from '../DataTable';

const ExamResultToppers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { TeacherId, StandardDivisionId, TestId, standardId, examtopperProp, IsReadOnly ,AcademicYear} = useParams();

    const [SelectClassCT, setClassCT] = useState(StandardDivisionId == undefined ? "0" : StandardDivisionId);
    const [SelectExamCT, setExamCT] = useState(TestId == undefined ? "" : TestId);
    const [SelectSubjectCT, setSubjectCT] = useState('0');
    const [StandardRadioCT, setStandardRadioCT] = useState();
    const [SelectStandardST, setStandardST] = useState("0");
    const [SelectExamST, setExamST] = useState('0');
    const [SelectSubjectST, setSubjectST] = useState('0');
    const [showScreenOne, setShowScreenOne] = useState(true);
    const [radioBtn, setRadioBtn] = useState('1');
    const [selectedExamName, setSelectedExamName] = useState('');

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

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asTeacherId = Number(sessionStorage.getItem('TeacherId'));
    const Note: string =
        'Displays the first three class / standard toppers as well as subject toppers of your class / standard for the selected exam';


    const [SubjectToppersListCT, setSubjectToppersListCT] = useState([])
    const [StandardToppersListST, setStandardToppersListST] = useState([])
    const [ClassToppersListCT, setClassToppersListCT] = useState([])
    const [SubjectToppersListST, setSubjectToppersListST] = useState([])

    const GetLatestclassExam = useSelector(
        (state: RootState) => state.Toppers.LatestExamIdCT
    );

    const GetLatestStandardExam = useSelector(
        (state: RootState) => state.Toppers.LatestExamIdST
    )
    const GetClassdropdownCT = useSelector(
        (state: RootState) => state.Toppers.ClassDropdownList
    );
    const GetExamdropdownCT = useSelector(
        (state: RootState) => state.Toppers.ExamDropdownListCT
    );
    const GetSubjectdropdownCT: any = useSelector(
        (state: RootState) => state.Toppers.SubjectDropdownListCT
    );
    const GetClassToppersListCT = useSelector(
        (state: RootState) => state.Toppers.ClassToppersList
    );
    const GetSubjectToppersListCT = useSelector(
        (state: RootState) => state.Toppers.ClassSubjectToppersList
    );
    const GetStandarddropdownST = useSelector(
        (state: RootState) => state.Toppers.StandardDropdownList
    );
    const GetExamdropdownST = useSelector(
        (state: RootState) => state.Toppers.ExamDropdownListST
    );
    const GetSubjectdropdownST = useSelector(
        (state: RootState) => state.Toppers.SubjectDropdownListST
    );

    const GetStandardToppersListST = useSelector(
        (state: RootState) => state.Toppers.StandardToppersList
    );
    const GetSubjectToppersListST = useSelector(
        (state: RootState) => state.Toppers.StandardSubjectToppersList
    );
    useEffect(() => {
        if (radioBtn == '1' && SelectClassCT !== "0") {
            dispatch(LatestClassExam(ExamDropdownBodyCT));
        } else if (radioBtn == '2' && SelectStandardST !== "0") {
            dispatch(LatestStandardExam(LatestExamSTBody));
        }
    }, [SelectClassCT, SelectStandardST]);
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
    const getStandardFromCT = () => {
        let returnVal = "0"
        GetClassdropdownCT.map((item) => {
            if (item.Value == SelectClassCT)
                returnVal = item.Id
        })
        return returnVal
    }

    const [IsPageload, setIsPageload] = useState(true);

    useEffect(() => {
        if (radioBtn == '1') {
            dispatch(ClassdropdownListCT(ClassDropdownBodyCT));
            // setStandardST("0")
        } else if (radioBtn == '2') {
            dispatch(StandarddropdownListST(StandardDropdownBodyST));
            // setClassCT("0")
        }
    }, [radioBtn,AcademicYear]);

    useEffect(() => {
        if (GetClassdropdownCT.length > 0 && radioBtn == '1') {
            if (SelectClassCT == "0")
                setClassCT(GetClassdropdownCT[0].Value)
        }
        if (GetStandarddropdownST.length > 0 && radioBtn == '2') {
            if (SelectStandardST == "0")
                setStandardST(GetStandarddropdownST[0].Value)
            setStandardST(getStandardFromCT())

        }
    }, [GetClassdropdownCT, GetStandarddropdownST,AcademicYear])

    useEffect(() => {

        if (radioBtn == '1' && SelectClassCT !== "0") {
            dispatch(ClassExamdropdownListCT(ExamDropdownBodyCT));
            setExamST(SelectExamST)
        } else if (radioBtn == '2' && SelectStandardST != "0") {
            dispatch(StandardExamdropdownListST(ExamDropdownBodyST));
            setExamCT(SelectExamCT)
        }
    }, [radioBtn, SelectClassCT, SelectStandardST,AcademicYear]);

    useEffect(() => {
        let SelectExamTemp = "0"
        if (GetExamdropdownCT.length > 0 && radioBtn == '1') {
            if (IsPageload) {
                SelectExamTemp = TestId == undefined ? GetExamdropdownCT[0].Value : TestId
            }
            else {
                if (CanEdit == 'Y') {

                    if (GetExamdropdownCT[0].Value === '-1') {
                        SelectExamTemp = GetExamdropdownCT[0].Value
                    } else {
                        SelectExamTemp = GetLatestclassExam
                    }
                }
                else {
                    SelectExamTemp = SelectExamST
                }
            }
            setExamCT(SelectExamTemp)
            const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === SelectExamTemp);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name.replaceAll("-", ""));
            }
        }
        if (GetExamdropdownST.length > 0 && radioBtn == '2') {
            if (CanEdit == 'Y') {
                SelectExamTemp = GetExamdropdownST[0].Value;
            } else {
                SelectExamTemp = SelectExamCT
            }
            setExamST(SelectExamTemp)
            const selectedExam = GetExamdropdownST.find((exam) => exam.Id === SelectExamTemp);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name.replaceAll("-", ""));
            }

        }
    }, [GetExamdropdownCT, GetExamdropdownST,AcademicYear])


    useEffect(() => {
        if (radioBtn == '1') {
            dispatch(ClassSubjectdropdownListCT(SubjectDropdownBodyCT));
        }
    }, [SelectExamCT,AcademicYear]);
    useEffect(() => {
        dispatch(ClassToppersList(ToppersListBodyCT));
    }, [SelectClassCT, SelectExamCT, SelectSubjectCT]);
    useEffect(() => {
        if (radioBtn == '2') {
            dispatch(StandardSubjectdropdownListST(SubjectDropdownBodyST));
        }
    }, [SelectExamST,AcademicYear]);
    useEffect(() => {
        dispatch(StandardToppersList(StandardToppersBodyST));
    }, [SelectStandardST, SelectExamST, SelectSubjectST,AcademicYear]);



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

    const LatestExamSTBody: IGetLatestExamIdandDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: null,
        asStandardId: Number(SelectStandardST)
    };

    const ClassDropdownBodyCT: IGetClassDivandStandardDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        IsStandardList: false
    };
    const ExamDropdownBodyCT: IGetLatestExamIdandDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: Number(SelectClassCT),
        asStandardId: 0
    };
    const SubjectDropdownBodyCT: IGetSubjectDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId:Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: Number(SelectClassCT),
        asStandardId: null,
        asTestId: Number(SelectExamCT)
    };
    const ToppersListBodyCT: IGetClassandStandardToppersListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: Number(SelectClassCT),
        asStandardId: null,
        asTestId: Number(SelectExamCT),
        asSubjectId: Number(SelectSubjectCT)
    };

    const StandardDropdownBodyST: IGetClassDivandStandardDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        IsStandardList: true
    };
    const ExamDropdownBodyST: IGetLatestExamIdandDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId:Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: 0,
        asStandardId: Number(SelectStandardST)
    };
    const SubjectDropdownBodyST: IGetSubjectDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: null,
        asStandardId: Number(SelectStandardST),
        asTestId: Number(SelectExamST)
    };
    const StandardToppersBodyST: IGetClassandStandardToppersListBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: Number (AcademicYear ?AcademicYear : asAcademicYearId),
        asStandardDivId: 0,
        asStandardId: Number(SelectStandardST),
        asTestId: Number(SelectExamST),
        asSubjectId: Number(SelectSubjectST)
    };

    const clickClassDropdownCT = (value) => {
        setClassCT(value);
        setIsPageload(false)
    };
    const clickExamDropdownCT = (value) => {
        setExamCT(value);
        const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === value);
        if (selectedExam) {
            setSelectedExamName(selectedExam.Name.replaceAll("-", ""));
        }

    };
    const clickSubjectDropdownCT = (value) => {
        setSubjectCT(value);
    };
    const clickStandardDropdownST = (value) => {
        setStandardST(value);
        setIsPageload(false)
    };
    const clickExamDropdownST = (value) => {
        setExamST(value);
        const selectedExam = GetExamdropdownST.find((exam) => exam.Id === value);
        if (selectedExam) {
            setSelectedExamName(selectedExam.Name.replaceAll("-", ""));
            setExamCT(value);
        }
    };

    const clickSubjectDropdownST = (value) => {
        setSubjectST(value);
    };
    const ClickItemST = () => { };

    const ClickRadio = (value) => {
        setRadioBtn(value);
        setHighlightStudentId('0')
        setSelectedExamName('');
        setIsPageload(false)
    };
    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
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
        path: '/extended-sidebar/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId
        //path: '/extended-sidebar/Teacher/ExamResultBase'
    };

    const FinalResultLink = {
        title: 'Final Result ',
        path: '/extended-sidebar/Teacher/FinalResult/' + StandardDivisionId

    };

    const ClickItem = () => { };
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                // navLinks={[
                //     { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId },
                //     { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/ExamResultToppers/' }
                // ]}
                navLinks={
                    IsReadOnly
                        ? (examtopperProp === "true"
                            ? [FinalResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/FinalResultToppers/' }]
                            : [ExamResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/ExamResultToppers/' }])

                        : (examtopperProp === "true"
                            ? [FinalResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/FinalResultToppers/' }]
                            : [ExamResultLink, { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/ExamResultToppers/' }])
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
                            {CanEdit == 'Y' && (
                                <SearchableDropdown
                                    ItemList={GetExamdropdownST}
                                    sx={{ pl: 0, minWidth: '20vw' }}
                                    onChange={clickExamDropdownST}
                                    defaultValue={SelectExamST}
                                    label={'Select Exam'}
                                    size={"small"}
                                />
                            )}
                            {CanEdit == 'N' && (
                                <SearchableDropdown
                                    ItemList={GetExamdropdownCT}
                                    sx={{ pl: 0, minWidth: '20vw' }}
                                    onChange={clickExamDropdownST}
                                    defaultValue={SelectExamST}
                                    label={'Select Exam'}
                                    size={"small"}
                                />
                            )}
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
            <Box sx={{ px: 2, pt: 1, background: 'white', paddingBottom: 4 }}>
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
                        {GetSubjectToppersListCT.length > 0 && (
                            <Typography variant={"h4"} my={2}>
                                Subject Toppers
                            </Typography>
                        )}

                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row" }}>
                            {Object.keys(groupedBySubject).map((subject, subjectIndex) => (
                                <Grid item key={subjectIndex} xs={12} sm={12} md={6}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`}}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <Typography variant={"h4"}>
                                                            {subject}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <StyledTableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
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
                                                                <TableCell rowSpan={row.Students.length} sx={{  width:'220px',  borderRight:(theme) => `1px solid ${theme.palette.grey[300]}`}}>
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
                                                            <TableCell sx={{py:1, color: student.IsHighlightStudent ? 'red' : '' }} align={"center"}>{student.Text1}</TableCell>
                                                            <TableCell
                                                                sx={{py:1, color: student.IsHighlightStudent ? 'red' : '' }}
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
                        {GetSubjectToppersListST.length > 0 && (
                            <Typography variant={"h4"} my={2}>
                                Subject Toppers
                            </Typography>
                        )}
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
                                                            <TableCell sx={{ color: student.IsHighlightStudent ? 'red' : '', pl: "2px" }} align={"center"}>{student.Text3}</TableCell>
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
