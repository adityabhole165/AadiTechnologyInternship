import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { red } from "@mui/material/colors";

interface Note {
  id: number;
  message: string;
  startDate: string;
  endDate: string;
  isDefault?: boolean; // Flag to identify the default notice
}

interface NoticeListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

type SortConfig = {
  key: keyof Note;
  direction: "asc" | "desc";
};

const NoticeList: React.FC<NoticeListProps> = ({ notes, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: keyof Note) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key: keyof Note) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
      ) : (
        <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
      );
    }
    return null;
  };

  return (
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
            {["Message", "Start Date", "End Date"].map((header, index) => (
              <TableCell
                key={header}
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  py: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => handleSort(header.toLowerCase().replace(" ", "") as keyof Note)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                //   justifyContent="space"
                  component="span"
                >
                  <strong>{header}</strong>
                  {renderSortIcon(header.toLowerCase().replace(" ", "") as keyof Note)}
                </Box>
              </TableCell>
            ))}
            <TableCell
              sx={{
                textTransform: "capitalize",
                color: "white",
                py: 1.5,
                textAlign: "center",
              }}
            >
              <strong>Edit</strong>
            </TableCell>
            <TableCell
              sx={{
                textTransform: "capitalize",
                color: "white",
                py: 1.5,
                textAlign: "center",
              }}
            >
              <strong>Delete</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNotes.map((note) => (
            <TableRow key={note.id}>
              <TableCell sx={{ textTransform: "capitalize", py: 0.5 }}>{note.message}</TableCell>
              <TableCell sx={{ textTransform: "capitalize", py: 0.5 }}>{note.startDate}</TableCell>
              <TableCell sx={{ textTransform: "capitalize", py: 0.5 }}>{note.endDate}</TableCell>
              <TableCell sx={{ textTransform: "capitalize", py: 0.5, textAlign: "center" }}>
              <Tooltip title="Edit" >
                <IconButton onClick={() => onEdit(note)} color="primary">
                  <EditIcon />
                </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell
                sx={{
                  textTransform: "capitalize",
                  py: 0.5,
                  textAlign: "center",
                }}
              >
                {!note.isDefault && ( // Hide delete button for default notice
                <Tooltip title="Delete" >
                  <IconButton
                    onClick={() => onDelete(note.id)}
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
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NoticeList;
