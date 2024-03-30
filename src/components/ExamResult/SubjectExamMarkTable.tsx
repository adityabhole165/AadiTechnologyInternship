import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import SubjectExamHeader from './SubjectExamHeader';
import SubjectExamRows from './SubjectExamRows';
const SubjectExamMarkTable = ({ ExamStatus, StudentsForMarksAssignment, onChangeExamStatus, ExamMarksHeader, onChangeExamHeader }) => {

  const ChangeExamHeader = (value, Id) => {

    ExamMarksHeader = {
      ...ExamMarksHeader,
      Text4: ExamMarksHeader.Text4.map((Item) => {
        if (Item.Id === Id) {
          return { ...Item, Text2: value }
        }
        else {
          return Item;
        }
      })
    }
    console.log("ExamMarksHeader", ExamMarksHeader)
    onChangeExamHeader(ExamMarksHeader);

  };
  const changeExamStatus = (value, Id) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item) => {
      if (Item.Id == Id) {
        return { ...Item, ExamStatus: value }
      }
      else
        return Item
    })
    console.log("Type of StudentsForMarksAssignment:", typeof StudentsForMarksAssignment);

    onChangeExamStatus(StudentsForMarksAssignment)
  }
  const changeText = (value, StudentId, Id) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item, Index) => {
      return {
        ...Item,
        MarksForStudent: (Item.Id == StudentId) ?
          Item.MarksForStudent.map((obj) => {
            if (Id == obj.Id) {
              return { ...obj, Text1: value }
            }
            else
              return obj

          }) : Item.MarksForStudent
      }
    })
    onChangeExamStatus(StudentsForMarksAssignment)
  }
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
                {/* <SubjectExamHeader ExamMarksHeader={ExamMarksHeader.Text4} /> */}
                <SubjectExamHeader
                  ExamMarksHeader={ExamMarksHeader.Text4}

                  ChangeExamHeader={ChangeExamHeader}
                />
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  {ExamMarksHeader.Text5}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentsForMarksAssignment?.length > 0 &&
                StudentsForMarksAssignment.map((Item, i) => {
                  return (<TableRow key={i}>
                    <TableCell>{Item.Text1}</TableCell>
                    <TableCell>{Item.Text2}</TableCell>
                    <TableCell>
                      <Dropdown
                        defaultValue={Item.ExamStatus}
                        variant='outlined'
                        Array={ExamStatus}
                        handleChange={(value) => { changeExamStatus(value, Item.Id) }}
                      />
                    </TableCell>
                    <SubjectExamRows ExamMarks={Item.MarksForStudent} StudentId={Item.Id}
                      changeText={changeText} />
                    <TableCell>
                      <TextField sx={{ width: '50px' }} size={"small"} disabled
                        value={Item.TotalMarks} />
                    </TableCell>
                  </TableRow>)
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </div>
  )
}

export default SubjectExamMarkTable
