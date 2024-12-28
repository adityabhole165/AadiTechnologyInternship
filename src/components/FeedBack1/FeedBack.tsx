import StarIcon from '@mui/icons-material/Star';
import { Box, Rating } from '@mui/material';
import { useState } from 'react';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    //console.log('Rating:', rating);
    //console.log('Comment:', comment);
    setRating(null);
    setComment('');

    // Redirect to the Play Store if the rating is higher than or equal to a certain threshold
    if (rating && rating >= 1) {
      window.open(
        'https://play.google.com/store/apps/details?id=www.riteschool.net&hl=en&gl=US'
      );
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2>How was your experience?</h2>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Rating
            name="user-rating"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>

        <br></br>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            rows={4}
          />
        </div>
        <br></br>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ButtonPrimary
            className="submit-button-container"
            onClick={handleSubmit}
          >
            Submit
          </ButtonPrimary>
        </div>
      </div>
    </Box>
  );
};

export default Feedback;
