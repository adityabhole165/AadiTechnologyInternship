import { Box, Container, Grid, TextField } from '@mui/material';
import { useParams } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';

const SubjectMarkList = () => {
  const { StandardDivisionId, teacherName, examName, subjectName } = useParams();

  return (
    <>
      <Container maxWidth={'xl'}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Subject Mark List',
              path: ''
            }
          ]}
        />
        <Box sx={{ p: 2, background: 'white' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label={"Class"}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={teacherName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label={"Exam "}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={examName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label={"Subject Name"}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={subjectName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>




        </Box>

      </Container>
    </>
  )
}

export default SubjectMarkList