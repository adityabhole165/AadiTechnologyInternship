
import { DatePicker } from '@mui/x-date-pickers';

const Datepicker = ({ DateValue, onDateChange, label, size, disabled = false }) => {
    return (
        <>
            <DatePicker
                value={DateValue ? new Date(DateValue) : null} // Ensure the value is displayed
                onChange={disabled ? () => { } : onDateChange} // Prevent date change when disabled
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
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium',
                        InputProps: {
                            readOnly: disabled, // Makes the input non-editable when disabled
                        },
                        disabled: disabled, // Disables the entire field (prevents clicking, typing)
                    },
                }}
                // Ensure that when disabled, the calendar popup doesn't show
                disabled={disabled} // Disables the datepicker field entirely
            />
        </>
    );
};

export default Datepicker;
