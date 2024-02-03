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
          <TableRow sx={{ backgroundColor: '#4dd0e1' }}>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ToppersList;
