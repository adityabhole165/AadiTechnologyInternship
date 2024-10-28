// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import React from 'react';

// const CurricularSubjects = ({ USFillStudentsLearningOutcomes, USFillSubjectSections }) => {
//     return (
//         <div>
//             <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
//                 Pre-Primary Curricular Subjects
//             </Typography>

//             <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }} >
//                 <Table aria-label="simple table">
//                     <TableHead>
//                         <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
//                             <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
//                             <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>
//                             <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell>
//                             {/* <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1, width: '200px' }}>Facilitator's Observation</TableCell> */}
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {USFillSubjectSections.map(subjectSection => (
//                             <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
//                                 <TableRow sx={{backgroundColor:'#F0F0F0', alignItems:'center'}}>
//                                     <TableCell sx={{ py: 1.5, fontWeight: 'bold' }} colSpan={4}>
//                                         {subjectSection.SubjectSectionName}
//                                     </TableCell>
//                                 </TableRow>

//                                 {USFillStudentsLearningOutcomes.filter(outcome => outcome.SubjectSectionConfigId == subjectSection.SubjectSectionConfigurationId)
//                                     .map((outcome, index) => (
//                                         <TableRow key={outcome.YearwiseStudentId}>
//                                             <TableCell sx={{py: 1}}>{index + 1}</TableCell>
//                                             <TableCell sx={{py: 1}}>{outcome.LearningOutcome}</TableCell>
//                                             <TableCell sx={{py: 1, borderRight: '1px solid lightgrey' }}>{outcome.ShortName}</TableCell>
//                                         </TableRow>
//                                     ))}
//                             </React.Fragment>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }

// export default CurricularSubjects;





import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { SchoolScreensAccessPermission } from '../Common/Util';

const CurricularSubjects = ({ USFillStudentsLearningOutcomes, USFillSubjectSections, FillStudentsLearningOutcomeObservations }) => {


    return (
        <div>
            <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
                Pre-Primary Curricular Subjects
            </Typography>

            <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>

                            <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell>

                            {SchoolScreensAccessPermission() && (
                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1, width: '200px' }}>
                                    Facilitator's Observation
                                </TableCell>
                            )}


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {USFillSubjectSections.map(subjectSection => (
                            <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
                                <TableRow sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                                    <TableCell sx={{ py: 1.5, fontWeight: 'bold' }} colSpan={4}>
                                        {subjectSection.SubjectSectionName}
                                    </TableCell>
                                </TableRow>

                                {USFillStudentsLearningOutcomes
                                    .filter(outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId)
                                    .map((outcome, index) => {
                                        // Find the matching observation
                                        const matchingObservation = FillStudentsLearningOutcomeObservations.find(
                                            obs => obs.SubjectSectionConfigId === outcome.SubjectSectionConfigId
                                        );


                                        return (
                                            <TableRow key={outcome.YearwiseStudentId}>
                                                <TableCell sx={{ py: 1 }}>{index + 1}</TableCell>
                                                <TableCell sx={{ py: 1 }}>{outcome.LearningOutcome}</TableCell>
                                                <TableCell sx={{ py: 1, borderRight: '1px solid lightgrey' }}>{outcome.ShortName}</TableCell>

                                                {SchoolScreensAccessPermission() && (
                                                    <Tooltip title={matchingObservation?.Observation ? matchingObservation?.Observation :''}>
                                                        <TableCell
                                                            sx={{
                                                                py: 1,
                                                                borderRight: '1px solid lightgrey',
                                                                wordWrap: 'break-word',
                                                                whiteSpace: 'normal',
                                                                wordBreak: 'break-word',
                                                                width: '250px',
                                                                minWidth: '250px',
                                                            }}
                                                        >
                                                            {matchingObservation?.Observation?.substring(0, 150) ? matchingObservation?.Observation?.substring(0, 150) : ''}
                                                        </TableCell>
                                                    </Tooltip>
                                                )}

                                            </TableRow>

                                        );
                                    })}

                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CurricularSubjects;
