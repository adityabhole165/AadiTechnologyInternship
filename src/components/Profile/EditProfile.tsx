import { Container, Box, Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { ProfileDetailHeader } from 'src/libraries/styled/ProfileStyled'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Note from 'src/libraries/Note/Note';
import { ChangeFileIntoBase64, CheckFileValidationUploadPic } from 'src/components/Common/Util';
import CameraClick from '../PhotoGallery/CameraClick';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
const note = [
  '1) The student photo to be uploaded should be in school format',
  '2) Upload or Capture an image file for students photo (Max Height: 151px and Max Width: 112px) ',
  '3) Image size should not exceed 80 kb. Supported file formats are JPG, JPEG '

];
function EditProfile() {
  const UserName = sessionStorage.getItem('StudentName');
  const [value, setValue] = useState('');
  const aRef = useRef(null);

  const [error, setError] = useState('')
  const changeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let isValid = CheckFileValidationUploadPic(e.target.files[0], ['jpg', 'jpeg', 'png', 'bmp'], 80000)
      if (isValid === null) {
        let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
        // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
        setValue(base64URL);
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

  return (
    <Container>
      <PageHeader heading={'EditProfile'} subheading={''} />
      <Note NoteDetail={note} />
      <ListStyle>
        <ProfileDetailHeader sx={{ textAlign: "center" }}> <b>Name : </b><b>{UserName}</b></ProfileDetailHeader>
        <br></br>
        <Box sx={{ textAlign: "center" }}>
          <img src={value} width="112" height="151" style={{ border: "1px solid gray" }} />
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <input type="file" accept="image/*" onChange={changeFile} />
            </Grid>
            <Grid item xs={6} onClick={() => takePhoto()}><CameraAltIcon /></Grid>
          </Grid>
          <Grid item xs={6}>
          {error && <ErrorMessages Error={error} />}
          </Grid>
        </Box>
        <br></br>
        <Grid container sx={{ textAlign: "center" }}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <ButtonPrimary>Save</ButtonPrimary>
          </Grid>
          <Grid item xs={3}>
            <ButtonPrimary>Submit</ButtonPrimary>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </ListStyle>
    </Container>
  )
}

export default EditProfile
