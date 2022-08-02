import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { getcommentS } from 'src/Client_Api/Common/VideoGallery';
import { Icomments, Getcomments } from 'src/Interface/Common/VideoGallery';
import { useParams } from 'react-router-dom';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';
import BackButton from 'src/UI_Library/button/BackButton';
import { Container } from '@mui/material';
import List11 from 'src/UI_Library/list/List11';

function Comments() {
  const { VideoID } = useParams();
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
      <Container>
        <PageHeader heading={'Comments'} subheading={''} />
        <span style={{position:'relative',top:'-20px',left:'5px'}}>
        <BackButton />
        </span>
        {comment.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          <>
            {comment.map((items: Getcomments, i) => (
              <List11
                key={i}
                VideoId={items.VideoId}
                Title={items.VideoComment}
                VideoUrl={items.VideoUrl}
              />
            ))}
          </>
        )}
      </Container>
    </div>
  );
}
export default Comments;
