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
              <ButtonPrimary fullWidth sx={{mb:0.5}}>Show Caution Money Receipt</ButtonPrimary> <Note NoteDetail={note} />
            </>
            :
            <ButtonPrimary fullWidth onClick={()=>clickCaution(true)} sx={{mb:0.5}}>Pay caution Money</ButtonPrimary>
          }
        </>
      }
    </div>
  )
}

export default PayCautionMoney
