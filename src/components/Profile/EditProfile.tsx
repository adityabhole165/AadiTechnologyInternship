import { Container, Typography,Box,Grid } from '@mui/material'
import { useRef, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { ProfileDetailHeader } from 'src/libraries/styled/ProfileStyled'

function EditProfile() {
    const UserName = sessionStorage.getItem('StudentName');
    const aRef = useRef();
    const [file, setFile] = useState()
  
    function changeFile(event) {
      setFile(event.target.files)
    }
    
  return (
    <Container>
        <PageHeader heading={'EditProfile'} subheading={''}/>
        <ListStyle>
        <ProfileDetailHeader sx={{textAlign:"center"}}> <b>Name : </b><b>{UserName}</b></ProfileDetailHeader>
        <br></br>
      <Box sx={{textAlign:"center"}}>
      <img width="112" height="151" style={{ border: "1px solid gray" }}
          src={''} />
      
        <input ref={aRef} type="file" onChange={changeFile}  />
      </Box>
      <br></br>
      <Grid container  sx={{textAlign:"center"}}>
      <Grid item xs={3}/>
        <Grid item xs={3}>
            <ButtonPrimary>Save</ButtonPrimary>
        </Grid>
        <Grid item xs={3}>
            <ButtonPrimary>Submit</ButtonPrimary>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
        </ListStyle>
    
  
    </Container>
  )
}

export default EditProfile
