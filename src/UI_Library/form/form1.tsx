// eslint-disable @typescript-eslint/no-unused-expressions /
import { Container, TextField, Box, Button, useTheme, FormControl, Tooltip, ClickAwayListener, Fab, OutlinedInput, styled, Autocomplete, FormHelperText } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { ISendMessage } from "../../Interface/MessageCenter/MessageCenter";
import MessageCenterApi from 'src/Api/MessageCenter/MessageCenter';
import { toast } from 'react-toastify';
import { makeStyles } from "@mui/styles";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles({
    option: {
        marginBottom: -11,
        marginTop: -11,
        backgroundColor: "white"
        // "rgba(229, 232, 255,1)"
    }
});
 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Form1() {
    const classes = Styles();
    const classes1 = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const [name,setName] = useState([])
    const [id,setId] = useState([])
    const [file, setFile] = useState<any>(" ")
    const [fileerror, setFilerror] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [formData, setFormData] = useState<any>({ subject: "", body: "" })
    const [formErrors, setFormErrors] = useState<any>({})
    const Note: string = "Supports only .BMP, .DOC, .DOCX, .JPG, .JPEG, .PDF, .PNG, .PPS, .PPSX, .PPT, .PPTX, .XLS, .XLSX files types with total size upto 20 MB."

    const TeacherList: any = useSelector((state: RootState) => state.MessageCenter.TeacherList)
    const AdminStaffList: any = useSelector((state: RootState) => state.MessageCenter.AdminStaffList)
    const [coOrdinator, setCoOrdinator] = useState<any>([{ Name: "Software Co-ordinator", Id: "1" }])

    const allData = TeacherList.concat(AdminStaffList).concat(coOrdinator)

    const [value, setValue] = React.useState<any>([]);

    // alert(JSON.stringify(value))

   const getName = () => {
    value.map((item)=>{
       name.push(item.Name)
       id.push(item.Id)
    })
   }

    const getinbox = () => {
        navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox');
    }

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };


    const handleFormhange = (e) => {
        const newData = { ...formData }
        newData[e.target.id] = e.target.value
        setFormData(newData)
        setFormErrors(validate(formData))
    }

    // Submit form data 

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formData))

        if (isSubmit == true) {
            sendMessage();
            alert("inner alert")
        }
    }


    const sendMessage = () => {

        const body: ISendMessage = {
            "asSchoolId": "120",
            "aoMessage": {
                "Body": formData.body,
                "Subject": formData.subject,
                "SenderName": "",
                "DisplayText": value.toString(),
                "SenderUserId": "339",
                "SenderUserRoleId": "3",
                "AcademicYearId": "8",
                "SchoolId": "120",
                "InsertedById": "339",
                "Attachment": file.name,

            },
            "asSelectedUserIds": "653",
            "asSelectedStDivId": "",
            "asMessageId": 0,
            "asSchoolName": "Bright Future School<br/>",
            "asIsSoftwareCordinator": 0,
            "asFileName":"CVS",
            "stream":"ABC Enter stream Here ",
            "sIsReply": "N",
            "asIsForward": "N",

        };

        MessageCenterApi.GetSendMessage(body)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200) {
                    toast.success("Message send successfully")
                }
            })
            .catch((err) => {
                alert(JSON.stringify(err));
            })
    };

    //Form Validation
   
    const validate = (formData: any) => {

        const errors: any = {};
        if (!formData.subject) {
            errors.subject = "Subject should not be blank";
        }
        if (!formData.body) {
            errors.body = "Message body should not be blank";
        }
        if (value === undefined || value.length === 0) {
            errors.value = "Atleast one recipient should be selected";
        } else if (value.length != null) {
            errors.value = "";
        }
        return errors
    }


    const fileChangedHandler = (event) => {
        event.preventDefault()
        let file = event.target.files[0];

        setFile(file)
        let reader = new FileReader();

        reader.onload = function (e) {
            alert(e.target.result);
        };

        const fileExtension = file?.name?.split(".").at(-1)
        const allowedFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "PNG", "PPS", "PPSX", "PPT", "PPTX", "XLS", "XLSX"];

        if (fileExtension === undefined || null) {
            toast.error("please choose valid  file");
        } else if (!allowedFileTypes.includes(fileExtension)) {
            setFilerror(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
        } else if (allowedFileTypes.includes(fileExtension)) {
            setFilerror(null)
        }

        if (file?.size > 20e6) {
            setFilerror("Please upload a file smaller than 20 MB");
            return false;
        }

        // if (!allowedFileTypes.includes(fileExtension) && file.size > 20e6) {
        //     alert(`Please upload a file smaller than 20 MB and Files type must be ${allowedFileTypes.join(", ")}`);
        //     return false;
        // }

    };


    return (
        <>
            <Container>
                <Box onClick={getinbox}>
                    <Fab className={classes.backArrow}
                        sx={{
                            background: `${theme.colors.gradients.pink1}`,
                            position: 'absolute',
                            zIndex: 2
                        }}><ReplyIcon /></Fab>
                </Box>
                <form style={{ backgroundColor: "#ffffffdb", borderRadius: "10px", paddingTop: "2px", paddingBottom: "2px", color: "white" }}>
                    <Container>
                        <FormControl fullWidth>
                            <Autocomplete
                                value={value}
                                onChange={(events,newValue ) =>
                                    setValue(newValue)
                                  }
                                classes={{
                                    option: classes1.option
                                }}
                                multiple
                                id="tags-filled"
                                options={allData}
                                disableCloseOnSelect
                                getOptionLabel={(option: any) => option.Name}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            onClick={getName}
                                            onChange={handleFormhange}
                                        />
                                        {option.Name}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label={('To')}
                                        className={classes.InputField}
                                    />
                                )}
                            />
                        </FormControl>

                        <p className={classes.error}>{formErrors.value}</p>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label={('Subject')}
                            className={classes.InputField}
                            id='subject'
                            value={formData.subject}
                            onChange={handleFormhange}
                        />
                        <p className={classes.error}>{formErrors.subject}</p>
                        <TextField
                            fullWidth
                            id="fullWidth"
                            type="file"
                            className={classes.InputField}
                            onChange={fileChangedHandler}
                            InputProps={{
                                endAdornment: (
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                        <ClickAwayListener onClickAway={handleClickAway}>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleClick}
                                                open={open}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Note}
                                                arrow
                                                placement="left"
                                                componentsProps={{
                                                    tooltip: {
                                                        sx: {
                                                            marginLeft: '70px',
                                                            mt: 0.5,
                                                            transform: "translate3d(17px, 0.5px, 0px) !important",
                                                        }
                                                    }
                                                }}
                                            >
                                                <InfoTwoToneIcon type="button" onClick={handleClick} sx={{ color: "navy", mt: 2, fontSize: '17px', float: "right" }} />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Box>
                                )
                            }}
                        />
                        {fileerror && <p style={{ marginBottom: -25 }} className={classes.error}>{fileerror}</p>}
                        <br />
                        <TextField
                            label={('Content')}
                            multiline
                            required
                            variant="outlined"
                            id="body"
                            value={formData.body}
                            onChange={handleFormhange}
                            fullWidth
                            // sx={{ p: 1.5 }}
                            rows={4}
                            className={classes.InputField}
                        />
                        <p className={classes.error}>{formErrors.body}</p>

                        <Button
                            variant="contained"
                            sx={{
                                background: "rgb(11 101 214)",
                                color: "white",
                                mt: 1,
                                width: 70,
                                mb: 2
                            }}
                            onClick={handleFormSubmit}
                        // onClick={handleSubmit(onSubmit)}
                        >Send</Button>
                    </Container>
                </form>
            </Container>
        </>
    )
}

export default Form1