import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
//Currently Not IN Use - 8/12/2024
const StudentTable = ({ StudentsList, onSelectionChange }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortColumn, setSortColumn] = useState<string>('RegNo');
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [sortHeader, setSortHeader] = useState<string>('RegNo');

  // Constants for pagination
  const rowsPerPageOptions = [20, 50, 100, 200];
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, count);
  const pagecount = Math.ceil(count / rowsPerPage);

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (StudentsList.length > 0) {
      let totalRowCount = Number(StudentsList[0].TotalRows);
      setCount(totalRowCount);
    }
  }, [StudentsList]);

  const handleSort = (column) => {
    if (sortColumn === column) {      // If clicking same column, toggle sort direction
      setIsAsc(!isAsc);
    } else {                          // If clicking new column, set it as sort column and default to ascending
      setSortColumn(column);
      setIsAsc(true);
    }
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allIds = StudentsList.map((student) => student.YearwiseStudentId);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;         ////To Check if a row is selected

  // Pass selected IDs & sort info to parent component when selection changes
  useEffect(() => {
    onSelectionChange(selected);
  }, [selected, onSelectionChange]);


  return (
    <Box sx={{ background: 'white', pt: 1 }}>
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
                  indeterminate={selected.length > 0 && selected.length < StudentsList.length}
                  checked={StudentsList.length > 0 && selected.length === StudentsList.length}
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
            {StudentsList.map((student) => (
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
  );
};

export default StudentTable;
