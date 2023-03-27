import React from 'react'
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
function PayCautionMoney({ ShowCaution, note, IspaidCautionMoney }) {
  return (
    <div>
      {ShowCaution === "School" &&
        <>
          {!IspaidCautionMoney ?

            <Note NoteDetail={note} /> :
            <ButtonPrimary fullWidth>Pay caution Money</ButtonPrimary>
          }
        </>
      }
    </div>
  )
}

export default PayCautionMoney
