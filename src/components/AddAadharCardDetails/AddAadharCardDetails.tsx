import { Box, Grid, Grow, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router";
import { IGetAddAadharCardDetailsBody, IGetSubmitAadharDetailsBody } from 'src/interfaces/AddAadharCardDetails/IAddAadharCardDetails';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { AddAadharCard, SubmitAadhardetails } from 'src/requests/AddAadharCardDetails/RequestAddAadharCardDetails';
import { decodeURL } from '../Common/Util';





const AddAadharCardDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {
        StudentFullName,
        AadharCardNo
    } = useParams();

    // Decode in-place
    StudentFullName = decodeURL(StudentFullName);
    AadharCardNo = decodeURL(AadharCardNo);




    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(sessionStorage.getItem('Id'));
    //let enableButton = (selectedFile !== null || AddAadharCarddetails.AadharCardNo !== aadharNumber)



    const AddAadharCarddetails = useSelector(
        (state: any) => state.AddAadharCardDetails.ISAddAadharCardDetails
    );
    //console.log(AddAadharCarddetails, 'SubmitAadharCarddetails');

    const SubmitAadharCarddetails = useSelector(
        (state: any) => state.AddAadharCardDetails.ISSubmitAadharCardDetailsS
    );
    //console.log(SubmitAadharCarddetails, 'SubmitAadharCarddetails');



    const [checked, setChecked] = useState(true);
    const aRef = useRef(null);
    const [aadharNumber, setAadharNumber] = useState('')
    const [aadharName, setAadharName] = useState('')
    const [mother, setMother] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [error, setError] = useState(false);
    const [errorname, setErrorname] = useState(false);
    const [fileName, setFileName] = useState('')
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [FolderName, setFolderName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileError, setFileError] = useState('');
    //const classes = Styles();
    const validFiles = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']
    const maxfileSize = 3000000
















    const AddAadharCardDetails: IGetAddAadharCardDetailsBody = {
        "asSchoolId": asSchoolId,
        "asUserId": asUserId
    };

    const SubmitAadharDetailss: IGetSubmitAadharDetailsBody = {
        "asUserId": asUserId,
        "asSchoolId": asSchoolId,
        "asAadharCardNo": aadharNumber,
        "asAadharCardPhotoCopyPath": "abcdddddddddd.jpg",
        "asStudentNameOnAadharCard": null,
        "asMotherTongue": null,
        "asEmail": null,
        "asUpdatedById": "4463",
        "asSaveFeature": "Aadhar Cards",
        "asFolderName": "PPSN Website",
        "asBase64String": "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"
    };

    useEffect(() => {
        dispatch(AddAadharCard(AddAadharCardDetails));
    }, [SubmitAadharCarddetails]);

    //   useEffect(() => {
    //     setAadharNumber(AddAadharCarddetails.AadharCardNo)
    //     setAadharName(AddAadharCarddetails.NameOnAadharCard)
    // }, [AddAadharCarddetails])

    //   useEffect(() => {
    //     if (SubmitAadharCarddetails.Message !== undefined) {
    //         toast.success(SubmitAadharCarddetails.Message, { toastId: 'success1' })
    //         dispatch(resetMessage());
    //         setSelectedFile(null)
    //     }
    // }, [SubmitAadharCarddetails])

    const onClickClose = () => {
        navigate('/RITeSchool/Teacher/ExamResultBase', { state: { fromInternal: true } })
    }

    // const handleSubmit = () => {
    //   setSubmitted(true);
    // };

    // const onClickSubmit = () => {

    // }
    const onClickSubmit = () => {
        let arr = AddAadharCarddetails;
        let arrLength = arr.length;
        let imgName = ''
        if (arrLength > 0)
            imgName = arr[arrLength - 1]
        if (aadharNumber.length === 0) {
            setError(true);
        }
        if (aadharName.length === 0) {
            setErrorname(true)
        }
        // if (imgName === '' && selectedFile === null) {
        //     setFileError('Please upload the file')
        // }
        else {
            if (aadharNumber.length !== 0 && aadharName.length !== 0) {
                dispatch(SubmitAadhardetails(SubmitAadharDetailss));
                // aRef.current.value = null
            }
        }
    }
    const changeAdhar = (value) => {
        const re = /^[0-9\b]+$/;
        if (value === "")
            setAadharNumber(value)
        if (re.test(value)) {
            if (value.length == 0) {
                setError(true);
            }
            if (value.length > 0) {
                setError(false);
            }

            if (value.length >= 12) {
                setError1(true);
            }
            if (value.length <= 12) {
                setError1(false);
            }
            setAadharNumber(value)
        }

    };

    const changeAdharName = (value) => {
        setAadharName(value)
        if (value.length > 0) {
            setErrorname(false)
        }
    }





    return (

        //     <div>
        //        <PageHeader heading='Add AadharCard Details' />

        // <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
        //     Mandatory Fields *
        //   </div>

        //   <Grid container spacing={1} justifyContent="center" alignItems="center">

        //       <Grid container spacing={1} justifyContent="center" alignItems="center">
        //         <Grid item xs={1}>
        //     <Typography >
        //     <b>Name:</b>
        //     </Typography>
        //   </Grid>

        //   <Grid item xs={2}>
        //   <TextField value={StudentFullName}/>
        //   </Grid>
        //   </Grid>
        //   <br></br>
        //   <Grid container spacing={1} justifyContent="center" alignItems="center">
        //         <Grid item xs={1}>
        //     <Typography >
        //     <b>Aadhar Card No-</b>
        //     </Typography>
        //   </Grid>

        //   <Grid item xs={2}>
        //   <TextField value={AadharCardNo}/>
        //   </Grid>
        //   </Grid>
        //   <br></br>

        //   <Grid container spacing={2} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
        //   <Grid item xs={1}>
        // {/* <ButtonPrimary onClick={onClickSubmit}  variant="contained" >
        //               <b>SUBMIT</b>
        //             </ButtonPrimary> */}
        //             </Grid> 

        //             <ButtonPrimary onClick={onClickSubmit} fullWidth
        //                         color={enableButton ? 'primary' : 'primary'}
        //                     >Submit</ButtonPrimary>        

        //         <Grid item xs={1}>
        //             <ButtonPrimary onClick={onClickClose} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
        //                CLOSE
        //             </ButtonPrimary> 
        //             </Grid>
        //       </Grid> 

        //       </Grid> 
        //   </div>
        <Box sx={{ px: 2 }}>
            <PageHeader heading={'Add Aadhar Card Details'} subheading={''} />
            <Grow in={checked}
                style={{ transformOrigin: '0 0 1' }}
                {...(checked ? { timeout: 1500 } : {})}
            >
                <ListStyle>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography> <b>Name :</b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{AddAadharCardDetails.asUserId}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography> <b>Aadhaar Number : </b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="text" value={aadharNumber}
                                onChange={(e) => { changeAdhar(e.target.value) }} maxLength={12} />

                            <ErrorMessage1 Error={error ? "Please enter Aadhar Card Number." : " "} />
                            <ErrorMessage1 Error={error1 ? "Number should not exceed 12 digit." : " "} />
                        </Grid>

                        {/* <Grid item xs={4}>
                            <Typography> <b>Name Present On Aadhaar Card : </b></Typography>
                        </Grid>

                        <Grid item xs={8} mt={1}>
                            <input type='text' value={aadharName} onChange={(e) => changeAdharName(e.target.value)} />
                            <ErrorMessage1 Error={errorname ? "Please enter Aadhar Card Name." : " "} />

                        </Grid> */}
                    </Grid>
                    {/* <Box sx={{ my: "10px", textAlign: "center" }}>
                        {AddAadharCardDetails.FolderName === "/RITeSchool/DOWNLOADS/Aadhar Cards/" ?
                            <img style={{ height: "150px", width: "150px" }} src={"/imges/Adhar.png"} alt={'adhar'} /> :
                            <>
                                {selectedFile ? <img src={URL.createObjectURL(selectedFile)} width="150"
                                    height="150" style={{ border: "1px solid gray", padding: "1px" }} /> :
                                    <img src={localStorage.getItem("SiteURL") + AddAadharCardDetails.asUserId}
                                        width="150"
                                        height="150" style={{ border: "1px solid gray", padding: "1px" }}
                                    />}
                            </>
                        }
                    </Box> */}
                    {/* <Box sx={{ textAlign: "center" }}>
                        <input ref={aRef} type="file" onChange={" "} style={{ width: "200px" }} />
                    </Box> */}
                    {/* <Box className={classes.iIconSupport}>
                        <Icon5 Note={"Supports only " + validFiles.join(', ') + " files types up to 3 MB"} />
                    </Box> */}

                    {fileError && <Errormessage Error={fileError} />}

                    <ButtonPrimary onClick={onClickSubmit} variant="contained"
                    >Submit</ButtonPrimary>
                    <ButtonPrimary onClick={onClickClose} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
                        CLOSE
                    </ButtonPrimary>
                </ListStyle>

            </Grow>
        </Box>



    )
}

export default AddAadharCardDetails;