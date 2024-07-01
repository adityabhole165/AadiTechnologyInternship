import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Typography } from '@mui/material';

const StudentRecordsNotes = () => {

    const Note1 = [
        'Principal and Counsellor can see those students to whom details are submitted by class teacher(s).'
    ];
    const Hedaer1 = ['Note 1 :'];

    const Note2 = [
        'If Principal or Counsellor is a class teacher of any class then on selection of same class, he / she can see all students to whom details of selected class.'
    ];
    const Hedaer2 = ['Note 2 :'];

    const Note3 = [
        'Status column will show unread, unsubmitted student records and comments.'
    ];
    const Hedaer3 = ['Note 3 :'];


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
                    <Alert variant="filled" severity="info"><b>Note 1 : </b> {Note1}</Alert>
                    <Alert variant="filled" severity="info"><b>Note 2 : </b> {Note2}</Alert>
                    <Alert variant="filled" severity="info"><b>Note 3 : </b> {Note3}</Alert>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default StudentRecordsNotes