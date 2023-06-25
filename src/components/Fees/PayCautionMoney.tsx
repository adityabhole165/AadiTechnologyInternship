import React from 'react'
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
function PayCautionMoney({ ShowCaution, note, IspaidCautionMoney, clickCaution, IsOnlinePaymetCautionMoney }) {
  const Toaster =()=>{
    toast.success('This feature is coming soon. Please download receipt form web app.')
  }
  return (
    <div>
    {IsOnlinePaymetCautionMoney &&  <>
      {ShowCaution === "SchoolFees" &&
        <>
          {IspaidCautionMoney ?
            <>
              <ButtonPrimary fullWidth sx={{mb:0.5}}onClick={Toaster}>Show Caution Money Receipt</ButtonPrimary>
            </>
            :
            <ButtonPrimary fullWidth onClick={()=>clickCaution(true)} sx={{mb:0.5}}>Pay caution Money</ButtonPrimary>
          }
        </>
      }
      </>}
    </div>
  )
}

export default PayCautionMoney
