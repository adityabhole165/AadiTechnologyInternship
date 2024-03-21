import ContentCopy from '@mui/icons-material/ContentCopy';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, alpha, styled } from '@mui/material';

const LessonPlanList = ({ exampleLessonDetails, onTextChange }) => {
    const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        border: '1px solid rgba(224, 224, 224, 1)',
    }))

    const StyledCell = styled(TableCell)(({ theme }) => ({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        border: '1px solid rgba(224, 224, 224, 1)',
    }))
    const onChangeValue = (Id, Value) => {
        let returnVal = null;
        let returnV = exampleLessonDetails.map((Item, itemIndex) => {
            returnVal = Item
            Item.planDetails.map((obj, i) => {
                if (obj.Id == Id) {
                    returnVal.planDetails[i] = { ...returnVal.planDetails[i], value: Value }
                }
            })
            return returnVal
        })
        // exampleLessonDetails = returnV
        console.log(exampleLessonDetails)
        onTextChange(returnV)
    }

    return (
        <>
            {exampleLessonDetails.map((lesson, index) => (
                <Accordion
                    // defaultExpanded
                    key={index}
                    sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={"h4"}>
                            {index + 1}) {lesson.lessonName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <HeaderStyledCell width={10}></HeaderStyledCell>
                                    <HeaderStyledCell>
                                        {lesson.lessonName}
                                    </HeaderStyledCell>
                                </TableRow>
                                <TableRow>
                                    <StyledCell width={10} sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>Sr.No.</StyledCell>
                                    <StyledCell sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>
                                        Parameter
                                    </StyledCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lesson.planDetails.map((plan, index) => (
                                    <TableRow key={index}>
                                        <StyledCell sx={{ p: 1, verticalAlign: 'top' }}>
                                            {index + 1}
                                        </StyledCell>
                                        <StyledCell sx={{ p: 1 }}>
                                            <TextField
                                                label={plan.label}
                                                value={plan.value}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                onChange={(e) => { onChangeValue(plan.Id, e.target.value) }}
                                            />
                                            {plan.subPlanDetails && plan.subPlanDetails.length > 0 && plan.subPlanDetails.map((subPlan, subIndex) => (
                                                <Table key={subIndex}>
                                                    <TableRow >
                                                        <StyledCell width={20} sx={{ py: 1, verticalAlign: 'top' }}>
                                                            {index + 1}.{subIndex + 1}
                                                        </StyledCell>
                                                        <StyledCell sx={{ p: 1 }}>
                                                            <TextField
                                                                label={subPlan.label}
                                                                value={subPlan.value}
                                                                fullWidth
                                                                multiline
                                                                rows={4}
                                                            />
                                                        </StyledCell>
                                                    </TableRow>
                                                </Table>
                                            ))}
                                        </StyledCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"} p={2}>
                            <Button variant={"outlined"} startIcon={<ContentCopy />}>
                                Copy to other class
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

export default LessonPlanList