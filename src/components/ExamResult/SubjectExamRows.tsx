import { TableCell, TextField } from '@mui/material';
const validateInput = (inputValue) => {

    const regex = /^\d{1,3}$/;
    return regex.test(inputValue);
};
const SubjectExamRows = ({ ExamMarks, StudentId, changeText }) => {
    const handleChange = (e, itemId) => {
        const { value } = e.target;
        if (validateInput(value)) {
            changeText(value, StudentId, itemId);
        }
    };

    return (<>
        {ExamMarks?.map((Item, Index) => {
            return (<TableCell key={Index}>
                <TextField sx={{ width: '50px' }} size={"small"} value={Item.Text1}
                    onChange={(e) => handleChange(e, Item.Id)}
                // onChange={(e) => { changeText(e.target.value, StudentId, Item.Id) }}
                />
                {Item.Text2}
            </TableCell>)
        })
        }
    </>)
}


export default SubjectExamRows