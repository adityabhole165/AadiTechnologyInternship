import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Card,
  TextareaAutosize,
  MenuItem,
  FormControl,
  Select,
  Button,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
function PublishButton({ newLogItem,clickEdit, Delete, Link , HeaderArray }) {
  const [isPublic, setIsPublic] = useState(true);
  const [logs, setLogs] = useState([]);


  const ClickToggle = () => {
    setIsPublic((prevState) => !prevState);
  };
  

  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray" }}>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: "capitalize" }}
                  align="center"
                >
                  {" "}
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newLogItem.map((item, i) => (
              <TableRow key={i}>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    {" "}
                    {item.Text1}
                  </TableCell>
                  <TableCell  onClick={() => Link(item.Id)} 
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    {" "}
                    {item.Text2 }
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    <Button
                      variant="contained"
                      color={isPublic ? "primary" : "secondary"}
                      onClick={ClickToggle}
                    >
                      {isPublic ? "Publish" : "UnPublish"}
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    <EditIcon  onClick={() => clickEdit(item)} />{" "}
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                     <DeleteIcon  color={'error'} onClick={() => Delete(item)} />{" "}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
        {/* Display the list of saved logs */}
        {logs.map((log, index) => (
          <div key={index}>
            <Typography>Date: {log.Text1}</Typography>
          <Typography>Attachment: {log.Text2}</Typography>
          </div>
        ))}
      
      </TableContainer>
    </div>
  );
}

export default PublishButton;
