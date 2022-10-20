import { CardDetail3 } from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle'

function Note({NoteDetail}) {
  return (
    <div>
      <NoteStyle>
        <CardDetail3>
        <b>Note :</b>
        { NoteDetail == undefined || NoteDetail.length == 0  ? null :
                NoteDetail.map((elm,i)=>{
                      return(
                          <div key={i}> {elm} </div>
                      )
                  })
              }
        </CardDetail3>
      </NoteStyle>
    </div>
  )
}

export default Note