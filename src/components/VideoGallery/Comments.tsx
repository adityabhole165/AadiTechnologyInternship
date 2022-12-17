import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getcommentS } from 'src/requests/VideoGallery/VideoGallery';
import { Icomments, Getcomments } from 'src/interfaces/Common/VideoGallery';
import { useParams } from 'react-router-dom';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import BackButton from 'src/libraries/button/BackButton';
import { Container } from '@mui/material';
import List11 from 'src/libraries/list/List11';

function Comments() {
  const { VideoID, FromRoute } = useParams();
  const dispatch = useDispatch();
  const comment: any = useSelector((state: RootState) => state.Video.Comments);
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
     
        <BackButton FromRoute={"/Common/VideoGallery/VideoAlbum"}/>
    
      <Container>
        <PageHeader heading={'Comments'} subheading={''} />

        {comment.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          <>
            {comment.map((items: Getcomments, i) => (
              <List11
                key={i}
                VideoID={items.VideoId}
                Title={items.VideoComment}
                VideoUrl={items.VideoUrl}
                FromRoute={"/Comments"}
              />
            ))}
          </>
        )}
      </Container>
    </div>
  );
}
export default Comments;
