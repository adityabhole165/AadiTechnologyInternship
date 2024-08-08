
import { DatePicker } from '@mui/x-date-pickers';

const DatepickerLeave = ({ DateValue, onDateChange, label, size, disabled }) => {
    const handleDateChange = (newDate) => {
        if (!disabled) {
            onDateChange(newDate);
        }
    };
    return (
        <>
            <DatePicker
                //value={new Date(DateValue)}
                value={DateValue ? new Date(DateValue) : null}
                onChange={!disabled ? onDateChange : () => { }}
                // onChange={onDateChange}
                format="dd MMM yyyy"
                label={
                    label ? (
                        <>
                            {label} {label && <span style={{ color: 'red' }}>*</span>}
                        </>
                    ) : (
                        "Select Date"
                    )
                }
                // label={<>
                //     {label || "Select Date"} <span style={{ color: 'red' }}>*</span>
                // </>}
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium',
                        disabled: disabled || false
                    }
                }}
                disabled={disabled}
            // sx={{
            //     width: size?.small ? '12vw' : '10vw'
            // }}
            />
        </>
    )
}

export default DatepickerLeave;
