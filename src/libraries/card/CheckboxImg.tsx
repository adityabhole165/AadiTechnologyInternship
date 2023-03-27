import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { Styles } from 'src/assets/style/student-style'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const CheckboxImg = ({ name, checked, value, onChange, IsAllDeactivated = false }) => {
    const onClick = () => {
        onChange({ name: name, value : value, checked: !checked })
    }

    const classes = Styles();
    return (<>
    {IsAllDeactivated ? 
    <CircleIcon sx={{color:'grey'}}  className={classes.checkboxSize}/> :
    <>
        {
            checked ?
                <CheckCircleIcon sx={{color:'green'}} onClick={onClick}  className={classes.checkboxSize}/> :
                <RadioButtonUncheckedIcon sx={{color:'green'}} onClick={onClick} className={classes.checkboxSize}/>
        }
    </>
}
    </>
    )
}
export default CheckboxImg;