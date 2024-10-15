import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SquareIcon from '@mui/icons-material/Square';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import CommonPageHeader from "../CommonPageHeader";
import ExamScheduleTable from './ExamScheduleTable';

const HeaderArray1 = [
    { Name: "C.C.A. - I", field: "cca1" },
    { Name: "Formative Assessment I", field: "formativeAssessment1" },
    { Name: "C.C.A. - II", field: "cca2" },
    { Name: "Comprehensive Content Review - I", field: "contentReview1" },
    { Name: "Subject Enrichment Analysis II", field: "subjectEnrichmentAnalysis2" },
    { Name: "Progressive Analysis II", field: "progressiveAnalysis2" },
    { Name: "C.C.A. - IV", field: "cca4" },
    { Name: "Comprehensive Content Review - II", field: "contentReview2" },
    { Name: "Preliminary Examination - I", field: "preliminaryExamination1" },
    { Name: "Preliminary Examination - II", field: "preliminaryExamination2" },
    { Name: "Internal - I", field: "internal1" },
    { Name: "Internal II", field: "internal2" },
    { Name: "Weekly Test - I", field: "weeklyTest1" },
    { Name: "Weekly Test - II", field: "weeklyTest2" },
    { Name: "Subject Enrichment Analysis IV", field: "subjectEnrichmentAnalysis4" },
    { Name: "Self Assessment Test Series", field: "selfAssessmentTestSeries" },
    { Name: "Project", field: "project" },
    { Name: "Progressive Analysis - I", field: "progressiveAnalysis1" },
    { Name: "Subject Enrichment Analysis - I", field: "subjectEnrichmentAnalysis1" },
    { Name: "Preliminary Examination", field: "preliminaryExamination" },
    { Name: "Formative Assessment II", field: "formativeAssessment2" }
];

const SubHeaderArray1 = [
    { Name: "Nursery", field: "nursery" },
    { Name: "Junior KG", field: "juniorKg" },
    { Name: "Senior KG", field: "seniorKg" },
    { Name: "1", field: "grade1" },
    { Name: "2", field: "grade2" },
    { Name: "3", field: "grade3" },
    { Name: "4", field: "grade4" },
    { Name: "5", field: "grade5" },
    { Name: "6", field: "grade6" },
    { Name: "7", field: "grade7" },
    { Name: "8", field: "grade8" },
    { Name: "9", field: "grade9" },
    { Name: "10", field: "grade10" }
];

const MarkDetailsList1 = [
    { Name: "Not Configured", field: "notConfigured1" },
    { Name: "N/A", field: "na1" },
    { Name: "04 Oct 2024 - 04 Oct 2024", field: "date1" },
    { Name: "Not Configured", field: "notConfigured2" },
    { Name: "N/A", field: "na2" },
    { Name: "N/A", field: "na3" },
    { Name: "Not Configured", field: "notConfigured3" },
    { Name: "Not Configured", field: "notConfigured4" },
    { Name: "N/A", field: "na4" },
    { Name: "N/A", field: "na5" },
    { Name: "Not Configured", field: "notConfigured5" },
    { Name: "Not Configured", field: "notConfigured6" },
    { Name: "N/A", field: "na6" },
    { Name: "N/A", field: "na7" },
    { Name: "N/A", field: "na8" },
    { Name: "N/A", field: "na9" },
    { Name: "N/A", field: "na10" },
    { Name: "N/A", field: "na11" },
    { Name: "N/A", field: "na12" },
    { Name: "N/A", field: "na13" },
    { Name: "N/A", field: "na14" }
];
const ExamScheduleBasescreen = () => {
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
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
                            <SquareIcon style={{ color: '#F0F0F0', fontSize: 25, position: 'relative', top: '-2px' }} />
                            <Typography>Exam not applicable</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <SquareIcon style={{ color: green[500], fontSize: 25, position: 'relative', top: '-2px' }} />
                            <Typography>Schedule not configured	</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <SquareIcon style={{ color: green[200], fontSize: 25, position: 'relative', top: '-2px' }} />
                            <Typography>Edit exam schedule	</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box mt={2} sx={{backgroundColor:'white', p:2}}>
                <ExamScheduleTable
                    headerArray={HeaderArray1}
                    subHeaderArray={SubHeaderArray1}
                    markDetailsList={MarkDetailsList1}
                />
            </Box>
        </Box>
    )
}

export default ExamScheduleBasescreen
