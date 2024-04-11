import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, IconButton, Pagination, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IGetClassTeachersBody, IGetOptionalSubjectsForMarksTransferBody, IGetStudentsToTransferMarksBody, ITransferOptionalSubjectMarksBody } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectMarkList from 'src/libraries/ResuableComponents/SubjectMarkList';
import { CDAGetClassTeachers, CDAOptionalSubjectsForMarksTransfer, CDAStudentsToTransferMarks, CDATransferOptionalSubjectMarks, CDAresetMessage } from 'src/requests/TransferOptionalSubjectMarks/ReqTransferOptionalSubjectMarks';
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
    const [errorMessage, setErrorMessage] = useState('');
    const [IsDirty, setIsDirty] = useState(false);


    const USClassTeacherList = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISGetClassTeachers);
    const USStudentsToTransferMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks);
    const USStudentsToTransferMarks1: any = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISStudentsToTransferMarks1);

    const USOptionalSubjectsForMarksTransfer: any = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISOptionalSubjectsForMarksTransfer);
    const ISTransferOptionalSubjectMarks = useSelector((state: RootState) => state.TransferOptionalSubjectMarks.ISTransferOptionalSubjectMarks);

    const [StudentsList, setStudentsList] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [OptionalSubjects, setOptionalSubjects] = useState([])
    const [ParentOptionalSubjects, setParentOptionalSubjects] = useState([])

    useEffect(() => {
        setIsDirty(false)
        setSelectedStudents(USOptionalSubjectsForMarksTransfer);
    }, [USOptionalSubjectsForMarksTransfer]);

    const HeaderPublish = [
        { Id: 1, Header: ' Reg. No.	' },
        { Id: 2, Header: 'Roll No. 	' },
        { Id: 3, Header: '	Student Name' },
        { Id: 4, Header: 'Current Applicable Subjects' }
    ];

    const Note1 = [
        'At least 2 optional subjects should have been configured to transfer marks.'
    ];
    const Header1 = ['Note1 :'];

    const Note2 = [
        'If marks are not assigned to current subject(s) for selected student and if you change to new subject(s) then only new subject(s) will be assigned to student.'
    ];
    const Header2 = ['Note2 :'];

    const Note3 = [
        '	If marks are assigned to current subject(s) for selected student and if you change to new subject(s) then along with new subject(s) assignment, marks of current subject(s) will be transferred to new subject(s).'
    ];
    const Header3 = ['Note3 :'];

    const Note4 = [
        'Marks cannot be transferred across the subject groups.'
    ];
    const Header4 = ['Note4 :'];



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
        asStandardDivisionId: selectClasstecaher
    };


    const getSubjectId = () => {
        let returnVal = []
        returnVal = StudentsList.map((Item) => {
            if (Item.IsActive) {
                return {
                    SubjectId: Item.SubjectId,
                    SubjectGroupId: Item.SubjectGroupId
                }
            }
        })
        return returnVal;
    }
    const getXML = () => {
        let sXML =
            '<ArrayOfTransferSubjectMarksInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
        StudentsList.map((Item, i) => {
            if (Item.IsActive) {
                OptionalSubjects.map((Obj, Index) => {
                    if (Obj.isActive) {
                        sXML +=
                            '<TransferSubjectMarksInfo>' +
                            '<StudentId>' + Item.StudentId + '</StudentId>' +
                            '<StandardDivisionId>' + selectClasstecaher + '</StandardDivisionId>' +
                            '<SubjectId>' + Obj.SubjectId + '</SubjectId>' +
                            '<SubjectGroupId>' + Obj.SubjectGroupId + '</SubjectGroupId>' +
                            '</TransferSubjectMarksInfo>';
                    }
                });
            }
        });

        sXML += '</ArrayOfTransferSubjectMarksInfo>';


        return sXML;
    };





    useEffect(() => {
        let IsExists = false

        let arr = []
        setOptionalSubjects(USOptionalSubjectsForMarksTransfer)
        USOptionalSubjectsForMarksTransfer.map((Item) => {
            IsExists = false
            arr.map((ParentItem) => {
                if (ParentItem.ParentOptionalSubjectId == Item.ParentOptionalSubjectId) {
                    IsExists = true
                }
            })
            if (IsExists == false)
                arr.push({
                    ParentOptionalSubjectId: Item.ParentOptionalSubjectId,
                    OptionalSubjectName: Item.OptionalSubjectName,
                })

        })
        setParentOptionalSubjects(arr)
    }, [USOptionalSubjectsForMarksTransfer])

    const SubjectSelection = (subjectId) => {
        setIsDirty(true)
        setOptionalSubjects(OptionalSubjects.map((Item) => {
            return Item.SubjectId == subjectId ?
                { ...Item, isActive: !Item.isActive } :
                Item
        }))
    };








    const ClickSelctTecher = (value) => {
        if (selectClasstecaher != '') {
            const confirmMessage = "Modified data on the current page will be lost. Do you want to continue?";
            let confirmed = false
            if (IsDirty) {
                confirmed = window.confirm(confirmMessage);

                if (confirmed) {
                    setselectClasstecaher(value);
                }
            }
            else
                setselectClasstecaher(value);
        } else {
            setselectClasstecaher(value);
        }
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
        setIsDirty(false)

        setStudentsList(USStudentsToTransferMarks);
    }, [USStudentsToTransferMarks]);



    useEffect(() => {
        if (USClassTeacherList.length > 0) {
            setselectClasstecaher(USClassTeacherList[0].Value);
        }

    }, [USClassTeacherList]);


    const Changevalue = (value) => {
        setIsDirty(true)
        setStudentsList(value);
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
    }, [selectClasstecaher]);


    const TransferOptionalSubjectMarksBody: ITransferOptionalSubjectMarksBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: UserId,
        asStudentTransferMarksXml: getXML()
    };
    const clickTransfer = () => {
        let arrParent = [];
        ParentOptionalSubjects.forEach((Item) => {
            if (!OptionalSubjects
                .filter((childItem) => childItem.ParentOptionalSubjectId === Item.ParentOptionalSubjectId)
                .some((subject) => subject.isActive)
            ) {
                arrParent.push(Item.OptionalSubjectName);
            }
        });

        if (!StudentsList.some((Item) => Item.IsActive)) {
            alert("At least one student subject should be selected.");
        } else if (arrParent.length > 0) {
            setErrorMessage("At least one subject should be selected for optional subject " + arrParent.join(", "));
        } else {
            dispatch(CDATransferOptionalSubjectMarks(TransferOptionalSubjectMarksBody));
        }
    }

    useEffect(() => {
        if (ISTransferOptionalSubjectMarks != '') {
            toast.success(ISTransferOptionalSubjectMarks);
            dispatch(CDAresetMessage());
            dispatch(CDAOptionalSubjectsForMarksTransfer(GetOptionalSubjectsForMarksTransferBody));
            dispatch(CDAStudentsToTransferMarks(GetStudentsToTransferMarksBody));
        }


    }, [ISTransferOptionalSubjectMarks]);
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' },
                    { title: 'Transfer Optional Subject Marks', path: '/extended-sidebar/Teacher/TransferOptionalSubjectMarks' }

                ]}
                rightActions={
                    <>
                        <SearchableDropdown
                            sx={{ minWidth: '200px' }}
                            ItemList={USClassTeacherList}
                            onChange={ClickSelctTecher}
                            label={'Select Teacher:'}
                            defaultValue={selectClasstecaher}
                            mandatory
                            size={"small"}
                        />
                        <TextField
                            sx={{ margin: 2, minWidth: '200px' }}
                            fullWidth
                            label="Student Name / Reg.No. :"
                            value={SearchText}
                            variant={'outlined'}
                            size={"small"}
                            onChange={(e) => {
                                SearchNameChange(e.target.value);
                            }}
                        />
                        {StudentsList.length > 0 ? (
                            <Button onClick={changeSearchText} variant="contained">
                                Search
                            </Button>
                        ) : (
                            <Button variant="contained" disabled>
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

            {errorMessage && (
                <>
                    <Typography sx={{ color: 'red' }}>
                        Please fix following error(s):</Typography>
                    <Typography sx={{ color: 'red' }}>
                        {errorMessage}
                    </Typography>
                </>
            )}

            {StudentsList.length > 0 ? (
                <Paper sx={{ padding: 1, marginBottom: '10px' }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>Important Notes</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                            <Alert variant="filled" severity="info">{Note1}</Alert>
                            <Alert variant="filled" severity="info">{Note2}</Alert>
                            <Alert variant="filled" severity="info">{Note3}</Alert>
                            <Alert variant="filled" severity="info">{Note4}</Alert>

                        </AccordionDetails>
                    </Accordion>

                </Paper>

            ) : (
                <span></span>
            )}

            <Box mb={1} sx={{ p: 1, background: 'white' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {/* First Box */}
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', width: "1400px" }}>
                        {StudentsList.length > 0 ? (
                            <SubjectMarkList
                                ItemList={StudentsList}
                                HeaderArray={HeaderPublish}
                                clickchange={Changevalue}
                                clickTitle={""}
                            />
                        ) : (
                            // <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', width: "2000px" }}>
                            //     <b>No Record Found.</b>
                            // </Typography>
                            <span></span>
                        )
                        }
                    </Box>

                    {/* Second Box */}

                    {StudentsList.length > 0 ? (
                        <Box sx={{ mt: 1, p: 2, display: 'flex', flexDirection: 'column', width: "320px", height: '200px' }}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                <h3>Optional Subjects</h3>
                                {ParentOptionalSubjects
                                    .map((subject, index) => (
                                        <Accordion key={index}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                {subject.OptionalSubjectName} (Select any 1)
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ul>
                                                    {OptionalSubjects
                                                        .filter((objParent) => { return objParent.ParentOptionalSubjectId == subject.ParentOptionalSubjectId })
                                                        .map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <label>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={subItem.isActive}
                                                                        onChange={() => SubjectSelection(subItem.SubjectId)}
                                                                    />
                                                                    {subItem.SubjectName}
                                                                </label>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                            </Box>
                        </Box>

                    ) : (
                        <span> </span>
                    )
                    }
                </Box>
                {StudentsList.length > 0 ? (
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            Select a page:
                            {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button value={"1"} onClick={() => handlePageChange("1")}>1</Button>
                            <Button value={"2"} onClick={() => handlePageChange("2")}>2</Button>
                        </ButtonGroup> */}
                            <Pagination
                                count={5}
                                variant={"outlined"}
                                shape='rounded' showFirstButton
                                showLastButton
                                onChange={(event, value) => {
                                    handlePageChange(value);
                                }}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            {`${startIndex} To ${endIndex} Out Of 39 Records`}
                        </Box>

                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>No Record Found.</b>
                    </Typography>
                )
                }
            </Box>




            <Box style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                {StudentsList.length > 0 ? (
                    <Button variant="contained" sx={{
                        backgroundColor: 'green',
                        color: 'white'
                    }}
                        onClick={clickTransfer}
                    >
                        TRANSFER
                    </Button>
                ) : (
                    <Button variant="contained" disabled
                        sx={{
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
        </Box>
    );
};

export default TransferOptionalSubjectMarks;
