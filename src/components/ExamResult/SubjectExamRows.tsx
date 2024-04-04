import { TableCell, TextField, Tooltip } from '@mui/material';
import Dropdown from 'src/libraries/dropdown/Dropdown';
const validateInput = (inputValue) => {

    const regex = /^\d{1,3}$/;
    return regex.test(inputValue);
};
const SubjectExamRows = ({ ExamMarks, StudentId, changeText, GradesForSubjectMarkList, ExamStatus, changeExamStatus, changeExamGrade }) => {

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
    return (<>
        {ExamMarks?.map((Item, Index) => {
            return (<>
                <TableCell>
                    <Dropdown
                        defaultValue={Item.ExamStatus}
                        variant='outlined'
                        Array={ExamStatus}
                        handleChange={(value) => { changeExamStatus(value, StudentId, Item.Id) }}
                    />
                </TableCell>
                <TableCell>
                    <Dropdown
                        defaultValue={Item.ExamGrade}
                        variant='outlined'
                        Array={GradesForSubjectMarkList}
                        handleChange={(value) => { changeExamGrade(value, StudentId, Item.Id) }}
                    />
                </TableCell>
                <TableCell key={Index}>
                    <Tooltip title={
                        (Number(Item.Text1) > Number(Item.Text2)) ?
                            ("Marks Scored should be less than " + Item.Text2)
                            : null}>
                        <TextField size={"small"}
                            sx={{
                                width: '50px',
                                border: (Number(Item.Text1) > Number(Item.Text2)) ? 1 : 0,
                                borderColor: (Number(Item.Text1) > Number(Item.Text2)) ? 'error.main' : 0
                            }}
                            value={Item.Text1} disabled={!Item.IsActive}
                            onChange={(e) => handleChange(e, validateInput, (value) => changeText(value, StudentId, Item.Id))}
                        />
                    </Tooltip>
                    {getGrade(Item.Text1, Item.Text2)}
                </TableCell ></>)
        })
        }
    </>)
}


export default SubjectExamRows