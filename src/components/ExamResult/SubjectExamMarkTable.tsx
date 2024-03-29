import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import SubjectExamHeader from './SubjectExamHeader';
import SubjectExamRows from './SubjectExamRows';
const SubjectExamMarkTable = ({ ExamMarks, ExamMarksHeader }) => {
  return (
    <div>
      <Box>
        <TableContainer component={Box} sx={{ mt: 2 }}>
          <Table sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.primary.main }}>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text1}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text2}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text3}
                </TableCell>
                <SubjectExamHeader ExamMarksHeader={ExamMarksHeader.Text4} />
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  {ExamMarksHeader.Text5}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>Miss Gauri Vishal Bhadale</TableCell>
                <TableCell>
                  <Dropdown
                    variant='outlined'
                    Array={[{
                      Value: "absent",
                      Name: "Absent"
                    }, {
                      Value: "exempted",
                      Name: "Exempted"
                    }]}
                  />
                </TableCell>
                <SubjectExamRows ExamMarks={ExamMarks} />
                <TableCell>
                  <TextField sx={{ width: '50px' }} size={"small"} disabled />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </div>
  )
}

export default SubjectExamMarkTable
