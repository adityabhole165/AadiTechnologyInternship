import AddTwoTone from '@mui/icons-material/AddTwoTone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Tooltip,
    Typography,
} from '@mui/material';
import { green, grey, yellow } from "@mui/material/colors";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AlertContext } from 'src/contexts/AlertContext';
import {
    IDeleteSchooNoticeBody,
    IGetAllNoticeListBody,
    IUpdateSelectSchoolNoticeBody,
} from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
    DeleteSchoolNotice,
    getSchoolNoticeList,
    getSelectSchoolNotice,
    resetDeleteSchoolNotice,
    resetSelectSchoolNotice,
} from 'src/requests/AddSchoolNotice/ReqAddNotice';
import { RootState, useDispatch, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import SchoolNoticeList from './SchoolNoticeList';

const SchoolNoticeBaseScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [value, setValue] = useState('AllFile');
    const [selectDisplayType, setDisplayType] = useState('false');
    const [selectDisplayLocation, setDisplayLocation] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [ShowAllNotices, setShowALlNotices] = useState("true");
    const [Text, setText] = useState(false);
    const [PagedLeave, setPagedLeave] = useState([]);
    const [radioBtn, setRadioBtn] = useState('1');
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [sortExpression, setSortExpression] = useState('StartDate desc');
    const DisplayType = [
        { Id: 1, Name: 'File', Value: 'false' },
        { Id: 2, Name: 'Text', Value: 'true' },
    ]

    const DisplayLocation = [
        { Id: 1, Name: 'All', Value: 'All' },
        { Id: 2, Name: 'Both', Value: 'Both' },
        { Id: 3, Name: 'Control Panel', Value: 'Control Panel' },
        { Id: 4, Name: 'Home Page', Value: 'Home Page' },
    ]

    const Loading = useSelector((state: RootState) => state.SchoolNotice.Loading);
    const GetSchoolNoticeList = useSelector(
        (state: RootState) => state.SchoolNotice.SchoolNoticeList
    );
    const [schoolNoticeList, setSchoolNoticeList] = useState([]);
    useEffect(() => {
        setSchoolNoticeList(GetSchoolNoticeList)
    }, [GetSchoolNoticeList]);
    const deleteSchoolNoticeMsg = useSelector(
        (state: RootState) => state.SchoolNotice.DeleteSchoolNoticeMsg
    );
    const UpdateSelectedNotice = useSelector(
        (state: RootState) => state.SchoolNotice.SelectSchoolNotice
    );
    const filteredList = GetSchoolNoticeList.filter(
        (item) => item.RecordCount !== undefined
    );
    const TotalCount = filteredList.map((item) => item.RecordCount);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];

    const GetAllNoticeListBody: IGetAllNoticeListBody = {
        asSchoolId: Number(asSchoolId),
        asDisplayLocation: selectDisplayLocation,
        asShowAllNotices: ShowAllNotices == "true",
        asText: Text,
        asSortExpression: sortExpression,
        StartRowIndex: (page - 1) * rowsPerPage,
        MaximumRows: page * rowsPerPage,
    };

    const clickSave = () => {
        const UpdateSelectedNoticeBody: IUpdateSelectSchoolNoticeBody = {
            asSchoolId: Number(asSchoolId),
            asNoticeXml: getXML(),
        };
        dispatch(getSelectSchoolNotice(UpdateSelectedNoticeBody))
        dispatch(getSchoolNoticeList(GetAllNoticeListBody));
    }


    useEffect(() => {
        if (UpdateSelectedNotice != "") {
            toast.success(UpdateSelectedNotice)
            dispatch(resetSelectSchoolNotice());
            dispatch(getSchoolNoticeList(GetAllNoticeListBody));
        }
    }, [UpdateSelectedNotice])


    const deleteRow = (Id: number) => {
        const DeleteSchoolNoticeBody: IDeleteSchooNoticeBody = {
            asSchoolId: Number(asSchoolId),
            asNoticeId: Number(Id),
            asUpdatedById: Number(asUserId),
        };
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this leave?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(DeleteSchoolNotice(DeleteSchoolNoticeBody));
                closeAlert();
            },
        });
    };

    useEffect(() => {
        if (deleteSchoolNoticeMsg !== '') {
            toast.success(deleteSchoolNoticeMsg);
            dispatch(resetDeleteSchoolNotice());
            dispatch(getSchoolNoticeList(GetAllNoticeListBody));
        }
    }, [deleteSchoolNoticeMsg]);

    let HeaderList = [
        { Id: 1, Header: 'Link Name' },
        { Id: 2, Header: 'Display Location' },
        { Id: 3, Header: 'Start Date & Time', SortOrder: 'desc', sortKey: 'StartDate' },
        { Id: 4, Header: 'End Date & Time' },
        { Id: 5, Header: 'Sort Order' },
        { Id: 6, Header: 'File Name' },
        { Id: 7, Header: 'Select' },
        { Id: 8, Header: 'Edit' },
        { Id: 9, Header: 'Delete' },
    ]
    const [HeaderSchoolNotice, setHeaderSchoolNotice] = useState([]);
    useEffect(() => {
        let arrHeader = []
        HeaderList.map(header => {

            if (!(selectDisplayType == 'true' && header.Id == 6))
                arrHeader.push(header)
        })
        setHeaderSchoolNotice(arrHeader)
    }, [selectDisplayType])


    const handleHeaderClick = (updatedHeaderArray) => {
        setHeaderSchoolNotice(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
        setSortExpression(newSortExpression);
    };

    const [Header, setHeader] = useState(HeaderSchoolNotice)
    useEffect(() => {

    }, [selectDisplayType])

    const toggleRowSelection = (id) => {
        setSchoolNoticeList(schoolNoticeList.map((item) => {
            return { ...item, IsActive: (item.Id === id ? !item.IsActive : item.IsActive) }
        }))
    };

    const EditSchoolNotice = (Id: number) => {
        navigate('../AddSchoolNotice/' + Id);
    };

    const AddSchoolNotice = () => {
        navigate('../AddSchoolNotice');
    };

    const clickDisplayTypeDropdown = (value) => {
        setDisplayType(value);
        setRowsPerPage(20)
        setPage(1);

        if (selectDisplayType == 'false') {
            setText(true)
        }
        else {
            setText(false)
        }
    };

    const clickDisplayLocationDropdown = (value) => {
        setDisplayLocation(value);
        setRowsPerPage(20)
        setPage(1);
    };
    const clickShowAllNotices = (value) => {
        setShowALlNotices(value);
    };
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    useEffect(() => {
        if (GetSchoolNoticeList) {
            setPagedLeave(GetSchoolNoticeList);
        }
    }, [GetSchoolNoticeList]);


    function getXML() {
        let asUpdateSelectXML = "<ArrayOfNoticeDetails xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">";
        schoolNoticeList.map((Item) => {
            {
                asUpdateSelectXML += " <NoticeDetails>" +
                    "<NoticeId> " + Item.Id + "</NoticeId> " +
                    "<SortOrder>" + 0 + "</SortOrder>" +
                    "<UserId>" + 0 + "</UserId>" +
                    "<SortOrderLocationChanged>" + 0 + "</SortOrderLocationChanged>" +
                    "<IsSelected>" + Item.IsActive + "</IsSelected>" +
                    "<IsText>" + Text + "</IsText>" +
                    "<InertedById>" + asUserId + "</InertedById>" +
                    "<SchoolId>" + 0 + "</SchoolId>" +
                    "<AcademicYearId>" + 0 + "</AcademicYearId>" +
                    " <StandardDivisionId>" + 0 + "</StandardDivisionId>" +
                    " </NoticeDetails>"
            }
        });
        asUpdateSelectXML += "\r\n</ArrayOfNoticeDetails>";
        return asUpdateSelectXML
    }

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

    useEffect(() => {
        dispatch(getSchoolNoticeList(GetAllNoticeListBody));
    }, [page, rowsPerPage, ShowAllNotices, selectDisplayType, selectDisplayLocation, sortExpression]);

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[{ title: 'School Notices', path: ' ' },

                ]}
                rightActions={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={DisplayType}
                            defaultValue={selectDisplayType}
                            onChange={clickDisplayTypeDropdown}
                            size={'small'}
                            label={' Display Type'}
                        />
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={DisplayLocation}
                            defaultValue={selectDisplayLocation}
                            onChange={clickDisplayLocationDropdown}
                            size={'small'}
                            label='Display Location'
                        />
                        <Box>
                            <Tooltip
                                title={`Select the notices from the list to be displayed on School web site under School Notices.`}
                            >
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: yellow[600],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: yellow[700] },
                                    }}
                                >
                                    <PriorityHighIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box>
                            <Tooltip title={`Displays all uploaded school notices.`}>
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
                            <Tooltip title={`Save`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: green[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: green[600] },
                                    }}
                                    onClick={clickSave}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Add New Notice'}>
                                <IconButton
                                    onClick={() =>
                                        navigate('/extended-sidebar/Teacher/AddSchoolNotice')
                                    }
                                    sx={{
                                        color: 'white',
                                        backgroundColor: green[500],
                                        '&:hover': {
                                            backgroundColor: green[600],
                                        },
                                    }}
                                >
                                    <AddTwoTone />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                }
            />
            {Loading && <SuspenseLoader />}

            <Grid container>
                <Grid sm={12} px={2} sx={{ display: 'flex', justifyItems: "center" }} >
                    <Grid >
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="options"
                                name="options"
                                value={ShowAllNotices}
                                onChange={(e) => { clickShowAllNotices(e.target.defaultValue) }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Show All Notices" />
                                <FormControlLabel value="false" control={<Radio />} label="Show Active Notices" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                </Grid>
            </Grid >

            <Box sx={{ background: 'white', p: 2 }}>
                {singleTotalCount > 0 ? (
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Typography
                            variant='subtitle1'
                            sx={{ margin: '16px 0', textAlign: 'center' }}
                        >
                            <Box component='span' fontWeight='fontWeightBold'>
                                {startRecord} to {endRecord}
                            </Box>{' '}
                            out of{' '}
                            <Box component='span' fontWeight='fontWeightBold'>
                                {singleTotalCount}
                            </Box>{' '}
                            {singleTotalCount === 1 ? 'record' : 'records'}
                        </Typography>
                    </div>
                ) : (
                    <span> </span>
                )}
                {schoolNoticeList && schoolNoticeList.length > 0 ? (
                    <SchoolNoticeList
                        HeaderArray={HeaderSchoolNotice}
                        ItemList={schoolNoticeList}
                        clickDelete={deleteRow}
                        ClickHeader={handleHeaderClick}
                        toggleRowSelection={toggleRowSelection}
                        clickEdit={EditSchoolNotice}
                    />
                ) : (
                    <Box sx={{ backgroundColor: '#D2FDFC' }}>
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                        >
                            No record found.
                        </Typography>
                    </Box>
                )}
                <br />
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
        </Box>
    );
};

export default SchoolNoticeBaseScreen;
