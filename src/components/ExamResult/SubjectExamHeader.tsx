import { Box, TableCell, TextField } from "@mui/material";
import Dropdown from "src/libraries/dropdown/Dropdown";
const validateInput = (inputValue) => {
    const regex = /^\d{1,3}$/;
    return regex.test(inputValue);
};

// const handleChange = (e, validationFunction, callback) => {
//     const { value } = e.target;
//     if (validationFunction(value)) {
//         callback(value);
//     }
// };
const handleChange = (e, validationFunction, callback) => {
    const { value } = e.target;
    if (value == "")
        callback(value);
    else
        if (validationFunction(value)) {
            callback(value);
        }
};

const SubjectExamHeader = ({ ExamMarksHeader, ChangeExamHeader, IsMark, BlurrExamHeader,
    GradesForSubjectMarkList, ChangeGrade, IsReadOnly }) => {
    const handleBlur = (value, Index) => {
        if (value == "" || value != "") {
            if (confirm('This action will set a new value for all students. Do you want to continue?')) {
                console.log('Confirmed. Setting new value...');
                BlurrExamHeader(value, Index);
            } else {
                console.log('Cancelled. Value remains unchanged.');
            }
        }
    };
    return (
        <>
            {ExamMarksHeader?.map((Item, Index) => {
                return (<TableCell
                    sx={{ color: 'white', fontWeight: "bold", py: 0 }}
                    key={Index}>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> */}

                    {/* <TableCell sx={{ color: 'white', fontWeight: "bold", py: 1 }}>
                        {Item.Text4}</TableCell> */}
                    <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                        {Item.Text4}
                    </TableCell>

                    <TableCell sx={{ color: 'white', fontWeight: "bold", py: 1 }}>
                        {IsMark ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {Item.Text1}


                                <TextField sx={{
                                    width: '50px',
                                    background: (IsReadOnly) ?
                                        "#f5f5f5" : "white"
                                }} size={"small"}
                                    value={Item.Text2}
                                    onBlur={() => handleBlur(Item.Text2, Index)}
                                    onChange={(e) => handleChange(e, validateInput, (value) =>
                                        ChangeExamHeader(value, Item.Id))}
                                    disabled={IsReadOnly}
                                />
                                {/* <TextField sx={{ width: '70px', background: 'white' }} size={"small"}
                            value={Item.Text3} /> */}
                            </Box>
                        ) : (
                            <Dropdown
                                defaultValue={Item.Text3}
                                variant='outlined'
                                Array={GradesForSubjectMarkList}
                                handleChange={(value) => { ChangeGrade(value, Item.Id, Index) }}
                                disabled={IsReadOnly}
                            />
                        )}
                    </TableCell>
                    {/* </Box>
                   */}
                </TableCell>)
            })}
        </>
    )
}

export default SubjectExamHeader