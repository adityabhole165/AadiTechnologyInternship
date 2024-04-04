import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    IGetClassDropdownBodyCT,
    IGetClassSubjectDropdownBodyCT,
    IGetClassToppersListBOdyCT, IGetStandardDropdownBodyST,
    IGetStandardExamDropdownBodyST,
    IGetStandardToppersListBOdyST,
    IGetSubjectDropdownBodyST,
    IGetexamDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';

import {
    ClassExamListCT,
    ClassSubjectListCT,
    ClassTopperListCT,
    ClassdropdownListCT,
} from 'src/requests/FinalResult/RequestFinalResultToppers';
import {
    StandardDropdownListST,
    StandardExamListST,
    StandardSubjectListST,
    StandardTopperListST
} from 'src/requests/FinalResult/RqstandardToppers';

import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import ToppersList from 'src/libraries/list/ToppersList';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { RootState, useDispatch } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const ExamResultToppers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { TeacherId, StandardDivisionId } = useParams();

    const [SelectClassCT, setClassCT] = useState(StandardDivisionId);
    const [SelectExamCT, setExamCT] = useState('0');
    const [SelectSubjectCT, setSubjectCT] = useState('0');
    const [StandardRadioCT, setStandardRadioCT] = useState();
    const [SelectStandardST, setStandardST] = useState(StandardDivisionId);
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

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asTeacherId = Number(sessionStorage.getItem('TeacherId'));
    const Note: string =
        'Display the first three class/ standard toppers as well as subject toppers of your class/ standard for the selected exam';
    const GetClassdropdownCT = useSelector(
        (state: RootState) => state.FinalResultToppers.ClassDropdownListCT
    );
    const GetExamdropdownCT = useSelector(
        (state: RootState) => state.FinalResultToppers.ExamDropdownListCT
    );
    const GetSubjectdropdownCT: any = useSelector(
        (state: RootState) => state.FinalResultToppers.SubjectDropdownListCT
    );
    const GetClassToppersListCT = useSelector(
        (state: RootState) => state.FinalResultToppers.ClassToppersCT
    );
    const GetSubjectToppersListCT = useSelector(
        (state: RootState) => state.FinalResultToppers.SubjectToppersCT
    );

    const GetStandarddropdownST = useSelector(
        (state: RootState) => state.StandardToppers.StandardDropdownST
    );
    const GetExamdropdownST = useSelector(
        (state: RootState) => state.StandardToppers.ExamDropdownListST
    );
    const GetSubjectdropdownST = useSelector(
        (state: RootState) => state.StandardToppers.SubjectDropdownListST
    );
    const GetStandardToppersListST = useSelector(
        (state: RootState) => state.StandardToppers.StandardTopperST
    );
    const GetSubjectToppersListST = useSelector(
        (state: RootState) => state.StandardToppers.StandardSubjectToppersST
    );
    const [SubjectToppersListCT, setSubjectToppersListCT] = useState([])
    const [StandardToppersListST, setStandardToppersListST] = useState([])
    const [ClassToppersListCT, setClassToppersListCT] = useState([])
    const [SubjectToppersListST, setSubjectToppersListST] = useState([])
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
    useEffect(() => {
        if (GetExamdropdownCT.length > 0) {
            setExamCT(GetExamdropdownCT[0].Id);
            setSelectedExamName(GetExamdropdownCT[0].Name); // Set the selected exam name
        }
    }, [GetExamdropdownCT]);
    useEffect(() => {
        if (GetExamdropdownST.length > 0) {
            setExamST(GetExamdropdownST[0].Id);
            setSelectedExamName(GetExamdropdownST[0].Name); // Set the selected exam name
        }
    }, [GetExamdropdownST]);
    useEffect(() => {
        if (radioBtn === '1' && GetExamdropdownCT.length > 0) {
            const selectedExam = GetExamdropdownCT.find((exam) => exam.Id === SelectExamCT);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);
            }
        } else if (radioBtn === '2' && GetExamdropdownST.length > 0) {
            const selectedExam = GetExamdropdownST.find((exam) => exam.Id === SelectExamST);
            if (selectedExam) {
                setSelectedExamName(selectedExam.Name);
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


    useEffect(() => {
        if (GetExamdropdownCT.length > 0) setExamCT(GetExamdropdownCT[0].Id);
    }, [GetExamdropdownCT]);

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

    useEffect(() => {
        if (GetStandarddropdownST.length > 0)
            setStandardST(GetStandarddropdownST[0].Id);
    }, [GetStandarddropdownST]);

    useEffect(() => {
        if (GetExamdropdownST.length > 0) setExamST(GetExamdropdownST[0].Id);
    }, [GetExamdropdownST]);

    useEffect(() => {
        if (GetSubjectdropdownST.length > 0)
            setSubjectST(GetSubjectdropdownST[0].Id);
    }, [GetSubjectdropdownST]);
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
        asTeacherId: Number(TeacherId)
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
        asTeacherId: Number(TeacherId)
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
    };
    useEffect(() => {
        if (GetExamdropdownCT.length > 0) {
            setExamCT(GetExamdropdownCT[0].Id);
            setSelectedExamName(GetExamdropdownCT[0].Name); // Set the selected exam name
        }
    }, [GetExamdropdownCT]);


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
            }
        }
    }, [SelectExamCT, SelectExamST, radioBtn, GetExamdropdownCT, GetExamdropdownST]);

    const ClickRadio = (value) => {
        setRadioBtn(value);
        setHighlightStudentId('0')
        setSelectedExamName('');
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



    const ClickItem = () => { };
    return (
        <Container>

            <CommonPageHeader
                navLinks={[
                    { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' },
                    { title: `${radioBtn === '1' ? 'Class Toppers' : 'Standard Toppers'}`, path: '/extended-sidebar/Teacher/ExamResultToppers' }
                ]}
                rightActions={<>
                    {radioBtn === '1' ? (

                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            {CanEdit == 'Y' && (
                                <SearchableDropdown
                                    sx={{ pl: 0, minWidth: '200px' }}
                                    ItemList={GetClassdropdownCT}
                                    onChange={clickClassDropdownCT}
                                    defaultValue={SelectClassCT}
                                    size={"small"}
                                    label='Select Class'
                                />
                            )}
                            <SearchableDropdown
                                sx={{ pl: 0, minWidth: '200px' }}
                                ItemList={GetExamdropdownCT}
                                onChange={clickExamDropdownCT}
                                defaultValue={SelectExamCT}
                                size={"small"}
                                label='Select Exam'
                            />
                            <SearchableDropdown
                                sx={{ pl: 0, minWidth: '200px' }}
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
                                    sx={{ pl: 0, minWidth: '200px' }}
                                    ItemList={GetStandarddropdownST}
                                    onChange={clickStandardDropdownST}
                                    defaultValue={SelectStandardST}
                                    size={"small"}
                                />
                            )}
                            <SearchableDropdown
                                ItemList={GetExamdropdownST}
                                sx={{ pl: 0, minWidth: '200px' }}
                                onChange={clickExamDropdownST}
                                defaultValue={SelectExamST}
                                label={'Select Exam'}
                                size={"small"}
                            />
                            <SearchableDropdown
                                ItemList={GetSubjectdropdownST}
                                sx={{ pl: 0, minWidth: '200px' }}
                                onChange={clickSubjectDropdownST}
                                defaultValue={SelectSubjectST}
                                label={'Subject'}
                                size={"small"}
                            />
                        </Box>)}

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
            <div>
                <RadioButton1
                    Array={RadioListCT}
                    ClickRadio={ClickRadio}
                    defaultValue={radioBtn}
                    Label={''}
                />
            </div>
            <Card variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                    {` ${selectedExamName}`}
                </CardContent>
            </Card>
            {/* <Box sx={{ textAlign: 'center', marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">
                    <img src={"C:\\Users\\abc\\Pictures\\problem while connecting in sql.png"} alt="First Rank" /> First Rank
                </Typography>
                <Typography variant="subtitle1">
                    <img src={"C:\\Users\\abc\\Pictures\\problem while connecting in sql.png"} alt="Second Rank" /> Second Rank
                </Typography>
                <Typography variant="subtitle1">
                    <img src={"C:\\Users\\abc\\Pictures\\problem while connecting in sql.png"} alt="Third Rank" /> Third Rank
                </Typography>
            </Box> */}

            {radioBtn === '1' ? (
                <Container>
                    <Box mb={1} sx={{ p: 2, background: 'white' }}>
                        <DynamicList2
                            HeaderList={HeaderListCT}
                            ItemList={ClassToppersListCT}
                            IconList={[]}
                            ClickItem={clickHighlightStudent}
                        />
                    </Box>
                    <Box mb={1} sx={{ p: 2, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant={'h2'} mb={1}>
                            Subject Toppers
                        </Typography>
                        <Grid container>
                            {SubjectToppersListCT.map((item, i) => {
                                return (
                                    <>
                                        {!(i % 3) && (
                                            <Grid container item xs={12} justifyContent="center">
                                                {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                                                {/* <Container> */}
                                                <Typography variant={'h3'} mb={1}>
                                                    {item.Subject}
                                                </Typography>
                                                {/* </Container> */}
                                            </Grid>
                                        )}

                                        <Grid item xs={4} xl={4} justifyContent="center">
                                            <Container>
                                                <img src={item.Rank_Image} /> MarKs:{item.Marks}
                                            </Container>
                                            <br></br>
                                            <ToppersList
                                                headers={HeaderList1CT}
                                                data={item.Students}
                                            />
                                        </Grid>
                                    </>
                                );
                            })}
                        </Grid>
                    </Box>
                </Container>
            ) : (
                <Container>
                    {/* <PageHeader heading="StandardToppers" /> */}
                    <Box mb={1} sx={{ p: 2, background: 'white' }}>
                        <DynamicList2
                            HeaderList={HeaderListST}
                            ItemList={StandardToppersListST}
                            IconList={[]}
                            ClickItem={clickHighlightStudent}
                        />
                    </Box>
                    <Grid container spacing={1} alignItems="center">

                        <Box mb={1} sx={{ marginTop: '10px', p: 2, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant={'h2'} mb={1}>
                                Subject Toppers
                            </Typography>
                            <Grid container>
                                {SubjectToppersListST.map((item, i) => {
                                    return (
                                        <>
                                            {!(i % 3) && (
                                                <Grid container item xs={12} justifyContent="center">
                                                    {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                                                    {/* <Container> */}
                                                    <Typography variant={'h3'} mb={1}>
                                                        {item.Subject}
                                                    </Typography>
                                                    {/* </Container> */}
                                                </Grid>
                                            )}

                                            <Grid item xs={4} xl={4} justifyContent="center">
                                                <Container>
                                                    <img src={item.Rank_Image} /> MarKs:{item.Marks}
                                                </Container>
                                                <br></br>
                                                <ToppersList
                                                    headers={HeaderList1ST}
                                                    data={item.Students}
                                                />
                                            </Grid>
                                        </>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Container>
            )}
            <Grid
                container
                spacing={2}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid item xs={2}>
                    <ButtonPrimary
                        onClick={onClickClose}
                        variant="contained"
                        style={{ marginLeft: '60px', backgroundColor: 'red' }}
                    >
                        CLOSE
                    </ButtonPrimary>
                </Grid>
            </Grid>

        </Container>
    );
};

export default ExamResultToppers;
