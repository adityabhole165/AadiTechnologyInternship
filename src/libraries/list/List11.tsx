import { List, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { RootState } from 'src/store';

List11.propTypes = {
  VideoDetailsId: PropTypes.number,
  VideoID: PropTypes.number,
  Title: PropTypes.string,
  UrlSourceId: PropTypes.number,
  VideoUrl: PropTypes.string,
  FromRoute: PropTypes.string
};

function List11({
  VideoID,
  Title,
  VideoDetailsId,
  UrlSourceId,
  VideoUrl,
  FromRoute
}) {
  const theme = useTheme();
  const classes = Styles();

  const comment: any = useSelector((state: RootState) => state.Video.Comments);
  const [click, setClick] = React.useState();
  const handleclickk = (event) => {
    setClick(event.target.value);
    alert(event.target.value);
  };
  function returnURL(VideoUrl) {
    if (VideoUrl.split('v=').length > 1) {
      if (VideoUrl.split('v=')[1].split('&')[0] === undefined) {
        return VideoUrl.split('v=')[1];
      } else return VideoUrl.split('v=')[1].split('&')[0];
    } else return VideoUrl.split('be/')[1];
  }
  return (
    <>
      <RouterLink
        to={
          `/${location.pathname.split('/')[1]}/Common/videoview/` +
          returnURL(VideoUrl) +
          '/' +
          VideoID
        }
        color="primary"
        style={{ textDecoration: 'none' }}
      >
        <List
          className={classes.ListStyle}
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Typography className={classes.Listfont1}>{Title}</Typography>
        </List>
      </RouterLink>
      {/* </Grow> */}
    </>
  );
}

export default List11;
