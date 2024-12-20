import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Avatar,
  Box,
  Grid,
  Hidden,
  IconButton,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IBooksDetails } from 'src/interfaces/Student/Library';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchForm from 'src/libraries/card/SearchForm';
import TableCard from 'src/libraries/card/TableCard';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimaryLab } from 'src/libraries/styled/ButtonStyle';
import { getBookDetailslist } from 'src/requests/Library/Library';
import { RootState } from 'src/store';
import BooksDetails from './BooksDetails';

function Library() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [Language, setLanguage] = useState('');

  const GetBookList = useSelector(
    (state: RootState) => state.library.BooksDetaiLs
  );

  const loading = useSelector((state: RootState) => state.library.Loading);

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardID = sessionStorage.getItem('StandardId');
  const [Standard, setStandard] = useState(asStandardID);
  const [ascending, setAscending] = useState('asc');

  useEffect(() => {
    setStandard(Standard);
  }, []);

  useEffect(() => {
    const BooksDetails_body: IBooksDetails = {
      aiSchoolId: asSchoolId,
      asBookName: bookTitle,
      asAccessionNumber: accessionNo,
      asAuthorName: author,
      asPublisher: publisher,
      asLanguage: Language,
      aiStandardId: Standard === '' ? asStandardID : Standard,
      aiMediaType: 2,
      aiBookId: 0,
      aiParentStaffId: '0',
      aiEndIndex: 20,
      aiStartRowIndex: '0',
      asSortExpression: 'Order by Book_Title ' + ascending
    };
    dispatch(getBookDetailslist(BooksDetails_body));
  }, [
    bookTitle,
    accessionNo,
    author,
    publisher,
    Standard,
    Language,
    ascending
  ]);

  const clickNav = (path) => {
    navigate('/RITeSchool/Student/Library/' + path);
  };

  const clickFilter = ({
    bookTitle,
    accessionNo,
    author,
    publisher,
    Language,
    Standard
  }) => {
    setBookTitle(bookTitle);
    setAccessionNo(accessionNo);
    setAuthor(author);
    setPublisher(publisher);
    setLanguage(Language);
    setStandard(Standard);
  };

  const clickCloseIcon = () => {
    setShowFilter(!showFilter);
    setBookTitle('');
    setAccessionNo('');
    setAuthor('');
    setPublisher('');
    setLanguage('');
    setStandard('');
  };

  const sortClick = () => {
    setAscending(ascending === 'asc' ? 'desc' : 'asc');
  };

  const HeaderArray = [
    { Id: 1, Header: 'BookTitle' },
    { Id: 2, Header: 'Accession No.' },
    { Id: 3, Header: 'Author' },
    { Id: 4, Header: 'Publisher' },
    { Id: 5, Header: 'Language' },
    { Id: 6, Header: 'Standards' },
    { Id: 7, Header: 'Available' },
    { Id: 8, Header: 'Total' },
    { Id: 9, Header: 'Claim' }
  ];

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Library'} subheading={''} />
      <Grid container spacing={1}>
        {!showFilter ? (
          <>
            <Grid container item md={2} xs={12} columnSpacing={1}>
              <Grid item md={12} xs={5} direction={{ xs: 'row', sm: 'column' }}>
                <ButtonPrimaryLab
                  fullWidth
                  onClick={() => {
                    clickNav('ClaimedBook');
                  }}
                >
                  Claimed Books
                </ButtonPrimaryLab>
              </Grid>
              <Grid item md={12} xs={5} direction={{ xs: 'row', sm: 'column' }}>
                <ButtonPrimaryLab
                  fullWidth
                  onClick={() => {
                    clickNav('Bookswithme');
                  }}
                >
                  Books With Me
                </ButtonPrimaryLab>
              </Grid>
              <Hidden mdUp>
                <Grid item xs={2}>
                  <img
                    src={'/imges/SearchBook.png'}
                    style={{ width: 30, height: 27 }}
                    onClick={() => {
                      setShowFilter(!showFilter);
                    }}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </>
        ) : (
          <>
            <Grid item md={10} xs={12}>
              <SearchForm
                clickFilter={clickFilter}
                clickCloseIcon={clickCloseIcon}
              />
            </Grid>
          </>
        )}
        <Hidden mdDown>
          <Grid item sm={10} xs={12}>
            <SearchForm
              clickFilter={clickFilter}
              clickCloseIcon={clickCloseIcon}
            />
          </Grid>
        </Hidden>
      </Grid>

      <Grid container>
        <Grid item xs={1.5} />
        <Grid item xs={9}>
          <Typography
            sx={{ textAlign: 'center', padding: '10px', color: 'black' }}
            variant="h4"
          >
            Books Details
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <Avatar
            variant="square"
            sx={{
              height: 25,
              width: 55,
              color: 'black',
              mt: '8px',
              float: 'right',
              mr: '10px'
            }}
          >
            <IconButton onClick={() => sortClick()}>
              {ascending === 'asc' ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
              {ascending === 'asc' ? (
                <Typography>A-Z</Typography>
              ) : (
                <Typography>Z-A</Typography>
              )}
            </IconButton>
          </Avatar>
        </Grid>
      </Grid>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <>
          <Hidden smUp>
            <BooksDetails GetBookList={GetBookList} />
          </Hidden>
          <Hidden smDown>
            <TableCard ItemList={GetBookList} HeaderArray={HeaderArray} />
          </Hidden>
        </>
      )}
    </Box>
  );
}
export default Library;
