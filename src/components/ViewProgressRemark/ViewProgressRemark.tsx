import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface Student {
    id: number;
    rollNo: string;
    name: string;
    class: string;
    year: string;
    subjects: {
        subject: string;
        exam: string;
        analysis: string;
    }[];
}

const ViewProgressRemark = () => {
    const collegeTrustName = "Pawar Public Charitable Trust's";
    const collegeName = "PAWAR PUBLIC SCHOOL";
    const mockStudent: Student = {
        id: 1,
        rollNo: "001",
        name: "John Doe",
        class: "12th",
        year: "2024",
        subjects: [
            { subject: "Mathematics", exam: "A+", analysis: "Excellent" },
            { subject: "Physics", exam: "A", analysis: "Good" },
            { subject: "Chemistry", exam: "A-", analysis: "Satisfactory" },
            { subject: "English", exam: "B", analysis: "Average" },
            { subject: "Biology", exam: "B+", analysis: "Good" },
        ],
    };
    // const [progressData, setProgressData] = useState<StudentProgress[]>([]);


    return (
        <Box sx={{ marginTop: 4 }}>
            <Box sx={{ px: 2, marginTop: 10, backgroundColor: 'white', p: 2, m: 2 }}>
                <div>
                    <Box
                        sx={{
                            backgroundColor: '#2196f3', // Example background color
                            textAlign: 'center',
                            padding: '8px',
                            marginBottom: '2px',
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                            {collegeTrustName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#2196f3', // Example background color
                            textAlign: 'center',
                            padding: '8px',
                            marginBottom: '2px',
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                            {collegeName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#2196f3', // Example background color
                            textAlign: 'center',
                            padding: '8px',
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                            Progress Report
                        </Typography>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{ color: 'white' }} align="center">Roll No</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">Name</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">Class</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">{mockStudent.rollNo}</TableCell>
                                    <TableCell align="center">{mockStudent.name}</TableCell>
                                    <TableCell align="center">{mockStudent.class}</TableCell>
                                    <TableCell align="center">{mockStudent.year}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{ color: 'white' }} align="center">Subject</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">Exam</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">Subject Enrichment Analysis - I</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockStudent.subjects.map((subjectData, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{subjectData.subject}</TableCell>
                                        <TableCell align="center">{subjectData.exam}</TableCell>
                                        <TableCell align="center">{subjectData.analysis}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </Box>
    );
};

export default ViewProgressRemark;
