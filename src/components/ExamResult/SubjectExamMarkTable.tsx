import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SubjectExamHeader from './SubjectExamHeader';
import SubjectExamRows from './SubjectExamRows';
const SubjectExamMarkTable = ({ ExamStatus, StudentsForMarksAssignment, onChangeExamStatus,
  ExamMarksHeader, onChangeExamHeader, GradesForSubjectMarkList, IsReadOnly, examResultProp, publish,
  onChangeExamGrade, IsMark, AllowDecimal = true }) => {


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
      let total = "", bIsDirty = false
      return {
        ...Item,
        MarksForStudent: (Item.Id == StudentId) ?
          Item.MarksForStudent.map((obj) => {
            if (Id == obj.Id) {
              bIsDirty = true
              return {
                ...obj,
                ExamStatus: value,
                ExamGrade: "0",
                IsActiveGrade: value == "0",
                IsActive: value == "0",
                Text1: "",
                total: "0"
              }
            }
            else
              return obj

          }) : Item.MarksForStudent,
        TotalMarks: bIsDirty ? "0" : Item.TotalMarks
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
      let total = 0, bIsDirty = false
      return {
        ...Item,
        MarksForStudent: (Item.Id == StudentId) ?
          Item.MarksForStudent.map((obj) => {
            if (Id == obj.Id) {
              bIsDirty = true
              total += value == "" ? 0 :
                AllowDecimal ?
                  (Number(value) *
                    (obj.TestTypeOutOfMarks == "0" ? 1 : obj.TestTypeOutOfMarks / obj.TestTypeTotalMarks)) :
                  Math.round((Number(value) *
                    (obj.TestTypeOutOfMarks == "0" ? 1 : obj.TestTypeOutOfMarks / obj.TestTypeTotalMarks)))
              return { ...obj, Text1: value }
            }
            else {
              if (obj.Text1 !== "") {
                bIsDirty = true
                total += AllowDecimal ?
                  (Number(obj.Text1) *
                    (obj.TestTypeOutOfMarks == "0" ? 1 : obj.TestTypeOutOfMarks / obj.TestTypeTotalMarks)) :
                  Math.round((Number(obj.Text1) *
                    (obj.TestTypeOutOfMarks == "0" ? 1 : obj.TestTypeOutOfMarks / obj.TestTypeTotalMarks)))
              }
              return obj
            }
          }) : Item.MarksForStudent,
        TotalMarks: (Item.Id == StudentId) ? (bIsDirty ? total : "") : Item.TotalMarks
      }
    })
    onChangeExamStatus(StudentsForMarksAssignment)
  }
  const setAllValues = (value, Index) => {
    StudentsForMarksAssignment.map((Item) => {
      Item.MarksForStudent.map((obj, i) => {
        changeText(Index == i ? value : obj.Text1, Item.Id, obj.Id)
      })
    })
    // StudentsForMarksAssignment = StudentsForMarksAssignment.map((Item) => {
    //   return {
    //     ...Item,
    //     MarksForStudent: Item.MarksForStudent.map((obj, i) => {
    //       return Index == i ? { ...obj, Text1: value } : obj
    //     })
    //   }
    // })
    // onChangeExamStatus(StudentsForMarksAssignment)
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

  // const getTotalMarks = (arrTotal) => {

  //   let total = 0
  //   let bDirty = false
  //   arrTotal.map((Item) => {
  //     if (Item.Text1 != "") {
  //       bDirty = true
  //       total = total + Number(Item.Text1)
  //     }
  //   })
  //   return bDirty ? total : ""

  // }


  const getGrade = (arrTotal, TotalMarks) => {
    if (TotalMarks != "") {
      let totalScored = 0, Grade = "", subjectTotal = 0
      arrTotal.map((Item) => {
        if (Item.Text1 != "") {
          totalScored = totalScored + Number(Item.Text1)
        }
      })
      arrTotal.map((Item) => {
        if (Item.Text2 != "") {
          subjectTotal = subjectTotal + Number(Item.Text2)
        }
      })
      let Percent = 0
      Percent = (totalScored / subjectTotal) * 100

      GradesForSubjectMarkList.map((Item, i) => {
        if (Item.Starting_Marks_Range <= Percent &&
          Item.Actual_Ending_Marks_Range >= Percent)
          Grade = Item.Grade_Name
      })
      return Grade
    }
  }
  return (
    <div>
      <Box>
        <TableContainer component={Box} sx={{ mt: 2 , width:'auto'}}>
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
                  IsReadOnly={IsReadOnly == 'true'}
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
                    <TableCell sx={{paddingTop: '2.5px', paddingBottom: '2.5px'}}>{Item.Text1}</TableCell>
                    <TableCell sx={{paddingTop: '2.5px', paddingBottom: '2.5px'}}>{Item.Text2}</TableCell>

                    <SubjectExamRows ExamMarks={Item.MarksForStudent} StudentId={Item.Id}
                      changeText={changeText} GradesForSubjectMarkList={GradesForSubjectMarkList}
                      // ExamStatus={getDropdownName(ExamStatus)} 
                      ExamStatus={ExamStatus}
                      changeExamStatus={changeExamStatus}
                      changeExamGrade={changeExamGradeRows}
                      IsReadOnly={IsReadOnly == 'true'}
                      examResultProp={examResultProp == 'true'}
                      publish={publish == 'true'}
                      IsMark={IsMark}
                      AllowDecimal={AllowDecimal}
                    />
                    {/* {getDropdownName(Item.ExamStatus)} */}
                    {IsMark &&
                      <TableCell sx={{paddingTop: '2.5px', paddingBottom: '2.5px'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TextField sx={{
                            width: '80px',
                            background: "#F0F0F0"
                          }} size={"small"}
                            disabled
                            value={Item.TotalMarks}
                          // value={getTotalMarks(Item.MarksForStudent)}
                          // value={Item.TotalMarks} 
                          />
                          {getGrade(Item.MarksForStudent, Item.TotalMarks)}
                        </Box>
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
  );

}
export default SubjectExamMarkTable
