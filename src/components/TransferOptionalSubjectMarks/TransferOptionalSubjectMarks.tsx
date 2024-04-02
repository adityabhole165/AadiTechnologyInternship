import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, ButtonGroup, Container, IconButton, TextField, Tooltip } from '@mui/material';
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
    const [SearchText, setSearchText] = useState('');


    const USClassTeacherList = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers);
    const USStudentsToTransferMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks);
    const USStudentsToTransferMarks1: any = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks1);

    const USOptionalSubjectsForMarksTransfer: any = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer);
    const ISTransferOptionalSubjectMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks);
    const [StudentsList, setStudentsList] = useState([
        USStudentsToTransferMarks
    ]);



    const [Itemlist, setItemlist] = useState([USOptionalSubjectsForMarksTransfer]);
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
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: selectClasstecaher,
        asName: SearchText,
        asEndIndex: 20,
        asStartRowIndex: 0
    };

    const GetOptionalSubjectsForMarksTransferBody: IGetOptionalSubjectsForMarksTransferBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: asStandardDivisionId
    };


    const getXML = () => {
        let sXML =
            '<ArrayOfTransferSubjectMarksInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

        Itemlist.map((Item) => {
            sXML +=
                '<TransferSubjectMarksInfo>' +
                '<StudentId>' + Item.StudentId + '</StudentId>' +
                '<StandardDivisionId>' + Item.StandardDivisionId + '</StandardDivisionId>' +
                '<SubjectId>' + Item.SubjectId + '</SubjectId>' +
                '<SubjectGroupId>' + Item.SubjectGroupId + '</SubjectGroupId>' +
                '</TransferSubjectMarksInfo>';
        });

        sXML += '</ArrayOfTransferSubjectMarksInfo>';

        console.log('XMLLLLLLLL', sXML);

        return sXML;
    };


    const TransferOptionalSubjectMarksBody: ITransferOptionalSubjectMarksBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: UserId,
        asStudentTransferMarksXml: getXML()
    };






    const ClickSelctTecher = (value) => {
        setselectClasstecaher(value);
    };
    const [page, setPage] = useState(1);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const itemsPerPage = 20;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const newGetStudentsToTransferMarksBody: IGetStudentsToTransferMarksBody = {
            ...GetStudentsToTransferMarksBody,
            asStartRowIndex: startIndex,
            asEndIndex: endIndex
        };

        dispatch(CDAStudentsToTransferMarks(newGetStudentsToTransferMarksBody));
    }, [page]);




    const changeSearchText = () => {
        if (SearchText === '') {
            setStudentsList(USStudentsToTransferMarks);
        } else {
            setStudentsList(
                USStudentsToTransferMarks.filter((item) => {
                    return (
                        item.Text3.toLowerCase().includes(SearchText.toLowerCase()) ||
                        item.Text1.toLowerCase().includes(SearchText.toLowerCase())
                    );
                })
            );
        }
    };


    const SearchNameChange = (value) => {
        setSearchText(value);
    };


    useEffect(() => {
        setStudentsList(USStudentsToTransferMarks);
    }, [USStudentsToTransferMarks, selectClasstecaher]);

   

    useEffect(() => {
        if (USClassTeacherList.length > 0) {
            setselectClasstecaher(USClassTeacherList[0].Value);
        }
      }, [USClassTeacherList]);
    

    const Changevalue = (value) => {

        setSubjectList(value);
    };

    const ExamResultBase = (value) => {
        navigate('/extended-sidebar/Teacher/ExamResultBase');
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
                                    sx={{ minWidth: '300px' }}
                                    ItemList={USClassTeacherList}
                                    onChange={ClickSelctTecher}
                                    label={'Select Teacher:'}
                                    defaultValue={selectClasstecaher}
                                    mandatory
                                    size={"small"}
                                />



                            </Box>

                        </Box>

                        <Box sx={{ background: 'white' }}>
                            <TextField
                                sx={{ pl: 0, minWidth: '350px' }}
                                fullWidth
                                label="Student Name / Reg.No. :"
                                value={SearchText}
                                variant={'standard'}
                                onChange={(e) => {
                                    SearchNameChange(e.target.value);
                                }}
                            />
                        </Box>


                        {StudentsList.length > 0 ? (
                            <Button onClick={changeSearchText} variant="contained">
                                Search
                            </Button>
                        ) : (
                            <Button onClick={changeSearchText} variant="contained" disabled>
                                Search
                            </Button>
                        )}


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


            {StudentsList.length > 0 ? (
                <Box sx={{ textAlign: 'center' }}>
                    <b>{`${startIndex} To ${endIndex} Out Of 39 Records`}</b>
                </Box>
            ) : (

                <span></span>
            )}



            <SubjectMarkList
                ItemList={StudentsList}
                HeaderArray={HeaderPublish}
                onChange={Changevalue}
                clickchange={""}
                clickTitle={""}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                Select a page:
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button value={"1"} onClick={() => handlePageChange("1")}>1</Button>
                    <Button value={"2"} onClick={() => handlePageChange("2")}>2</Button>

                </ButtonGroup>
            </Box>

            <Notes NoteDetail={Note1} Header={Hedaer1} />
            <Notes NoteDetail={Note2} Header={Hedaer2} />
            <Notes NoteDetail={Note3} Header={Hedaer3} />
            <Notes NoteDetail={Note4} Header={Hedaer4} />

            <Box style={{ display: 'flex', justifyContent: 'center' }}>


                {StudentsList.length > 0 ? (
                    <Button variant="contained" sx={{
                        backgroundColor: 'green',
                        color: 'white'
                    }}>
                        TRANSFER
                    </Button>
                ) : (
                    <Button variant="contained" disabled sx={{
                        backgroundColor: 'red',
                        color: 'white'
                    }}>
                        TRANSFER
                    </Button>
                )}
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: 'Red',
                        color: 'White',
                        marginRight: '10px'
                    }}
                    onClick={ExamResultBase} >
                    BACK
                </Button>

            </Box>

        </Container>
    );
};

export default TransferOptionalSubjectMarks;
