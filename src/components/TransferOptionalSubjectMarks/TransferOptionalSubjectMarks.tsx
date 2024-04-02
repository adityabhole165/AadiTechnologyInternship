import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, Container, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetClassTeachersBody, IGetOptionalSubjectsForMarksTransferBody, IGetStudentsToTransferMarksBody, ITransferOptionalSubjectMarksBody } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';
import Notes from 'src/libraries/ResuableComponents/Notes';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectMarkList from 'src/libraries/ResuableComponents/SubjectMarkList';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { CDAGetClassTeachers, CDAOptionalSubjectsForMarksTransfer, CDAStudentsToTransferMarks, CDATransferOptionalSubjectMarks } from 'src/requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';


const TransferOptionalSubjectMarks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const UserId = Number(localStorage.getItem('UserId'));
    const [selectClasstecaher, setselectClasstecaher] = useState();
    const [Title, setTitle] = useState('');
    const [SubjectList, setSubjectList] = useState([]);

    const USClassTeacherList = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers);
    const USStudentsToTransferMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks);
    const USOptionalSubjectsForMarksTransfer = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer);
    const ISTransferOptionalSubjectMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks);

    const HeaderPublish = [
        { Id: 1, Header: ' Reg. No.	' },
        { Id: 2, Header: 'Roll No. 	' },
        { Id: 3, Header: '	Student Name' },
        { Id: 4, Header: 'Current Applicable Subjects' }
    ];

    const Note1 = [
        'At least 2 optional subjects should have been configured to transfer marks.'
    ];
    const Hedaer1 = ['Note1 :'];

    const Note2 = [
        'If marks are not assigned to current subject(s) for selected student and if you change to new subject(s) then only new subject(s) will be assigned to student.'
    ];
    const Hedaer2 = ['Note2 :'];

    const Note3 = [
        '	If marks are assigned to current subject(s) for selected student and if you change to new subject(s) then along with new subject(s) assignment, marks of current subject(s) will be transferred to new subject(s).'
    ];
    const Hedaer3 = ['Note3 :'];

    const Note4 = [
        'Marks cannot be transferred across the subject groups.'
    ];
    const Hedaer4 = ['Note4 :'];



    const GetClassTeachersBody: IGetClassTeachersBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId: selectClasstecaher
    };

    const GetStudentsToTransferMarksBody: IGetStudentsToTransferMarksBody = {
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId,
        "asStandardDivisionId": selectClasstecaher,
        "asName": Title,
        "asEndIndex": 20,
        "asStartRowIndex": 0
    };

    const GetOptionalSubjectsForMarksTransferBody: IGetOptionalSubjectsForMarksTransferBody = {
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId,
        "asStandardDivisionId": 1266
    };

    const TransferOptionalSubjectMarksBody: ITransferOptionalSubjectMarksBody = {
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId,
        "asUserId": 4463,
        "asStudentTransferMarksXml": "<ArrayOfTransferSubjectMarksInfo xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><TransferSubjectMarksInfo><StudentId>37608</StudentId><StandardDivisionId>1266</StandardDivisionId><SubjectId>2353</SubjectId><SubjectGroupId>0</SubjectGroupId></TransferSubjectMarksInfo><TransferSubjectMarksInfo><StudentId>37608</StudentId><StandardDivisionId>1266</StandardDivisionId><SubjectId>2352</SubjectId><SubjectGroupId>0</SubjectGroupId></TransferSubjectMarksInfo></ArrayOfTransferSubjectMarksInfo>"
    };

    const ClickSelctTecher = (value) => {
        setselectClasstecaher(value);
    };

    const clickSearch = (value) => {
        if (typeof value === 'string' && value.trim() !== '') {
            setTitle(value);
        }
    };
    const Changevalue = (value) => {
        // setitemPublish(value);
        setSubjectList(value);
    };

    const ExamResultBase = (value) => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
    };

    const handleTitle = (value) => {
        setTitle(value);
    };

    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));
    }, []);

    useEffect(() => {
        dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
    }, [selectClasstecaher]);

    useEffect(() => {
        dispatch(CDAOptionalSubjectsForMarksTransfer(GetOptionalSubjectsForMarksTransferBody));
    }, []);

    useEffect(() => {
        dispatch(CDATransferOptionalSubjectMarks(TransferOptionalSubjectMarksBody));
    }, []);

    return (
        <Container maxWidth={"xl"}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Transfer Optional Subject Marks',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Box sx={{ background: 'white' }}>

                            <Box sx={{ background: 'white' }}>
                                <SearchableDropdown
                                    label={"Select Teacher"}
                                    sx={{ pl: 0, minWidth: '350px' }}
                                    ItemList={USClassTeacherList}
                                    onChange={ClickSelctTecher}
                                    defaultValue={selectClasstecaher}
                                    size={"small"}
                                />
                            </Box>

                        </Box>

                        <Box sx={{ background: 'white' }}>
                            <TextField
                                sx={{ pl: 0, minWidth: '350px' }}
                                fullWidth
                                label="Student Name / Reg.No. :"
                                value={Title}
                                variant={'standard'}
                                onChange={(e) => {
                                    handleTitle(e.target.value);
                                }}
                            />
                        </Box>

                        <Button onClick={clickSearch} variant="contained" >
                            Search
                        </Button>

                        <Box>
                            <Tooltip title={"Displays all available lesson plans."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] }
                                    }}
                                >
                                    <QuestionMarkIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>


                    </>
                }

            />
            <SubjectMarkList
                ItemList={USStudentsToTransferMarks}
                HeaderArray={HeaderPublish}
                onChange={Changevalue}
                clickchange={""}
                clickTitle={""}
            />

            <Notes NoteDetail={Note1} Header={Hedaer1} />
            <Notes NoteDetail={Note2} Header={Hedaer2} />
            <Notes NoteDetail={Note3} Header={Hedaer3} />
            <Notes NoteDetail={Note4} Header={Hedaer4} />

            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonPrimary
                    variant="contained"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        marginRight: '10px'
                    }}

                >
                    TRANSFER
                </ButtonPrimary>
                <ButtonPrimary
                    variant="contained"
                    style={{
                        backgroundColor: 'Red',
                        color: 'White',
                        marginRight: '10px'
                    }}
                    onClick={ExamResultBase} >
                    BACK
                </ButtonPrimary>

            </Box>

        </Container>
    );
};

export default TransferOptionalSubjectMarks;
