import { TableCell, TextField } from '@mui/material'

const SubjectExamRows = ({ ExamMarks, StudentId, changeText }) => {
    return (<>
        {ExamMarks?.map((Item, Index) => {
            return (<TableCell key={Index}>
                <TextField sx={{ width: '50px' }} size={"small"} value={Item.Text1}
                    onChange={(e) => { changeText(e.target.value, StudentId, Item.Id) }}
                />
                {Item.Text2}
            </TableCell>)
        })
        }
    </>)
}

export default SubjectExamRows