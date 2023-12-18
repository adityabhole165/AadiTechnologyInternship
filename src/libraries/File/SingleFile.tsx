import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import { ChangeFileIntoBase64, CheckFileValidationAdhar } from 'src/components/Common/Util';
import Icon5 from '../icon/icon5';
import { Styles } from 'src/assets/style/student-style';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SingleFile = ({ValidFileTypes, MaxfileSize, errorMessage = '', ChangeFile}) => {
    const classes = Styles();
    const aRef = useRef(null);
    const [FileError, setFileError] = useState('');
    const [FileName, setFileName] = useState('');
    useEffect(()=>{
        setFileError(errorMessage)
    },[errorMessage])
    const clickFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidationAdhar(multipleFiles[i], ValidFileTypes, MaxfileSize);
            if (isValid == null) {
                base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
                setFileError('')
                setFileName(multipleFiles[i].name)
                ChangeFile({Name:multipleFiles[i].name, 
                    Value:base64URL.slice(base64URL.indexOf(',') + 1),
                    FileExtension:multipleFiles[i].name.split('.').at(-1)})
            } else {
                setFileError(isValid)
                setFileName('')
                aRef.current.value = null;
            }
        }
    }
    const handleClick = event => {
        aRef.current.click();
      };
    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
            <Stack alignItems={"center"}>
        <Box sx={{ display: "flex", mt: "5px" }}>
            <div onClick={handleClick} >
          <CloudUploadIcon sx={{ mt: "-2px" }} />
          
          <Typography sx={{ mt: "2px", fontWeight: "bold", ml: "2px", fontSize: "12px" }}>Upload files </Typography>
          </div>
          <Box sx={{ width: '200px', overflow: "hidden", textOverflow: "ellipsis", mt: "2px", }}>
            {(FileName == '') ?
              " No file selected" : FileName}
          </Box>
        </Box></Stack>

            <input ref={aRef} type="file" onChange={clickFile} 
                style={{ display: 'none' }} />
            </Box>
            <Box className={classes.iIconSupport}>
                <Icon5 Note={"Supports only " + ValidFileTypes.join(', ') + " files types up to 3 MB"} />
            </Box>

            {FileError && <Errormessage Error={FileError} />}
        </Container>
    )
}

export default SingleFile