
import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { IGetParentPhotosBody } from 'src/interfaces/Student/IUpoladParentPhoto';
import { getParentphoto1 } from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { Container, TextField,Grid } from '@mui/material';
import ButtonList from 'src/libraries/card/ButtonList';
import TextFilePath from 'src/libraries/card/TextFilePath';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {getSaveParentPhotos} from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import {getSubmitParentPhotoDetails} from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { toast } from 'react-toastify';
function NewUploadphoto() {
  const dispatch = useDispatch();
  const GetParentphoto: any = useSelector(
   (state: RootState) => state.UploadParentPhoto.GetParentphoto
 );
 const GetParentphotos: any = useSelector(
  (state: RootState) => state.UploadParentPhoto.GetParentphotos
);

  const [relative, setRelative]= useState('')
  const [isPhotosSubmitted ,setIsPhotosSubmitted]= useState(false)
  const [isAllPhotoSaved ,setIsAllPhotoSaved]= useState(false)
  const [issaveForSibling,setIsSaveForSibling] = useState("0")
  const [fatherPhotoFileName,setFatherPhotoFileName] = useState("")
  const [fatherImgPhoto,setFatherImgPhoto] = useState("")
  const [motherPhotoFileName,setMotherPhotoFileName] = useState("")
  const [motherImgPhoto,setMotherImgPhoto] = useState("")
  const [relativePhotoFileName,setRelativePhotoFileName] = useState("")
  const [localGuardianPhoto,setLocalGuardianPhoto] = useState("")
  const [isFileChanged,setIsFileChanged] = useState(false)

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const [itemList, setItemList] = useState([]);
  const GetParentphotoBody=
  {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "aiUserId": sessionStorage.getItem('Id')
  }
  const SubmitParentPhotoDetailsBody ={
    "aiUserId":2734,
    "aiSchoolId":asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "abSubmitForSibling":false
  }
  useEffect(() => {
    dispatch(getParentphoto1(GetParentphotoBody));
   }, []);
 
   useEffect(() => {
    setItemList(GetParentphoto);
    setIsPhotosSubmitted(GetParentphotos.IsPhotosSubmitted)
    setIsAllPhotoSaved(GetParentphotos.IsAllPhotoSaved)
  }, [GetParentphoto]);
useEffect(()=>{
  if(itemList.length>0 && isFileChanged)
  setFiles()

},[itemList])
  const clickItem= (value)=>{
    setItemList(value);
}
// const getFile = ()=>{
//   let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
//           let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
//           let AttachmentFile: AttachmentFile = {
//             FileName: e.target.files[0],
//             Base64URL: DataAttachment
//           };
// }

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
const setFiles= async()=>{
  setIsFileChanged(false)
  if(itemList[0].Value!==null){
  setFatherPhotoFileName(itemList[0].Value?.name)
  // let base64URL:any = await ChangeFileIntoBase64(itemList[0].Value);
  // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
  // setFatherImgPhoto(DataAttachment)
  setFatherImgPhoto(itemList[0].Value)
}
if(itemList[1].Value!==null){
  setMotherPhotoFileName(itemList[1].Value?.name)
  // let base64URL:any = await ChangeFileIntoBase64(itemList[1].Value);
  // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
  // setMotherImgPhoto(DataAttachment)
  setMotherImgPhoto(itemList[1].Value)
}
if(itemList[2].Value!==null){
  setRelativePhotoFileName(itemList[1].Value?.name)
  // let base64URL:any = await ChangeFileIntoBase64(itemList[2].Value);
  // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
  // setLocalGuardianPhoto(DataAttachment)
  setMotherImgPhoto(itemList[2].Value)
}
}
const onFileSelect= (value)=>{
      setItemList(itemList.map((item) =>{
        return item.Id === value.Id? 
        value:
        item
      }))
      setIsFileChanged(true)

    }

    const SaveFile =()=>{
      if(GetParentphoto.IsSiblingPresent == true ){
        if (!confirm('Do You want to save details for sibling?')) {
          setIsSaveForSibling("1")
        }
      }
      
  const SaveParentPhotosBody=
  {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "asFatherPhotoFileName": fatherPhotoFileName,
    "asMotherPhotoFileName": motherPhotoFileName,
    "asRelativePhotoFileName": relativePhotoFileName,
    "asFatherImgPhoto": fatherImgPhoto,
    "asMotherImgPhoto": motherImgPhoto,
    "asLocalGuardianPhoto": localGuardianPhoto,
    "aiUserId": asUserId,
    "aiIsSubmit":"0",
    "asRelativeName": itemList[2].Text,
    "abSaveForSibling":issaveForSibling

  }
  console.log(SaveParentPhotosBody)
      dispatch(getSaveParentPhotos(SaveParentPhotosBody));
    }

    const SubmitFile =()=>{
      dispatch(getSubmitParentPhotoDetails(SubmitParentPhotoDetailsBody));
    }
       
  return (
    <div>{itemList.length>0 &&
      (<><ButtonList itemList={itemList} clickItem={clickItem} />
      <TextFilePath item={itemList.filter((obj)=>obj.IsActive)[0]} onFileSelect={onFileSelect}/>
      </>)}

      <Grid container spacing={2} sx={{mt:"30px"}}>
         <Grid item xs={6}>
              <ButtonPrimary
               type="submit"
               fullWidth
               color='primary'
               disabled={isPhotosSubmitted}
               onClick={SaveFile}
              >
                Save
              </ButtonPrimary>
            </Grid>
            <Grid item xs={6}>
              <ButtonPrimary  fullWidth
                disabled={isPhotosSubmitted && isAllPhotoSaved}  onClick={SubmitFile}  >
                Submit
              </ButtonPrimary>
            </Grid>
          </Grid>
    </div>
  )
}

export default NewUploadphoto
