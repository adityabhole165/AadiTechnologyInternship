import { Grid, Typography } from '@mui/material';
import { CardDetail2 } from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle';

function Notes({ NoteDetail, Header }) {
  return (
    <div>
      <NoteStyle>
        <CardDetail2>
          <Grid container>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {' '}
              <b>{Header}</b>
            </Typography>
          </Grid>
          {NoteDetail == undefined || NoteDetail.length == 0
            ? null
            : NoteDetail.map((elm, i) => {
                return <div key={i}> {elm} </div>;
              })}
        </CardDetail2>
      </NoteStyle>
    </div>
  );
}

export default Notes;
