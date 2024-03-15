import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Container, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import Dropdown from 'src/libraries/dropdown/Dropdown';

const SubjectExamMarks = () => {
  return (
    <Container maxWidth={"xl"}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 4
        }}
      >
        <Box>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Assign Exam Marks
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <Dropdown
              label='Class'
              width='100px'
              Array={[]}
            />
          </Box>
          <Box>
            <Dropdown
              label='Exam'
              width='200px'
              Array={[]}
            />
          </Box>
          <Box>
            <Dropdown
              label='Subject Name'
              width='150px'
              Array={[]}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              type="date"
              label={"Exam Date"}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
              variant={"standard"}
            />
          </Box>
          <Box>
            <Tooltip title={`Assign marks to each student in the class for the selected subject and click on &quot;Save&quot;. Once marks are submitted to class-teacher you can modify it from exam results.`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: grey[600] }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={`Save`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: green[600] }
                }}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ p: 2, background: 'white', mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant={"h4"}>
            Total Marks: 20
          </Typography>
          <div>|</div>
          <Typography variant={"h4"}>
            Passing Marks: 20
          </Typography>
        </Box>
        {/* Table */}
        <TableContainer component={Box} sx={{ mt: 2 }}>
          <Table sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.primary.main }}>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Roll No.
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Student Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Exam Status
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold", py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Project / 20 <TextField sx={{ width: '50px', background: 'white' }} size={"small"} />
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Total / 20
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>Miss Gauri Vishal Bhadale</TableCell>
                <TableCell>
                  <Dropdown
                    variant={"outlined"}
                    Array={[{
                      Value: "absent",
                      Name: "Absent"
                    }, {
                      Value: "exempted",
                      Name: "Exempted"
                    }]}
                  />
                </TableCell>
                <TableCell>
                  <TextField sx={{ width: '50px' }} size={"small"} />
                </TableCell>
                <TableCell>
                  <TextField sx={{ width: '50px' }} size={"small"} disabled />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SubjectExamMarks;
