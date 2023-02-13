import { TextField,Grid,Checkbox,Radio,FormControl,FormLabel,RadioGroup,Box,FormControlLabel,Avatar, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { ListStyle } from '../styled/CardStyle'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { ButtonPrimary } from '../styled/ButtonStyle';
import CloseIcon from '@mui/icons-material/Close';
import {getLanguagesDetails,getStandards} from "src/requests/Library/Library";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {ILanguagesDetails,IStandardsBody} from 'src/interfaces/Student/Library'
import Dropdown from '../dropdown/Dropdown';
import { logoURL } from 'src/components/Common/Util';
function SearchForm({clickFilter, clickCloseIcon}) {
  const dispatch = useDispatch();

  const GetLanguageList = useSelector(
    (state: RootState) => state.library.LanguageList
  );
  const Standards = useSelector(
    (state: RootState) => state.library.Standards
  );


  const Class = sessionStorage.getItem('Class');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardID = sessionStorage.getItem('StandardId');
    const [ bookTitle, setBookTitle] = useState('');
    const [accessionNo, setAccessionNo] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [Language,setLanguage] = useState('');
    const [Standard,setStandard] = useState( asStandardID);
   
    
     
    const onClick = () => {
     clickFilter({bookTitle,accessionNo,author,publisher,Standard,Language})
      }
      const clickClose = () => {
         clickReset()
        clickCloseIcon({bookTitle:'',accessionNo:'',author:'',publisher:'',Language:"",Standard:''})

      }
      const Languagesbody: ILanguagesDetails = {
        aiSchoolId: asSchoolId,
     };
     const Standardsbody: IStandardsBody = {
        aiSchoolId: asSchoolId,
        aiAcademicYrId:asAcademicYearId,
   };
      useEffect(() => {
        dispatch(getLanguagesDetails(Languagesbody));
      }, []);

      useEffect(() => {
      dispatch(getStandards(Standardsbody));
    
      }, []);
      
      const clickLanguage = (value) => {
        setLanguage(value);
      };
      const clickStandard= (value) => {
        console.log("value",value);
        setStandard(value)
        // Standard=value;
      };
      
   const clickReset=()=>{
    setBookTitle('')
    setAccessionNo('')
    setAuthor('')
    setPublisher('')
    setLanguage('')
  
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
            <Grid item xs={6}>
            <Dropdown Array={ Standards} handleChange={clickStandard} 
            label={'Select Standard'} defaultValue ={Standard}/>
            </Grid>
            <Grid item xs={6}>
          <Dropdown Array={GetLanguageList} handleChange={clickLanguage} label={'Select Language'} defaultValue ={Language}/>
          </Grid>
          <Grid item xs={6} >
          <ButtonPrimary  color="secondary" onClick={() => clickReset()}>Reset</ButtonPrimary>
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
