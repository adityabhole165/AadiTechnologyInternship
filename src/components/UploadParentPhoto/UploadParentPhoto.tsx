import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { IGetParentPhotosBody } from 'src/interfaces/Student/IUpoladParentPhoto';
import { getParentphoto } from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import {getSaveParentPhotos} from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';
import {getSubmitParentPhotoDetails} from 'src/requests/UploadParentPhoto/RequestUploadParentPhoto';

function UploadParentPhoto() {

  const dispatch = useDispatch();

  const GetParentphoto: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.GetParentphoto
  );

  const SaveParentPhotos: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.SaveParentPhotos
  );

  const SubmitParentPhotoDetails: any = useSelector(
    (state: RootState) => state.UploadParentPhoto.SubmitParentPhotoDetails
  );
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const GetParentphotoBody=
  {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "aiUserId": "2734"
  }
  console.log ("GetParentphoto",GetParentphoto);

  const SaveParentPhotosBody=
  {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "asFatherPhotoFileName":"abc.jpg",
    "asMotherPhotoFileName":"abc.jpg",
    "asRelativePhotoFileName":"abc.jpg",
    "asFatherImgPhoto":"",
    "asMotherImgPhoto":"VGVzdGLuZy4=",
    "asLocalGuardianPhoto":"",
    "aiUserId": "2734",
    "aiIsSubmit":"0",
    "asRelativeName":"",
    "abSaveForSibling":"0"

  }
console.log ("SaveParentPhotos",SaveParentPhotos);

const SubmitParentPhotoDetailsBody ={
  "aiUserId":2734,
  "aiSchoolId":asSchoolId,
  "aiAcademicYearId": asAcademicYearId,
  "abSubmitForSibling":false
}
console.log ("SubmitParentPhotoDetails", SubmitParentPhotoDetails);

  useEffect(() => {
    dispatch(getParentphoto(GetParentphotoBody));
    dispatch(getSaveParentPhotos(SaveParentPhotosBody));
    dispatch(getSubmitParentPhotoDetails(SubmitParentPhotoDetailsBody));

  }, []);


  return (
    <>
      <PageHeader heading={'Upload Parents Photos'} subheading={''} />
    </>
  )
}

export default UploadParentPhoto