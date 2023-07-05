import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Styles } from 'src/assets/style/student-style'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CheckBox = ({ item, onChange, IsNotDisabled, InternalOrSchool }) => {
    const classes = Styles();
    const onClick = () => {
        onChange({ ...item, IsActive: !item.IsActive })
    }
  
    return (<>
        {item.ParentId !== "0" ? null :
            <>
                {((IsNotDisabled == true && InternalOrSchool == "SchoolFees")|| InternalOrSchool == "internalFees" )?
                    (item.IsEnabled) ?
                        item.IsActive ?
                            <CheckCircleIcon sx={{ color: 'green' }}
                                onClick={onClick} className={classes.checkboxSize} /> :
                            <RadioButtonUncheckedIcon sx={{ color: 'green' }}
                                onClick={onClick} className={classes.checkboxSize} /> :
                        <RadioButtonUncheckedIcon sx={{ color: 'grey' }}
                            className={classes.checkboxSize} /> :
                    <RadioButtonUncheckedIcon sx={{ color: 'grey' }}
                        className={classes.checkboxSize} />
                }
            </>
        }
    </>)
}

export default CheckBox