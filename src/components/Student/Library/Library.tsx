import React, { useState } from 'react';
import Bookswithme from './Bookswithme';
import BooksDetails from './BooksDetails';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Styles } from 'src/assets/style/student-style';
import LibraryToggle from 'src/libraries/buttons/LibraryToggle';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Box, Typography, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Library() {
  const [showForm, setshowForm] = useState(false);

  const [link, setLink] = useState('Books with me ');
  const [text, setText] = useState(' Books Details');

  function toggleClick() {
    setshowForm(!showForm);
    if (showForm) {
      setLink('Books with me');
      setText('Books Details');
    } else {
      setLink('Books Details');
      setText('Books with me');
    }
  }
  const classes = Styles();

  return (
    <>
      <PageHeader heading={'Library'} subheading={''} />
      <Container>
        <RouterLink to={`/${location.pathname.split('/')[1]}/Student/Claim`}>
          <Box display="flex" flexDirection="row" justifyContent="right">
            <Typography
              className={classes.Listfont1}
              sx={{ textDecoration: 'underline', color: 'blue' }}
            >
              Claim
            </Typography>
            <ArrowForwardTwoToneIcon fontSize="small" />
          </Box>
        </RouterLink>
      </Container>

      <LibraryToggle title1={link} title2={text} toggleClick={toggleClick} />
      {showForm ? <Bookswithme /> : <BooksDetails />}
    </>
  );
}
export default Library;
