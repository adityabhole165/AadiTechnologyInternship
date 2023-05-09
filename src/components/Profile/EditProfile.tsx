import { Container, Box, Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { ProfileDetailHeader } from 'src/libraries/styled/ProfileStyled'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Note from 'src/libraries/Note/Note';
import { ChangeFileIntoBase64, CheckFileValidationEditeProfile } from 'src/components/Common/Util';
import CameraClick from '../PhotoGallery/CameraClick';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { RootState } from 'src/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ISaveStudentPhotoBody, ISubmitStudentPhotoBody } from 'src/interfaces/Student/IEditProfile';
import { getSaveStudentPhoto, getSubmitStudentPhoto, resetMessage, resetMessage1 } from 'src/requests/EditProfile/RequestEditProfile';
import BackButton from 'src/libraries/button/BackButton';
const note = [
  '1) The student photo to be uploaded should be in school uniform.',
  '2) Upload or Capture an image file for students photo (Max Height: 151px and Max Width: 112px) ',
  '3) Image size should not exceed 1 mb. Supported file formats are JPG, JPEG, PNG, BMP '

];


function EditProfile() {
  const dispatch = useDispatch();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = localStorage.getItem('UserId');
  const [fileName, setFileName] = useState('')
  const SavePhotos: any = useSelector(
    (state: RootState) => state.EditProfile.SaveStudentPhoto
  );
  const SubmitPhotos: any = useSelector(
    (state: RootState) => state.EditProfile.SubmitStudentPhoto
  );

  // console.log(SavePhotos,"SavePhotos")
  const width = 112, height = 151, maxFileSize = 100000
  const UserName = sessionStorage.getItem('StudentName');
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  const userPhoto = ImgUrl.length != 0 ? 'data:image/png;base64,' + ImgUrl : '/imges/defualtUser.jpg'
  const [value, setValue] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const aRef = useRef(null);

  const [error, setError] = useState('')
  const changeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let isValid = CheckFileValidationEditeProfile(e.target.files[0], ['jpg', 'jpeg', 'png', 'bmp'], 1000000)
      setDisableButton(false);
      if (isValid === null) {
        let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
        setFileName(base64URL.slice(base64URL.indexOf(',') + 1));
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
          if (img.width > width && img.height > height) {
            setDisableButton(true);
            setError(`Image is ${img.height} x ${img.width}, Height and Width of photo file should not exceed 151px and 112px respectively`);
          }
          // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
          else {
            setValue(base64URL);
          }

        }
      }
      else {

        setError(isValid);
      }
    }
  }


  const { photos, takePhoto } = CameraClick();
  useEffect(() => {
    if (photos !== undefined && photos.length)
      setValue(photos[0].base64Data)
  }, [photos])
  useEffect(() => {
    setError('')
  }, [value])

  useEffect(() => {
    toast.success(SavePhotos.Message, { toastId: 'success2' });
    dispatch(resetMessage());
  }, [SavePhotos])

  useEffect(() => {
    if (SubmitPhotos.Message !== undefined) {
      toast.success(SubmitPhotos.Message, { toastId: 'success1' });
      dispatch(resetMessage1());
      sessionStorage.setItem("PhotoFilePath", value.slice(value.indexOf(',') + 1))
    }
  }, [SubmitPhotos])

  const SaveFile = () => {
    setDisableSubmitButton(false);
    setDisableButton(true);
    const SavePhotosBody: ISaveStudentPhotoBody =
    {
      aiSchoolId: asSchoolId,
      aiStudentId: asStudentId,
      aiInsertedById: asUserId,
      asPhotoBase64String: value.slice(value.indexOf(',') + 1)

    }
    dispatch(getSaveStudentPhoto(SavePhotosBody));
  }
  const SubmitFile = () => {
    setDisableSubmitButton(true);
    const SubmitBody = {
      aiStudentId: asStudentId,
      aiUpdatedById: asUserId,
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId
    }
    dispatch(getSubmitStudentPhoto(SubmitBody));
  }
  return (
    <Container>
      <PageHeader heading={'Edit Profile'} subheading={''} />
      <BackButton FromRoute={"/Student/Profile"} />
      <Note NoteDetail={note} />
      <ListStyle>
        <ProfileDetailHeader sx={{ textAlign: "center" }}> <b>Name : </b><b>{UserName}</b></ProfileDetailHeader>

        <Box sx={{ textAlign: "center" }}>
          <img src={value == "" ? userPhoto : value} width="112" height="151" style={{ border: "1px solid gray" }} />
          <Grid container>
            <Grid item xs={6} >
              <input style={{ padding: "1em" }} type="file" accept="image/*" onChange={changeFile} />
            </Grid>
            <Grid item xs={6} style={{ padding: "1em" }} onClick={() => takePhoto()}><CameraAltIcon /></Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: "-3px", mb: "3px" }}>
            {error && <ErrorMessages Error={error} />}
          </Grid>
        </Box>

        <Grid container spacing={3} sx={{ textAlign: "center" }}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <ButtonPrimary onClick={SaveFile} disabled={disableButton} color={(disableButton) ? "warning" : "primary"}>Save</ButtonPrimary>
          </Grid>
          <Grid item xs={3}>
            <ButtonPrimary onClick={SubmitFile} disabled={disableSubmitButton} color={(disableSubmitButton) ? "warning" : "primary"}>Submit</ButtonPrimary>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </ListStyle>

    </Container>
  )
}

export default EditProfile
