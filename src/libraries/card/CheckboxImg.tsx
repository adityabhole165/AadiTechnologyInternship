import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const CheckboxImg = ({ name, checked, value, onChange }) => {
    const onClick = () => {
        onChange({ name: name, value : value, checked: !checked })
    }
    return (<>
        {
            checked ?
                <CheckCircleIcon sx={{color:'green'}} onClick={onClick} /> :
                <RadioButtonUncheckedIcon onClick={onClick}/>
        }
    </>)
}
export default CheckboxImg;