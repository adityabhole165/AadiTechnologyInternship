import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Typography } from '@mui/material';

const ProgressRemarksNotes = () => {

    const Note1 = [
        'Attentive, Capable, Careful, Cheerful, Confident, Cooperative, Courteous, Creative, Dynamic, Eager, Energetic, Generous, Hardworking, Helpful, Honest, Imaginative, Independent, Industrious, Motivated, Organized Outgoing, Pleasant, Polite, Resourceful, Sincere, Unique.'
    ];
    const Hedaer1 = ['Suggested Adjectives:'];

    const Note2 = [
        'Always, Commonly, Consistently, Daily, Frequently, Monthly, Never, Occasionally, Often, Rarely, Regularly Typically, Usually, Weekly.'
    ];
    const Hedaer2 = ['Suggested Adverbs ::'];

    const Note3 = [
        'Click on the button available for each student and remark type to add configured remark templates.'
    ];
    const Hedaer3 = ['...'];

    const Note4 = [
        'After specific interval of time entered data will be saved automatically.'
    ];
    const Hedaer4 = ['Note:'];

    const Note5 = [
        'User can not change or update any data once summative exam is published.'
    ];
    const Hedaer5 = ['Note:'];
    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Important Notes</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                    <Alert variant="filled" severity="info"><b>Suggested Adjectives : </b> {Note1}</Alert>
                    <Alert variant="filled" severity="info"><b>Suggested Adverbs : </b> {Note2}</Alert>
                    <Alert variant="filled" severity="info"><b>...  </b> {Note3}</Alert>

                    <Alert variant="filled" severity="info"><b>Note : </b> {Note4}</Alert>
                    <Alert variant="filled" severity="info"><b>Note : </b> {Note5}</Alert>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ProgressRemarksNotes