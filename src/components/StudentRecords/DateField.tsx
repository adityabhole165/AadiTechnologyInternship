
import { DatePicker } from '@mui/x-date-pickers';

const Datepicker1 = ({ DateValue, onDateChange, label, size }) => {
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
                            {label}
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
                        size: size || 'small'
                    }
                }}
            // sx={{
            //     width: size?.small ? '12vw' : '10vw'
            // }}
            />
        </>
    )
}

export default Datepicker1;
