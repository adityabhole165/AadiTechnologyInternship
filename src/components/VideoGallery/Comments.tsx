import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Getcomments, Icomments } from 'src/interfaces/Common/VideoGallery';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import List11 from 'src/libraries/list/List11';
import { getcommentS } from 'src/requests/VideoGallery/VideoGallery';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';

function Comments() {
  let {
    VideoID,
    FromRoute
  } = useParams();

  // Decode in-place
  VideoID = decodeURL(VideoID);
  FromRoute = decodeURL(FromRoute);

  const dispatch = useDispatch();
  const comment: any = useSelector((state: RootState) => state.Video.Comments);
  const loading = useSelector((state: RootState) => state.Video.Loading);
  const asSchoolId = localStorage.getItem('localSchoolId');

  const comment_body: Icomments = {
    asSchoolId: asSchoolId,
    asSubjectId: '0',
    asVideoId: VideoID
  };

  useEffect(() => {
    dispatch(getcommentS(comment_body));
  }, []);

  return (
    <div>
      <BackButton FromRoute={'/Common/VideoGallery/VideoAlbum'} />
      <Box sx={{ px: 2 }}>
        <PageHeader heading={'Comments'} subheading={''} />
        {loading ? (
          <SuspenseLoader />
        ) : comment.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          <>
            {comment.map((items: Getcomments, i) => (
              <List11
                key={i}
                VideoID={items.VideoId}
                Title={items.VideoComment}
                VideoUrl={items.VideoUrl}
                FromRoute={'/Comments'}
              />
            ))}
          </>
        )}
      </Box>
    </div>
  );
}
export default Comments;
