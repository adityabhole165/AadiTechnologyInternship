import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getimgs } from 'src/Client_Api/Common/PhotoGallery';
import { Iimg } from 'src/Interface/Common/PhotoGallery';
import Card22 from 'src/UI_Library/card/card22';
import { useParams } from 'react-router-dom';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { Container } from '@mui/material';
import BackButton from 'src/UI_Library/button/BackButton';

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
      <Container>
        <BackButton />
      </Container>
      <PageHeader heading={imgId} subheading={''} />
      <Card22 pic={img} />
    </div>
  );
}
export default Photos;
