import React from 'react'
import { CardDetail2, CardDetail3 } from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle'

function Note({NoteDetail}) {
  return (
    <div>
      <NoteStyle>
        <CardDetail3>
        <b>Note :</b>
        {
               
                NoteDetail == undefined || NoteDetail.length == 0
                ?
                null
                :
                NoteDetail.map((elm)=>{
                      return(
                          <>
                          <br/>{elm}
                          </>
                      )
                  })
              }
        </CardDetail3>
      </NoteStyle>
    </div>
  )
}

export default Note