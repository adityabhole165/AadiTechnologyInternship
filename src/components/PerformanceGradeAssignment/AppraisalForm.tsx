import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Datepicker3 from "src/libraries/DateSelector/Datepicker3";
import { formatDate } from "../Common/Util";
import AppraisalFormComponent from "./AppraisalFormComponent";

const AppraisalForm = () => {
    const listEnableRejectButtonDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistEnableRejectButtonDetails);
    const listIsFinalApproverDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistIsFinalApproverDetails);
    const listUserNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistUserNameDetails);
    const [incrementDate, setIncrementDate] = useState('');


    function isFinalApprover() {
        let flag = false;
        let filteredArray = listIsFinalApproverDetails.filter((item) => item.Text3 === sessionStorage.getItem('Id'));
        if (filteredArray.length > 0 && filteredArray[0].Text4 === 'True') {
            flag = true;
        }
        return flag;
    }

    return (
        <>
            {listUserNameDetails.length > 0 &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Status :" Text={listUserNameDetails[0].Text3} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Year :" Text={listUserNameDetails[0].Text11} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Name :" Text={listUserNameDetails[0].Text1} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Post :" Text={listUserNameDetails[0].Text2} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Employee Code :" Text={listUserNameDetails[0].Text4} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Length Of Service :" Text={listUserNameDetails[0].Text6} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label=" Date of Joining :" Text={listUserNameDetails[0].Text5.split(' ')[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" mb={1}>

                            <Box
                                display="inline-block"
                                border={1}
                                borderRadius={4}
                                width="10vw"
                                pl={1}
                                mr={1}
                                sx={{
                                    width: {
                                        xs: '40vw', // 80% of the viewport width on extra-small screens
                                        sm: '40vw', // 60% of the viewport width on small screens
                                        md: '20vw', // 40% of the viewport width on medium screens
                                        lg: '10vw', // 20% of the viewport width on large screens
                                        xl: '10vw', // 10% of the viewport width on extra-large screens
                                    },
                                }}
                            >
                                Date of Last Increment:
                            </Box>

                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                {isFinalApprover() === false ? <Typography variant="h5" component="span">
                                    {listUserNameDetails[0].Text12 !== '' ? formatDate(listUserNameDetails[0].Text12.split(' ')[0]) : '-'}
                                </Typography> :
                                    <Datepicker3
                                        disabled={listEnableRejectButtonDetails[0]?.Text5 === '1' ? true : false}
                                        maxDate={true}
                                        DateValue={incrementDate}
                                        onDateChange={(value) => { setIncrementDate(value) }}
                                        label={''}
                                        size={"small"}
                                        fullWidth={false}
                                    />}
                            </Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Address :" Text={listUserNameDetails[0].Text14} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label=" Highest Education Qualification and Year of Passing :" Text={listUserNameDetails[0].Text15} />
                    </Grid>

                </Grid>
            }
        </>
    )
}

export default AppraisalForm
