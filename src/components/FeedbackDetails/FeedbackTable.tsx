    import React, { useState } from 'react';
    import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel,
    Checkbox,
    } from '@mui/material';
    import { Edit } from '@mui/icons-material';
    import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
    import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
    import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
    import { red } from '@mui/material/colors';

    const FeedbackTable = ({ data, onEdit, onDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    
    const [selected, setSelected] = useState([]);

    // Handle sorting when clicking on column headers
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Handle selecting all rows
    const handleSelectAll = (event) => {
        if (event.target.checked) {
        setSelected(data.map((_, index) => index));
        } else {
        setSelected([]);
        }
    };

    // Handle selecting a single row
    const handleSelectOne = (event, index) => {
        setSelected((prevSelected) =>
        event.target.checked
            ? [...prevSelected, index]
            : prevSelected.filter((id) => id !== index)
        );
    };

    // Sort the data based on sortConfig
    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
        }
        return 0;
    });

    return (
        <Table
        aria-label="simple table"
        sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}
        >
        <TableHead>
            <TableRow
            sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
            }}
            >
            <TableCell padding="checkbox">
                <Checkbox
                checked={selected.length === data.length}
                onChange={handleSelectAll}
                />
            </TableCell>
            <TableCell
                sx={{ color: 'white', py: 1.5, cursor: 'pointer' }}
                onClick={() => handleSort('date')}
            >
                <TableSortLabel
                active={sortConfig.key === 'Date'}
                //   direction={sortConfig.key === 'Date' ? sortConfig.direction : 'asc'}
                >
                <strong>Date</strong>
                {sortConfig.key === 'date' && (
                    sortConfig.direction === 'asc' ? (
                    <ArrowCircleUpIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                    ) : (
                    <ArrowCircleDownIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                    )
                )}
                </TableSortLabel>
            </TableCell>
            <TableCell
                sx={{ color: 'white', py: 1.5, cursor: 'pointer' }}
                onClick={() => handleSort('linkName')}
            >
                <TableSortLabel
                active={sortConfig.key === 'linkName'}
                //   direction={sortConfig.key === 'linkName' ? sortConfig.direction : 'asc'}
                >
                <strong>Link</strong>
                {sortConfig.key === 'linkName' && (
                    sortConfig.direction === 'asc' ? (
                    <ArrowCircleUpIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                    ) : (
                    <ArrowCircleDownIcon sx={{ ml: 1, color: 'white', fontSize: '20px' }} />
                    )
                )}
                </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'white', py: 1.5, textAlign: 'center' }}>
                <strong>Edit</strong>
            </TableCell>
            <TableCell sx={{ color: 'white', py: 1.5, textAlign: 'center' }}>
                <strong>Delete</strong>
            </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {sortedData.map((row, index) => (
            <TableRow key={index}>
                <TableCell padding="checkbox">
                <Checkbox
                    checked={selected.indexOf(index) !== -1}
                    onChange={(event) => handleSelectOne(event, index)}
                />
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>{row.date}</TableCell>
                <TableCell sx={{ py: 0.5 }}>{row.linkName}</TableCell>
                <TableCell sx={{ textAlign: 'center', py: 0.5 }}>
                <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => onEdit(index)}>
                    <Edit />
                    </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', py: 0.5 }}>
                <Tooltip title="Delete">
                    <IconButton
                    onClick={() => onDelete(index)}
                    sx={{
                        color: '#38548A',
                        '&:hover': {
                        color: 'red',
                        backgroundColor: red[100],
                        },
                    }}
                    >
                    <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
    };

    export default FeedbackTable;
