import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getimgs } from 'src/requests/Common/PhotoGallery';
import { Iimg } from 'src/interfaces/Common/PhotoGallery';
import Card22 from 'src/libraries/card/card22';
import { useParams } from 'react-router-dom';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container } from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';

function Photos() {
  const { imgId } = useParams();

  const dispatch = useDispatch();
  const img: any = useSelector((state: RootState) => state.Gallery.imgList);
  const asSchoolId = localStorage.getItem('localSchoolId');

  const img_body: Iimg = {
    asSchoolId: asSchoolId,
    asGalleryName: imgId
  };

  useEffect(() => {
    dispatch(getimgs(img_body));
  }, []);
  return (
    <div>
      <PageHeader heading={imgId} subheading={''} />

      <Card22 pic={img} />

    </div>
  );
}
export default Photos;
