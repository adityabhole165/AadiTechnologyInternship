import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, CircularProgress, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { encodeURL, getDateFormattedNew } from 'src/components/Common/Util';
import { IMobileNumber, INewSmsList } from 'src/interfaces/Student/SMSCenter';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { getMobileNumber, getNewSmsList } from 'src/requests/Student/SMSCenter';
import { RootState } from 'src/store';

const PageSize = 20;

function ReceivedSMSList() {
    const [dateFilter, setDateFilter] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });
    const classes = Styles();
    const [filtered, setFiltered] = useState(false);
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
    const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [SortBy, setSortBy] = useState('Date'); // Track which column is being sorted
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

    // Sorting and Filtering
    const sortedAndFilteredSmsList = NewSmsList
        .filter(item => {
            if (!dateFilter.startDate && !dateFilter.endDate) return true;
            const itemDate = new Date(item.Date);
            if (dateFilter.startDate && !dateFilter.endDate) return itemDate >= dateFilter.startDate;
            if (!dateFilter.startDate && dateFilter.endDate) return itemDate <= dateFilter.endDate;
            return itemDate >= dateFilter.startDate && itemDate <= dateFilter.endDate;
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

    const handleSortChange = (column: string) => {
        if (SortBy === column) {
            // If the same column is clicked, toggle the sort direction
            setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If a new column is clicked, set it as the sort by column and reset direction to ascending
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        setDateFilter(prevState => ({ ...prevState, startDate: date }));
    };

    const handleEndDateChange = (date: Date | null) => {
        setDateFilter(prevState => ({ ...prevState, endDate: date }));
    };

    const SmsNewList_body: INewSmsList = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: UserId,
        asReceiverUserRoleId: RoleId,
        asStartIndex: (page - 1) * rowsPerPage,
        asPageSize: page * rowsPerPage,
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

    useEffect(() => {
        dispatch(getNewSmsList(SmsNewList_body));
    }, [page, rowsPerPage, SortBy, SortDirection, dateFilter, startRecord, endRecord]);

    const displayList = sortedAndFilteredSmsList; // Implement pagination
    let url = '/RITeSchool/Student/viewsms/';

    return (

        <Box>
            <Grid container>
                <Grid item sx={{ minWidth: '100%', background: 'white' }}>

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

                    <Box>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : displayList.length > 0 ? (
                            <Table
                                aria-label="simple table"
                                sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            background: (theme) => theme.palette.secondary.main,
                                            color: (theme) => theme.palette.common.white,
                                        }}
                                    >
                                        <TableCell sx={{ color: 'white', py: 1.5 }}>
                                            <b onClick={() => handleSortChange('UserName')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                From {SortBy === 'UserName' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                            </b>
                                        </TableCell>
                                        <TableCell sx={{ color: 'white', py: 1.5 }}>
                                            <b onClick={() => handleSortChange('Subject')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                SMS Text {SortBy === 'Subject' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                            </b>
                                        </TableCell>
                                        <TableCell sx={{ color: 'white', py: 1.5 }}>
                                            <b onClick={() => handleSortChange('Date')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                Received Date {SortBy === 'Date' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                            </b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayList.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{
                                                py: 1
                                            }}>{row.UserName}</TableCell>
                                            <TableCell sx={{
                                                py: 1
                                            }}>
                                                <Link href={url + encodeURL(row.SMS_Id)}>{row.Subject}</Link>
                                            </TableCell>
                                            <TableCell sx={{
                                                py: 1
                                            }}>{getDateFormattedNew(new Date(row.Date))}</TableCell>
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
                    </Box>
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
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ReceivedSMSList;
