import { Avatar, TextField, Box } from '@mui/material'
import { isValid } from 'date-fns';
import React, { useRef, useState } from 'react'
import { CheckFileValidationUploadPic } from 'src/components/Common/Util';
import { AttachmentFile } from '../../interfaces/MessageCenter/MessageCenter';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function TextFilePath({ item, onFileSelect, onTextChange }) {
  const [error, setError] = useState('')
  const aRef = useRef(null);

  const changeFile = async (e) => {
    let isValid = CheckFileValidationUploadPic(e.target.files[0], ['jpg', 'jpeg', 'png', 'bmp'], 80000)
    setError(isValid)
    if (isValid === null) {
      if (e.target.files && e.target.files.length > 0) {
        let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
        let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
        item = {
          ...item,
          Value: DataAttachment,
          fileName: e.target.files[0].name
        }
        onFileSelect(item)
      }
    }
    else {
      aRef.current.value = null;
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

  return (
    <div>
      {(item.Id == 3) ?
        (<TextField value={item.Text} fullWidth variant="standard"
          onChange={(e) => { onTextChange({ ...item, Text: e.target.value }) }}/>) :
        (<TextField value={item.Text} fullWidth variant="standard" />)}
      
      <Box sx={{ textAlign: "center", mt: "10px" }}>
      
        <img width="112" height="151" style={{ border: "1px solid gray" }}
          src={item.Value === "" ? item.ImgUrl : 'data:image/png;base64,' + item.Value} />
      
        <input ref={aRef} type="file" onChange={changeFile} disabled={item.choosefileDisable} />
        {error && <ErrorMessages Error={error} />}
      
      </Box>
    </div>
  )
}

export default TextFilePath
