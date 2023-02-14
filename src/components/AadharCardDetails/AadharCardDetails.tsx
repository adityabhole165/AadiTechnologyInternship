import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import { getUserAadharCardDetails, resetMessage } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { getsaveUserAadharCardDetails } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { CheckFileValidation } from '../Common/Util';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';

import { Styles } from 'src/assets/style/student-style'
import Icon3 from "src/libraries/icon/icon3"
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { ListStyle } from 'src/libraries/styled/CardStyle';

function AadharCardDetails() {

    const SchoolName = localStorage.getItem("SchoolName");
    const aRef = useRef(null);
    const [fileName, setFileName] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const dispatch = useDispatch();
    const [base64URL, setBase64URL] = useState()
    const [error, setError] = useState(false);
    const [fileError, setFileError] = useState('');

    const clickError = (e) => {
        if (e.target.value.length > 0) {
            setError(false);
        }
        if (e.target.value.length == 0) {
            setError(true);
        }
    };

    const clickOnBlur = (e) => {
        if (e.target.value.length == 0) {
            setError(true);
        }
        if (e.target.value.length > 0) {
            setError(false);
        }
    };

    const GetUserAadharCardDetails: any = useSelector(
        (state: RootState) => state.AadharCardDetails.GetUserAadharCardDetails
    );


    const SaveUserAadharCardDetails: any = useSelector(
        (state: RootState) => state.AadharCardDetails.SaveUserAadharCardDetails
    );

    useEffect(() => {
        setAadharNumber(GetUserAadharCardDetails.AadharCardNo)
    }, [GetUserAadharCardDetails])

    useEffect(() => {
        if(SaveUserAadharCardDetails.Message!==undefined){
        toast.success(SaveUserAadharCardDetails.Message, { toastId: 'success1' })
        dispatch(resetMessage());
    }

    }, [SaveUserAadharCardDetails])
    const classes = Styles();
    const validFiles = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']
    const maxfileSize = 3000000
    const [selectedFile, setSelectedFile]= useState()
    const changeFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        let DataAttachment: any = '';
        let fileName: any = '';
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidation(multipleFiles[i], validFiles, maxfileSize);
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

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(sessionStorage.getItem('Id'));
    const asUserRoleId = sessionStorage.getItem('RoleId');

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




    useEffect(() => {
        dispatch(getUserAadharCardDetails(GetUserAadharCardDetailsBody));
    }, []);

    const clickSubmit = () => {
        if (aadharNumber.length === 0) {
            setError(true);
        }
        if (fileName === '') {
            setFileError('Please Upload the file"')
        } else{
            if (fileName !== '' && aadharNumber.length !== 0) {
                dispatch(getsaveUserAadharCardDetails(SaveUserAadharCardDetailsBody));
                aRef.current.value = null
            }
        }
    }



    return (
        <Container>
            <PageHeader heading={'Aadhar Card Details'} subheading={''} />
      <ListStyle>
            <Typography variant='caption'>Name</Typography>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={GetUserAadharCardDetails.Name}/>
                      
                      <TextField
                        fullWidth
                        inputProps={{ maxLength: 12 }}
                        type="text"
                        margin="dense"
                        variant="standard"
                        label="Aadhar Number"
                        value={aadharNumber}
                        onChange={(e) => { setAadharNumber(e.target.value) }}
                        onBlur={clickOnBlur}/>
                    
                  <ErrorMessage1 Error={error ? "Adhar card number textbox should not be blank" : " "}/>
                  <Box sx={{my:"10px",textAlign:"center"}}>
                  {selectedFile?<img src={URL.createObjectURL(selectedFile)} width="150"
                             height="150"/>: 
                             <img src={GetUserAadharCardDetails.PhotoFilePath}
                             width="150"
                             height="150"
                             />}
                  <input ref={aRef} type="file" onChange={changeFile}/>
                    <Box className={classes.iIconSupport}>
                    <Icon3 Note={"Supports only " + validFiles.join(' ') + " files types up to 3 MB"} />
                    </Box>
                    </Box>
               {fileError && <Errormessage Error={fileError} />}
            <ButtonPrimary onClick={clickSubmit} fullWidth >Submit</ButtonPrimary>
            </ListStyle>
</Container>
    )
}

export default AadharCardDetails