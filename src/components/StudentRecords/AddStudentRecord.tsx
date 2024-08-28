import { AddComment, Check, EditTwoTone, QuestionMark, Save, Send } from '@mui/icons-material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IGetStudentRecordCommentBody, IGetStudentRecordDataBody, IMarkRecordAsReadBody, ISaveStudentRecordBody, ISubmitStudentRecordBody, ISubmitStudentRecordCommentBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { GetMarkRecordAsRead, GetSaveStudentRecord, GetStudentRecordCommentEdit, GetStudentRecordData, GetSubmitStudentRecord, GetSubmitStudentRecordComment, resetGetMarkRecordAsRead, resetGetSaveStudentRecord, resetGetSubmitStudentRecord } from 'src/requests/StudentRecords/RequestAddStudentRecords';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import StudentRecordComment from './StudentRecordComment';
import AddStudentRecordList from './StudentRecordList';
const AddStudentRecord = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ItemList, setItemList] = useState([]);
    console.log(ItemList, "ItemList");
    const [errorItemlist, seterrorItemlist] = useState('')
    const { Action, SchoolWiseStudentIdparam, SelectTeacher } = useParams()
    const [ActionMode, setActionMode] = useState(Action)
    const [Open, setOpen] = useState(false);
    const [Comment, setComment] = useState('');
    const [errorMessage, seterrorMessage] = useState('')
    const [ParameterDetails, setParameterDetails] = useState([])
    const [ADate, setADate]: any = useState(new Date().toISOString().split('T')[0]);
    const [dateError, setDateError] = useState('');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [CommentData, setCommentData] = useState([])
    const listGeneralDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listGeneralDetails
    );
    const listCommentDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listCommentDetails
    );
    console.log(listCommentDetailsUS, "listCommentDetailsUS");

    const QueAnsList = useSelector(
        (state: RootState) => state.AddStudentRecords.QueAnsList
    );
    const listSiblingsDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listSiblingsDetails
    )
    const listParameterDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listParameterDetails
    )
    // console.log(listParameterDetailsUS, "listParameterDetailsUS");

    const SubmitStudentRecordCommentUS = useSelector(
        (state: RootState) => state.AddStudentRecords.submitStudentRecordCommentmsg
    );
    const GetStudentRecordCommentUS = useSelector(
        (state: RootState) => state.AddStudentRecords.getstudentrecordcomment
    );
    const SaveStudentRecordUS = useSelector(
        (state: RootState) => state.AddStudentRecords.savestudentrecordmsg
    );
    const MarkRecordAsReadUS = useSelector(
        (state: RootState) => state.AddStudentRecords.markrecordAsreadmsg
    );
    useEffect(() => {
        if (QueAnsList.length > 0) {
            setItemList(QueAnsList)
        }
        else {
            setItemList([])
        }
    }, [QueAnsList])
    const ChangeItem = (value, QuestionId) => {
        setItemList(ItemList.map((item, i) => {
            return {
                ...item,
                QueAnsList: QuestionId == item.QuestionId ?
                    value : item.QueAnsList

            }
        }))
    }
    useEffect(() => {
        setCommentData(listCommentDetailsUS)
    }, [listCommentDetailsUS])
    useEffect(() => {
        dispatch(GetStudentRecordData(GetStudentRecordDataResult));
    }, []);
    // useEffect(() => {
    //     dispatch(GetSubmitStudentRecordComment(SubmitStudentRecordCommentResult))
    // }, []);
    useEffect(() => {
        dispatch(GetStudentRecordCommentEdit(GetStudentRecordCommentEditResult))
    }, []);
    // useEffect(() => {
    //     dispatch(GetSaveStudentRecord(SaveStudentRecordResult))
    // }, []);
    useEffect(() => {
        if (SaveStudentRecordUS !== '') {
            toast.success(SaveStudentRecordUS, { toastId: 'success1' });
            dispatch(resetGetSaveStudentRecord());
            dispatch(GetStudentRecordData(GetStudentRecordDataResult));
        }
    }, [SaveStudentRecordUS])
    useEffect(() => {
        if (MarkRecordAsReadUS !== '') {
            toast.success(MarkRecordAsReadUS, { toastId: 'success1' });
            dispatch(resetGetMarkRecordAsRead());
            dispatch(GetStudentRecordData(GetStudentRecordDataResult));
        }
    }, [MarkRecordAsReadUS])
    useEffect(() => {
        if (GetStudentRecordCommentUS !== '') {
            toast.success(GetStudentRecordCommentUS, { toastId: 'success1' });
            dispatch(resetGetSubmitStudentRecord());
            dispatch(GetStudentRecordData(GetStudentRecordDataResult));
        }
    }, [GetStudentRecordCommentUS])

    const getXML = () => {
        let sXML =
            "<ArrayOfKeyValue xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>";
        ItemList.map((ParentItem) => {
            ParentItem.QueAnsList.map((Item) => {
                sXML =
                    sXML +
                    '<KeyValue><Key>' +
                    Item.Id +
                    '</Key><Value>' +
                    Item.Answer +
                    '</Value></KeyValue>';
            })
        });
        sXML = sXML + '</ArrayOfKeyValue>';

        return sXML;
    };

    const GetMarkRecordAsReadResult: IMarkRecordAsReadBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam)
    }

    const Getsubmitstudentrecord: ISubmitStudentRecordBody = {
        asSchoolId: asSchoolId,
        asUpdatedById: asUserId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asCommentId: 0,
        asSubmitAllComments: "false",
        asAcademicYearId: asAcademicYearId
    }
    const GetStudentRecordDataResult: IGetStudentRecordDataBody = {
        asSchoolId: asSchoolId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asAcademicYearId: asAcademicYearId,
        asIsReadMode: "false",
        asUserId: asUserId

    }
    const SubmitStudentRecordCommentResult: ISubmitStudentRecordCommentBody = {
        asSchoolId: asSchoolId,
        asUpdatedById: asUserId,     /*4463*/
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asCommentId: 0,
        asSubmitAllComments: 1,
        asAcademicYearId: asAcademicYearId
    }
    const GetStudentRecordCommentEditResult: IGetStudentRecordCommentBody = {
        asSchoolId: asSchoolId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asCommentId: Number('')    /* 3279*/

    }
    const [commentid, setcommentid] = useState('')
    const ClickOpenDialogbox = (Id) => {
        setOpen(true);
        setcommentid(Id)
    };
    const ClickCloseDialogbox = () => {
        setOpen(false);
    };
    const IsFormValid = () => {
        let returnVal = true;
        let IsAns = false;
        ItemList.map((Item) => {
            Item.QueAnsList.map((Item) => {
                if (Item.Answer !== '') {
                    IsAns = true;
                }
            });
        });
        console.log(IsAns, "IsAns");
        if (!IsAns) {
            seterrorItemlist("Please enter details for at least one field.");
            returnVal = false;
        } else {
            seterrorItemlist("");
        }
        return returnVal;
    };
    const onClickSave = () => {
        if (IsFormValid()) {
            const SaveStudentRecordResult: ISaveStudentRecordBody = {
                asSchoolId: asSchoolId,
                asUpdatedById: asUserId,
                asStudentId: Number(SchoolWiseStudentIdparam),
                asDataXML: getXML(),
                Date: ADate    /*"2011-05-21"*/
            }
            dispatch(GetSaveStudentRecord(SaveStudentRecordResult))
            setActionMode('Edit')
        }
    };
    const onClickSubmit = () => {
        dispatch(GetSubmitStudentRecord(Getsubmitstudentrecord))
    };

    const IsEditingAllowed = () => {
    }

    const onClickSubmitComment = () => {
        dispatch(GetSubmitStudentRecordComment(SubmitStudentRecordCommentResult))
    };
    const onClickMarkAsRead = () => {
        dispatch(GetMarkRecordAsRead(GetMarkRecordAsReadResult))
    };
    const handleDateChange = (selectedDate: string) => {
        let isError = false;
        // if (!selectedDate) {
        //     setADate(''); // Reset AssignedDate state if needed
        //     return;
        setADate(selectedDate);
        // Update dateState with selectedDate
        if (selectedDate && dateError !== '') {
            setDateError('');
        } else {
            const selectedDate = new Date(ADate);
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                setDateError('Future date is not allowed.');
                isError = true;
            } else {
                setDateError('');
            }

        }

    };

    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };
    const rowStyle = {
        height: '0.5em 1.5em', // Ensure auto height to adjust based on content
    };
    const isSubmitted = listCommentDetailsUS.length > 0 && listCommentDetailsUS[0].IsSubmitted === "True";
    const clickEdit = () => {
    }
    const disableSave = () => {
        let returnVal = true
        //enable when default comment not present
        if (listCommentDetailsUS.length == 0) {
            returnVal = false
        }
        else {
            listCommentDetailsUS.map((item) => {
                if (item.IsDefaultComment == "True") {
                    //enable when default comment is not submitted
                    if (item.IsSubmitted == "False") {
                        returnVal = false
                    }
                }
            })
        }
        return returnVal
    }
    const disableSubmit = () => {
        let returnVal = true
        listCommentDetailsUS.map((item) => {
            if (item.IsDefaultComment == "True") {
                //enable when default comment is not submitted
                if (item.IsSubmitted == "False") {
                    returnVal = false
                }
            }
        })
        return returnVal
    }
    const disableAddComment = () => {
        let returnVal = true
        listCommentDetailsUS.map((item) => {
            if (item.IsDefaultComment == "True") {
                //enable when default comment is not submitted
                if (item.IsSubmitted == "True") {

                    returnVal = false
                }
            }
        })

        return returnVal
    }
    const disableSubmitComment = () => {
        let returnVal = true
        listCommentDetailsUS.map((item) => {
            if (item.IsDefaultComment == "False") {
                //enable when any non-comment is not submitted
                if (item.IsSubmitted == "False") {
                    returnVal = false
                }
            }
        })
        return returnVal
    }


    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Student Record List',
                        path: '/extended-sidebar/Teacher/StudentRecords'
                    },
                    {
                        title: 'Student Record',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Datepicker
                            DateValue={ADate}
                            onDateChange={handleDateChange}
                            label={'Date'}
                            size={"small"}

                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={"Add / Submit student details."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] },
                                        marginRight: '-4px',
                                        // marginLeft: '8px', 
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        < Box >
                            <Tooltip title={'Save'}>
                                <span>
                                    <IconButton
                                        sx={{
                                            backgroundColor: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={onClickSave}
                                        disabled={disableSave()}
                                    >
                                        <Save />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>

                        <Box>
                            <Tooltip title={'Submit'}>
                                <span>
                                    <IconButton
                                        sx={{
                                            backgroundColor: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={onClickSubmit}
                                        disabled={disableSubmit()}
                                    >
                                        <Check />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Add Comment'}>
                                <span>
                                    <IconButton
                                        sx={{
                                            backgroundColor: blue[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: blue[600]
                                            }
                                        }}
                                        onClick={ClickOpenDialogbox}
                                        disabled={disableAddComment()}
                                    >
                                        <AddComment />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Submit Comment'}>
                                <span>
                                    <IconButton
                                        sx={{
                                            backgroundColor: red[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: red[600]
                                            }
                                        }}
                                        onClick={onClickSubmitComment}
                                        disabled={disableSubmitComment()}
                                    >
                                        <Send />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                        {disableSave() && (
                            <Box>
                                <Tooltip title={'Mark as read'}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                backgroundColor: green[500],
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: green[600]
                                                }
                                            }}
                                            onClick={onClickMarkAsRead}
                                            disabled={disableSave()}
                                        >
                                            <MarkEmailReadIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>)}
                    </>
                }
            />
            <Grid item xs={12}>
                <Typography variant={"h5"} sx={{ color: 'red' }}>
                    {dateError && (
                        <Box sx={{ mt: 1, position: 'absolute', bottom: '-25px' }}>
                            <ErrorMessage1 Error={dateError}></ErrorMessage1>
                        </Box>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h5"} sx={{ color: 'red' }}>
                    {errorItemlist}
                </Typography>
            </Grid>
            <Box     sx={{ p: 1, color: 'red', background: 'white', fontWeight: 'bold' }}>
                The following information is for professional use and will be handled confidentially. This information will assist the counsellor for the child's evaluation.<br></br>
                Please complete the following questions as fully and accurately as possible. If you are unable to complete a question you may consult other subject teachers for the better understanding of the child.
            </Box>
            <Box  sx={{ p: 1, background: 'white' }}>
                <Typography variant="h4" align="center" color="blue" sx={{ textAlign: 'center', backgroundColor: '#F0F0F0', padding: 1, borderRadius: 2, color: '#324b84' }} >
                    General Information
                </Typography>
            </Box>
            <Box mb={1} sx={{ p: 1, background: 'white' }}>
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                    <TableBody>
                        {listGeneralDetailsUS.map((item, i) => (
                            <React.Fragment key={i}>
                                <TableRow sx={{ bgcolor: 'white' }} >
                                    <TableCell ><b>Name of the student : </b> {item.Text1}</TableCell>
                                    <TableCell sx={cellStyle}><b>Date of Birth : </b> {item.Text2}</TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor:'#F0F0F0',...rowStyle}}>
                                    <TableCell sx={cellStyle} colSpan={2}><b>Family Details</b></TableCell>
                                </TableRow>
                                <TableRow sx={{ ...rowStyle, bgcolor: 'white' }}>
                                    <TableCell sx={cellStyle}><b>Mother Name : </b> {item.Text3}</TableCell>
                                    <TableCell sx={cellStyle}><b>Mother Occupation : </b> {item.Text6}</TableCell>
                                </TableRow>
                                <TableRow sx={{ ...rowStyle, bgcolor: 'white' }}>
                                    <TableCell sx={cellStyle}><b>Father Name : </b> {item.Text4}</TableCell>
                                    <TableCell sx={cellStyle}><b>Father Occupation : </b> {item.Text5}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                        {(listSiblingsDetailsUS.length > 0) && (
                            <TableRow sx={rowStyle}>
                                <TableCell sx={cellStyle} colSpan={2}><b>Please list all siblings</b></TableCell>
                            </TableRow>)}
                        {(listSiblingsDetailsUS.length > 0) && (
                            <Table sx={{ minWidth: 500, width: '70%', height: 'auto' }} aria-label="simple table">

                                <TableHead>
                                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                        <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Name</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Sex</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Age</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Grade</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listSiblingsDetailsUS.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text1}</TableCell>
                                            <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text2}</TableCell>
                                            <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text3}</TableCell>
                                            <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text4}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>)}
                    </TableBody>
                </Table>
            </Box>
            <AddStudentRecordList ItemList={ItemList} IsEditiable={isSubmitted}
                ChangeItem={ChangeItem} />

            <Box sx={{ backgroundColor: 'white', pt: 2}}>
                <Typography variant={"h4"} pl={2} >
                    Comment(s)
                </Typography></Box>
            {listCommentDetailsUS.length === 0 ? (
                <Box sx={{ backgroundColor: 'white', p: 1 }}>

                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No comment found.
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ backgroundColor: 'white', px: 2 , py:1}}>
                    {/* <StudentRCommentList commentdetails={CommentData} /> */}
                    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                        <TableBody>
                            {listCommentDetailsUS.map((item, i) => (
                                <React.Fragment key={i}>
                                    <TableRow sx={{ ...rowStyle, backgroundColor: '#F0F0F0' }}>
                                        <TableCell sx={cellStyle} style={{ color: '#38548A' }}><b>Date : </b> {item.Date}</TableCell>
                                        <TableCell sx={cellStyle} style={{ color: '#38548A', }}><b>Read By Principal : </b> {item.IsCommentReadByPrincipal}</TableCell>
                                        <TableCell sx={cellStyle} style={{ color: '#38548A' }}><b>Read By Counsellor : </b> {item.IsCommentReadByConsellor}</TableCell>
                                        <TableCell sx={cellStyle} style={{ color: '#38548A' }}><b>Read By Class Teacher : </b> {item.IsCommentReadByClassTeacher}</TableCell>
                                        {/* {(listCommentDetailsUS.length > 0 && listCommentDetailsUS[0].IsDefaultComment == "True" ||
                                            listCommentDetailsUS[0].IsSubmitted == "True" &&
                                             */}
                                        {(listCommentDetailsUS.length > 0 &&
                                            (item.IsDefaultComment === "False" || item.IsSubmitted === "False")) && (
                                                <Tooltip title={"Edit"}>
                                                    <EditTwoTone onClick={(e) => ClickOpenDialogbox(item.Id)}
                                                        sx={{
                                                            color: '#38548A',
                                                            //  backgroundColor: grey[500],
                                                            '&:hover': {
                                                                color: '#38548A',
                                                                backgroundColor: 'grey[200]'
                                                            }
                                                        }} />

                                                </Tooltip>)}
                                    </TableRow>
                                    <TableRow sx={{ ...rowStyle, bgcolor: 'white', p: 1, }}>
                                        <TableCell sx={cellStyle} colSpan={2}><b>Added By : </b>{item.UserName}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ ...rowStyle, bgcolor: 'white', }}>
                                        <TableCell sx={cellStyle} colSpan={2}><b>Comment : </b>{item.Comment}</TableCell>
                                    </TableRow>
                                    {(listCommentDetailsUS.length > 0 &&
                                        (item.IsDefaultComment === "False")) && (
                                            <TableRow sx={{ ...rowStyle, bgcolor: 'white', }}>
                                                <TableCell sx={cellStyle} colSpan={2}><b>Lecture Name : </b>{item.LectureName}</TableCell>
                                            </TableRow>
                                        )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
            {/* <AddStudentRAccordionList exampleLessonDetails={exampleLessonDetails}
                onTextChange={onTextChange} Action={Action}
                IsEditingAllowed={IsEditingAllowed()} /> */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                {Open && (
                    <StudentRecordComment
                        open={Open}
                        setOpen={setOpen}
                        ClickCloseDialogbox={ClickCloseDialogbox}
                        // CommentId={(listCommentDetailsUS.length > 0 &&
                        //     (item.Id))}
                        SchoolWiseStudentIdparam={SchoolWiseStudentIdparam}
                        CommentId={commentid}
                    />
                )}
            </Box>
        </Box >
    )
};

export default AddStudentRecord;