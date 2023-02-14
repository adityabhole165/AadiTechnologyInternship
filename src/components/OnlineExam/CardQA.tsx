import React from 'react'
import {ListStyle, ProfileDetail1,ProfileDetail2,ProfileDetail3,ProfileDetail4,ProfileWrapper} from 'src/libraries/styled/ProfileStyled';

const CardQA = ({header,text1,text2,text3}) => {
  return (
    <div>
        <ListStyle>
        <ProfileWrapper >
                  <ProfileDetail1 >Exam:</ProfileDetail1>
                  <ProfileDetail4>{header}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Subject:</ProfileDetail1>
                  <ProfileDetail4> {text1}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Date:</ProfileDetail1>
                  <ProfileDetail4> {text3}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Time:</ProfileDetail1>
                  <ProfileDetail4> {text2}</ProfileDetail4>
                </ProfileWrapper>
        </ListStyle>
        
    </div>
  )
}

export default CardQA 