import { Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';

Card23.propTypes = {
  pic: PropTypes.string
};

function Card23({ pic }) {
  return (
    <>
      <Container sx={{ mt: '60px' }}>
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={11}>
            <a>
              <iframe
                width="100% "
                height="385px "
                allowFullScreen
                src={'https://www.youtube.com/embed/' + pic + '?controls=0'}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </a>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Card23;
