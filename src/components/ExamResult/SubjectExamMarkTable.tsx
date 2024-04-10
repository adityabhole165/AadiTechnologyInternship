import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SubjectExamHeader from './SubjectExamHeader';
import SubjectExamRows from './SubjectExamRows';
const SubjectExamMarkTable = ({ ExamStatus, StudentsForMarksAssignment, onChangeExamStatus,
  ExamMarksHeader, onChangeExamHeader, GradesForSubjectMarkList, IsReadOnly,
  onChangeExamGrade, IsMark }) => {


  const ChangeExamHeader = (value, Id, Index) => {

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
    // console.log("ExamMarksHeader", ExamMarksHeader)
    setAllValues(value, Index)
    onChangeExamHeader(ExamMarksHeader);

  };
  const ChangeExamGradeHeader = (value, Id, Index) => {
    if (value != "") {
      if (confirm('This action will set a new value for all students. Do you want to continue?')) {

        ExamMarksHeader = {
          ...ExamMarksHeader,
          Text4: ExamMarksHeader.Text4.map((Item) => {
            if (Item.Id === Id) {
              return { ...Item, Text3: value }
            }
            else {
              return Item;
            }
          })
        }
        // console.log("ExamMarksHeader", ExamMarksHeader)
        // setAllValues(value, Index)
        setAllValuesforGrade(value, Index)
        onChangeExamHeader(ExamMarksHeader);
      }
    }

  };


  const changeExamStatus = (value, StudentId, Id) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item, Index) => {
      return {
        ...Item,
        MarksForStudent: (Item.Id == StudentId) ?
          Item.MarksForStudent.map((obj) => {
            if (Id == obj.Id) {
              return {
                ...obj, ExamStatus: value, ExamGrade: "0",
                IsActiveGrade: value == "0", IsActive: value == "0"
              }
            }
            else
              return obj

          }) : Item.MarksForStudent
      }
    })
    onChangeExamStatus(StudentsForMarksAssignment)
  }
  const changeExamGradeRows = (value, StudentId, Id) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item, Index) => {
      return {
        ...Item,
        MarksForStudent: (Item.Id == StudentId) ?
          Item.MarksForStudent.map((obj) => {
            if (Id == obj.Id) {
              return { ...obj, ExamGrade: value, }
            }
            else
              return obj

          }) : Item.MarksForStudent
      }
    })
    onChangeExamGrade(StudentsForMarksAssignment)
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
  const setAllValues = (value, Index) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item) => {
      return {
        ...Item,
        MarksForStudent: Item.MarksForStudent.map((obj, i) => {
          return Index == i ? { ...obj, Text1: value } : obj
        })
      }
    })
    onChangeExamStatus(StudentsForMarksAssignment)
  }
  const setAllValuesforGrade = (value, Index) => {
    StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item) => {
      return {
        ...Item,
        MarksForStudent: Item.MarksForStudent.map((obj, i) => {
          return Index == i ? { ...obj, ExamGrade: value } : obj
        })
      }
    })
    console.log(StudentsForMarksAssignment, "setAllValuesforGrade", value, "value, Index", Index);

    onChangeExamGrade(StudentsForMarksAssignment)
  }

  const getTotalMarks = (arrTotal) => {

    let total = 0
    arrTotal.map((Item) => {
      total = total + Number(Item.Text1)
    })
    return total
  }

  const getDropdownName = (arrDropdown) => {
    let returnVal = "";
    arrDropdown.map((Item) => {
      returnVal = Item.Name;
    });
    return returnVal;
  }

  const getGrade = (arrTotal) => {
    let totalScored = 0, Grade = "", subjectTotal = 0
    arrTotal.map((Item) => {
      totalScored = totalScored + Number(Item.Text1)
    })
    arrTotal.map((Item) => {
      subjectTotal = subjectTotal + Number(Item.Text2)
    })

    let Percent = (totalScored / subjectTotal) * 100

    GradesForSubjectMarkList.map((Item, i) => {
      if (Item.Starting_Marks_Range <= Percent &&
        Item.Actual_Ending_Marks_Range >= Percent)
        Grade = Item.Grade_Name
    })
    return Grade
  }
  return (
    <div>
      <Box>
        <TableContainer component={Box} sx={{ mt: 2 }}>
          <Table sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text1}
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text2}
                </TableCell>
                {/* <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  {ExamMarksHeader.Text3}
                </TableCell> */}
                {/* <SubjectExamHeader ExamMarksHeader={ExamMarksHeader.Text4} /> */}
                <SubjectExamHeader
                  ExamMarksHeader={ExamMarksHeader.Text4}
                  BlurrExamHeader={setAllValues}
                  ChangeExamHeader={ChangeExamHeader}
                  GradesForSubjectMarkList={GradesForSubjectMarkList}
                  ChangeGrade={ChangeExamGradeHeader}
                  IsReadOnly={true}
                  IsMark={IsMark}
                />
                {IsMark &&
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    {ExamMarksHeader.Text5}
                  </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentsForMarksAssignment?.length > 0 &&
                StudentsForMarksAssignment.map((Item, i) => {
                  return (<TableRow key={i}>
                    <TableCell>{Item.Text1}</TableCell>
                    <TableCell>{Item.Text2}</TableCell>

                    <SubjectExamRows ExamMarks={Item.MarksForStudent} StudentId={Item.Id}
                      changeText={changeText} GradesForSubjectMarkList={GradesForSubjectMarkList}
                      ExamStatus={ExamStatus} changeExamStatus={changeExamStatus}
                      changeExamGrade={changeExamGradeRows}
                      IsReadOnly={true}
                      IsMark={IsMark} />
                    {getDropdownName(Item.ExamStatus)}
                    {IsMark &&
                      <TableCell>
                        <TextField sx={{ width: '80px' }} size={"small"}
                          disabled
                          value={getTotalMarks(Item.MarksForStudent)}

                        // value={Item.TotalMarks} 
                        />

                        {getGrade(Item.MarksForStudent)}
                      </TableCell>
                    }

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
