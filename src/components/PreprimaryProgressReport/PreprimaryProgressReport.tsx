
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetStudentDetailsDropdownBody, IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAAllPrimaryClassTeachers, CDAStudentDetailsDropdown } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const PreprimaryProgressReport = () => {
    const dispatch = useDispatch();
    const [ClassTeacher, setClassTeacher]: any = useState();
    const [StudentId, setStudentId]: any = useState();
    const [AssessmentId, setAssessmentId]: any = useState();
    const PreprimaryFullAccess = GetScreenPermission('Pre-Primary Progress Report');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asStandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const USAllPrimaryClassTeacherssBody: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAllPrimaryClassTeacherss);
    const PrePrimaryClassTeacher = USAllPrimaryClassTeacherssBody.filter((teacher: any) => teacher.Is_PrePrimary === 'Y');

    const USlistStudentNameDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISlistStudentNameDetails);
    const USlistAssessmentDetailss: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISlistAssessmentDetailss);


    const HeaderPublish = [
        { Id: 1, Header: 'Item Code' },
        { Id: 2, Header: 'Item Name' },
        { Id: 3, Header: 'Current Stock' },
        { Id: 4, Header: 'Item Quantity' },
        { Id: 5, Header: 'Original Qty' },
        { Id: 6, Header: 'Issued Qty' },
        { Id: 7, Header: 'Returned Qty' },
        { Id: 8, Header: 'Cancelled Qty' }
    ];


    const AllPrimaryClassTeachersBody: IGetAllPrimaryClassTeacherssBody =
    {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId,
        asTeacher_id: 0,

    };
    const StudentDetailsDropdownBody: GetStudentDetailsDropdownBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: PreprimaryFullAccess == 'Y' ? ClassTeacher : asStandardDivisionId,

    };




    const clickClassTeacher = (value) => {
        setClassTeacher(value);

    };
    const clickStudentId = (value) => {
        setStudentId(value);

    };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);

    };

    const ClickShow = (value) => {
        
    }

    const clickPrint = () => {
      window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
    };

    useEffect(() => {
        dispatch(CDAAllPrimaryClassTeachers(AllPrimaryClassTeachersBody));
    }, []);
    useEffect(() => {
        dispatch(CDAStudentDetailsDropdown(StudentDetailsDropdownBody));
    }, []);

    useEffect(() => {
        if (PrePrimaryClassTeacher.length > 0) {
            setClassTeacher(PrePrimaryClassTeacher[0].Value);
        }
    }, [PrePrimaryClassTeacher]);

    useEffect(() => {
        if (USlistStudentNameDetails.length > 0) {
            setStudentId(USlistStudentNameDetails[0].Value);
        }
    }, [USlistStudentNameDetails]);
    useEffect(() => {
        if (USlistAssessmentDetailss.length > 0) {
            setAssessmentId(USlistAssessmentDetailss[0].Value);
        }
    }, [USlistAssessmentDetailss]);
    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Pre Primary Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },

                ]}

                rightActions={
                    <>
                        <SearchableDropdown
                            ItemList={PrePrimaryClassTeacher}
                            sx={{ minWidth: '250px' }}
                            onChange={clickClassTeacher}
                            defaultValue={ClassTeacher}
                            label={'Class Teacher '}
                            size={"small"}
                            mandatory
                        />

                        <SearchableDropdown
                            ItemList={USlistStudentNameDetails}
                            sx={{ minWidth: '250px' }}
                            onChange={clickStudentId}
                            defaultValue={StudentId}
                            label={'Student '}
                            size={"small"}
                        />

                        <SearchableDropdown
                            ItemList={USlistAssessmentDetailss}
                            sx={{ minWidth: '250px' }}
                            onChange={clickAssessmentId}
                            defaultValue={AssessmentId}
                            label={'Assessment '}
                            size={"small"}
                            mandatory
                        />


                        <Box>
                            <Tooltip title={'Show'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={ClickShow}>
                                    <VisibilityTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Print Preview'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={clickPrint}>
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Tooltip title={'Here you can create, modify, view, approve, denied requisition.'}>
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

                    </>}
            />

        </Box>

    );
};

export default PreprimaryProgressReport;
