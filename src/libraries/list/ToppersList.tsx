import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';

interface TableListProps {
  headers: string[];
  data: any[]; // Modify 'any[]' to the type of your data if known
}

const ToppersList: React.FC<TableListProps> = ({ headers, data }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow
            sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
          >
            {headers.map((header, index) => (
              <TableCell align={header === "Roll No" ? 'center' : "left"} sx={{ color: 'white', fontWeight: '20px' }} key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell
                align={'center'}
                sx={{ color: row.IsHighlightStudent ? '#ff3d00' : '' }}
              >
                {row.Text1}
              </TableCell>
              {row.Text3 !== undefined &&
                <TableCell>{row.Text3}</TableCell>
              }
              <TableCell
                sx={{ color: row.IsHighlightStudent ? '#ff3d00' : '' }}
              >
                {row.Text2}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper >
  );
};

export default ToppersList;
