import React, { useEffect, useState } from 'react';
import Bookswithme from './Bookswithme';
import BooksDetails from './BooksDetails';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Styles } from 'src/assets/style/student-style';
import LibraryToggle from 'src/libraries/buttons/LibraryToggle';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Box, Typography, Container,Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router';
import PlagiarismTwoToneIcon from '@mui/icons-material/PlagiarismTwoTone';
function Library() {
  const navigate = useNavigate();
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
  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
  },[])

  const classes = Styles();


  const clickBookwithme = () => {
    navigate('/extended-sidebar/Student/Library/Bookswithme')
  }
  return (
    <Container>
      <PageHeader heading={'Library'} subheading={''} />
       <Grid container spacing={1}>
        <Grid item xs={5.2}>
          <ButtonPrimary fullWidth>Claim</ButtonPrimary>
        </Grid>
        <Grid item xs={5.2}>
          <ButtonPrimary fullWidth onClick={clickBookwithme}>Book With Me</ButtonPrimary>
        </Grid>  
        <Grid item xs={1.6}>
  <img src={"/imges/SearchBook.png"} style={{width: 30, height: 27,}}/>
        </Grid>
      </Grid>
    <Typography sx={{textAlign:"center",padding:"10px",color:"black"}} variant="h4">Books Details</Typography>
      <BooksDetails />
  
    </Container>
  );
}
export default Library;
