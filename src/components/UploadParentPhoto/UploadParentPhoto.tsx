
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getParentphoto, resetMessage } from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { Container, Grid } from '@mui/material';
import ButtonList from 'src/libraries/card/ButtonList';
import TextFilePath from 'src/libraries/card/TextFilePath';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { getSaveParentPhotos } from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { getSubmitParentPhotoDetails } from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { toast } from 'react-toastify';
import Note from 'src/libraries/Note/Note';
import { ListStyle } from 'src/libraries/styled/CardStyle';


const note = [
  '1) Max Height: 151px and Max Width: 112px.',
  '2) Image size should not exceed 80 kb. Supported file formats are JPG, JPEG '

];



function UploadParentPhoto() {

  const dispatch = useDispatch();
  const GetParentphoto: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.GetParentphoto
  );
  const GetParentphotos: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.GetParentphotos
  );
  const SaveParentPhotos: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.SaveParentPhotos
  );

  const [relative, setRelative] = useState('')
  const [isPhotosSubmitted, setIsPhotosSubmitted] = useState(false)
  const [isAllPhotoSaved, setIsAllPhotoSaved] = useState(false)
  const [issaveForSibling, setIsSaveForSibling] = useState("0")
  const [fatherPhotoFileName, setFatherPhotoFileName] = useState("")
  const [fatherImgPhoto, setFatherImgPhoto] = useState("")
  const [motherPhotoFileName, setMotherPhotoFileName] = useState("")
  const [motherImgPhoto, setMotherImgPhoto] = useState("")
  const [relativePhotoFileName, setRelativePhotoFileName] = useState("")
  const [localGuardianPhoto, setLocalGuardianPhoto] = useState("")
  const [isFileChanged, setIsFileChanged] = useState(false)

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const [itemList, setItemList] = useState([]);
  const GetParentphotoBody =
  {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "aiUserId": sessionStorage.getItem('Id')
  }
  const SubmitParentPhotoDetailsBody = {
    "aiUserId": Number(asUserId),
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "abSubmitForSibling": false
  }
  useEffect(() => {
    dispatch(getParentphoto(GetParentphotoBody));
  }, []);
  useEffect(() => {
    if (GetParentphotos.IsPhotosSubmitted !== undefined) {
      setIsPhotosSubmitted(GetParentphotos.IsPhotosSubmitted)
      setIsAllPhotoSaved(GetParentphotos.IsAllPhotoSaved)
      setFatherImgPhoto(GetParentphotos.FatherPhoto)
      setMotherImgPhoto(GetParentphotos.MotherPhoto)
      setLocalGuardianPhoto(GetParentphotos.RelativePhoto)
    }
  }, [GetParentphotos])
  useEffect(() => {
    setItemList(GetParentphoto);
  }, [GetParentphoto]);
  useEffect(() => {
    if (itemList.length > 0 && isFileChanged)
      setFiles()

  }, [itemList])
  const clickItem = (value) => {
    setItemList(value);
  }
  useEffect(() => {
    if (SaveParentPhotos.Message !== undefined) {
      toast.success(SaveParentPhotos.Message, { toastId: 'success1' });
      dispatch(resetMessage())
    }
  }, [SaveParentPhotos])
  const ChangeFileIntoBase64 = (fileData) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (fileData)
        fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  const setFiles = async () => {
    setIsFileChanged(false)
    if (itemList[0].Value !== null && activeItem.Id === itemList[0].Id) {
      setFatherPhotoFileName(itemList[0].Value?.name)
      let base64URL: any = await ChangeFileIntoBase64(itemList[0].Value);
      let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
      setFatherImgPhoto(DataAttachment)
    }
    if (itemList[1].Value !== null && activeItem.Id === itemList[1].Id) {
      setMotherPhotoFileName(itemList[1].Value?.name)
      let base64URL: any = await ChangeFileIntoBase64(itemList[1].Value);
      let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
      setMotherImgPhoto(DataAttachment)
    }
    if (itemList[2].Value !== null && activeItem.Id === itemList[2].Id) {
      setRelativePhotoFileName(itemList[1].Value?.name)
      let base64URL: any = await ChangeFileIntoBase64(itemList[2].Value);
      let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
      setLocalGuardianPhoto(DataAttachment)
    }
  }
  const onTextChange = (value) => {
    setItemList(itemList.map((item) => {
      return item.Id === value.Id ?
        value :
        item
    }))
  }
  const onFileSelect = (value) => {
    setItemList(itemList.map((item) => {
      return item.Id === value.Id ?
        value :
        item
    }))
    setIsFileChanged(true)

  }
  let activeItem = itemList.filter((obj) => obj.IsActive)[0]
  const SaveFile = () => {
    if (GetParentphoto.IsSiblingPresent == true) {
      if (!confirm('Do You want to save details for sibling?')) {
        setIsSaveForSibling("1")
      }
    }

    const SaveParentPhotosBody =
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
      "aiIsSubmit": "0",
      "asRelativeName": itemList[2].Text,
      "abSaveForSibling": issaveForSibling

    }
    dispatch(getSaveParentPhotos(SaveParentPhotosBody));
  }

  const SubmitFile = () => {
    dispatch(getSubmitParentPhotoDetails(SubmitParentPhotoDetailsBody));
  }
  return (
    <Container>
      <PageHeader heading={'Upload Parent Photo'} subheading={''} />
      <Note NoteDetail={note} />
      <ListStyle>

        {itemList.length > 0 &&
          (<><ButtonList itemList={itemList} clickItem={clickItem} />
            {activeItem !== undefined &&
              <TextFilePath item={activeItem}
                onFileSelect={onFileSelect}
                onTextChange={onTextChange} />
            }
          </>)}

        <Grid container spacing={2} sx={{ mt: "30px" }}>
          <Grid item xs={6}>
            <ButtonPrimary
              type="submit"
              fullWidth
              color={isPhotosSubmitted ? 'warning' : 'primary'}
              disabled={isPhotosSubmitted}
              onClick={SaveFile}
            >
              Save
            </ButtonPrimary>
          </Grid>
          <Grid item xs={6}>
            <ButtonPrimary fullWidth
              color={(isPhotosSubmitted || !isAllPhotoSaved) ? "warning" : "primary"}
              disabled={isPhotosSubmitted || !isAllPhotoSaved}
              onClick={SubmitFile}  >
              Submit
            </ButtonPrimary>
          </Grid>
        </Grid>
      </ListStyle>
    </Container>
  )
}

export default UploadParentPhoto
