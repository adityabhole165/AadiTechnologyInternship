import { Delete, Edit } from "@mui/icons-material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

interface FeedbackFromUsersTableProps {
  data: { id: number; date: string; userName: string; email: string; comments: string }[];
  rowsPerPage: number;
}

const FeedbackFromUsersTable: React.FC<FeedbackFromUsersTableProps> = ({ data: initialData, rowsPerPage }) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const totalCount = data.length;
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, totalCount);
  const pageCount = Math.ceil(totalCount / rowsPerPage);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  return (
    <Box>
      {isMobile ? (
        <Box>
          <Checkbox
            checked={selected.length === data.length && data.length > 0}
            indeterminate={selected.length > 0 && selected.length < data.length}
            onChange={handleSelectAll}
          />
          {data.map((row) => (
            <Card key={row.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                  />
                  <Box>
                    <Typography variant="subtitle2">Date: {row.date}</Typography>
                    <Typography variant="subtitle2">User Name: {row.userName}</Typography>
                    <Typography variant="subtitle2">Email: {row.email}</Typography>
                    <Typography variant="body2">Comments: {row.comments}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "#38548A",
                      "&:hover": {
                        color: "red",
                        backgroundColor: red[100],
                      },
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
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
                    checked={selected.length === data.length && data.length > 0}
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: "white", py: 1.5 }}>
                  <TableSortLabel
                    active={sortConfig?.key === "date"}
                    direction={sortConfig?.key === "date" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("date")}
                    IconComponent={() =>
                      sortConfig?.key === "date" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                      ) : (
                        <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                      ))
                    }
                    sx={{
                      "&.Mui-active": {
                        color: "white",
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "white",
                      },
                    }}
                  >
                    <strong>Date</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", py: 1.5 }}>
                  <TableSortLabel
                    active={sortConfig?.key === "userName"}
                    direction={sortConfig?.key === "userName" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("userName")}
                    IconComponent={() =>
                      sortConfig?.key === "userName" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                      ) : (
                        <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                      ))
                    }
                    sx={{
                      "&.Mui-active": {
                        color: "white",
                      },
                      "&.MuiTableSortLabel-root:hover": {
                        color: "white",
                      },
                    }}
                  >
                    <strong>User Name</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white", py: 1.5 }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ color: "white", py: 1.5, width: "50%" }}>
                  <strong>Comments</strong>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", py: 1.5 }}>
                  <strong>Edit</strong>
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", py: 1.5 }}>
                  <strong>Delete</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.date}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.userName}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.email}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.comments}</TableCell>
                  <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                    <IconButton
                      sx={{
                        color: "#38548A",
                        "&:hover": {
                          color: "red",
                          backgroundColor: red[100],
                        },
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FeedbackFromUsersTable;
