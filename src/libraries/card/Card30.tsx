import { useState } from 'react'
import { Container, Card, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const Card30 = ({ header }) => {
    const ExpandIcon = ({ expanded }) =>
        expanded ? <ExpandLessIcon sx={{ float: "right" }} /> : <ExpandMoreIcon sx={{ float: "right" }} />;

    const [enableRow, setEnableRow] = useState(-1)
    const expand = (index) => {
        if (enableRow === index)
            setEnableRow(-1)
        else
            setEnableRow(index)
    }
    const searchBarProps = {
        markInformation: "A",
        mark: "B"
    }
    return (
        <><Container>
            {
                header.map((Header) => (

                    <Card key={Header.Id} sx={{ mt: 1, bgcolor: 'white' }}>           
                    <Grid container>
                        <Grid item xs={10} 
                                onClick={() => expand(Header.Id)}>
                            <Typography
                                variant="h4"
                                sx={{ py: 1, mx: 1 }}>
                                {Header.Name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} 
                        alignItems="center"
                        justifyContent="center"
                       >
                            <ExpandIcon expanded={enableRow === Header.Id} />
                        </Grid>

                        {
                            Header.Child.map((Detail) => (
                                enableRow === Header.Id &&

                                (<Grid container key={Detail.Id}>
                                    <Grid item xs={10} >
                                        <Typography variant="h6" sx={{ py: 1, mx: 1 }} >
                                            {Detail.Name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}  >
                                        {Detail.Value}
                                    </Grid>
                                </Grid>)
                            ))
                        }
                    </Grid>
                    </Card>
                ))
            }
        </Container></>
    )
}
export default Card30;