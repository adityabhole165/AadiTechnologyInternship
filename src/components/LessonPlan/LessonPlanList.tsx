import ContentCopy from '@mui/icons-material/ContentCopy';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, alpha, styled } from '@mui/material';
import { useContext } from 'react';
import { AlertContext } from 'src/contexts/AlertContext';
const LessonPlanList = ({ exampleLessonDetails, onTextChange, Action, IsEditingAllowed }) => {
    const { showAlert, closeAlert } = useContext(AlertContext);
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
    const onChangeValue = (StdId, DivisionId, SubjectId, Id, Value) => {
        exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
            return {
                ...Item,
                planDetails: Item.planDetails.map((obj, i) => {
                    return {
                        ...obj,
                        value: (obj.Id == Id &&
                            Item.StdId == StdId &&
                            Item.DivisionId == DivisionId &&
                            Item.SubjectId == SubjectId
                        ) ?
                            Value : Item.planDetails[i].value
                    }
                })
            }
        })
        onTextChange(exampleLessonDetails)
    }

    const onSubChangeValue = (StdId, DivisionId, Id, Value) => {
        //console.log(StdId, "StdId", DivisionId, "DivisionId", Id, "Id", Value, "Value", exampleLessonDetails);

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
        //console.log(exampleLessonDetails);

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

    // const ClickCopy = (value) => {
    //     if (confirm('This action will copy details of this subject section and paste / overwrite it on subject section of other classes of same standard present on this screen. Do you want to continue?')) {
    //         let returnVal = null;
    //         let tempPlanDetails = []
    //         let arr = exampleLessonDetails.filter((Item, i) => {
    //             return Item.StdId == value.StdId &&
    //                 Item.SubjectId == value.SubjectId &&
    //                 Item.DivisionId == value.DivisionId
    //         })

    //         if (arr.length > 0) {
    //             tempPlanDetails = arr[0].planDetails

    //             exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
    //                 returnVal = Item
    //                 if (Item.StdId == value.StdId &&
    //                     Item.SubjectId == value.SubjectId &&
    //                     Item.DivisionId !== value.DivisionId) {
    //                     return {
    //                         ...Item,
    //                         planDetails: Item.planDetails.map((obj, i) => {
    //                             return {
    //                                 ...obj,
    //                                 value: tempPlanDetails[i].value,
    //                                 subPlanDetails: obj.subPlanDetails.map((subItem, subIndex) => {
    //                                     return {
    //                                         ...subItem,
    //                                         value: tempPlanDetails[i].subPlanDetails[subIndex].value
    //                                     }
    //                                 })
    //                             }
    //                         })
    //                     }
    //                 }
    //                 else
    //                     return Item
    //             })
    //         }
    //         onTextChange(exampleLessonDetails)
    //     }
    // }
    const ClickCopy = (value) => {
        showAlert({
            title: 'Please Confirm',
            message: 'This action will set a new value for all students. Do you want to continue?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                let returnVal = null;
                let tempPlanDetails = []
                let arr = exampleLessonDetails.filter((Item, i) => {
                    return Item.StdId == value.StdId &&
                        Item.SubjectId == value.SubjectId &&
                        Item.DivisionId == value.DivisionId
                })

                if (arr.length > 0) {
                    tempPlanDetails = arr[0].planDetails

                    exampleLessonDetails = exampleLessonDetails.map((Item, itemIndex) => {
                        returnVal = Item
                        if (Item.StdId == value.StdId &&
                            Item.SubjectId == value.SubjectId &&
                            Item.DivisionId !== value.DivisionId) {
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
                    })
                }
                onTextChange(exampleLessonDetails)

                closeAlert();
            }
        });
    };

    return (
        <>
            {exampleLessonDetails.map((lesson, index) => (
                <Accordion
                    // defaultExpanded
                    key={index}
                    sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}    >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant={"h4"}>
                            {index + 1}) {lesson?.lessonName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        // sx={{ p: 0 }}
                        aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
                    >
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead>
                                {/* <TableRow>
                                    <HeaderStyledCell width={10}></HeaderStyledCell>
                                    <HeaderStyledCell>
                                        {lesson?.lessonName}
                                    </HeaderStyledCell>
                                </TableRow> */}
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
                                        <StyledCell >
                                            {(Action == 'View' || !IsEditingAllowed) ?
                                                <><Typography><b>{plan.label}</b></Typography>
                                                    <Typography>{plan.value}</Typography></>
                                                :
                                                <TextField label={plan.label} value={plan.value}
                                                    fullWidth multiline
                                                    disabled={Action == "View"}
                                                    rows={Action == 'View' ? 1 : 3}
                                                    onChange={(e) => {
                                                        onChangeValue(lesson.StdId, lesson.DivisionId,
                                                            lesson.SubjectId, plan.Id, e.target.value
                                                        )
                                                    }}
                                                // sx={{mt:2}}
                                                />}
                                            {plan.subPlanDetails && plan.subPlanDetails.length > 0 &&
                                                plan.subPlanDetails.map((subPlan, subIndex) => (
                                                    <Table key={subIndex}>
                                                        <TableRow >
                                                            <StyledCell width={20} sx={{ py: 1, verticalAlign: 'top', border: 1 }}>
                                                                {index + 1}.{subIndex + 1}
                                                            </StyledCell>
                                                            <StyledCell>
                                                                {(Action == 'View' || !IsEditingAllowed) ?
                                                                    <><Typography ><b>{subPlan.label}</b></Typography>
                                                                        <Typography>{subPlan.value}</Typography></>
                                                                    // plan.value
                                                                    : <TextField
                                                                        label={subPlan.label}
                                                                        value={subPlan.value}
                                                                        // disabled={!IsEditingAllowed()}
                                                                        fullWidth
                                                                        multiline
                                                                        rows={3}
                                                                        // sx={{mt:2}}
                                                                        onChange={(e) => {
                                                                            onSubChangeValue(
                                                                                lesson.StdId,
                                                                                lesson.DivisionId,
                                                                                subPlan.Id,
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />}
                                                            </StyledCell>
                                                        </TableRow>
                                                    </Table>
                                                ))}
                                        </StyledCell>
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