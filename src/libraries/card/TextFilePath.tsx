import { Avatar, TextField,Box } from '@mui/material'
import { isValid } from 'date-fns';
import React, { useRef, useState } from 'react'
import { CheckFileValidationUploadPic } from 'src/components/Common/Util';
import { AttachmentFile} from '../../interfaces/MessageCenter/MessageCenter';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function TextFilePath({item, onFileSelect, onTextChange}) {
  const [error, setError] = useState('')
  const [relative, setRelative]= useState('')
  const [selectedFile, setSelectedFile]= useState()
  const aRef = useRef(null);

    const changeFile = async (e) => {
      let isValid = CheckFileValidationUploadPic(e.target.files[0], ['jpg','jpeg','png','bmp'], 8000000000)
      setError(isValid)
      if(isValid === null){
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0])
          item = {...item, Value:e.target.files[0]}
            onFileSelect(item)
        }  
      }
      else{
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
  const changeRelative = (value) =>{
    item = {...item, Text:value}
    onTextChange(item)
  }
  // console.log(item.Value,"item.Value")
return (
    <div>
  {(item.Id == 3) ? 
  (<TextField value={item.Text} onChange={(e)=>{changeRelative(e.target.value)}} 
  fullWidth  variant="standard"/>):
  (<TextField value={item.Text} fullWidth  variant="standard" />)}
  <Box sx={{textAlign:"center",mt:"20px"}}>
    {item.Value ?
     (<img 
         src={selectedFile? URL.createObjectURL(selectedFile) :'data:image/png;base64,'+item.Value}
         width="150"
         height="150"
         alt="hi"/>):
         
         (<img
          src={item.Value}
          width="150"
          height="150"/>)
          
     }
    
    <input  ref={aRef} type="file" onChange={changeFile} />
     {error && <ErrorMessages Error={error} />}
    </Box>
    </div>
  )
}

export default TextFilePath
