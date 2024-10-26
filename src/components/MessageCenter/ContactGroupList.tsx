import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
  IconButton,
  Box,
  TableContainer,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { blue, grey, red } from '@mui/material/colors';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

interface Group {
  GroupId: string;
  GroupName: string;
}

interface ContactGroupListProps {
  groups: Group[];
}
const userRoles = [
  { id: 1, Name: 'Admin' },
  { id: 2, Name: 'Teacher' },
  { id: 3, Name: 'Student' },
  { id: 4, Name: 'Admin Staff' },
  { id: 5, Name: 'Ex. Admin' }
];

const ContactGroupList: React.FC<ContactGroupListProps> = ({ groups }) => {
  return (
    <>
      <Box>
        {/* <Typography variant="h4" sx={{ py: 2 }}>
          Add/Update Group
        </Typography> */}
        <Grid container spacing={2}>
          {/* Group Name */}
          <Grid item xs={6}>
            <TextField label="Group Name" fullWidth required />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography pt={1}>
            <b>Applicable To :</b>
          </Typography>
          <FormControl component="fieldset">
            <Grid container direction="row" alignItems="center" spacing={2}>
              {['Admin', 'Teacher', 'Student', 'Admin Staff', 'Ex. Admin'].map(
                (option) => (
                  <Grid item key={option}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={option}
                          // onChange={handleCheckboxChange}
                        />
                      }
                      label={option}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </FormControl>
        </Grid>
      </Box>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <SearchableDropdown
            label="User Role "
            sx={{ minWidth: '20vw' }}
            ItemList={userRoles}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Class " fullWidth required />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Search Name" fullWidth required />
        </Grid>
      </Grid>
      {/* <Typography variant="h4" sx={{ p: 1, pl: 0 }}>
        Select Contact Group(s)
      </Typography> */}
      {/* <TableContainer component={Box}>
        <Table
          aria-label="simple table"
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            overflow: 'hidden'
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white
              }}
            >
              <TableCell
                sx={{
                  textTransform: 'capitalize',
                  color: (theme) => theme.palette.common.white,
                  py: 0
                }}
                align="left"
              >
                <Checkbox />
              </TableCell>
              <TableCell
                sx={{
                  textTransform: 'capitalize',
                  color: (theme) => theme.palette.common.white,
                  py: 0
                }}
                align="left"
              >
                Group Name
              </TableCell>
              <TableCell
                sx={{
                  textTransform: 'capitalize',
                  color: (theme) => theme.palette.common.white,
                  py: 0
                }}
                align="center"
              >
                Edit
              </TableCell>
              <TableCell
                sx={{
                  textTransform: 'capitalize',
                  color: (theme) => theme.palette.common.white,
                  py: 0
                }}
                align="center"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((item) => (
              <TableRow key={item.GroupId}>
                <TableCell sx={{ py: 0 }}>
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ py: 0 }}>{item.GroupName}</TableCell>
                <TableCell align="center" sx={{ py: 0 }}>
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" sx={{ py: 0 }}>
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{
                        color: '#223354',
                        '&:hover': { color: 'red', backgroundColor: red[100] }
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
      </TableContainer> */}
    </>
  );
};

export default ContactGroupList;
