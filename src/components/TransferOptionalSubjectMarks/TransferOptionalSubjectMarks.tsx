import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, Container, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetClassTeachers, CDAOptionalSubjectsForMarksTransfer, CDAStudentsToTransferMarks, CDATransferOptionalSubjectMarks } from 'src/requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const TransferOptionalSubjectMarks = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const UserId = Number(localStorage.getItem('UserId'));
    const [selectClasstecaher, setselectClasstecaher] = useState();
    const [Title, setTitle] = useState('');

    const USClassTeacherList = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers);
    const USStudentsToTransferMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks);
    const USOptionalSubjectsForMarksTransfer = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer);
    const ISTransferOptionalSubjectMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks);


    const GetClassTeachersBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        "asTeacherId": 0
    };

    const GetStudentsToTransferMarksBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asStandardDivisionId": 1266,
        "asName": Title,
        "asEndIndex": 20,
        "asStartRowIndex": 0
    };

    const GetOptionalSubjectsForMarksTransferBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asStandardDivisionId": 1266
    };

    const TransferOptionalSubjectMarksBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
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

    const handleTitle = (value) => {
        setTitle(value);
    };

    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));
    }, []);

    useEffect(() => {
        dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
    }, []);

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
                                label="Title"
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

        </Container>
    );
};

export default TransferOptionalSubjectMarks;
