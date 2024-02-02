import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Styles } from 'src/assets/style/student-style';
const HeaderCheckbox = ({ checked, onChange }) => {
  const onClick = () => {
    let isActive = checked === 0 || checked === 2 ? true : false;
    onChange(isActive);
  };
  const checkColor = { color: 'green' };
  const classes = Styles();
  return (
    <>
      {checked === 0 ? (
        <RadioButtonUncheckedIcon
          sx={checkColor}
          onClick={onClick}
          className={classes.checkboxSize}
        />
      ) : checked === 1 ? (
        <CheckCircleIcon
          sx={checkColor}
          onClick={onClick}
          className={classes.checkboxSize}
        />
      ) : checked === 2 ? (
        <DoNotDisturbOnIcon
          sx={checkColor}
          onClick={onClick}
          className={classes.checkboxSize}
        />
      ) : null}
    </>
  );
};
export default HeaderCheckbox;
