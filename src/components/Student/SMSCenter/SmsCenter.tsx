import AddCircleIcon from '@mui/icons-material/AddCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Card, CircularProgress, Grid, Hidden, IconButton, Tooltip, Typography } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom';
import SortingArrowheads from 'src/assets/img/sorting icon/icons-sorting-arrowhead.png';
import { Styles } from 'src/assets/style/student-style';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IMobileNumber, INewSmsList } from 'src/interfaces/Student/SMSCenter';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { getMobileNumber, getNewSmsList } from 'src/requests/Student/SMSCenter';
import { RootState } from 'src/store';

const PageSize = 20;

function SmsCenter() {
  const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const classes = Styles();
  const [filtered, setFiltered] = useState(false); // State to toggle between original and filtered list
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // State to manage sort direction
  const dispatch = useDispatch();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
  const NewSmsList = useSelector((state: RootState) => state.SmsCenter.NewSmsList);
  const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
  const MobileNumber = useSelector((state: RootState) => state.SmsCenter.MobileNumber);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const filteredList = NewSmsList.filter((item) => item.TotalRows !== undefined);
  const TotalCount = filteredList.map((item) => item.TotalRows);
  const uniqueTotalCount = [...new Set(TotalCount)];
  const singleTotalCount = uniqueTotalCount[0];

  useEffect(() => {
    const MobileNumber_body: IMobileNumber = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: UserId,
      asUserRoleId: RoleId,
    };

    localStorage.setItem('url', window.location.pathname);
    dispatch(getMobileNumber(MobileNumber_body));
  }, []);

  // useEffect(() => {
  //   const SmsList_body: ISmsList = {
  //     asSchoolId: asSchoolId,
  //     asAcademicYearId: asAcademicYearId,
  //     asUserId: UserId,
  //     asReceiverUserRoleId: RoleId,
  //     asPageIndex: page
  //   };
  //   dispatch(getSmsList(SmsList_body));
  // }, [page, rowsPerPage]);


  const sortedAndFilteredSmsList = NewSmsList
    .filter(item => {
      if (!dateFilter.startDate && !dateFilter.endDate) return true;
      const itemDate = new Date(item.Date); // Assuming item.Date is in a parseable format
      if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
      if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
      return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
    })
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

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

  const handleFilterClick = () => {
    setFiltered(!filtered); // Toggle the filtered state
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc')); // Toggle sort direction
  };

  const displayList = filtered ? sortedAndFilteredSmsList : NewSmsList; // Implement pagination


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
              <Tooltip title={`Displays received SMS list.`}>
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
            <Box>
              <Tooltip title={`Sort SMS List`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] },
                  }}
                  onClick={handleFilterClick} // Attach onClick handler here
                >
                  {/* <FilterListIcon /> */}
                  {/* {sortDirection === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} */}
                  <img src={SortingArrowheads} alt="Sorting Arrowheads" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
                </IconButton>

              </Tooltip>
            </Box>
          </>
        }
      />

      <Box>
        <Grid container >
          <Grid item sx={{ minWidth: '20%', pr: 1, pb: 2 }}>
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
                    backgroundColor: 'white',
                    mb: '10px',
                    borderRadius: '10px',
                  }}
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
            </Hidden>
          </Grid>
          <Grid item sx={{ minWidth: '80%', p: 2, background: 'white', borderRadius: '10px' }}>
            <Typography variant={'h4'}>Mobile Number(s) : {MobileNumber.replace(';', ', ')}</Typography>
            {singleTotalCount > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                <Box component="span" fontWeight="fontWeightBold">
                  {startRecord} to {endRecord}
                </Box>
                {' '}out of{' '}
                <Box component="span" fontWeight="fontWeightBold">
                  {singleTotalCount}
                </Box>{' '}
                {singleTotalCount === 1 ? 'record' : 'records'}
              </Typography>
            </div> : <span> </span>}
            <Box sx={{ mt: 2 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : displayList.length > 0 ? (
                displayList.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      border: (theme) => `1px solid ${theme.palette.grey[500]}`,
                      borderRadius: (theme) => theme.general.borderRadius,
                      mb: 2
                    }}
                  >
                    <Typography variant={'h4'} sx={{ display: 'flex', gap: 1 }}>
                      <span style={{ color: grey[500] }}>From: </span> {item.UserName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant={'subtitle2'} sx={{ display: 'flex', gap: 1 }}>
                        <Link to={`/extended-sidebar/Student/viewsms/${item.SMS_Id}`} style={{ textDecoration: 'none' }}>
                          <span style={{ color: grey[500] }}>SMS Text: </span> {item.Subject}
                        </Link>
                      </Typography>
                      <Typography variant={'subtitle2'} sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                        <span style={{ color: grey[500] }}>Received Date: </span> {format(new Date(item.Date), 'dd MMM yyyy hh:mm a')}
                      </Typography>
                    </Box>
                  </Box>
                ))
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
            </Box>
            <Box mt={-1.5}>
              {
                endRecord > 19 ? (
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
              }</Box>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}

export default SmsCenter;
