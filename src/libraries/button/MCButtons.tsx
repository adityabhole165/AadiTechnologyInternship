import MCButton from "./MCButton"
import Grid from '@mui/material/Grid';

const MCButtons = ({activeTab,clickTab}) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={4}>
                    <MCButton ButtonType='Inbox' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
                <Grid item xs={4}>
                    <MCButton ButtonType='Sent' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
                <Grid item xs={4}>
                    <MCButton ButtonType='Trash' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
            </Grid>
        </div>
    )
}
export default MCButtons