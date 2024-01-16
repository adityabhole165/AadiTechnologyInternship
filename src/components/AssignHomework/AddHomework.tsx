import React from 'react'
import {
    Box, Checkbox, Grid, TextField,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { ChangeFileIntoBase64, CheckFileValidation } from '../Common/Util'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ISaveHomeworkBody, IGetTeacherSubjectAndClassSubjectBody,IGetHomeworkDetailBody } from "src/interfaces/AssignHomework/IAddHomework";
import { HomeworkSave, SubjectListforTeacher,GetHomeworkDetails } from "src/requests/AssignHomework/requestAddHomework";
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import DropDown from "src/libraries/list/DropDown"
import SingleFile from 'src/libraries/File/SingleFile'
import SubjectList from 'src/libraries/ResuableComponents/SubjectList'
import DynamicList2 from 'src/libraries/list/DynamicList2'
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeworkSubjectList from'src/components/AssignHomework/HomeworkSubjectList'
//import{HomeworkSubjectList} from 'src/components/AssignHomework/HomeworkSubjectList'

const AddHomework = () => {
    const { ClassId, ClassName, TeacherId, TeacherName, SubjectName,Id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [HomeworkS, setHomeworkS] = useState("0")
    const [AssignHomeworkList, setAssignHomeworkList] = useState([])
    const [Status, setStatus] = useState("")
    const [Title, setTitle] = useState('')
    const [Subject, setSubjectName] = useState('')
    const [Subjectlist, setSubjectlist] = useState('')
    const [ErrorSubjectlist, ErrorsetSubjectlist] = useState('')
    const [ErrorTitle, setErrorTitle] = useState('')
    const [SearchText, setSearchText] = useState("")
    const [AssignedDate, setAssignedDate]:any = useState('')
    const [ErrorAssignedDate, setErrorAssignedDate]:any = useState('')
    const [CompleteDate, setCompleteDate] = useState('')
    const [ErrorCompleteDate, setErrorCompleteDate] = useState('')
    const [Attachment, setAttechment] = useState('')
    const [Details, setDetails] = useState('')
    const [File, setFile] = useState('')
    const [ErrorFile, ErrorsetFile] = useState('')
    const [File1, setFile1] = useState('')
    const [ErrorFile1, ErrorsetFile1] = useState('')
    const [HomeworkId, setHomeworkId] = useState('')
    const [ErrorDetails, setErrorDetails] = useState('')
    const [Id1, setId] = useState('')
    const [base64URL, setbase64URL] = useState('');
    const [Errorbase64URL, setErrorbase64URL] = useState('');
    const [base64URL1, setbase64URL1] = useState('');
    const [base64URLError1, setErrorbase64URL1] = useState('');
    const [itemPublish, setitemPublish] = useState([])


    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']
    const ValidFileTypes1 = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']

    const MaxfileSize = 3000000
    const MaxfileSize1 = 3000000

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const asUpdatedById = localStorage.getItem('Id');
    const asTeacherId = sessionStorage.getItem('TeacherId');
    const SiteURL = localStorage.getItem('SiteURL');
    // const asFolderName = localStorage.getItem('FolderName');
    let asFolderName = SiteURL.split('/')[SiteURL.split('/').length-1]


    const SaveHomework = useSelector((state: RootState) => state.AddHomework.SaveHomework);
    //console.log(SaveHomework, "SaveHomework....")
    const ClassSubject = useSelector((state: RootState) => state.AddHomework.Subjectlist);
    //console.log(ClassSubject, "ClassSubject....")

    const HomeworkDetail = useSelector((state: RootState) => state.AddHomework.GetHomeworkDetail);
    console.log(HomeworkDetail, "HomeworkDetail..ssss..")

    const GetTeacherSubjectAndClassSubjectBody: IGetTeacherSubjectAndClassSubjectBody = {
        asSchoolId: asSchoolId,
        aTeacherId: Number(asTeacherId),
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: StandardDivisionId
    }

    useEffect(() => {
        dispatch(SubjectListforTeacher(GetTeacherSubjectAndClassSubjectBody))
    }, []);

    const clickSubjectList = (value) => {
        setSubjectlist(value)
    }
    const ChangeFile = (value) => {
        setFile(value.Name);
        setbase64URL(value.Value);

    };
    const ChangeFile1 = (value) => {
        setFile1(value.Name);
        setbase64URL1(value.Value);

    };
    const SaveFile = () => {
        const HomeworkSaveBody: ISaveHomeworkBody = {
            asTitle: Title,
            asSubjectId: Number(Subjectlist),
            asStandardDivisionId: StandardDivisionId,
            asAttachmentPath: File,
            asDetails: Details,
            asAssignDate: AssignedDate,
            asCompleteByDate: CompleteDate,
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asInsertedById: Number(asTeacherId),
            asFileName: File1,
            asSaveFeature: "Homework",
            asFolderName: asFolderName,
            asBase64String: base64URL,
            asBase64String2: base64URL1
        }
        dispatch(HomeworkSave(HomeworkSaveBody))

    }

    // const SaveFile = () => {
    //     let isError = false;
    //     if (ErrorAssignedDate == '') {
    //          setErrorAssignedDate('Field should not be blank')
    //       isError = true

    //     } else if (CompleteDate == '') {
    //         setErrorCompleteDate('Field should not be blank')
    //       isError = true
    //     }
    //    else if (base64URL == '') {
    //     setErrorbase64URL('Field should not be blank')
    //     isError = true
    //   }
    //   else if (base64URL1 == '') {
    //     setErrorbase64URL1('Field should not be blank')
    //     isError = true
    //   }
    //   else if (Details == '') {
    //     setErrorDetails('Field should not be blank')
    //     isError = true
    //   }

    //     if (!isError) {
    //     dispatch(HomeworkSave(HomeworkSaveBody))
    //     }

    //     // if (!isError) {
    //     //   ResetForm()
    //     // }
    //   }
    useEffect(() => {
        if (SaveHomework != '') {
            toast.success(SaveHomework);

        }
    }, [SaveHomework]);


    const Back = () => {
        navigate('/extended-sidebar/Teacher/AssignHomework')
    }
    // const onSelectDate = (value) => {
    //     setCompleteDate(value)
    //    // dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))
    //   }
    // useEffect(() => {
    //     console.log(HomeworkDetail, "GetStudentDetail")
    //     if (HomeworkDetail !== "") {
    //         setHomeworkId(HomeworkDetail.Id)
    //         setAssignedDate(HomeworkDetail.AssignedDate)
    //         setCompleteDate(HomeworkDetail.CompleteByDate)
    //         setTitle(HomeworkDetail.Title)
    //         setAttechment(HomeworkDetail.AttachmentPath)
    //         setDetails(HomeworkDetail.Details)
    //     }
    // }, [HomeworkDetail]);
    return (
        <>
            <br></br>
            <br></br>
            <PageHeader heading={'Add Homework'} subheading={''} />
            <Grid container>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={3}>
                        <Typography fontSize={'10px'} >Class :</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {/* <Box sx={{ display: "flex", alignItems: "center", padding: "15px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                            <Typography fontSize={'10px'} > </Typography>
                        </Box> */}
                        <TextField value={ClassName} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography fontSize={'20px'}>Class Teacher:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        
                        <TextField value={TeacherName} />

                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", padding: "8px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>

                            <Typography fontSize={'10px'} >Subject :</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", textAlign: 'center', border: "1px solid #000", padding: "8px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>

                            <DropDown itemList={ClassSubject} ClickItem={clickSubjectList} DefaultValue={Subjectlist} Label={"Select Subject"} /><br></br>
                        </Box>
                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", padding: "8px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>

                            <Typography fontSize={'10px'} >Title :</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        {/* <TextField value={Title} onChange={(e) => { setTitle(e.target.value) }} variant="standard" error={ErrorTitle !== ''} helperText={ErrorTitle} label={''} /> */}
                        <TextField value={SubjectName} />
                        {/* <TextField
                            value={Subject}
                            onChange={(e) => {
                                setSubjectName(e.target.value);
                            }}
                        /> */}



                    </Grid>
                </Grid>
                <Grid container spacing={2} mb={0.1}>
                    <Grid item xs={6}>
                        <Box
                            sx={{ display: "flex", alignItems: "center", textAlign: "center", border: "1px solid #000", paddingBottom: "10px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>

                            <Typography
                                fontSize={'20px'}
                            > Assigned Date :
                            </Typography>
                            <TextField
                                sx={{ width: '50%', margin: '2px 0', border: "1px solid #000", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}
                                inputProps={{ type: 'date' }} value={AssignedDate}
                                onChange={(e) => {
                                    setAssignedDate(e.target.value);
                                    // console.log('StartDate :', e.target.value);
                                }}
                                variant="standard"
                                error={ErrorAssignedDate !== ''}
                                helperText={ErrorAssignedDate}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box
                            sx={{ display: "flex", alignItems: "center", textAlign: "center", border: "1px solid #000", paddingBottom: "10px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>

                            <Typography
                                fontSize={'20px'}
                            > Completed Date :
                            </Typography>
                            <TextField
                                sx={{ width: '50%', margin: '2px 0', border: "1px solid #000", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}
                                inputProps={{ type: 'date' }} value={CompleteDate}
                                onChange={(e) => {
                                    setCompleteDate(e.target.value);
                                    
                                }}
                                variant="standard"
                            // error={ErrorCompleteDate !== ''}
                            // helperText={ErrorCompleteDate}
                            />
                        </Box>

                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={6}>
                        <Typography fontSize={'10px'} >Attechment :</Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <SingleFile ValidFileTypes={ValidFileTypes} MaxfileSize={MaxfileSize} ChangeFile={ChangeFile} /><br></br>
                        <SingleFile ValidFileTypes={ValidFileTypes1} MaxfileSize={MaxfileSize1} ChangeFile={ChangeFile1} /><br></br>

                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={6}>
                        <Typography fontSize={'10px'} >Details :</Typography>
                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            sx={{ width: '60%', margin: '2px 0', border: '1px solid #000', }}
                            multiline
                            rows={2}
                            value={Details}
                            onChange={(e) => {
                                setDetails(e.target.value);
                            }}
                            variant="standard"
                            error={ErrorDetails !== ''}
                            helperText={ErrorDetails}
                            label={''}
                        />


                    </Grid>
                </Grid>
            </Grid>
            <br></br>
            <Box style={{ textAlign: 'center', paddingBottom: "55px" }}>
                <ButtonPrimary color="secondary" onClick={SaveFile} >
                    SAVE
                </ButtonPrimary>
                {/* <ButtonPrimary
              onClick={Cancle}
              variant='contained'
              style={{ marginRight: "8px", backgroundColor: 'green' }}>
              Cancle
            </ButtonPrimary> */}
                <ButtonPrimary
                    onClick={Back}
                    variant='contained'
                    style={{ marginRight: "8px", backgroundColor: '#ed460e' }}>
                    BACK
                </ButtonPrimary>
            </Box>
            <br></br><br></br>
            <HomeworkSubjectList />

















        </>
    )
}

export default AddHomework