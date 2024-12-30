import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AppraisalFormComponent from "./AppraisalFormComponent";

const AppraisalForm = () => {
    const listUserNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistUserNameDetails);
    return (
        <>
            {listUserNameDetails.length > 0 &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Status :" Text={listUserNameDetails[0].Text3} />
                    </Grid><Grid item xs={12} sm={6}>
                        <AppraisalFormComponent Label="Name :" Text={listUserNameDetails[0].Text1} />
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default AppraisalForm