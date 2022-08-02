import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import BackButton from 'src/UI_Library/button/BackButton';
import PropTypes from 'prop-types';

Card23.propTypes = {
  pic: PropTypes.string
};

function Card23({ pic }) {
  console.log('https://www.youtube.com/embed/', pic);

  return (
    <>
      <br />
      <Container>
      <br />
      <span style={{position:'relative',left:'5px',top:'7px'}}>
      <BackButton />
      </span>
        <br />
      </Container>
      <Container>
        <Grid container xs={12} justifyContent="center">
          <Grid xs={11}>
            <a>
              <iframe
                width="100% "
                height="385px "
                allowFullScreen
                src={'https://www.youtube.com/embed/' + pic}
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
