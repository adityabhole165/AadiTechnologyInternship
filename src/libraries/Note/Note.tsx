import React from 'react'
import { CardDetail2 } from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle'

function Note({NoteDetail}) {
  return (
    <div>
      <NoteStyle>
        <CardDetail2>
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
        </CardDetail2>
      </NoteStyle>
    </div>
  )
}

export default Note