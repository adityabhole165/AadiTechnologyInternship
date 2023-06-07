import React from 'react'
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
function PayCautionMoney({ ShowCaution, note, IspaidCautionMoney, clickCaution }) {
  console.log("IspaidCautionMoney",IspaidCautionMoney );
  
  return (
    <div>
      {ShowCaution === "SchoolFees" &&
        <>
          {IspaidCautionMoney ?
            <>
              <ButtonPrimary fullWidth >Show Caution Money Receipt</ButtonPrimary> <Note NoteDetail={note} />
            </>
            :
            <ButtonPrimary fullWidth onClick={()=>clickCaution(true)}>Pay caution Money</ButtonPrimary>
          }
        </>
      }
    </div>
  )
}

export default PayCautionMoney
