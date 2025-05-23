import { Box, Grid, Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IsaveParentPhotosBody } from 'src/interfaces/Student/IUpoladParentPhoto';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Note from 'src/libraries/Note/Note';
import ButtonList from 'src/libraries/card/ButtonList';
import TextFilePath from 'src/libraries/card/TextFilePath';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import {
  getParentphoto,
  getSaveParentPhotos,
  getSubmitParentPhotoDetails,
  resetMessage,
  resetMessage1
} from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import { RootState } from 'src/store';

const note = [
  '1) Max Height: 151px and Max Width: 112px.',
  '2) Image size should not exceed 80 kb. Supported file formats are JPG, JPEG '
];

const submittedNote = [
  'Photo update is restricted once uploaded. Please contact school admin for any changes.'
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
  const SubmitParentPhotos: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.SubmitParentPhotoDetails
  );
  const loading = useSelector(
    (state: RootState) => state.UploadParentPhoto.Loading
  );

  const [isPhotosSubmitted, setIsPhotosSubmitted] = useState(false);
  const [isAllPhotoSaved, setIsAllPhotoSaved] = useState(false);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [checked, setChecked] = useState(true);
  let activeItem = itemList.filter((obj) => obj.IsActive)[0];

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');

  const GetParentphotoBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserId: sessionStorage.getItem('Id')
  };
  const SubmitParentPhotoDetailsBody = {
    aiUserId: Number(asUserId),
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    abSubmitForSibling: false
  };
  useEffect(() => {
    dispatch(getParentphoto(GetParentphotoBody));
  }, []);

  useEffect(() => {
    if (GetParentphotos.IsPhotosSubmitted !== undefined) {
      setIsPhotosSubmitted(GetParentphotos.IsPhotosSubmitted);
      setIsAllPhotoSaved(GetParentphotos.IsAllPhotoSaved);
    }
  }, [GetParentphotos]);

  useEffect(() => {
    setItemList(GetParentphoto);
  }, [GetParentphoto]);

  const clickItem = (value) => {
    setItemList(value);
  };

  useEffect(() => {
    if (SaveParentPhotos.Message !== undefined) {
      toast.success(SaveParentPhotos.Message, { toastId: 'success1' });
      dispatch(resetMessage());
      dispatch(getParentphoto(GetParentphotoBody, getActiveTable()));
      setIsSaveDisable(true);
    }
  }, [SaveParentPhotos]);

  const getActiveTable = () => {
    let activeTab = '1';
    itemList.map((item) => {
      if (item.IsActive) activeTab = item.Id;
    });
    return activeTab;
  };

  useEffect(() => {
    if (SubmitParentPhotos.Message !== undefined) {
      toast.success(SubmitParentPhotos.Message, { toastId: 'success2' });
      dispatch(resetMessage1());
      dispatch(getParentphoto(GetParentphotoBody, getActiveTable()));
    }
  }, [SubmitParentPhotos]);

  const onFileTextChange = (value) => {
    setItemList(
      itemList.map((item) => {
        return item.Id === value.Id ? value : item;
      })
    );
    if (!isPhotosSubmitted) setIsSaveDisable(false);
  };

  const SaveFile = () => {
    let IsSaveForSibling = false;
    if (GetParentphotos.IsSiblingPresent === true) {
      if (confirm('Do you want to save same details for sibling login'))
        IsSaveForSibling = true;
    }

    const SaveParentPhotosBody: IsaveParentPhotosBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiUserId: asUserId,
      aiIsSubmit: '0',
      asFatherPhotoFileName: itemList[0].fileName,
      asMotherPhotoFileName: itemList[1].fileName,
      asRelativePhotoFileName: itemList[2].fileName,
      asFatherImgPhoto: itemList[0].Value,
      asMotherImgPhoto: itemList[1].Value,
      asLocalGuardianPhoto: itemList[2].Value,
      asRelativeName: itemList[2].Text,
      abSaveForSibling: IsSaveForSibling
    };
    dispatch(getSaveParentPhotos(SaveParentPhotosBody));
  };

  const SubmitFile = () => {
    if (
      confirm(
        'Make sure the uploaded photos are final before submission. Contact the School admin for any changes in submitted photos.'
      )
    )
      dispatch(getSubmitParentPhotoDetails(SubmitParentPhotoDetailsBody));
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Upload Parent Photo'} subheading={''} />
      {loading && <SuspenseLoader />}
      {isPhotosSubmitted ? (
        <Note NoteDetail={submittedNote} />
      ) : (
        <Note NoteDetail={note} />
      )}

      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle>
          {itemList.length > 0 && (
            <>
              <ButtonList itemList={itemList} clickItem={clickItem} />
              {activeItem !== undefined && (
                <TextFilePath
                  item={activeItem}
                  onFileSelect={onFileTextChange}
                  onTextChange={onFileTextChange}
                />
              )}
            </>
          )}
          <Grid container spacing={2} sx={{ mt: '10px' }}>
            <Grid item xs={6}>
              <ButtonPrimary
                type="submit"
                fullWidth
                color={isSaveDisable ? 'warning' : 'primary'}
                disabled={isSaveDisable}
                onClick={SaveFile}
              >
                Save
              </ButtonPrimary>
            </Grid>
            <Grid item xs={6}>
              <ButtonPrimary
                fullWidth
                onClick={SubmitFile}
                color={
                  isPhotosSubmitted || !isAllPhotoSaved ? 'warning' : 'primary'
                }
                disabled={isPhotosSubmitted || !isAllPhotoSaved}
              >
                Submit
              </ButtonPrimary>
            </Grid>
          </Grid>
        </ListStyle>
      </Grow>
    </Box>
  );
}

export default UploadParentPhoto;
