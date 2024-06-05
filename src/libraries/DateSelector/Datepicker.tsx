
import { DatePicker } from '@mui/x-date-pickers';

const Datepicker = ({ DateValue, onDateChange, label, size }) => {
    return (
        <>
            <DatePicker
                value={new Date(DateValue)}
                onChange={onDateChange}
                format="dd MMM yyyy"
                label={<>
                    {label || "Select Date"} <span style={{ color: 'red' }}>*</span>
                </>}
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium'
                    }
                }}
                // sx={{
                //     width: size?.small ? '12vw' : '10vw'
                // }}
            />
        </>
    )
}

export default Datepicker;
