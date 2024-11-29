import { Accordion, AccordionDetails, Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, alpha, styled } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AlertContext } from 'src/contexts/AlertContext';
import { RootState } from 'src/store';
import LessonPlanActivity from './LessonPlanActivity';
const LessonPlanListPrint = ({ exampleLessonDetails, Action = 'View', IsEditingAllowed = false, printRef, TeacherName,
    startDate, endDate
}) => {
    const ApprovalData: any = useSelector((state: RootState) => state.addlessonplan.ApprovalData);
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
        // onTextChange(exampleLessonDetails)
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

        // onTextChange(exampleLessonDetails)
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
                // onTextChange(exampleLessonDetails)

                closeAlert();
            }
        });
    };
    let schoolName = localStorage.getItem('TermsSchoolName');
    return (
        <>
            <div
                style={{
                    background: 'white', position: 'relative', minHeight: '100vh',
                    userSelect: 'text',  // Makes text selectable
                    WebkitUserSelect: 'text',  // For webkit browsers
                    MozUserSelect: 'text',  // For Firefox
                    msUserSelect: 'text',  // For Internet Explorer/Edge
                    // Ensure content can break across pages
                    // pageBreakInside: 'avoid' 
                }}
                ref={printRef}>
                <Box>
                    {/* Header Section */}
                    <Box sx={{ position: 'relative' }}>
                        {/* School Logo */}
                        {/* <img src={`https://riteschoolmobileservicehttps.riteschool.com/images/${schoolName}_logo.png`} style={{ float: 'left', position: 'absolute' }} alt="Pawar Public School" /> */}
                        <img style={{ float: 'left', position: 'absolute' }} src="data:image/png;base64,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" />                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                            PAWAR PUBLIC SCHOOL</Typography>
                        <Box component="div" sx={{ flexGrow: 1, textAlign: 'center', paddingTop: '0px', paddingBottom: '0px', fontSize: '12px' }}>
                            Amanora Park Town,<br />
                            Hadapsar, Pune - 411028 <br />
                            Tel.: 9503103107, Telefax: 26722292 <br />
                            Website: www.ppspune.com <br />
                            Email Address: info@ppspune.com
                        </Box>
                    </Box>


                    {/* Lesson Plan Section */}
                    <Box mt={2}>
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                            Lesson Plan
                        </Typography>
                        <hr />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold' }}>Name</span>: {TeacherName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                    <span style={{ fontWeight: 'bold' }}>Date</span>: {startDate} <span style={{ fontWeight: 'bold' }}>to</span> {endDate}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {exampleLessonDetails?.map((lesson, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '20px', marginTop: '20px',
                        }}
                    >
                        <Accordion
                            defaultExpanded
                            key={index}
                            sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }} >
                            <Typography variant={"h4"} sx={{ paddingTop: 1, paddingBottom: 1, marginLeft: 2 }}>
                                {lesson?.lessonName}
                            </Typography>

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
                            </AccordionDetails>
                        </Accordion >
                    </div>
                ))}
                <LessonPlanActivity ApprovalData={ApprovalData} />
            </div>
        </>
    )
}

export default LessonPlanListPrint