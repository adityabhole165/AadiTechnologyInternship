import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';

const ShowBlockedStudentsTable = ({ rowsData }) => {
    const [rows, setRows] = useState(rowsData);
    const [selectedRows, setSelectedRows] = useState([]);
    const [popupReason, setPopupReason] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    // Handle checkbox for individual rows
    const handleCheckboxClick = (item) => {
        setSelectedRows((prev) =>
            prev.includes(item.RollNo)
                ? prev.filter((id) => id !== item.RollNo)
                : [...prev, item.RollNo]
        );
    };

    // Handle Select All checkbox
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const allRowIds = rows.map((item) => item.RollNo);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };


    // Handle sorting
    const handleSort = (column) => {
        const isAsc = sortConfig.key === column && sortConfig.direction === 'asc';
        const direction = isAsc ? 'desc' : 'asc';
        setSortConfig({ key: column, direction });

        const sortedRows = [...rows].sort((a, b) => {
            if (a[column] < b[column]) return isAsc ? 1 : -1;
            if (a[column] > b[column]) return isAsc ? -1 : 1;
            return 0;
        });
        setRows(sortedRows);
    };

    // Handle editing
    const handleEditClick = (item) => {
        setSelectedRow(item);
        setPopupReason(item.reason);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleUpdate = () => {
        setRows((prevRows) =>
            prevRows.map((item) =>
                item.RollNo === selectedRow.RollNo ? { ...item, reason: popupReason } : item
            )
        );
        setIsPopupOpen(false);
    };

    // Handle reason change directly in the table
    const handleReasonChange = (item, value) => {
        setRows((prevRows) =>
            prevRows.map((r) => (r.rollNo === item.RollNo ? { ...r, reason: value } : r))
        );
    };
    console.log(rowsData, 'rowsData')

    return (
        <div>
            <TableContainer>
                <Table sx={{
                    border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                }}>
                    <TableHead>
                        <TableRow sx={{
                            background: (theme) => theme.palette.secondary.main,
                            color: (theme) => theme.palette.common.white,
                        }}>
                            <TableCell sx={{ color: "white", py: 1 }}>
                                <Checkbox
                                    indeterminate={
                                        selectedRows.length > 0 &&
                                        selectedRows.length < rows.length
                                    }
                                    checked={rows.length > 0 && selectedRows.length === rows.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell sx={{ color: "white", py: 1 }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleSort('rollNo')}
                                >
                                    <strong>Roll No.</strong>
                                    {sortConfig.key === 'rollNo' && (
                                        sortConfig.direction === 'asc' ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                                        )
                                    )}
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: "white", py: 1 }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleSort('name')}
                                >
                                    <strong>Student Name</strong>
                                    {sortConfig.key === 'name' && (
                                        sortConfig.direction === 'asc' ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                                        )
                                    )}
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: "white", py: 1 }}><strong>Reason</strong></TableCell>
                            <TableCell sx={{ color: "white", py: 1, textAlign: "center", }}><strong>Edit</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((item) => (
                            <TableRow key={item.RollNo}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(item.RollNo)}
                                        onChange={() => handleCheckboxClick(item)}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.5 }}>{item.RollNo}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>{item.Name}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>
                                    {/* Directly editable Reason */}
                                    <TextField
                                        value={item.reason}
                                        multiline
                                        fullWidth
                                        minRows={1}
                                        disabled
                                        onChange={(e) => handleReasonChange(item, e.target.value)}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                resize: 'both', // Allows the TextField to be resizable
                                                overflow: 'auto',
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => handleEditClick(item)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Popup for editing */}
            <Dialog open={isPopupOpen} onClose={handlePopupClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: "15px",
                    }
                }} >
                <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
                    <ClearIcon onClick={handlePopupClose}
                        sx={{
                            color: 'white',
                            borderRadius: '7px',
                            position: 'absolute',
                            top: '5px',
                            right: '8px',
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'red',
                            }
                        }} />
                </DialogTitle>
                <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
                    Edit Reason
                </Typography>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={popupReason}
                        onChange={(e) => setPopupReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handlePopupClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} sx={{
                        color: 'green',
                        //  backgroundColor: grey[500],
                        '&:hover': {
                            color: 'green',
                            backgroundColor: green[100]
                        }
                    }}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

// ShowBlockedStudentsTable.propTypes = {
//     rowsData: PropTypes.array.isRequired,
// };

export default ShowBlockedStudentsTable;
