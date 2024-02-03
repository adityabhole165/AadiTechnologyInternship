import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar, Grid, Hidden, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ILanguagesDetails,
  IStandardsBody
} from 'src/interfaces/Student/Library';
import {
  getLanguagesDetails,
  getStandards
} from 'src/requests/Library/Library';
import { RootState } from 'src/store';
import DropdownAllSelect from '../dropdown/DropdownAllSelect';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';
function SearchForm({ clickFilter, clickCloseIcon }) {
  const dispatch = useDispatch();

  const GetLanguageList = useSelector(
    (state: RootState) => state.library.LanguageList
  );
  const Standards = useSelector((state: RootState) => state.library.Standards);

  const Class = sessionStorage.getItem('Class');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardID = sessionStorage.getItem('StandardId');
  const [bookTitle, setBookTitle] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [Language, setLanguage] = useState('');
  const [Standard, setStandard] = useState(asStandardID);

  const onClick = () => {
    clickFilter({
      bookTitle,
      accessionNo,
      author,
      publisher,
      Standard,
      Language
    });
  };
  const clickClose = () => {
    clickReset();
    clickCloseIcon();
  };
  const Languagesbody: ILanguagesDetails = {
    aiSchoolId: asSchoolId
  };
  const Standardsbody: IStandardsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId
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
  const clickStandard = (value) => {
    console.log('value', value);
    setStandard(value);
    // Standard=value;
  };

  const clickReset = () => {
    setBookTitle('');
    setAccessionNo('');
    setAuthor('');
    setPublisher('');
    setLanguage('');
  };
  return (
    <div>
      <ListStyle>
        <Hidden mdUp>
          <Avatar
            onClick={clickClose}
            sx={{
              position: 'absolute',
              top: '-10px',
              zIndex: '4',
              right: '-5px',
              p: '2px',
              width: 25,
              height: 25,
              backgroundColor: 'white',
              boxShadow:
                '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
            }}
          >
            <CloseIcon fontSize="small" color="error" />
          </Avatar>
        </Hidden>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Book Title:"
              variant="standard"
              fullWidth
              value={bookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Accession Number:"
              variant="standard"
              fullWidth
              value={accessionNo}
              onChange={(e) => {
                setAccessionNo(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: '-8px' }}>
            <TextField
              id="standard-basic"
              label="Author:"
              variant="standard"
              fullWidth
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: '-8px' }}>
            <TextField
              id="standard-basic"
              label="Publisher:"
              variant="standard"
              fullWidth
              value={publisher}
              onChange={(e) => {
                setPublisher(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownAllSelect
              Array={Standards}
              handleChange={clickStandard}
              label={''}
              defaultValue={Standard}
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownAllSelect
              Array={GetLanguageList}
              handleChange={clickLanguage}
              label={''}
              defaultValue={Language}
            />
          </Grid>
          <Hidden smDown>
            <Grid item md={10}></Grid>
          </Hidden>

          <Grid item xs={6} md={1}>
            <ButtonPrimary
              color="secondary"
              onClick={() => clickReset()}
              endIcon={<ReplayIcon />}
            >
              Reset
            </ButtonPrimary>
          </Grid>
          <Grid item xs={6} md={1}>
            <ArrowCircleRightRoundedIcon
              onClick={onClick}
              fontSize="large"
              color="success"
              sx={{ float: 'right', mr: 2 }}
            ></ArrowCircleRightRoundedIcon>
          </Grid>
        </Grid>
      </ListStyle>
    </div>
  );
}

export default SearchForm;
