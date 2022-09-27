import React from 'react'
import { DotLegendStyled } from '../styled/DotLegendStyled'
const DotLegend = ({text,color}) => {
  return (
    <>
    <DotLegendStyled color={color}/>
      <small>
        <b> {text} </b>
      </small>
      <br />
    </>
  )
}

export default DotLegend