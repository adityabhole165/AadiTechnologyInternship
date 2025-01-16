import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { useState } from 'react';

const ShowUnblockedStudentsTable = ({ rowsData }) => {
    const [rows, setRows] = useState(rowsData);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    //console.log('first rendered value ✨✨✨✨', rowsData)
    // Handle checkbox for individual rows
    const handleCheckboxClick = (row) => {
        setSelectedRows((prev) =>
            prev.includes(row.rollNo)
                ? prev.filter((id) => id !== row.rollNo)
                : [...prev, row.rollNo]
        );
    };

    // Handle Select All checkbox
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const allRowIds = rows.map((row) => row.rollNo);
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

    // Handle reason change
    const handleReasonChange = (row, value) => {
        setRows((prevRows) =>
            prevRows.map((r) => (r.rollNo === row.rollNo ? { ...r, reason: value } : r))
        );
    };

    return (
        <div>
            <TableContainer>
                <Table
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                background: (theme) => theme.palette.secondary.main,
                                color: (theme) => theme.palette.common.white,
                            }}
                        >
                            <TableCell sx={{ color: 'white', py: 1 }}>
                                <Checkbox
                                    indeterminate={
                                        selectedRows.length > 0 &&
                                        selectedRows.length < rows.length
                                    }
                                    checked={
                                        rows.length > 0 &&
                                        selectedRows.length === rows.length
                                    }
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell sx={{ color: 'white', py: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSort('rollNo')}
                                >
                                    <strong>Roll No.</strong>
                                    {sortConfig.key === 'rollNo' &&
                                        (sortConfig.direction === 'asc' ? (
                                            <ArrowCircleUpIcon
                                                sx={{
                                                    ml: 1,
                                                    color: 'white',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        ) : (
                                            <ArrowCircleDownIcon
                                                sx={{
                                                    ml: 1,
                                                    color: 'white',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        ))}
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: 'white', py: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSort('name')}
                                >
                                    <strong>Student Name</strong>
                                    {sortConfig.key === 'name' &&
                                        (sortConfig.direction === 'asc' ? (
                                            <ArrowCircleUpIcon
                                                sx={{
                                                    ml: 1,
                                                    color: 'white',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        ) : (
                                            <ArrowCircleDownIcon
                                                sx={{
                                                    ml: 1,
                                                    color: 'white',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        ))}
                                </div>
                            </TableCell>
                            <TableCell sx={{ color: 'white', py: 1 }}>
                                <strong>Reason</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 && rows.map((row) => (
                            <TableRow key={row.RollNo}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(row.RollNo)}
                                        onChange={() => handleCheckboxClick(row)}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.5 }}>{row.RollNo}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>{row.Name}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>
                                    <TextField
                                        value={row.reason}
                                        multiline
                                        fullWidth
                                        minRows={1}
                                        onChange={(e) =>
                                            selectedRows.includes(row.RollNo)
                                                ? handleReasonChange(row, e.target.value)
                                                : null
                                        }
                                        disabled={!selectedRows.includes(row.RollNo)}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                resize: 'both', // Allows the TextField to be resizable
                                                overflow: 'auto',
                                            },
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};



export default ShowUnblockedStudentsTable;
