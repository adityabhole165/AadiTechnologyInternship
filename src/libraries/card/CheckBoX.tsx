import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Styles } from 'src/assets/style/student-style'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ChechBoX = ({ name, checked, value, onChange, IsAllDeactivated = false, IsExamSubmitted=false }) => {
    const onClick = () => {
        onChange({ name: name, value : value, checked: !checked })
        
    }
    const classes = Styles();
    return (

    <>
        {
            checked ?
                <DoNotDisturbOnIcon sx={{color:'red'}} onClick={onClick}  /> :
                <RadioButtonUncheckedIcon sx={{color:'green'}} onClick={onClick} />
        }

    </>
    )
}
export default ChechBoX;