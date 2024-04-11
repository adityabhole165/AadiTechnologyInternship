import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';


const ViewProgressRemark = () => {
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Result',
                        path: '/extended-sidebar/Teacher/ExamResultBase'
                    },
                    {
                        title: 'View Progress Report',
                        path: ''
                    }
                ]}
                rightActions={<></>}
            />
            <Box sx={{ backgroundColor: 'white', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Accordion sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }} defaultExpanded>
                    <AccordionSummary
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                        expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant={"h4"}>
                            Progress Report - Subject Enrichment Analysis - I
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant={"h4"} mb={1}>Student Details</Typography>
                        <DataTable
                            columns={[
                                {
                                    id: 'rollNo',
                                    label: 'Roll No',
                                    render: (rowData) => rowData.rollNo
                                },
                                {
                                    id: 'name',
                                    label: 'Name',
                                    render: (rowData) => rowData.name
                                },
                                {
                                    id: 'class',
                                    label: 'Class',
                                    render: (rowData) => rowData.class
                                },
                                {
                                    id: 'year',
                                    label: 'Year',
                                    render: (rowData) => rowData.year
                                },
                            ]}
                            data={[
                                {
                                    rollNo: 1,
                                    name: 'Miss Jagvi Nilesh Badgujar',
                                    class: '1 - A',
                                    year: '2023-2024',
                                }
                            ]}
                            isPagination={false}
                        />

                        <Typography variant={"h4"} my={1}>Subject Progress Details</Typography>
                        <DataTable
                            columns={[
                                {
                                    id: 'english',
                                    label: 'English',
                                    render: (rowData) => rowData.english
                                },
                                {
                                    id: 'mathematics',
                                    label: 'Mathematics',
                                    render: (rowData) => rowData.mathematics
                                },
                                {
                                    id: 'evs',
                                    label: 'E.V.S.',
                                    render: (rowData) => rowData.evs
                                },
                                {
                                    id: 'computerStudies',
                                    label: 'Computer Studies',
                                    render: (rowData) => rowData.computerStudies
                                },
                                {
                                    id: 'hindi3',
                                    label: 'Hindi III',
                                    render: (rowData) => rowData.hindi3
                                },
                            ]}
                            data={[
                                {
                                    english: 'B2',
                                    mathematics: 'A1',
                                    evs: 'B2',
                                    computerStudies: 'A1',
                                    hindi3: 'A1',
                                },
                            ]}
                            isPagination={false}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }} defaultExpanded>
                    <AccordionSummary
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                        expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant={"h4"}>
                            Progress Report - Subject Enrichment Analysis - I
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant={"h4"} mb={1}>Student Details</Typography>
                        <DataTable
                            columns={[
                                {
                                    id: 'rollNo',
                                    label: 'Roll No',
                                    render: (rowData) => rowData.rollNo
                                },
                                {
                                    id: 'name',
                                    label: 'Name',
                                    render: (rowData) => rowData.name
                                },
                                {
                                    id: 'class',
                                    label: 'Class',
                                    render: (rowData) => rowData.class
                                },
                                {
                                    id: 'year',
                                    label: 'Year',
                                    render: (rowData) => rowData.year
                                },
                            ]}
                            data={[
                                {
                                    rollNo: 1,
                                    name: 'Miss Jagvi Nilesh Badgujar',
                                    class: '1 - A',
                                    year: '2023-2024',
                                }
                            ]}
                            isPagination={false}
                        />

                        <Typography variant={"h4"} my={1}>Subject Progress Details</Typography>
                        <DataTable
                            columns={[
                                {
                                    id: 'english',
                                    label: 'English',
                                    render: (rowData) => rowData.english
                                },
                                {
                                    id: 'mathematics',
                                    label: 'Mathematics',
                                    render: (rowData) => rowData.mathematics
                                },
                                {
                                    id: 'evs',
                                    label: 'E.V.S.',
                                    render: (rowData) => rowData.evs
                                },
                                {
                                    id: 'computerStudies',
                                    label: 'Computer Studies',
                                    render: (rowData) => rowData.computerStudies
                                },
                                {
                                    id: 'hindi3',
                                    label: 'Hindi III',
                                    render: (rowData) => rowData.hindi3
                                },
                            ]}
                            data={[
                                {
                                    english: 'B2',
                                    mathematics: 'A1',
                                    evs: 'B2',
                                    computerStudies: 'A1',
                                    hindi3: 'A1',
                                },
                            ]}
                            isPagination={false}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default ViewProgressRemark;
