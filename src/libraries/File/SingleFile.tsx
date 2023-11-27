import { Box, Container } from '@mui/material';
import React, { useRef, useState } from 'react'
import Errormessage from "src/libraries/ErrorMessages/Errormessage";
import { ChangeFileIntoBase64, CheckFileValidationAdhar } from 'src/components/Common/Util';
import Icon5 from '../icon/icon5';
import { Styles } from 'src/assets/style/student-style';

const SingleFile = ({ValidFileTypes, MaxfileSize, ChangeFile}) => {
    const classes = Styles();
    const aRef = useRef(null);
    const [FileError, setFileError] = useState('');
    const clickFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidationAdhar(multipleFiles[i], ValidFileTypes, MaxfileSize);
            if (isValid == null) {
                base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
                setFileError('')
                ChangeFile({Name:multipleFiles[i].name, 
                    Value:base64URL.slice(base64URL.indexOf(',') + 1),
                    FileExtension:multipleFiles[i].name.split('.').at(-1)})
            } else {
                setFileError(isValid)
                aRef.current.value = null;
            }
        }
    }
    // const ChangeFileIntoBase64 = (fileData) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(fileData);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (err) => {
    //             reject(err);
    //         };
    //     });
    // };
    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <input ref={aRef} type="file" onChange={clickFile} style={{ width: "200px" }} />
            </Box>
            <Box className={classes.iIconSupport}>
                <Icon5 Note={"Supports only " + ValidFileTypes.join(', ') + " files types up to 3 MB"} />
            </Box>

            {FileError && <Errormessage Error={FileError} />}
        </Container>
    )
}

export default SingleFile