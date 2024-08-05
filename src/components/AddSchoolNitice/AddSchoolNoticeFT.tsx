import Close from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Tooltip } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';

const AddSchoolNoticeFT = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [fileName1, setFileName1] = useState('');
    const [FileError, setFileError] = useState('');
    const [FileName2, setFileName2] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [base64URL2, setbase64URL2] = useState('');
    const [ItemList, setItemList] = useState([]);
    const [text, setText] = useState<string>('');
    const [formData, SetformData] = useState<any>('');
    const [isRoleError, setIsRoleError] = useState(false);
    const [isClassError, setIsClassError] = useState(false);
    const location = useLocation();
    const { state } = location;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const dispatch = useDispatch();
    const [applicableTo, setApplicableTo] = useState({
        admin: false,
        teacher: false,
        student: false,
        adminStaff: false,
        otherStaff: false,
    });
    const RadioListCT = [
        { Value: '1', Name: 'File' },
        { Value: '2', Name: 'Text' }
    ];
    const ValidFileTypes1 = ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
    const MaxfileSize1 = 10000000;
    const ValidFileTypes2 = ['JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize2 = 10000000;

    const ClickRadio = (value) => {
        setRadioBtn(value);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const handleCancel = () => {
        // Handle cancel action
    };

    const handleSave = () => {
        // Handle save action
    };

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'School Notice',
                            path: '/extended-sidebar/Teacher/SchoolNoticeBasescreen'
                        },
                        {
                            title: `${radioBtn === '1' ? 'File' : 'Text'}`,
                            path: '/extended-sidebar/Teacher/AddSchoolNotce1'
                        }
                    ]}
                    rightActions={
                        <>
                            <Box>
                                <Tooltip
                                    title={`Displays all uploaded school notices.`}
                                >
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: grey[600] }
                                        }}
                                    >
                                        <QuestionMarkIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={`Cancel`}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: red[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: red[600] }
                                        }}
                                        onClick={handleCancel}
                                    >
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={`Save`}>
                                    <IconButton
                                        type='submit'
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}
                                        onClick={handleSave}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />
            </Box>
        </>
    );
};

export default AddSchoolNoticeFT;
