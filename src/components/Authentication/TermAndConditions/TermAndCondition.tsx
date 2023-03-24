
import React, { useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import RadioButton from 'src/libraries/RadioButton/RadioButton';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box,Container } from '@mui/material'
function TermAndCondition() {
  const navigate = useNavigate();
  const [radioBtn, setRadioBtn] = useState('2');

  console.log("radioBtn",radioBtn)
  const RadioList = [{ Value:"1", Name: "I accept the Term of Use" },
  {Value:"2", Name: "I do not accept the Term of Use" }]

 

  const ClickRadio = (value) => {
    setRadioBtn(value);
    console.log(value)
  }
  const ChangePassword = () => {
    navigate('/changePassword')
  }
  return (
    <Container>

      <PageHeader heading={'Terms of Use'} subheading={''} />

      <RadioButton
        Array={RadioList}
        ClickRadio={ClickRadio}
        defaultValue={radioBtn}
        Label={""} />


<br/><br/>

      {
      radioBtn === "1" ? 
      <ButtonPrimary onClick={ChangePassword} onClickCapture={ChangePassword}>Continue</ButtonPrimary>: 
      <ButtonPrimary disabled >Continue</ButtonPrimary>
     }

    </Container>
  )
}

export default TermAndCondition