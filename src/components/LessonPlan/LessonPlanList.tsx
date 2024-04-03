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
    const onChangeValue = (StdId, DivisionId, Id, Value) => {
        exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
            return {
                ...Item,
                planDetails: Item.planDetails.map((obj, i) => {
                    return {
                        ...obj,
                        value: (obj.Id == Id &&
                            Item.StdId == StdId && Item.DivisionId == DivisionId) ?
                            Value : Item.planDetails[i].value
                    }
                })
            }
        })
        onTextChange(exampleLessonDetails)
    }

    const onSubChangeValue = (StdId, DivisionId, Id, Value) => {
        console.log(StdId, "StdId", DivisionId, "DivisionId", Id, "Id", Value, "Value", exampleLessonDetails);

        exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
            return {
                ...Item,
                planDetails: Item.planDetails.map((obj) => {
                    return {
                        ...obj,
                        subPlanDetails: (Item.StdId == StdId && Item.DivisionId == DivisionId) ?
                            obj.subPlanDetails.map((subItem, subIndex) => {
                                return {
                                    ...subItem,
                                    value: (subItem.Id == Id) ?
                                        Value : obj.subPlanDetails[subIndex].value
                                }
                            }) :
                            obj.subPlanDetails
                    }
                })
            }
        })
        console.log(exampleLessonDetails);

        onTextChange(exampleLessonDetails)
    }

    const IsStd = (value) => {
        let returnVal = false;
        exampleLessonDetails.map((Obj) => {
            Obj.CopyToArray?.map((Item) => {
                if (Item.StdId == value.StdId && Item.SubjectId == value.SubjectId)
                    returnVal = true
            })
        })
        return returnVal
    }

    const ClickCopy = (value) => {
        let returnVal = null;
        let tempPlanDetails = []
        exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
            returnVal = Item
            if (Item.StdId == value.StdId) {
                if (Item.SubjectId == value.SubjectId && Item.DivisionId == value.DivisionId) {
                    tempPlanDetails = Item.planDetails
                }
                if (Item.DivisionId != value.DivisionId) {
                    return {
                        ...Item,
                        planDetails: Item.planDetails.map((obj, i) => {
                            return {
                                ...obj,
                                value: tempPlanDetails[i].value,
                                subPlanDetails: obj.subPlanDetails.map((subItem, subIndex) => {
                                    return {
                                        ...subItem,
                                        value: tempPlanDetails[i].subPlanDetails[subIndex].value
                                    }
                                })
                            }
                        })
                    }
                }
                else
                    return Item
            }
            else
                return Item

        })
        onTextChange(exampleLessonDetails)
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
                            {index + 1}) {lesson?.lessonName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <HeaderStyledCell width={10}></HeaderStyledCell>
                                    <HeaderStyledCell>
                                        {lesson?.lessonName}
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
                                        {/* <StyledCell sx={{ p: 1 }}> */}
                                        <TextField
                                            label={plan.label}
                                            value={plan.value}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            onChange={(e) => {
                                                onChangeValue(
                                                    lesson.StdId,
                                                    lesson.DivisionId,
                                                    plan.Id,
                                                    e.target.value
                                                )
                                            }}
                                        />
                                        {plan.subPlanDetails && plan.subPlanDetails.length > 0 &&
                                            plan.subPlanDetails.map((subPlan, subIndex) => (
                                                <Table key={subIndex}>
                                                    <TableRow >
                                                        <StyledCell width={20} sx={{ py: 1, verticalAlign: 'top' }}>
                                                            {index + 1}.{subIndex + 1}
                                                        </StyledCell>
                                                        <TextField
                                                            label={subPlan.label}
                                                            value={subPlan.value}
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            onChange={(e) => {
                                                                onSubChangeValue(
                                                                    lesson.StdId,
                                                                    lesson.DivisionId,
                                                                    subPlan.Id,
                                                                    e.target.value
                                                                )
                                                            }}
                                                        />
                                                    </TableRow>
                                                </Table>
                                            ))}
                                        {/* </StyledCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {(IsStd({ StdId: lesson.StdId, SubjectId: lesson.SubjectId })) &&
                            < Box display={"flex"} justifyContent={"flex-end"} width={"100%"} p={2}>
                                <Button variant={"outlined"} startIcon={<ContentCopy />}
                                    onClick={() => {
                                        ClickCopy({
                                            StdId: lesson.StdId,
                                            SubjectId: lesson.SubjectId,
                                            DivisionId: lesson.DivisionId
                                        })
                                    }}>
                                    Copy to other class
                                </Button>
                            </Box>
                        }
                    </AccordionDetails>
                </Accordion >
            ))}
        </>
    )
}

export default LessonPlanList