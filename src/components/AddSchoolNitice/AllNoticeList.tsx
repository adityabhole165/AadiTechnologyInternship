import AddTwoTone from '@mui/icons-material/AddTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/EditOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { green, grey, red, yellow } from '@mui/material/colors';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteSchooNoticeBody, IGetAllNoticeListBody, IUpdateSelectSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAllNoticeList } from 'src/requests/AddSchoolNotice/ReqAddSchoolNotice';
import { CDADeleteSchoolNotice } from 'src/requests/AddSchoolNotice/ReqDeleteSchoolNotice';
import { CDAUpdatSelectNotice } from 'src/requests/AddSchoolNotice/ReqUpdateSelectNotice';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';


interface Column {
  id: 'name' | 'Display_Location' | 'StartDateTime' | 'EndDateTime' | 'sortOrder' | 'fileName' | 'select' | 'edit' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  align1?: 'left';
  format?: (value: number) => string;
}


const columns: readonly Column[] = [
  { id: 'name', label: 'Link Name', minWidth: 150, align1: 'left' },
  { id: 'Display_Location', label: 'Display Location', minWidth: 150 },
  {
    id: 'StartDateTime',
    label: 'Start Date & Time',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'EndDateTime',
    label: 'End Date & Time',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'sortOrder',
    label: 'Sort Order',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'fileName',
    label: 'File Name',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'select',
    label: 'Select',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'delete',
    label: 'Delete',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

const AllNoticeList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState('AllFile');
  const [selectValue, setSelectedValue] = useState('All');
  const [allSchoolNoticeList, setAllSchoolNoticeList] = useState([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [deleteRow, setDeleteRow] = useState<any>([]);
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [userRole, setUserRole] = useState();

  const SchoolId = localStorage.getItem('localSchoolId');
  const asUpdatedById = localStorage.getItem('Id');



  const navigate = useNavigate();
  // const getAllSchoolNotice = useSelector(
  // (state.RootState) => state.Schoolnotice.AllSchoolNoticeList
  // );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  // Searchable DropDown Content
  const itemList = [
    { Value: 'All', Name: 'All' },
    { Value: 'Both', Name: 'Both' },
    { Value: 'Control Panel', Name: 'Control Panel' },
    { Value: 'Home Page', Name: 'Home Page' },
    // aur options yahan add karen
  ];

  const handleDropDownChange = (value: string) => {
    //console.log('Selected Value:', value);
    setSelectedValue(value);
  };
  // Searchable DropDown Content

  // GetAllSchoolNoticeList API Call

  const dispatch = useDispatch();


  const USGetAllNoticeList: any = useSelector((state: RootState) => state.AddSchoolNotice.ISGetAllNoticeList);
  const UpdeteSelecteSchoolNotice: any = useSelector((state: RootState) => state.UpdateSelectNotice.ISUpdateSelectNotice);
  const USDeleteSchoolNotice: any = useSelector((state: RootState) => state.DeleteSchoolNotice.ISDeleteSchoolNotice);
  const USGetUserRolesForSelectedNoticeId: any = useSelector((state: RootState) => state.GetUserRolesForSelectedNoticeId.ISGetUserRolesForSelectedNoticeId);
  const USGetStandardDivisionsForSelectedNoticeId: any = useSelector((state: RootState) => state.GetStandardDivisionsForSelectedNoticeId.ISGetStandardDivisionsForSelectedNoticeId);
  // console.log(USGetAllNoticeList,"USGetAllNoticeList");

  //console.log('UpdeteSelecteSchoolNotice...............', UpdeteSelecteSchoolNotice);
  //console.log('DeleteSchoolNotice...............', USDeleteSchoolNotice);
  //console.log('USGetUserRolesForSelectedNoticeId...............', USGetUserRolesForSelectedNoticeId);
  //console.log('USGetStandardDivisionsForSelectedNoticeId...............', USGetStandardDivisionsForSelectedNoticeId);

  useEffect(() => {
    if (USGetUserRolesForSelectedNoticeId) {
      setUserRole(USGetUserRolesForSelectedNoticeId)
      //console.log("USGetUserRolesForSelectedNoticeId\\\\\\\\\\\\\\\\\\\\", USGetUserRolesForSelectedNoticeId);

    }
  }, [USGetUserRolesForSelectedNoticeId])

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));

  const GetAllNoticeListBody: IGetAllNoticeListBody =
  {
    "asSchoolId": asSchoolId,
    "asDisplayLocation": selectValue,
    "asShowAllNotices": value === 'AllFile',
    "asText": false,
    "asSortExpression": "StartDate desc",
    "StartRowIndex": 0,
    "MaximumRows": rowsPerPage
  };

  const UpdateSelectNotice: IUpdateSelectSchoolNoticeBody = {
    "asSchoolId": asSchoolId,
    "asNoticeXml": selectedRows.outSortOrder

  };

  const DeleteSchoolNotice: IDeleteSchooNoticeBody = {
    "asSchoolId": asSchoolId,
    "asNoticeId": deleteRow,
    "asUpdatedById": asUpdatedById
  };



  useEffect(() => {
    dispatch(CDAGetAllNoticeList(GetAllNoticeListBody));
  }, [value, rowsPerPage, selectValue]);

  useEffect(() => {
    if (USGetAllNoticeList) {
      setAllSchoolNoticeList(USGetAllNoticeList);
    }
  }, [USGetAllNoticeList]);

  const saveHandle = () => {
    dispatch(CDAUpdatSelectNotice(UpdateSelectNotice))

    // console.log("Hello.........................");
  }

  const deleteHandle = ({ NoticeId }) => {
    setDeleteRow(NoticeId)

    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this Notice?  ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteSchoolNotice(DeleteSchoolNotice))
        toast.success(USDeleteSchoolNotice)
        dispatch(CDAGetAllNoticeList(GetAllNoticeListBody));
        closeAlert();
      }
    });

    useEffect(() => {
      dispatch(CDAGetAllNoticeList(GetAllNoticeListBody));

    }, [USDeleteSchoolNotice])

    // console.log('JJJJJJJJJJJJJJJJJJJ====>', deleteRow);
  }
  // GetAllSchoolNoticeList API Call

  // Toggle selection of rows based on checkbox
  const toggleRowSelection = (id: string) => {
    const currentIndex = selectedRows.indexOf(id);
    const newSelectedRows = [...selectedRows];

    if (currentIndex === -1) {
      newSelectedRows.push(id);
    } else {
      newSelectedRows.splice(currentIndex, 1);
    }

    setSelectedRows(newSelectedRows);


    // console.log("Hhhhhhhhhhh............", selectedRows);

  };

  const saveAndResetSelection = () => {
    // Your save logic here
    //console.log('Saving data...');
    // ...

    // After saving, clear the selection
    setSelectedRows([]);
  };

  return (
    <>

      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'School Notice',
              path: '/RITeSchool/Teacher/AllSchoolNotice'
            },
            // { title: 'Add Homework', path: '/RITeSchool/Teacher/AddHomework' },
          ]}
          rightActions={
            <>
              <Box>
                <SearchableDropdown
                  ItemList={itemList}
                  onChange={handleDropDownChange}
                  label="Select Display Location"
                  mandatory
                  defaultValue={selectValue}
                  size={"small"}
                  sx={{ minWidth: '17vw', }}
                />
              </Box>
              <Box>
                <Tooltip title={`Select the notices from the list to be displayed on School web site under School Notices.`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: yellow[600],
                      height: '36px !important',
                      ':hover': { backgroundColor: yellow[700] }
                    }}
                  // onClick={ClickOpenDialogbox}
                  >
                    <PriorityHighIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip
                  title={`Displays all uploaded school notices.`}
                >
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: grey[600] }
                    }}
                  >
                    <QuestionMarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip title={'Add New Notice'}>
                  <IconButton
                    onClick={() => navigate('/RITeSchool/Teacher/AddSchoolNotice')}
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      '&:hover': {
                        backgroundColor: green[600]
                      }
                    }}
                  >
                    <AddTwoTone />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={`Save Notice`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: green[600] }
                    }}
                    onClick={saveHandle}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          }
        />

      </Box>
      <Grid container>
        <Grid sm={12} px={2} sx={{ display: 'flex', justifyItems: "center" }} >
          <Grid >
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Choose an option</FormLabel> */}
              <RadioGroup
                row
                aria-label="options"
                name="options"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="AllFile" control={<Radio />} label="Show All Notices" />
                <FormControlLabel value="Activefile" control={<Radio />} label="Show Active Notices" />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
      </Grid >
      <Box m={2}>
        {
          USGetAllNoticeList.length > 0 ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          align='center'
                          key={column.id}
                          style={{ minWidth: column.minWidth, backgroundColor: '#19bed4', color: "#fff", fontSize: 15, fontWeight: '600' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allSchoolNoticeList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((itemList) => {
                        return (
                          <TableRow hover role="checkbox">
                            <TableCell>{itemList.NoticeName}</TableCell>
                            <TableCell>{itemList.DisplayLocation}</TableCell>
                            <TableCell align='center'>{moment(itemList.StartDate).format('DD MMM YYYY   h:mm a')}</TableCell>
                            <TableCell align='center'>{moment(itemList.EndDate).format('DD MMM YYYY   h:mm a')}</TableCell>
                            <TableCell align='center'>{itemList.dbSortOrder}</TableCell>
                            <TableCell sx={{ color: "#0000EE" }}>{itemList.FileName}</TableCell>
                            <TableCell align="center">
                              {/* Checkbox for row selection */}
                              <input
                                type="checkbox"
                                style={{ height: '18px', width: '18px' }}
                                onChange={() => toggleRowSelection(itemList.NoticeName)}
                              />
                            </TableCell>
                            <TableCell align='center'><Tooltip title='Edit'><IconButton sx={{ color: '#223354', '&:hover': { color: '#223354', cursor: 'pointer' } }} onClick={() => navigate('/RITeSchool/Teacher/AddSchoolNotice', { state: itemList })}><EditIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align='center'><Tooltip title='Delete'><IconButton sx={{ color: '#223354', '&:hover': { color: 'red', backgroundColor: red[100] } }} onClick={() => deleteHandle(itemList)} ><DeleteForeverIcon /></IconButton></Tooltip></TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 100]}
                component="div"
                count={allSchoolNoticeList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>

          ) :
            (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No record found.</b>
              </Typography>
            )
        }
      </Box>

    </>


  );
}

export default AllNoticeList