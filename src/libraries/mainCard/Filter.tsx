import { TextField, Grid,Card, Checkbox } from '@mui/material'
import Dropdown from '../dropdown/Dropdown'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useState } from 'react';
import { BoxStyle, ListStyle } from '../styled/CardStyle';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar,Box ,FormControlLabel} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Filter({clickSearch, clickAllUser}) {
  const [showFilter, setShowFilter] = useState(true);

  const [ bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('')
  const [checked, setChecked] = useState(false)
  const onClick = () => {
    console.log({bookTitle:bookTitle,userName:userName, AllUser:checked})
    clickSearch({bookTitle:bookTitle,userName:userName, AllUser:checked})
  }
  const onChange=(value)=>{
    setChecked(value)
    clickAllUser(value)
  }
  return (
    <div>
     <ListStyle>
     <Grid container spacing={2}>
      <Grid item xs={6} > 
      <TextField id="standard-basic" label="Book Title :"
       variant="standard" fullWidth   
       value={bookTitle}
       onChange={(e)=>{setBookTitle(e.target.value)}}/>
      </Grid>
      <Grid item xs={6} > 
      <TextField id="standard-basic" label="UserName :"
      variant="standard" fullWidth 
      value={userName}
      onChange={(e)=>{setUserName(e.target.value)}}
      />
      </Grid>
      <Grid item xs={11} > 
     <FormControlLabel control={
     
     <Checkbox checked={checked} onChange={()=>{onChange(!checked)}} />} label="Show all claimed books by all users" />
     </Grid>
      <Grid item xs={1} >
      <ArrowCircleRightRoundedIcon onClick={onClick}
        fontSize='large' color='success' sx={{float:"right"}} ></ArrowCircleRightRoundedIcon>
      </Grid>
      </Grid>
     </ListStyle>

    </div>
  )
}

export default Filter
