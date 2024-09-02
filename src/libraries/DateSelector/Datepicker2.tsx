
import { DatePicker } from '@mui/x-date-pickers';

const Datepicker2 = ({ DateValue, onDateChange, label, size, fullWidth = true }) => {
    return (
        <>
            <DatePicker
                value={DateValue ? new Date(DateValue) : null}
                onChange={onDateChange}
                format="dd MMM yyyy"
                label={
                    label ? (
                        <>
                            {label} {label && <span style={{ color: 'red' }}>*</span>}
                        </>
                    ) : label === '' ? '' :
                        (
                            "Select Date"
                        )
                }
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: fullWidth,
                        size: size || 'medium',
                        inputProps: {
                            readOnly: true,  // Make the input field read-only
                        }
                    }
                }}
            />
        </>
    );
}

export default Datepicker2;
