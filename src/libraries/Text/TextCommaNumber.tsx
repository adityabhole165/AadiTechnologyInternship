import {TextField} from '@mui/material'
import { useEffect, useState } from 'react'

const TextCommaNumber = ({ name, textarray, validarray, changeText, getLabel }) => {

    const defaultLabel = 'Comma separated ' + name
    let label = ''
    const isRepeat = (value) => {
        let arr = []
        arr = value.split(',')
        if (!arr.slice(0, -2).some((a) => {
            return (a === arr[arr.length - 2])
        })) {
            if (validarray.some((a) => {
                return (a === arr[arr.length - 2])
            })) {
                return true
            }
            else {
                label = 'Invalid ' + name
                return false
            }
        }
        else {
            label = 'Do not repeat ' + name
            return false
        }
    }
    const checkIsNumber = (value) => {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            label = defaultLabel
            return true
        }
        else {
            label = 'Enter number only'
            return false
        }
    }

    const SetTextData2 = (value) => {
        let arr = value.split(',')

        if (!checkIsNumber(arr[arr.length - 1])) {
            changeText({ text: textarray, getLabel: 'Enter number only' })
            return false
        }

        //check only if after atlease one comma
        if (arr.length > 1) {
            //check if atleast some text entered after comma
            if (arr[arr.length - 1].length > 0) {
                //check if text enterred after comma is numeric
                if (checkIsNumber(arr[arr.length - 1]))
                    changeText({ text: value, getLabel: label })
            }
            else
                //check if comma entered without any text
                if (arr[arr.length - 2].length > 0) {
                    if (isRepeat(value)) {
                        label = defaultLabel
                        changeText({ text: value, getLabel: label })
                    }
                    else {
                        changeText({ text: textarray, getLabel: label })
                    }
                } else {
                    label = 'Enter ' + name
                    changeText({ text: textarray, getLabel: label })
                }
        }
        else
            changeText({ text: value, getLabel: label })
    }

    return (
        <>
            <br />
            <TextField
                variant="standard"
               fullWidth
                value={textarray}
                error={getLabel !== defaultLabel}
                label={getLabel}
                onChange={(e) => SetTextData2(e.target.value)}
            />
        </>
    )
}

export default TextCommaNumber