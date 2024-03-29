import { TableCell, TextField } from '@mui/material'

const SubjectExamRows = ({ ExamMarks }) => {
    return (<>
        {ExamMarks?.map((Item, Index) => {
            return (<TableCell key={Index}>
                <TextField sx={{ width: '50px' }} size={"small"}
                    value={Item.Text1}
                />
                {Item.Text2}
            </TableCell>)
        })
        }
    </>)
}

export default SubjectExamRows