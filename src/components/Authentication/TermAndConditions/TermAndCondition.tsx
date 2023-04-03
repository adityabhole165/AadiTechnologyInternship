
import React, { useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import { Container } from '@mui/material'
function TermAndCondition() {
  const navigate = useNavigate();
  const [radioBtn, setRadioBtn] = useState('2');

 
  const RadioList = [{ Value: "1", Name: "I accept the Term of Use" },
  { Value: "2", Name: "I do not accept the Term of Use" }]



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
      <p>
       
        Pawar Public School (PPSPune) provides web based educational software and services. This End User Licensing
        Agreement ("EULA") sets forth the terms and conditions of your use of these software
        and services.


        PPSPune may modify this EULA from time to time and will post a modified version
        of the EULA on this web site. Modified versions of this EULA shall be effective
        upon posting by PPSPune. You agree to be bound to any changes to this EULA by using
        the software and services after any such modification is posted. Accordingly, you
        must review this EULA regularly to ensure that you are aware of the current terms
        and conditions.


        You must agree to keep your PPSPune account password secret and known only to yourself. At the sole
        discretion of PPSPune your account may be suspended or deleted without notice and
        any customization may be lost. Subject to the terms and restrictions set forth in
        this EULA, PPSPune grants you a non-exclusive, non-transferable license, to use
        the software and access the services solely for the educational benefit of school
        students. You may not use, copy, modify, or transfer the software, in whole or in
        part, or use the services except as expressly provided in this EULA. Except for
        the foregoing license grant, this EULA does not grant you any rights to patents,
        copyrights, trade secrets, trademarks, source code, or any other rights in respect
        to the software or services.


        No guarantees are provided that this web site will be available for use on any particular
        day or time or that site data will be accessible.


        You may not reverse engineer, disassemble, decompile, modify or translate the software,
        or otherwise attempt to derive the source code of the software, or authorize any
        third party to do any of the foregoing. The software is licensed, not sold, to you
        for use only under the terms of this EULA, and PPSPune reserves all rights not expressly
        granted to you.

        Online Payment text -
        I / We agree and accept the services provided by Axis Bank and Aggregator. At my / our request to carry out my payments on my/our account, given by me / us.
        I / We have no objection whatsoever, to the online payment facility providing my / our billing details to the Institute.
        While the Institute will take all reasonable  steps to ensure the accuracy of the payment details, the Institute is not liable for any error. I / We shall not hold the Institute responsible for any  loss, damages, etc. that may be incurred / suffered by me / us if the information contained turns out to be inaccurate / incorrect.
        I / We agree that any disputes on Payment details will be settled directly with the Institute and the responsibility limited to provision of information only.
        I / We agree that we will make bill amount  payments as required by the Institute. I / We will not hold the Institute  responsible for rejecting the payment amount because of incorrect or incomplete  entries.
        I / We agree that the record of the instructions given and transactions with the Institute shall be conclusive proof and binding for all purposes and can be used as evidence in any  proceeding.
        I / We agree that charges, if any, for the online payment services will be at the sole discretion of the Institute is at  liberty to vary the same from time to time, without giving any notice.
        I / We agree that the Institute is at liberty to  withdraw at anytime the online payment facility, or any services provided there  under, in respect of any or all the account(s) without assigning any reason  whatsoever, without giving me / us any notice.
      </p>

      <RadioButton1
        Array={RadioList}
        ClickRadio={ClickRadio}
        defaultValue={radioBtn}
        Label={""} />


      <br /><br />

      {
        radioBtn === "1" ?
          <ButtonPrimary onClick={ChangePassword} onClickCapture={ChangePassword}>Continue</ButtonPrimary> :
          <ButtonPrimary disabled >Continue</ButtonPrimary>
      }

    </Container>
  )
}

export default TermAndCondition