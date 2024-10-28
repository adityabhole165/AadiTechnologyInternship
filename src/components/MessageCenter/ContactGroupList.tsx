import React, { useState } from 'react';
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
import ContactGroupEditTable from './ContactGroupEditTable';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

  const initialUserData = [
    { id: 1, name: 'Mr. Devendra Kumar (Principal)' },
    { id: 2, name: 'Dr. Anjali S. Gurjar (Ex Principal)' },
    { id: 3, name: 'Mrs. Anupama S. Chatterjee (Headmistress)' },
    { id: 4, name: 'Ms. Reema Bhattacharjee (Headmistress)' },
    { id: 5, name: 'Mr. Amit Arun Kharat (Vice-Principal)' },
    { id: 6, name: 'Ms. Mahasweta Bhattacharya (Co-ordinator)' },
    { id: 7, name: 'Ms. Maya D. Ghule (Co-ordinator)' },
    { id: 8, name: 'Ms. Ritu Saxena (Co-ordinator)' },
    { id: 9, name: 'Ms. Aanchal Verma (Teacher)' },
  ];

  const [userData, setUserData] = useState(initialUserData);
  const [sortOrder, setSortOrder] = useState('asc');

  // Sort function for User Name
  const handleSort = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUserData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
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
        <Box py={2}  sx={{  overflow: 'auto',}}>
          <ContactGroupEditTable/>
        </Box>
        <Grid item xs={12}>
          <Typography pt={1}>
            <b>Applicable To </b>
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
      <Box py={2}>
      <Typography variant="h4" sx={{ p: 1, pl: 0 }}>
        Select Users To Add In Selected Group 
      </Typography>

      </Box>
     
      <TableContainer component={Box} sx={{  overflow: 'auto',}}>
        <Table aria-label="simple table"
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden'
        }}
      >
          <TableHead>
            <TableRow sx={{
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,
             
            }}
          >
              <TableCell padding="checkbox" sx={{ py:0.5}}>
                <Checkbox />
              </TableCell>
              <TableCell sx={{ py:0.5}}>
                <Box display="flex" alignItems="center">
                  User Name
                  <IconButton onClick={handleSort} size="small">
                    {sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell padding="checkbox" sx={{ py:0.5}}>
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ py:0.5}}>{user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ContactGroupList;
