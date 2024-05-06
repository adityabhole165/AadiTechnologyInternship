import { Box, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { IAllPrimaryClassTeachersBody, IGetAllStudentswiseRemarkDetailsBody, IGetTestwiseTermBody, IStudentListDropDowntBody } from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import Notes from 'src/libraries/ResuableComponents/Notes';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { CardDetail7 } from 'src/libraries/styled/CardStyle';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { CDAGetAllStudentswiseRemarkDetails, CDAGetClassTeachers, CDAGetTestwiseTerm, CDAStudentListDropDown } from 'src/requests/ProgressRemarks/ReqProgressRemarks';
import { RootState, useDispatch, useSelector } from 'src/store';
import RemarkTemplate from './RemarkTemplate';

const Remark = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = Styles();

    const [Open, setOpen] = useState(false);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const asUserId = Number(sessionStorage.getItem('Id'));

    const [selectTeacher, SetselectTeacher] = useState(
        sessionStorage.getItem('TeacherId')
    );

    const [SelectTerm, SetSelectTerm] = useState();
    const [studentList, setStudentList] = useState();

    const [Itemlist, setItemlist] = useState([]);
    const [studentName, setStudentName] = useState();


    const ClassTeacher: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers);
    const Term: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm);
    const StudentListDropdown: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISStudentListDropDown);
    const StudentWiseRemarkDetails: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails);


    const ClassTeachersBody: IAllPrimaryClassTeachersBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId
    };

    const GetTestwiseTermBody: IGetTestwiseTermBody = {
        asSchoolId: asSchoolId
    };

    const StudentListDropdownBody: IStudentListDropDowntBody = {
        asStandard_Division_Id: asStandardDivisionId,
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTerm_Id: SelectTerm
    };

    const GetAllStudentsWiseRemarkDetailBody: IGetAllStudentswiseRemarkDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: asStandardDivisionId,
        asStudentId: Number(studentList),
        asTermId: Number(SelectTerm)
    };

    const clickSelectClass = (value) => {
        SetselectTeacher(value);
    };

    const clickSelectTerm = (value) => {
        SetSelectTerm(value)
    };

    const clickSelectStudent = (value) => {
        setStudentList(value)
    };

    const TextValues = (value) => {
        setItemlist(value);

        console.log(value, 'value-----');
    };
    const TextValues1 = (value) => {
        setItemlist(value);
    };
    const TextValues2 = (value) => {
        setItemlist(value);
    };

    const Note1 = [
        'Attentive, Capable, Careful, Cheerful, Confident, Cooperative, Courteous, Creative, Dynamic, Eager, Energetic, Generous, Hardworking, Helpful, Honest, Imaginative, Independent, Industrious, Motivated, Organized Outgoing, Pleasant, Polite, Resourceful, Sincere, Unique.'
    ];
    const Header1 = ['Suggested Adjectives:'];

    const Note2 = [
        'Always, Commonly, Consistently, Daily, Frequently, Monthly, Never, Occasionally, Often, Rarely, Regularly Typically, Usually, Weekly..'
    ];
    const Header2 = ['Suggested Adverbs ::'];

    const Note3 = [
        'Click on the button available for each student and remark type to add configured Remark Templates.'
    ];
    const Header3 = ['...'];

    const Note4 = [
        'After specific interval of time entered data will be saved automatically.'
    ];
    const Header4 = ['Note:'];

    const Note5 = [
        'User can not change or update any data once summative exam is published.'
    ];
    const Header5 = ['Note:'];

    const HeaderArray = [
        { Id: 1, Header: 'Roll No.' },
        { Id: 2, Header: 'Name' },
        { Id: 3, Header: 'Remark' },
        ,
        { Id: 4, Header: 'Behaviour' },
        ,
        { Id: 5, Header: 'Attitude' }
    ];


    useEffect(() => {
        dispatch(CDAGetClassTeachers(ClassTeachersBody));
    }, []);

    useEffect(() => {
        dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody))
    }, []);

    useEffect(() => {
        if (Term.length > 0) {
            SetSelectTerm(Term[0].Value);
        }
    }, [Term]);

    useEffect(() => {
        dispatch(CDAStudentListDropDown(StudentListDropdownBody))
    }, [selectTeacher, SelectTerm]);

    useEffect(() => {
        setItemlist(StudentWiseRemarkDetails)
    }, [StudentWiseRemarkDetails])

    useEffect(() => {
        dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentsWiseRemarkDetailBody))
    }, [selectTeacher, SelectTerm, studentList]);

    // const ExamResult = (value) => {
    //     navigate('/extended-sidebar/Teacher/ExamResultBase');
    // }; 


    const onClickPrevious = () => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
    };

    const ClickOpenDialogbox = (value) => {
        setOpen(true);
    };
    const ClickCloseDialogbox = () => {
        setOpen(false);
    };

    const clickPublishUnpublish = (IsPublish) => {


    };
    return (
        <>

            <br></br>
            <PageHeader heading={'Progress Remarks'} subheading={''} />
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >

                <Grid item xs={3}>
                    <Typography
                        component={Box}
                        sx={{ border: '1px solid black' }}
                        p={0.3}
                    >
                        Subject Teacher:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <SearchableDropdown
                        ItemList={ClassTeacher}
                        onChange={clickSelectClass}
                        defaultValue={selectTeacher}
                        label={'Subject Teacher'}
                    />
                </Grid>
                {/* <br></br> */}
                <Grid item xs={2}>
                    <Typography
                        component={Box}
                        sx={{ border: '1px solid black' }}
                        p={0.5}
                    >
                        Term:
                    </Typography>
                </Grid>
                {/* <br></br> */}
                <Grid item xs={2}>
                    <SearchableDropdown
                        ItemList={Term}
                        onChange={clickSelectTerm}
                        defaultValue={SelectTerm}
                        label={''}
                    />
                </Grid>
                <br></br>
                <Grid item xs={3}>
                    <Typography
                        component={Box}
                        sx={{ border: '1px solid black' }}
                        p={0.5}
                    >
                        StudentList:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <SearchableDropdown
                        ItemList={StudentListDropdown}
                        onChange={clickSelectStudent}
                        defaultValue={studentList}
                        label={'All'}
                    />
                </Grid>


            </Grid >
            <DotLegend1>
                <DotLegendStyled1
                    className={classes.border}
                    style={{ background: 'red' }}
                />
                <CardDetail7>Left Students</CardDetail7>
            </DotLegend1>
            <br></br>
            <Grid item xs={6} >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper>
                            <Notes NoteDetail={Note1} Header={Header1} />
                            <Notes NoteDetail={Note2} Header={Header2} />
                            <Notes NoteDetail={Note3} Header={Header3} />
                            <Notes NoteDetail={Note4} Header={Header4} />
                            <Notes NoteDetail={Note5} Header={Header5} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <ResizableCommentsBox
                HeaderArray={HeaderArray}
                ItemList={Itemlist}
                NoteClick={ClickOpenDialogbox}
                setTextValues={TextValues}
                setTextValues1={TextValues1}
                setTextValues2={TextValues2}
            />

            {Open && (
                <RemarkTemplate
                    open={Open}
                    setOpen={setOpen}
                    ClickCloseDialogbox={ClickCloseDialogbox}
                    clickPublishUnpublish={clickPublishUnpublish}
                />
            )}

            <br></br>


            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonPrimary
                    variant="contained"
                    style={{
                        backgroundColor: '#0091ea',
                        color: 'white',
                        marginRight: '10px'
                    }}
                // onClick={UpdateRemark}
                >
                    SAVE
                </ButtonPrimary>

                <ButtonPrimary
                    variant="contained"
                    style={{
                        backgroundColor: 'Red',
                        color: 'White',
                        marginRight: '10px'
                    }}
                    onClick={onClickPrevious}
                >
                    PREVIOUS
                </ButtonPrimary>

                <ButtonPrimary
                    variant="contained"
                    style={{ backgroundColor: '#0091ea', color: 'white' }}
                >
                    EXPORT
                </ButtonPrimary>
            </Box>
            {/* <RemarkTemplate studentName={studentName} /> */}



        </>



    );
};


export default Remark;