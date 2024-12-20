import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import CommonPageHeader from "../CommonPageHeader"
import DataTable from "../DataTable"

type Props = {}

const ViewFinalResult = (props: Props) => {
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/RITeSchool/Teacher/FinalResult'
                    },
                    {
                        title: 'Generate/ View Final Result',
                        path: ''
                    }
                ]}
                rightActions={<>
                    <Box>
                        <Tooltip title={"View result of all/selected student."}>
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
                    </Box>
                </>}
            />
            <Box sx={{ p: 2, background: 'white' }}>
                <Box>
                    <hr />
                    <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                        Pawar Public Charitable Trust's PAWAR PUBLIC SCHOOL Progress Report
                    </Typography>
                    <hr />
                    <Typography variant={"h4"} mb={1}>Student Details</Typography>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ bgcolor: 'grey.200' }}>
                                <TableCell><b>Roll No:</b> 1</TableCell>
                                <TableCell><b>Name:</b> Miss Jagvi Nilesh Badgujar	</TableCell>
                                <TableCell><b>Class:</b> 1 - A	</TableCell>
                                <TableCell><b>Year:</b> 2023-2024	</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Typography variant={"h4"} my={1} >Subject Progress Details For <Typography color='primary'>Subject Enrichment Analysis - I</Typography>
                    </Typography>
                    <DataTable
                        columns={[
                            {
                                id: 'english',
                                label: 'English',
                                renderCell: (rowData) => rowData.english
                            },
                            {
                                id: 'mathematics',
                                label: 'Mathematics',
                                renderCell: (rowData) => rowData.mathematics
                            },
                            {
                                id: 'evs',
                                label: 'E.V.S.',
                                renderCell: (rowData) => rowData.evs
                            },
                            {
                                id: 'computerStudies',
                                label: 'Computer Studies',
                                renderCell: (rowData) => rowData.computerStudies
                            },
                            {
                                id: 'hindi3',
                                label: 'Hindi III',
                                renderCell: (rowData) => rowData.hindi3
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
                </Box>
            </Box>
        </Box>
    )
}

export default ViewFinalResult