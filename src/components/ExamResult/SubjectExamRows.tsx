import { Box, TableCell, TextField, Tooltip } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
const validateInput = (inputValue) => {
    const regex = /^\d{0,3}(\.\d{0,1})?$|^\d{0,5}$/
    return regex.test(inputValue);
};
const SubjectExamRows = ({ ExamMarks, StudentId, changeText,
    GradesForSubjectMarkList, ExamStatus, changeExamStatus,
    changeExamGrade, IsReadOnly, examResultProp, publish, IsMark, AllowDecimal = true }) => {

    const handleChange = (e, validationFunction, callback) => {
        const { value } = e.target;
        if (value == "")
            callback(value);
        else
            if (validationFunction(value)) {
                callback(value);
            }
    };
    const getGrade = (marks, total) => {
        if (marks == "")
            return ""
        let Grade = ""
        let Percent = (marks / total) * 100

        GradesForSubjectMarkList.map((Item, i) => {
            if (Item.Starting_Marks_Range <= Percent &&
                Item.Actual_Ending_Marks_Range >= Percent)
                Grade = Item.Grade_Name
        })
        return Grade
    }
    return (
        <>
            {ExamMarks?.map((Item, Index) => {
                return (
                    <>
                        <TableCell key={Index} sx={{py:1 }}>
                            <Dropdown
                                width='150px'
                                size={"small"}
                                defaultValue={Item.ExamStatus}
                                variant='outlined'
                                Array={
                                    Item.IsLateJoinee ?
                                        ExamStatus :
                                        ExamStatus.filter((Item) => { return Item.Value != "J" })
                                }
                                handleChange={(value) => { changeExamStatus(value, StudentId, Item.Id) }}
                                disabled={IsReadOnly || examResultProp && publish ||
                                    (Item.IsLateJoinee &&
                                        Item.AllowMarksEntryForLateJoin == "false")}

                            />
                        </TableCell>
                        {IsMark ? (

                            <>
                                <TableCell key={Index} sx={{py:1 }}>
                                    <Tooltip title={
                                        (Number(Item.Text1) > Number(Item.Text2)) ?
                                            ("Marks Scored should be less than " + Item.Text2 + ".")
                                            : null}>
                                        <TextField size={"small"}

                                            sx={{
                                                ml: 5,
                                                width: '60px',
                                                border: (Number(Item.Text1) > Number(Item.Text2)) ? 1 : 0,
                                                borderColor: (Number(Item.Text1) > Number(Item.Text2)) ? 'error.main' : 0,
                                                background: (IsReadOnly || examResultProp && publish || !(Item.ExamStatus == "N") ?
                                                    "#f0F0F0" : "")

                                            }}
                                            disabled={IsReadOnly || examResultProp && publish || !(Item.ExamStatus == "N")}
                                            value={AllowDecimal ? Item.Text1 :
                                                Math.round(Number(Item.Text1))
                                            }
                                            onChange={(e) => handleChange(e, validateInput, (value) => changeText(value, StudentId, Item.Id))}

                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell key={Index} sx={{py:1 }}>
                                    {getGrade(Item.Text1, Item.Text2)}
                                </TableCell>
                            </>
                        ) : (
                            <TableCell key={Index} sx={{py:1}}>
                                <Box>
                                    <Dropdown
                                        size={"small"}
                                        defaultValue={Item.ExamGrade}
                                        variant='outlined'
                                        Array={GradesForSubjectMarkList}
                                        disabled={IsReadOnly || examResultProp && publish || !Item.IsActive}
                                        handleChange={(value) => { changeExamGrade(value, StudentId, Item.Id) }}
                                    />

                                </Box>
                            </TableCell>)
                        }
                    </>
                )
            })}
        </>
    )
}
export default SubjectExamRows