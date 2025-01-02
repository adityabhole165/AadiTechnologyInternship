
import { DatePicker } from '@mui/x-date-pickers';

const DatepickermaxDate = ({ DateValue, onDateChange, label, size, maxDate }) => {
    return (
        <>
            <DatePicker
                //value={new Date(DateValue)}
                value={DateValue ? new Date(DateValue) : null}
                onChange={onDateChange}
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
                        size: size || 'medium'
                    }
                }}
                maxDate={new Date()}
            // sx={{
            //     width: size?.small ? '12vw' : '10vw'
            // }}
            />
        </>
    )
}

export default DatepickermaxDate;
