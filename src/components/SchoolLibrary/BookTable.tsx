import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

type BookDataType = {
    bookTitle: string;
    date: string;
    action: string;
};

interface BookTableProps {
    data: BookDataType[];
}

const BookTable: React.FC<BookTableProps> = ({ data }) => {
    const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
    const [sortedData, setSortedData] = useState(data);

    const handleSortRequest = () => {
        const sortedArray = [...sortedData].sort((a, b) => {
            if (orderDirection === "asc") {
                return a.bookTitle.localeCompare(b.bookTitle);
            } else {
                return b.bookTitle.localeCompare(a.bookTitle);
            }
        });
        setSortedData(sortedArray);
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <TableHead>
                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                        <TableCell sx={{ color: 'white', py: 1.5 }}>
                            <TableSortLabel
                                active={true}
                                direction={orderDirection}
                                onClick={handleSortRequest}
                                IconComponent={orderDirection === "asc" ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                                sx={{
                                    color: 'white', // Set the text color to white
                                    '&:hover': {
                                        color: 'white !important', // Ensure text stays white on hover
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'white !important' // Ensure icon stays white on hover
                                        }
                                    },
                                    '&.Mui-active': {
                                        color: 'white', // Ensure active state text color is white
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'white' // Ensure active state icon color is white
                                        }
                                    },
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'white' // Set icon color to white
                                    }
                                }}
                            >
                                Book Title
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ color: 'white', py: 1.5, pl: 4 }}>Date</TableCell>
                        <TableCell sx={{ color: 'white', py: 1.5, textAlign: 'center' }}>Cancel</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((book, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>{book.bookTitle}</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>{book.date}</TableCell>
                            <TableCell
                                sx={{
                                    textTransform: 'capitalize', textAlign: 'center',
                                    opacity: 1, py: 0.5
                                }}
                                align="center"
                            >
                                <IconButton
                                    sx={{
                                        color: '#223354',
                                        '&:hover': {
                                            color: 'red',
                                            backgroundColor: red[100]
                                        }
                                    }}
                                >
                                    <Tooltip title="Delete">
                                        <DeleteForeverIcon />
                                    </Tooltip>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookTable;
