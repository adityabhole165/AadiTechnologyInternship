import { TextField,Grid,Checkbox,Radio,FormControl,FormLabel,RadioGroup,Box,FormControlLabel,Avatar } from '@mui/material'
import React,{useState} from 'react'
import { ListStyle } from '../styled/CardStyle'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { ButtonPrimary } from '../styled/ButtonStyle';
import CloseIcon from '@mui/icons-material/Close';
function SearchForm({clickFilter,clickCloseIcon}) {
   
    const [ bookTitle, setBookTitle] = useState('');
    const [accessionNo, setAccessionNo] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
   const [checked, setChecked] = useState(false);
  
    const SearchClaimed = {
        asBookTitle:bookTitle,
        asAccessionNo:accessionNo,
        asAuthor:author,
        asPublisher:publisher,
        aschecked:checked
    }
    const onClick = () => {
    console.log(SearchClaimed,"SearchClaimed")
     clickFilter({bookTitle,accessionNo,author,publisher})
      }

      
    
  return (
    <div>
 
      <ListStyle>
      <Avatar onClick={clickCloseIcon}
        sx={{ position: 'absolute', top: '-10px', zIndex: '4', right: '-5px',p:'2px',width: 25, height: 25,backgroundColor:"white",boxShadow:
        '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'}} 
      >   
      <CloseIcon fontSize="small" color='error'  />
       </Avatar>
        <Grid container spacing={1}>
          <Grid item xs={6}>
          <TextField id="standard-basic" label="Book Title:"
            variant="standard" fullWidth   
            value={bookTitle}
            onChange={(e)=>{setBookTitle(e.target.value)}}/>
            </Grid>
            <Grid item xs={6}>
            <TextField id="standard-basic" label="Accession Number:"
             variant="standard" fullWidth   
             value={accessionNo}
             onChange={(e)=>{setAccessionNo(e.target.value)}}/>
             </Grid>
            <Grid item xs={6}>
            <TextField id="standard-basic" label="Author:"
             variant="standard" fullWidth   
             value={author}
             onChange={(e)=>{setAuthor(e.target.value)}}/>
            </Grid>
            <Grid item xs={6}>
            <TextField id="standard-basic" label="Publisher:"
             variant="standard" fullWidth   
             value={publisher}
             onChange={(e)=>{setPublisher(e.target.value)}}/>
            </Grid>
            <Grid item xs={12}>
            <TextField id="standard-basic" label="Standard:"
             variant="standard" fullWidth   
             value={''}/>
            </Grid>
            <Grid item xs={12}>
            <FormControl >
            <Box sx={{display:"flex"}}>
           <FormLabel id="demo-controlled-radio-buttons-group">Languge</FormLabel>
           <RadioGroup sx={{ml:2,mt:-1}}
             row aria-labelledby="demo-row-radio-buttons-group-label"
                 name="row-radio-buttons-group">

        <FormControlLabel value={checked}  control={<Radio  size="small"/>} label="English" />
          <FormControlLabel value={checked}  control={<Radio size="small"/>} label="Hindi" />
           <FormControlLabel value={checked}  control={<Radio size="small"/>} label="Marathi" />
           </RadioGroup>
          </Box>
           </FormControl>
          </Grid>
        <Grid item xs={6} >
       <ButtonPrimary  fullWidth color="secondary" >Cancel</ButtonPrimary>
      </Grid>
      <Grid item xs={6} >
      <ArrowCircleRightRoundedIcon onClick={onClick}
        fontSize='large' color='success' sx={{float:"right",mr:2}}></ArrowCircleRightRoundedIcon>
      </Grid>
        </Grid>
     </ListStyle>
    </div>
  )
}

export default SearchForm
