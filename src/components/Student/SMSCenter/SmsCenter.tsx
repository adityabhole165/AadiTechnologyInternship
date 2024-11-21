import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import SmsIcon from '@mui/icons-material/Sms';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { Box, Card, CircularProgress, Grid, Hidden, IconButton, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// import SortingArrowheads from 'src/assets/img/sorting icon/icons-sorting-arrowhead.png';
import { Styles } from 'src/assets/style/student-style';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IMobileNumber, INewSmsList, ISmsCountBody } from 'src/interfaces/Student/SMSCenter';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { getMobileNumber, getNewSmsList, getSmsCount } from 'src/requests/Student/SMSCenter';

import { RootState } from 'src/store';
const PageSize = 20;
const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  color: 'black',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
}));

function SmsCenter() {
  const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const classes = Styles();
  const [filtered, setFiltered] = useState(false); // State to toggle between original and filtered list
  const dispatch = useDispatch();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
  const NewSmsList = useSelector((state: RootState) => state.SmsCenter.NewSmsList);
  const SmsCount: any = useSelector((state: RootState) => state.SmsCenter.SmsCountDetails);
  console.log(SmsCount, 'SmsCount');
  const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
  const MobileNumber = useSelector((state: RootState) => state.SmsCenter.MobileNumber);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const DesignationName = sessionStorage.getItem('DesignationName');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const [PagedSMS, setPagedSMS] = useState([]);
  const [NameSubject, setNameSubject] = useState('');
  const [SortExp, setSortExp] = useState('Insert_Date')
  const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const filteredList = NewSmsList.filter((item) => item.TotalRows !== undefined);
  const TotalCount = filteredList.map((item) => item.TotalRows);
  const uniqueTotalCount = [...new Set(TotalCount)];
  const singleTotalCount = uniqueTotalCount[0];
  const [activeTab, setActiveTab] = useState('');
  const [SortBy, setSortBy] = useState('Date');

  const pathname = window.location.pathname;
  const pageName =
    pathname.indexOf('/extended-sidebar/Teacher/SmsCenter/') === -1
      ? pathname.replace('/extended-sidebar/Teacher/SmsCenter', '')
      : pathname.replace('/extended-sidebar/Teacher/SmsCenter/', '');

  useEffect(() => {
    const MobileNumber_body: IMobileNumber = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: UserId,
      asUserRoleId: RoleId,
    };

    const SmsCountBody: ISmsCountBody = {
      asUserId: UserId,
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId,
    };

    localStorage.setItem('url', window.location.pathname);
    dispatch(getMobileNumber(MobileNumber_body));
    dispatch(getSmsCount(SmsCountBody));
    setActiveTab(pageName === '' ? 'Received SMS' : pageName);
  }, []);

  // In your component, remove the `sortedAndFilteredSmsList` declaration and replace it with the following `useEffect`.

  useEffect(() => {
    const filteredAndSortedList = NewSmsList
      .filter(item => {
        if (!dateFilter.startDate && !dateFilter.endDate) return true;
        const itemDate = new Date(item.Date);
        if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
        if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
        return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
      })
      .filter(item => {
        // Apply filter based on `NameSubject` input
        return item.UserName.toLowerCase().includes(NameSubject.toLowerCase()) ||
          item.Subject.toLowerCase().includes(NameSubject.toLowerCase());
      })
      .sort((a, b) => {
        let comparison = 0;
        if (SortBy === 'Date') {
          comparison = new Date(a.Date).getTime() - new Date(b.Date).getTime();
        } else if (SortBy === 'UserName') {
          comparison = a.UserName.localeCompare(b.UserName);
        } else if (SortBy === 'Subject') {
          comparison = a.Subject.localeCompare(b.Subject);
        }
        return SortDirection === 'asc' ? comparison : -comparison;
      });

    setPagedSMS(filteredAndSortedList);
  }, [NewSmsList, dateFilter, SortBy, SortDirection]);

  const handleStartDateChange = (date: Date | null) => {
    setDateFilter(prevState => ({ ...prevState, startDate: date }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setDateFilter(prevState => ({ ...prevState, endDate: date }));
  };

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const SmsNewList_body: INewSmsList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    asReceiverUserRoleId: RoleId,
    asStartIndex: (page - 1) * rowsPerPage,
    asPageSize: page * rowsPerPage
  };

  useEffect(() => {
    dispatch(getNewSmsList(SmsNewList_body))
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (NewSmsList) {
      setPagedSMS(NewSmsList);
    }
  }, [NewSmsList]);

  const handleFilterClick = () => {
    setFiltered(!filtered);
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // const displayList = filtered ? sortedAndFilteredSmsList : NewSmsList; // Implement pagination

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const clickClear = () => {
    localStorage.setItem('ViewSMSData', '');
  };
  const handleRegNoOrNameChange = (value) => {
    setNameSubject(value);
  };
  const clickSearch = () => {
    if (NameSubject === '') {
      setPagedSMS(NewSmsList);
    } else {
      const filteredSMS = NewSmsList.filter((item) => {
        const text1Match = item.UserName.toLowerCase().includes(NameSubject.toLowerCase());
        const text2Match = item.Subject.toLowerCase().includes(NameSubject.toLowerCase());
        return text1Match || text2Match;
      });
      setPagedSMS(filteredSMS);
    }
  };

  useEffect(() => {
    // Set PagedSMS to NewSmsList whenever it updates
    setPagedSMS(NewSmsList);
  }, [NewSmsList]);

  const handleSortChange = (column: string) => {
    if (SortBy === column) {
      setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  let url = "/extended-sidebar/Student/viewsms/"
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'SMS Center',
            path: '/extended-sidebar/Student/SmsCenter',
          },
        ]}
        rightActions={
          <>

            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label="To / From / SMS Text"
              value={NameSubject}
              variant={'outlined'}
              size={"small"}
              onChange={(e) => {
                handleRegNoOrNameChange(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  clickSearch();
                }
              }}
            />
            <IconButton
              onClick={clickSearch}
              sx={{
                background: (theme) => theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark
                }
              }}
            >
              <SearchTwoTone />
            </IconButton>
            <Box>
              <Tooltip
                title={
                  'School SMS will be sent to below listed number(s). To add/update the number, please send the information to admin staff via message center.'
                }
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: yellow[700],
                    height: '36px !important',
                    ':hover': { backgroundColor: yellow[800] },
                  }}
                >
                  <PriorityHighIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Displays recived sms/ send sms/ scheduled sms/all send sms list.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] },
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />

      <Box>
        <Grid container >
          <Grid item sx={{ minWidth: '15%', pr: 1, pb: 2 }}>
            <Hidden smDown>
              <RouterLink
                style={{ textDecoration: 'none', color: '#223354' }}
                to={`/${location.pathname.split('/')[1]
                  }/Teacher/ComposeSMS`}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    height: '85px',
                    backgroundColor: activeTab === 'Compose SMS' ? blue[100] : 'white',
                    mb: '10px',
                    borderRadius: '10px',
                  }} onClick={() => handleTabClick('Compose SMS')}
                >

                  <AddCircleIcon
                    onClick={undefined}
                    sx={{ mt: '10px', color: '#38548A' }}
                    className={classes.IconSize}
                  />
                  <br />
                  <b style={{ color: '#38548A' }}>Compose SMS</b>
                </Card>
              </RouterLink>
              <Card
                sx={{
                  textAlign: 'center',
                  height: '85px',
                  backgroundColor: activeTab === 'Received SMS' ? blue[100] : 'white',
                  mb: '10px',
                  borderRadius: '10px',
                }}
                onClick={() => handleTabClick('Received SMS')}
              >

                <MarkunreadMailboxIcon
                  onClick={undefined}
                  sx={{ mt: '10px', color: '#38548A' }}
                  className={classes.IconSize}
                />
                <br />
                <b style={{ color: '#38548A' }}>Received SMS</b>
              </Card>
              <Card
                sx={{
                  textAlign: 'center',
                  height: '85px',
                  backgroundColor: activeTab === 'Send Item' ? blue[100] : 'white',
                  mb: '10px',
                  borderRadius: '10px',
                }} onClick={() => handleTabClick('Send Item')}
              >

                <SmsIcon
                  onClick={undefined}
                  sx={{ mt: '10px', color: '#38548A' }}
                  className={classes.IconSize}
                />
                <br />
                <b style={{ color: '#38548A' }}>Send Item</b>
              </Card>
              <Card
                sx={{
                  textAlign: 'center',
                  height: '85px',
                  backgroundColor: activeTab === 'Scheduled SMS' ? blue[100] : 'white',
                  mb: '10px',
                  borderRadius: '10px',
                }}
                onClick={() => handleTabClick('Scheduled SMS')}
              >

                <AccessAlarmIcon
                  onClick={undefined}
                  sx={{ mt: '10px', color: '#38548A' }}
                  className={classes.IconSize}
                />
                <br />
                <b style={{ color: '#38548A' }}>Scheduled SMS</b>
              </Card>
              {DesignationName === 'Principal' && (
                <Card
                  sx={{
                    textAlign: 'center',
                    height: '85px',
                    backgroundColor: activeTab === 'All Send Item' ? blue[100] : 'white',
                    mb: '10px',
                    borderRadius: '10px',
                  }}
                  onClick={() => handleTabClick('All Send Item')}
                >

                  <AllInboxIcon
                    onClick={undefined}
                    sx={{ mt: '10px', color: '#38548A' }}
                    className={classes.IconSize}
                  />
                  <br />
                  <b style={{ color: '#38548A' }}>All send Item</b>
                </Card>
              )}
            </Hidden>
          </Grid>
          <Grid item sx={{ minWidth: '85%', p: 2, background: 'white', borderRadius: '10px' }}>

            <Grid container spacing={2} pb={2}>
              {/* Free SMS Count */}
              <Grid item xs={12} sm={3}>
                <Card sx={{ backgroundColor: blue[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                  <SmsIcon sx={{ color: blue[600], fontSize: 36, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" color="blue">
                      Free SMS
                    </Typography>
                    <Typography variant="h4">{SmsCount.AllowedSMSCount ?? 0}</Typography>
                  </Box>
                </Card>
              </Grid>

              {/* Sent SMS Count */}
              <Grid item xs={12} sm={3}>
                <Card sx={{ backgroundColor: green[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                  <SmsIcon sx={{ color: green[600], fontSize: 36, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" color="green">
                      Sent SMS
                    </Typography>
                    <Typography variant="h4">{SmsCount.SentSMSCount ?? 0}</Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card sx={{ backgroundColor: blue[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                  <SmsFailedIcon sx={{ color: blue[600], fontSize: 36, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" color="blue">
                      Balance SMS
                    </Typography>
                    <Typography variant="h4">0</Typography>
                  </Box>
                </Card>
              </Grid>
              {/* Exceeded SMS Count */}
              <Grid item xs={12} sm={3}>
                <Card sx={{ backgroundColor: red[100], display: 'flex', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                  <SmsFailedIcon sx={{ color: red[600], fontSize: 36, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" color="red">
                      Exceeded SMS
                    </Typography>
                    <Typography variant="h4">{SmsCount.ExceededSMSCount ?? 0}</Typography>
                  </Box>
                </Card>
              </Grid>

            </Grid>

            <Typography variant={'h4'} fontWeight={800} textAlign={'center'} pt={1}>Mobile Number(s) : {MobileNumber.replace(';', ', ')}</Typography>
            {activeTab == 'Received SMS' && (
              <Box sx={{ mt: 2 }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : PagedSMS.length > 0 ? (
                  <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                    <TableHead>
                      <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                        <TableCell sx={{ color: 'white' }}>
                          <b onClick={() => handleSortChange('UserName')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            From {SortBy === 'UserName' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                          </b>
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          <b onClick={() => handleSortChange('Subject')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            SMS Text {SortBy === 'Subject' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                          </b>
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          <b onClick={() => handleSortChange('Date')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            Received Date {SortBy === 'Date' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                          </b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {PagedSMS.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.UserName}</TableCell>
                          <TableCell>   <Link href={url + row.SMS_Id}>
                            {row.Subject}
                          </Link></TableCell>
                          <TableCell>{format(new Date(row.Date), 'dd/MM/yyyy')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      marginTop: 4,
                      backgroundColor: '#324b84',
                      padding: 1,
                      borderRadius: 2,
                      color: 'white',
                    }}
                  >
                    <b>No record found.</b>
                  </Typography>
                )}

                <Box mt={1}>
                  {endRecord > 19 ? (
                    <ButtonGroupComponent
                      rowsPerPage={rowsPerPage}
                      ChangeRowsPerPage={ChangeRowsPerPage}
                      rowsPerPageOptions={rowsPerPageOptions}
                      PageChange={PageChange}
                      pagecount={pagecount}
                    />
                  ) : (
                    <span></span>
                  )
                  }
                </Box>
              </Box>
            )}

          </Grid>
        </Grid>
        <span
          style={{
            width: '95px',
            position: 'fixed',
            bottom: '70px',
            right: '60px'
          }}
        >
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={`/${location.pathname.split('/')[1]
              }/Teacher/ComposeSMS`}
          >
            <Item onClick={clickClear}
              sx={{ fontSize: '10px', mr: 1, mb: '60px', borderRadius: '15px', backgroundColor: '#38548A', color: 'white' }}
            >
              <AddCircleIcon />
              <br />
              <b>Compose</b>
            </Item>
          </RouterLink>
        </span>
      </Box>
    </Box>
  );
}

export default SmsCenter;
