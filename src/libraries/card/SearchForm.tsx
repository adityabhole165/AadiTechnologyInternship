import { TextField,Grid,Checkbox,Radio,FormControl,FormLabel,RadioGroup,Box,FormControlLabel,Avatar, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { ListStyle } from '../styled/CardStyle'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { ButtonPrimary } from '../styled/ButtonStyle';
import CloseIcon from '@mui/icons-material/Close';
import {getLanguagesDetails} from "src/requests/Library/Library";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {ILanguagesDetails} from 'src/interfaces/Student/Library'
import Dropdown from '../dropdown/Dropdown';
function SearchForm({clickFilter, clickCloseIcon}) {
  const dispatch = useDispatch();
  const [Language,setLanguage] = useState('')
  const GetLanguageList = useSelector(
    (state: RootState) => state.library.LanguageList
  );
  console.log(GetLanguageList,"GetLanguageList")
    const [ bookTitle, setBookTitle] = useState('');
    const [accessionNo, setAccessionNo] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
   const asSchoolId = localStorage.getItem('localSchoolId');
   
    const onClick = () => {
     clickFilter({bookTitle,accessionNo,author,publisher})
      }
const clickClose = () => {
  clickReset()
  clickCloseIcon({bookTitle:'',accessionNo:'',author:'',publisher:''})

}
      const Languagesbody: ILanguagesDetails = {
        aiSchoolId: asSchoolId,
     };
      useEffect(() => {
        dispatch(getLanguagesDetails(Languagesbody));
      }, []);
      
      const clickLanguage = (value) => {
        setLanguage(value);
      };
      
   const clickReset=()=>{
    setBookTitle('')
    setAccessionNo('')
    setAuthor('')
    setPublisher('')
  }
  return (
    <div>

      <ListStyle>
      <Avatar onClick={clickClose}
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
          <Dropdown Array={GetLanguageList} handleChange={clickLanguage} label={'Select Language'} defaultValue ={Language}/>
          </Grid>
        <Grid item xs={6} >
       <ButtonPrimary  fullWidth color="secondary" onClick={() => clickReset()}>Recet</ButtonPrimary>
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
