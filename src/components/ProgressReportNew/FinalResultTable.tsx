import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const FinalResultTable = ({  ViewProgress, totalconsidration, SubjectDetailsView, IsTotalConsiderForProgressReport, showOnlyGrades, ToppersCount, hasTopRanks, PercentageDetails, TotalPerGradeView, GradesDetailsView, MarkDetailsView }) => {
    return (
        <div >

            

            <Box sx={{ mt: 2, background: 'white', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                <Box>
                    <hr />
                    {ViewProgress.length > 0 && (
                        <>
                            <Typography variant="h4" textAlign={'center'} color={'primary'} mb={1}>
                                {ViewProgress[0].Text7}
                            </Typography>
                            <hr />
                            <Typography variant="h3" textAlign={'center'} color={'black'} mb={1}>
                                {ViewProgress[0].Text6}
                            </Typography>
                            <hr />
                            <Typography variant="h4" textAlign={'center'} color={'black'} pb={1}>
                                Final Result
                            </Typography>
                        </>
                    )}

                    <Table>
                        <TableBody>
                            {ViewProgress.map((item, i) => {
                                return (
                                    <TableRow sx={{ bgcolor: '#38548A' }} key={i}>
                                        <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Roll No: <b>{item.Text2}</b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Name: <b>{item.Text1}</b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Class: <b>{item.Text3} - {item.Text4}</b></TableCell>
                                        <TableCell sx={{ textAlign: 'center', color: 'white', py: 1.5, }}>Year: <b>{item.Text5}</b></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Table>
                        <TableBody>
                            {totalconsidration.length > 0 && (
                                <>
                                    <TableRow sx={{ bgcolor: 'white', p: 2 }}>
                                        <TableCell sx={{ pl: 10, py: 1, }}><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks. </TableCell>
                                    </TableRow>
                                </>
                            )}

                        </TableBody>
                    </Table>
                    <Box sx={{ overflowX: 'auto', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                        <Table sx={{}}>
                            <TableBody >
                                <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                                    <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                                        <Typography variant={"h4"} textAlign={'center'} color={"black"} ml={2}>
                                            Subjects
                                        </Typography>
                                    </TableCell>
                                    {SubjectDetailsView.map((subject, i) => (

                                        <TableCell key={subject.Subject_Id} sx={{ py: 1, textAlign: 'center', border: (theme) => `1px solid ${theme.palette.grey[400]}` }}><b>{subject.Name}  </b>
                                            {(subject.Total_Consideration === "N") && <span style={{ color: 'red' }}>*</span>}
                                        </TableCell>
                                    ))}
                                    {IsTotalConsiderForProgressReport === "True" && !showOnlyGrades && (
                                        <>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Total</TableCell>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>%</TableCell>
                                        </>
                                    )}
                                    {IsTotalConsiderForProgressReport === "True" && (
                                        <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                                    )}
                                    {ToppersCount === 3 && hasTopRanks && (
                                        <TableCell
                                            sx={{
                                                py: 1,
                                                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Rank
                                        </TableCell>
                                    )}
                                    {ViewProgress.some((item) => item.IsFailCriteriaNotApplicable === "N") && (
                                        <TableCell
                                            sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, fontWeight: 'bold', textAlign: 'center' }}
                                        >
                                            Result
                                        </TableCell>
                                    )}
                                </TableRow>

                                <TableRow>
                                    <>
                                        {/* <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                                            <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                                Marks
                                            </Typography>
                                        </TableCell> */}
                                        <>
                                            {MarkDetailsView.map((marks, i) => (
                                                <TableCell
                                                    key={i}
                                                    sx={{
                                                        py: 1,
                                                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {marks?.Name ? (marks.IsAbsent === '1' ? '-' : marks.Name) : '-'}
                                                </TableCell>
                                            ))}

                                            {showOnlyGrades && (
                                                <TableCell
                                                    sx={{
                                                        py: 1,
                                                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    -
                                                </TableCell>
                                            )}
                                        </>

                                        {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && TotalPerGradeView.map((totalData, index) => {
                                            if (index === 0) {
                                                const matchingRemark = PercentageDetails?.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                return (
                                                    <>
                                                        <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}>{totalData.TotalMarks}</TableCell>
                                                        <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}>{totalData.Percentage}%</TableCell>
                                                        <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }} >
                                                            <Typography variant="body2">
                                                                <Typography component="span" fontWeight="bold">
                                                                    {totalData.GradeName}
                                                                </Typography>
                                                                {matchingRemark && ` (${matchingRemark})`}
                                                            </Typography>
                                                        </TableCell>

                                                    </>
                                                );
                                            }
                                            return null;
                                        })}
                                        {ViewProgress.some((item) => item.IsFailCriteriaNotApplicable === "N") && TotalPerGradeView.map((resultData, index) => {
                                            if (index === 0) {
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}
                                                    >
                                                        {resultData.Result || '-'}
                                                    </TableCell>
                                                );
                                            }
                                            return null;
                                        })}
                                    </>

                                </TableRow>
                                {/* <TableRow>
                                {MarkDetailsView.map((subject, i) => (
                                    <TableCell key={i} align="center">  {subject.IsAbsent === '1' ? '-' : subject.Name}</TableCell>
                                ))}
                            </TableRow> */}
                                <TableRow>
                                    {/* {GradesDetailsView.map((Grade, i) => (
                                    <TableCell key={i} align="center"> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                ))} */}
                                    {GradesDetailsView.map((Grade, i) => (
                                        <TableCell key={i} sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }}> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                    ))}
                                    {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                        <>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                            <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                                        </>
                                    )}
                                    {showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                                        <>
                                            {TotalPerGradeView.map((totalData, index) => {
                                                if (index === 0) {
                                                    const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                                    return (
                                                        <TableCell sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center' }} >
                                                            <Typography variant="body2">
                                                                <Typography component="span" fontWeight="bold">
                                                                    {totalData.GradeName}
                                                                </Typography>
                                                                {matchingRemark && ` (${matchingRemark})`}
                                                            </Typography>
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })}

                                            {ViewProgress.some((item) => item.IsFailCriteriaNotApplicable === "N") && TotalPerGradeView.map((resultData, index) => {
                                                if (index === 0) {
                                                    return (
                                                        <TableCell
                                                            key={index}
                                                            sx={{ py: 1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', fontWeight: 'bold' }}
                                                        >
                                                            {resultData.Result || '-'}
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </>
                                    )}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>

        </div>
    )
}

export default FinalResultTable