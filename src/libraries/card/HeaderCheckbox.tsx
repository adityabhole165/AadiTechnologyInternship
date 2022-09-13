import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
const HeaderCheckbox = ({ checked, onChange }) => {
    const onClick = () => {
        let isActive = checked === 0 ||
            checked === 2 ? true : false
            onChange(isActive)
    }
    const checkColor ={ color: 'black' }
    return (<>
        {
            checked === 0 ?
                <RadioButtonUncheckedIcon sx={checkColor} onClick={onClick} /> :
                checked === 1 ?
                    <CheckCircleIcon sx={checkColor} onClick={onClick} /> :
                    checked === 2 ?
                        <DoNotDisturbOnIcon sx={checkColor} onClick={onClick} /> :
                        null
        }
    </>)
}
export default HeaderCheckbox;