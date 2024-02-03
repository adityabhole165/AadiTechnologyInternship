import { CardDetail2 } from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle';

function Note({ NoteDetail }) {
  return (
    <div>
      <NoteStyle>
        <CardDetail2>
          <b>Note :</b>
          {NoteDetail == undefined || NoteDetail.length == 0
            ? null
            : NoteDetail.length == 1
            ? NoteDetail[0]
            : NoteDetail.map((elm, i) => {
                return <div key={i}> {elm} </div>;
              })}
        </CardDetail2>
      </NoteStyle>
    </div>
  );
}

export default Note;
