import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  ChangeFileIntoBase64,
  CheckFileValidationEditeProfile
} from 'src/components/Common/Util';
import { IGetStudentPhotoBody } from 'src/interfaces/Student/GetStudentPhoto';
import { ISaveStudentPhotoBody } from 'src/interfaces/Student/IEditProfile';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Note from 'src/libraries/Note/Note';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { ProfileDetailHeader } from 'src/libraries/styled/ProfileStyled';
import {
  getSaveStudentPhoto,
  getSubmitStudentPhoto,
  resetMessage,
  resetMessage1
} from 'src/requests/EditProfile/RequestEditProfile';
import { getstudentpic } from 'src/requests/StudentPhoto/RequestStudentPhoto';
import { RootState } from 'src/store';
import CameraClick from '../PhotoGallery/CameraClick';

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
  const [fileName, setFileName] = useState('');
  const SavePhotos: any = useSelector(
    (state: RootState) => state.EditProfile.SaveStudentPhoto
  );
  const SubmitPhotos: any = useSelector(
    (state: RootState) => state.EditProfile.SubmitStudentPhoto
  );
  const GetStudentPic: any = useSelector(
    (state: RootState) => state.StudentPic.GetStudentpic
  );
  const DisableSubmit = GetStudentPic == null ? '' : GetStudentPic.IsSubmitted;

  const getstudentphoto: IGetStudentPhotoBody = {
    aiSchoolId: parseInt(asSchoolId),
    aiUserId: parseInt(asUserId),
    aiStudentId: parseInt(asStudentId)
  };
  // console.log(SavePhotos,"SavePhotos")
  const width = 112,
    height = 151,
    maxFileSize = 100000;
  const UserName = sessionStorage.getItem('StudentName');
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  const [userPhoto, setUserPhoto] = useState(
    ImgUrl.length != 0
      ? 'data:image/png;base64,' + ImgUrl
      : '/imges/defualtUser.jpg'
  );
  const [value, setValue] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const aRef = useRef(null);

  const [error, setError] = useState('');
  const changeFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let isValid = CheckFileValidationEditeProfile(
        e.target.files[0],
        ['jpg', 'jpeg', 'png', 'bmp'],
        1000000
      );

      if (isValid === null) {
        let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
        setFileName(base64URL.slice(base64URL.indexOf(',') + 1));
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
          if (img.width > width && img.height > height) {
            setDisableButton(true);
            setDisableSubmitButton(false);
            setError(
              `Image is ${img.height} x ${img.width}, Height and Width of photo file should not exceed 151px and 112px respectively`
            );
          }
          // let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
          else {
            setDisableButton(false);
            setDisableSubmitButton(true);
            setValue(base64URL);
          }
        };
      } else {
        setDisableButton(true);
        setError(isValid);
      }
    }
  };

  const { photos, takePhoto } = CameraClick();

  useEffect(() => {
    dispatch(getstudentpic(getstudentphoto));
  }, []);

  useEffect(() => {
    if (GetStudentPic !== null) {
      setUserPhoto('data:image/png;base64,' + GetStudentPic.PhotoImage);
      setDisableSubmitButton(false);
    }
  }, [GetStudentPic]);

  useEffect(() => {
    if (photos !== undefined && photos.length) {
      setValue(photos[0].base64Data);
      setDisableButton(false);
    }
  }, [photos]);
  useEffect(() => {
    setError('');
  }, [value]);

  useEffect(() => {
    if (SavePhotos.Message !== undefined) {
      toast.success(SavePhotos.Message, { toastId: 'success2' });
      dispatch(resetMessage());
    }
  }, [SavePhotos]);

  useEffect(() => {
    if (SubmitPhotos.Message !== undefined) {
      toast.success(SubmitPhotos.Message, { toastId: 'success1' });
      dispatch(resetMessage1());
      sessionStorage.setItem(
        'PhotoFilePath',
        value.slice(value.indexOf(',') + 1)
      );
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }, [SubmitPhotos]);

  const SaveFile = () => {
    setDisableSubmitButton(false);
    setDisableButton(true);
    const SavePhotosBody: ISaveStudentPhotoBody = {
      aiSchoolId: asSchoolId,
      aiStudentId: asStudentId,
      aiInsertedById: asUserId,
      asPhotoBase64String: value.slice(value.indexOf(',') + 1)
    };
    dispatch(getSaveStudentPhoto(SavePhotosBody));
  };
  const SubmitFile = () => {
    setDisableSubmitButton(true);
    const SubmitBody = {
      aiStudentId: asStudentId,
      aiUpdatedById: asUserId,
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId
    };
    dispatch(getSubmitStudentPhoto(SubmitBody));
  };
  //console.log('DisableSubmit', DisableSubmit);

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Edit Profile'} subheading={''} />
      <BackButton FromRoute={'/Student/Profile'} />
      <Note NoteDetail={note} />
      <ListStyle>
        <ProfileDetailHeader sx={{ textAlign: 'center' }}>
          {' '}
          <b>Name : </b>
          <b>{UserName}</b>
        </ProfileDetailHeader>

        <Box sx={{ textAlign: 'center' }}>
          <img
            src={value == '' ? userPhoto : value}
            width="112"
            height="151"
            style={{ border: '1px solid gray' }}
          />
          <Grid container>
            <Grid item xs={6}>
              <input
                style={{
                  padding: '1em',
                  width: '220px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                type="file"
                accept="image/*"
                onChange={changeFile}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ padding: '1em', marginTop: '2.5px' }}
              onClick={() => takePhoto()}
            >
              <CameraAltIcon />
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: '-3px', mb: '3px' }}>
            {error && <ErrorMessages Error={error} />}
          </Grid>
        </Box>

        <Grid container spacing={3} sx={{ textAlign: 'center' }}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <ButtonPrimary
              onClick={SaveFile}
              disabled={disableButton}
              color={disableButton ? 'warning' : 'primary'}
            >
              Save
            </ButtonPrimary>
          </Grid>
          <Grid item xs={3}>
            <ButtonPrimary
              onClick={SubmitFile}
              disabled={disableSubmitButton}
              color={disableSubmitButton ? 'warning' : 'primary'}
            >
              Submit
            </ButtonPrimary>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </ListStyle>
    </Box>
  );
}

export default EditProfile;
