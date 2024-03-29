import { Box, TableCell, TextField } from "@mui/material";

const SubjectExamHeader = ({ ExamMarksHeader }) => {
    console.log(ExamMarksHeader, "ExamMarksHeader");

    return (
        <>
            {ExamMarksHeader.map((Item, Index) => {
                return (<TableCell sx={{ color: 'white', fontWeight: "bold", py: 1 }} key={Index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {Item.Text1}
                        <TextField sx={{ width: '50px', background: 'white' }} size={"small"}
                            value={Item.Text2} />
                    </Box>
                </TableCell>)
            })}
        </>
    )
}

export default SubjectExamHeader