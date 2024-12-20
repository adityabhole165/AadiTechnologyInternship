import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { RExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from "../CommonPageHeader";
import ExamScheduleTable from './ExamScheduleTable';
const ExamScheduleBasescreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const SubHeaderArray1 = useSelector((state: RootState) => state.StandardAndExamList.RStandard);
    const HeaderArray1 = useSelector((state: RootState) => state.StandardAndExamList.RStandardwTest);
    const Loading: any = useSelector((state: RootState) => state.StandardAndExamList.Loading);
    const ExamSchedule: any = useSelector(
        (state: RootState) =>
            state.StandardAndExamList.ExamSchedule
    );

    useEffect(() => {
        const RExamScheduleBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId)
        }

        dispatch(RExamSchedule(RExamScheduleBody))
    }, [])

    const ClickSchedule = (Value) => {
        console.log(Value, "ClickSchedule");

        if (Value.IsConfigured == true) {
            navigate('/RITeSchool/Teacher/StandardwiseExamSchedule/' + Value.StandardId + '/' + Value.TestId + '/' + Value.SchoolwiseStandardExamScheduleId + '/' + Value.StandardTestId + '/' + 'true', { state: { examScheduleId: Value.SchoolwiseStandardExamScheduleId } });
        } else {
            navigate('/RITeSchool/Teacher/StandardwiseExamSchedule/' + Value.StandardId + '/' + Value.TestId + '/' + Value.SchoolwiseStandardTestId + '/' + 'false', { state: { examScheduleId: Value.SchoolwiseStandardExamScheduleId } });
        }
    };

    return (
        <Box sx={{ px: 2 }}>
            {(Loading) && <SuspenseLoader />}
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/RITeSchool/Teacher/ExamScheduleBasescreen',
                    },
                ]}
                rightActions={
                    <>
                        <Tooltip title={'View exam dates for each exam associated for standards.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'View exam schedule'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}
                                onClick={() => {
                                    // pass data via state > mobileNumbers
                                    navigate('/RITeSchool/teacher/ViewExamSchedule')
                                }}
                            >
                                <CalendarViewMonthIcon />
                            </IconButton>
                        </Tooltip>

                    </>
                }
            />
            <Box sx={{ background: 'white', p: 1 }}>
                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {/* <SquareIcon style={{ color: '#F0F0F0', fontSize: 25, position: 'relative', top: '-2px' }} /> */}
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    sx={{
                                        width: 23,
                                        height: 23,
                                        backgroundColor: '#F0F0F0',
                                        border: "1px solid black",

                                    }}
                                />
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: '#000',
                                        fontWeight: 300,
                                        fontSize: '8px',// Adjust the color to suit your design
                                    }}
                                >
                                    N/A
                                </Typography>
                            </Box>
                            <Typography>Exam not applicable</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {/* <SquareIcon style={{ color: green[500], fontSize: 25, position: 'relative', top: '-2px' }} /> */}
                            <Box
                                sx={{
                                    width: 23,
                                    height: 23,
                                    backgroundColor: green[500],
                                    border: "1px solid black",

                                }}
                            />
                            <Typography>Schedule not configured	</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 23,
                                    height: 23,
                                    backgroundColor: green[200],
                                    border: "1px solid black",

                                }}
                            />
                            <Typography>Edit exam schedule	</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={1} sx={{ backgroundColor: 'white', p: 2 }}>
                <ExamScheduleTable
                    headerArray={HeaderArray1}
                    subHeaderArray={SubHeaderArray1}
                    markDetailsList={ExamSchedule}
                    ClickSchedule={ClickSchedule}
                />
            </Box>
        </Box>
    )
}

export default ExamScheduleBasescreen
