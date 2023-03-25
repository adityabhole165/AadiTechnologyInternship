import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import { getUserAadharCardDetails, resetMessage } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { getsaveUserAadharCardDetails } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { Box, Container, Grow, Paper, TextField, Typography } from '@mui/material';
import { CheckFileValidationAdhar } from '../Common/Util';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import 'src/assets/style/BdayCard.css';
import { Styles } from 'src/assets/style/student-style'
import Icon3 from "src/libraries/icon/icon3"
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import 'src/assets/style/BdayCard.css';
function AadharCardDetails() {

    const GetUserAadharCardDetails: any = useSelector(
        (state: RootState) => state.AadharCardDetails.GetUserAadharCardDetails
    );

    const SaveUserAadharCardDetails: any = useSelector(
        (state: RootState) => state.AadharCardDetails.SaveUserAadharCardDetails
    );

    const [checked, setChecked] = useState(true);
    const SchoolName = localStorage.getItem("SchoolName");
    const aRef = useRef(null);
    const [fileName, setFileName] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const dispatch = useDispatch();
    const [base64URL, setBase64URL] = useState('')
    const [error, setError] = useState(false);
    const [fileError, setFileError] = useState('');
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const classes = Styles();
    const validFiles = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']
    const maxfileSize = 3000000
    const [selectedFile, setSelectedFile] = useState(null)
    
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(sessionStorage.getItem('Id'));
    const asUserRoleId = sessionStorage.getItem('RoleId');
    let enableButton = (selectedFile!==null || GetUserAadharCardDetails.AadharCardNo!==aadharNumber)


    useEffect(() => {
        dispatch(getUserAadharCardDetails(GetUserAadharCardDetailsBody));
    }, [SaveUserAadharCardDetails]);

    useEffect(() => {
        setAadharNumber(GetUserAadharCardDetails.AadharCardNo)
    }, [GetUserAadharCardDetails])

    useEffect(() => {
        if (SaveUserAadharCardDetails.Message !== undefined) {
            toast.success(SaveUserAadharCardDetails.Message, { toastId: 'success1' })
            dispatch(resetMessage());
            setSelectedFile(null)
        }
    }, [SaveUserAadharCardDetails])
    const GetUserAadharCardDetailsBody =
    {
        "aiUserId": asUserId,
        "aiSchoolId": asSchoolId,
        "aiAcademicYrId": asAcademicYearId
    }


    const SaveUserAadharCardDetailsBody =
    {
        "aiUserId": asUserId,
        "asSchoolId": asSchoolId,
        "asAadharCardNo": aadharNumber,
        "asAadharCardFileName": fileName,
        "asUserRoleId": asUserRoleId,
        "asAadharCardBase64String": base64URL
    }


    const clickError = (e) => {
        if (e.target.value.length > 0) {
            setError(false);
        }
        if (e.target.value.length == 0) {
            setError(true);
        }
    };

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

    const changeFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        let DataAttachment: any = '';
        let fileName: any = '';
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidationAdhar(multipleFiles[i], validFiles, maxfileSize);
            if (isValid == null) {
                setFileName(multipleFiles[i].name);
                setSelectedFile(e.target.files[i])
                base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
                setBase64URL(base64URL.slice(base64URL.indexOf(',') + 1));
                setFileError('')
            } else {
                setFileError(isValid)
                aRef.current.value = null;
            }
        }
    }
    const ChangeFileIntoBase64 = (fileData) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileData);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (err) => {
                reject(err);
            };
        });
    };

    const clickSubmit = () => {
        let arr = GetUserAadharCardDetails.AadharCardFileName.split('/')
        let arrLength = arr.length;
        let imgName = ''
        if (arrLength > 0)
            imgName = arr[arrLength - 1]
        if (aadharNumber.length === 0) {
            setError(true);
        }
        if (imgName === '' && selectedFile === null) {
            setFileError('Please Upload the file')
        } else {
            if (aadharNumber.length !== 0) {
                dispatch(getsaveUserAadharCardDetails(SaveUserAadharCardDetailsBody));
                // aRef.current.value = null
            }
        }
    }

    return (
        <Container>
            <PageHeader heading={'Aadhar Card Details'} subheading={''} />
            <Grow in={checked}
                style={{ transformOrigin: '0 0 1' }}
                {...(checked ? { timeout: 1500 } : {})}
            >
                <ListStyle>
                    <Typography > <b>Name :</b> {GetUserAadharCardDetails.Name}</Typography>
                    <Typography sx={{mt:"4px"}}> <b>Aadhar Number : </b>
                        <input type="text" value={aadharNumber}
                            onChange={(e) => { changeAdhar(e.target.value) }} maxLength={12} />
                    </Typography>
                    <ErrorMessage1 Error={error ? "Please enter Aadhar Card Number." : " "} />
                    <ErrorMessage1 Error={error1 ? "Number should not exceed 12 digit." : " "} />
                    <Box sx={{ my: "10px", textAlign: "center" }}>
                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} width="150"
                            height="150" style={{ border: "1px solid gray", padding: "1px" }} /> :
                            <img src={localStorage.getItem("SiteURL") + GetUserAadharCardDetails.AadharCardFileName}
                                width="150"
                                height="150" style={{ border: "1px solid gray", padding: "1px" }}
                            />}
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <input ref={aRef} type="file" onChange={changeFile} style={{ width: "200px" }} />
                    </Box>
                    <Box className={classes.iIconSupport}>
                        <Icon3 Note={"Supports only " + validFiles.join(', ') + " files types up to 3 MB"} />
                    </Box>

                    {fileError && <Errormessage Error={fileError} />}

                    <ButtonPrimary onClick={clickSubmit} fullWidth 
                    color={enableButton?'primary':'warning'}
                    >Submit</ButtonPrimary>
                </ListStyle>

            </Grow>
        </Container>
    )
}

export default AadharCardDetails