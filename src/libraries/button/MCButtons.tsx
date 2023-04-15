import MCButton from "./MCButton"
import Grid from '@mui/material/Grid';

const MCButtons = ({activeTab,clickTab}) => {
    return (
        <div>
            <Grid container spacing={{xs:1, sm:0}} direction={{xs:"row", sm:"column"}}>
                <Grid item xs={4} sx={{textAlign:'center'}}>
                    <MCButton ButtonType='Inbox' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
                <Grid item xs={4} sx={{textAlign:'center'}}>
                    <MCButton ButtonType='Sent' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
                <Grid item xs={4} sx={{textAlign:'center'}}>
                    <MCButton ButtonType='Trash' clickTab={clickTab} activeTab={activeTab}></MCButton>
                </Grid>
            </Grid>
        </div>
    )
}
export default MCButtons