import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import { getUserAadharCardDetails, resetMessage } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { getsaveUserAadharCardDetails } from 'src/requests/AadharCardDetails/RequestAadharCard';
import { Box, Container, TextField, Typography } from '@mui/material';
import { CheckFileValidation } from '../Common/Util';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';


function AadharCardDetails() {

    const SchoolName = localStorage.getItem("SchoolName");
    const aRef = useRef(null);
    const [fileName, setFileName] = useState('')
    console.log("fileName",fileName)
    const [aadharNumber, setAadharNumber] = useState('')
    const dispatch = useDispatch();
    const [base64URL, setBase64URL] = useState('')
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
        toast.success(SaveUserAadharCardDetails.Message, { toastId: 'success1' })
        dispatch(resetMessage());


    }, [SaveUserAadharCardDetails])

    const changeFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        let DataAttachment: any = '';
        let fileName: any = '';
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidation(multipleFiles[i], ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'], 3000000);
            if (isValid == null) {
                setFileName(multipleFiles[i].name);
                base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
                setBase64URL(base64URL.slice(base64URL.indexOf(',') + 1));
            } else{
                setFileError(isValid)
                aRef.current.value=null;
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
        "asAadharCardNo": "121332",
        "asAadharCardFileName": "a.jpg",
        "asUserRoleId": "2",
        "asAadharCardBase64String": ""
    }
  



    useEffect(() => {
        dispatch(getUserAadharCardDetails(GetUserAadharCardDetailsBody));
    }, []);

    const clickSubmit = () => {
        if (aadharNumber.length === 0) {
            setError(true);
        } 
        if(fileName===''){
            setFileError('Please Upload the file"')
        }else
            if (fileError !== '' || !error)
                dispatch(getsaveUserAadharCardDetails(SaveUserAadharCardDetailsBody));
    }



    return (
        <>
            <PageHeader heading={'Aadhar Card Details'} subheading={''} />

            <Container>

                <div>
                    <Typography>Name</Typography>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={GetUserAadharCardDetails.Name}
                    /> </div>

                <div>
                    <TextField
                        fullWidth
                        inputProps={{ maxlength: 12 }}
                        type="text"
                        variant="standard"
                        label="Aadhar Number"
                        value={aadharNumber}
                        onChange={(e) => { setAadharNumber(e.target.value) }}
                        onBlur={clickOnBlur}
                        // onChange={clickError}
                        sx={{ mt: '0.5rem' }} />
                    <p style={{ color: "red" }}>{error ? "Adhar card number textbox should not be blank" : " "}</p>

                </div>

                <Box sx={{ mt: '0.9rem' }}>
                    <input ref={aRef} type="file" onChange={changeFile} /></Box>
                    <Box sx={{ mt: '0.9rem' }} >{fileError && <Errormessage Error={fileError} />} </Box>
                <div>
                    <ButtonPrimary onClick={clickSubmit} fullWidth sx={{ mt: '0.9rem' }} >Submit</ButtonPrimary>
                </div>


            </Container>



        </>
    )
}

export default AadharCardDetails