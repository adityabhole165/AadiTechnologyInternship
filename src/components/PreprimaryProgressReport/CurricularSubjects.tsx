import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const CurricularSubjects = ({ USFillStudentsLearningOutcomes, USFillSubjectSections }) => {
    return (
        <div>
            <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={1}>
                Pre-Primary Curricular Subjects
            </Typography>

            <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1, width: '200px' }}>Facilitator's Observation</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {USFillSubjectSections.map(subjectSection => (
                            <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
                                <TableRow>
                                    <TableCell sx={{ alignItems: 'right', pl: 70, fontWeight: 'bold' }} colSpan={4}>
                                        {subjectSection.SubjectSectionName}
                                    </TableCell>
                                </TableRow>

                                {USFillStudentsLearningOutcomes.filter(outcome => outcome.SubjectSectionConfigId == subjectSection.SubjectSectionConfigurationId)
                                    .map((outcome, index) => (
                                        <TableRow key={outcome.YearwiseStudentId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{outcome.LearningOutcome}</TableCell>
                                            <TableCell>{outcome.ShortName}</TableCell>
                                        </TableRow>
                                    ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CurricularSubjects;
