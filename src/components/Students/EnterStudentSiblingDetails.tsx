import { SearchTwoTone } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import SaveIcon from '@mui/icons-material/Save';
import SquareIcon from '@mui/icons-material/Square';
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteStudentSiblingDetailsBody, IGetStudentDetailsForSiblingBody, IGetStudentSiblingListBody, ISaveStudentSiblingDetailsBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDADeleteStudentSiblingDetailsMsg, CDAGetStudentDetailsForSiblingPop, CDAGetStudentSiblingList, CDASaveStudentSiblingDetailsMsg, CDASearchStudentsList, ResetDeleteStudentSiblingDetailsMsg, ResetSaveStudentSiblingDetailsMsg } from 'src/requests/StudentDetails/RequestStudentDetails';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddSiblingStudentTable from './AddSiblingStudentTable';

const EnterStudentSiblingDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    Name,
    standardId,
    DivisionId,
    YearWise_Student_Id,
    SchoolWise_Student_Id,
    StandardDivision_Id,
    Enrolment_Number,
    Joining_Date
  } = location.state || {};
  //console.log('LOcation EnterStudentSiblingDetails', location.state);
  const [searchTerm, setSearchTerm] = useState('');
  //const [selectedIds, setSelectedIds] = useState([]);   // Selected Ids
  // Session & Local Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const teacherId = sessionStorage.getItem('Id');
  const userId = localStorage.getItem('UserId');
  console.log('userId', userId);
  const { showAlert, closeAlert } = useContext(AlertContext);


  //StudentName
  const StudentDetailsForSibling = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentDetailsForSibling);
  const oStudentDetailsForSibling: any = StudentDetailsForSibling;
  const StudentName = oStudentDetailsForSibling?.StudentFullName;         //Student Name
  //console.log('1️⃣StudentName', StudentName);
  //Sibling List
  const GetStudentSiblingList = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentSiblingList);
  //console.log('2️⃣GetStudentSiblingList', GetStudentSiblingList);
  //Search List
  const SearchStudentsList = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISGetStudentsList);
  //console.log('3️⃣SearchStudentsList', SearchStudentsList);
  const SaveStudentSiblingDetailsMsg = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISSaveStudentSiblingDetailsMsg);
  //console.log('4️⃣SaveStudentSiblingDetailsMsg', SaveStudentSiblingDetailsMsg);
  //DeleteMsg
  const DeleteStudentSiblingDetailsMsg = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.ISDeleteStudentSiblingDetailsMsg);
  //console.log('5️⃣DeleteStudentSiblingDetailsMsg', DeleteStudentSiblingDetailsMsg);

  const GetStudentSiblingListBody: IGetStudentSiblingListBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asYearwiseStudentId: YearWise_Student_Id
  }

  useEffect(() => {
    //document.title = 'Enter Student Sibling Details';
    const GetStudentDetailsForSiblingBody: IGetStudentDetailsForSiblingBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asYearwiseStudentId: YearWise_Student_Id
    }
    dispatch(CDAGetStudentDetailsForSiblingPop(GetStudentDetailsForSiblingBody))
    dispatch(CDAGetStudentSiblingList(GetStudentSiblingListBody))
  }, []);


  //#region Search
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortColumn, setSortColumn] = useState<string>('RegNo');
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [sortHeader, setSortHeader] = useState<string>('RegNo');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  // Constants for pagination
  const rowsPerPageOptions = [20, 50, 100, 200];
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, count);
  const pagecount = Math.ceil(count / rowsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearchPerformed(true); // Mark search as performed
  };
  // useEffect to handle API call on page or rowsPerPage change
  useEffect(() => {
    if (!isSearchPerformed) return;

    const GetStudentsListBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asYearwiseStudentId: YearWise_Student_Id,
      asFilter: searchTerm.trim() || '', // Maintain the current search term
      asStartIndex: (page - 1) * rowsPerPage,
      asEndIndex: rowsPerPage,         // page * rowsPerPage
      asSortExpression: `${sortColumn} ${isAsc ? 'ASC' : 'DESC'}`,
    };

    dispatch(CDASearchStudentsList(GetStudentsListBody));
  }, [page, rowsPerPage, sortColumn, isAsc, searchTerm, isSearchPerformed]); // Add dependencies to trigger the effect

  //#region checkbox
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allIds = SearchStudentsList.map((student) => student.YearwiseStudentId);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (id) => {
    const currentIndex = selected.indexOf(id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  //#region Pagination
  useEffect(() => {
    if (SearchStudentsList.length > 0) {
      let totalRowCount = Number(SearchStudentsList[0].TotalRows);
      setCount(totalRowCount);
    }
  }, [SearchStudentsList]);

  const handleSort = (column) => {
    if (sortColumn === column) {      // If clicking same column, toggle sort direction
      setIsAsc(!isAsc);
    } else {                          // If clicking new column, set it as sort column and default to ascending
      setSortColumn(column);
      setIsAsc(true);
    }
  };

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const SortableHeader = ({ column, label }) => {
    const showSortIcon = sortHeader === column;
    return (
      <span
        style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => {
          handleSort(column);
          setSortHeader(column);
        }}
      >
        {label}
        {showSortIcon && ( // Show the icon only for the sorted column
          <ArrowCircleUpIcon
            sx={{
              fontSize: '24px',
              marginLeft: '4px',
              rotate: isAsc && sortHeader === column ? '0deg' : '180deg'
            }}
          />
        )}
      </span>
    );
  };
  //#endregion
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearchPerformed(false);
    setSelected([]);
    setPage(1);
  };
  //#region Save
  const handleSave = () => {
    console.log('Selected IDs:', selected);
    const currentDate = new Date().toLocaleDateString('en-CA'); // Format date as YYYY-MM-DD

    // XML generation
    const siblingDetailsXML = selected.map(siblingId => (
      `<SiblingDetails Yearwise_Student_Id='${YearWise_Student_Id}' YearwiseSiblingStudentId='${siblingId}' Insert_Date='${currentDate}' Update_Date='${currentDate}' />`
    )).join(''); // Join all sibling details to form a single string

    const asStudentSiblingsXML = `<SiblingDetails>${siblingDetailsXML}</SiblingDetails>`;

    const ISaveStudentSiblingDetailsBody: ISaveStudentSiblingDetailsBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asStudentSiblingsXML,
      asInsertedById: Number(userId),
      asUpdatedById: Number(userId),
    }

    console.log('Save Payload:', ISaveStudentSiblingDetailsBody);
    // Call the save API here, passing selectedIds as payload
    dispatch(CDASaveStudentSiblingDetailsMsg(ISaveStudentSiblingDetailsBody))

  };
  useEffect(() => {
    if (SaveStudentSiblingDetailsMsg !== '') {
      toast.success(SaveStudentSiblingDetailsMsg);
      dispatch(ResetSaveStudentSiblingDetailsMsg());
      dispatch(CDAGetStudentSiblingList(GetStudentSiblingListBody))
      handleClearSearch();
    }
  }, [SaveStudentSiblingDetailsMsg]);

  //#region Delete
  const handleDelete = (StudentSiblingId) => {
    const DeleteStudentSiblingDetailsBody: IDeleteStudentSiblingDetailsBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asYearwiseSiblingStudentId: YearWise_Student_Id,
      asSiblingStudentId: Number(StudentSiblingId),
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteStudentSiblingDetailsMsg(DeleteStudentSiblingDetailsBody))
        closeAlert();
      }
    });
  };
  useEffect(() => {
    if (DeleteStudentSiblingDetailsMsg !== '') {
      toast.success(DeleteStudentSiblingDetailsMsg);
      dispatch(ResetDeleteStudentSiblingDetailsMsg());

      dispatch(CDAGetStudentSiblingList(GetStudentSiblingListBody))
    }
  }, [DeleteStudentSiblingDetailsMsg]);


  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/StudentRegistrationForms'
          },
          {
            title: 'Enter Student Sibling Details',
            path: '/extended-sidebar/Teacher/EnterStudentSiblingDetails'
          }
        ]}
        rightActions={
          <>
            <TextField
              sx={{ width: '18vw' }}
              fullWidth
              name="StudentName"
              label={'Student Name'}
              value={StudentName || ''}
              variant="outlined"
              size="small"
            />
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Search by Name / Reg. No.<span style={{ color: 'red' }}> </span>
                </span>
              }
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchTerm);
                }
              }}
            //onChange={handleSearchChange}
            />
            <Tooltip title="Search">
              <IconButton
                onClick={() => handleSearch(searchTerm)}
                //onClick={handleSearch}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  marginLeft: '0.5rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <SearchTwoTone />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title={'Add/Edit student details and click on "Save".'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip> */}

            <Tooltip title={'Save'}>
              <IconButton
                onClick={handleSave}
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ background: 'white', p: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <SquareIcon style={{ color: '#F0F0F0', fontSize: 25, position: 'relative', top: '-2px' }} />
              <Typography variant='h6'>Deactivated User </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
        <Typography variant="h4" sx={{ py: 1 }}>

          Sibling Details
        </Typography>
        <AddSiblingStudentTable itemList={GetStudentSiblingList} onDelete={handleDelete} />
      </Box>
      {isSearchPerformed && SearchStudentsList.length > 0 &&
        <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
          {/* <StudentTable StudentsList={SearchStudentsList} onSelectionChange={handleSelectionChange} /> */}
          {count > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
              <Box component="span" fontWeight="fontWeightBold">
                {startRecord} to {endRecord}
              </Box>
              {' '}out of{' '}
              <Box component="span" fontWeight="fontWeightBold">
                {count}
              </Box>{' '}
              {count === 1 ? 'record' : 'records'}
            </Typography>
          </div> : <span> </span>}
          <TableContainer component={Paper}>
            <Table aria-label="simple table"
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              }}>
              <TableHead>
                <TableRow sx={{
                  background: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                }}>
                  <TableCell sx={{ color: "white", py: 1 }}>
                    <Checkbox
                      size='small'
                      indeterminate={selected.length > 0 && selected.length < SearchStudentsList.length}
                      checked={SearchStudentsList.length > 0 && selected.length === SearchStudentsList.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                    <SortableHeader column="RegNo" label="Registration Number" />
                  </TableCell>
                  <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                    <SortableHeader column="StudentName" label="Student Name" />
                  </TableCell>
                  <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                    <SortableHeader column="ClassName" label="Class" />
                  </TableCell>
                  {/* <TableCell sx={{ color: "white", py: 1 }}>Reg. No.</TableCell>
              <TableCell sx={{ color: "white", py: 1 }}>Student Name</TableCell>
              <TableCell sx={{ color: "white", py: 1 }}>Class</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {SearchStudentsList.map((student) => (
                  <TableRow key={student.YearwiseStudentId}
                    selected={isSelected(student.YearwiseStudentId)}>
                    <TableCell sx={{ py: 0.5 }}>
                      <Checkbox
                        size='small'
                        checked={isSelected(student.YearwiseStudentId)}
                        onChange={() => handleCheckboxClick(student.YearwiseStudentId)}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.5 }}>{student.RegNo}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>{student.StudentName}</TableCell>
                    <TableCell sx={{ py: 0.5 }}>{student.ClassName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {endRecord > 19 && (
              <ButtonGroupComponent
                rowsPerPage={rowsPerPage}
                ChangeRowsPerPage={ChangeRowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                PageChange={PageChange}
                pagecount={pagecount}
              />
            )}
          </TableContainer>
        </Box>
      }
    </Box>
  );
};
export default EnterStudentSiblingDetails;
