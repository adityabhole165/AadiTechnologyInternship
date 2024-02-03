import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Iimg } from 'src/interfaces/Common/PhotoGallery';
import BackButton from 'src/libraries/button/BackButton';
import Card22 from 'src/libraries/card/card22';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getimgs } from 'src/requests/PhotoGallery/PhotoGallery';
import { RootState } from 'src/store';

function Photos() {
  const { imgId, FromRoute, Month, Year } = useParams();

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
      <PageHeader heading={'Album'} subheading={''} />

      <BackButton
        FromRoute={'/Common/' + FromRoute + '/' + Month + '/' + Year}
      />

      <Card22 pic={img} imgId={imgId} />
    </div>
  );
}
export default Photos;
