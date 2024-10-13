import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const Datepicker = ({
    DateValue,
    onDateChange,
    label,
    size,
    minDate,
    maxDate,
    display,
}) => {
    return (
        <Box>
            <DatePicker
                value={DateValue ? new Date(DateValue) : null}
                onChange={onDateChange}
                format="dd MMM yyyy"
                label={
                    label ? (
                        <>
                            {label} {label && <span style={{ color: 'red' }}>*</span>}
                        </>
                    ) : (
                        'Select Date'
                    )
                }
                views={['year', 'month', 'day']}
                minDate={new Date(minDate)} // Setting minimum date
                maxDate={new Date(maxDate)} // Setting maximum date
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium',
                        sx: { display: display },
                    },
                }}
            />
        </Box>
    );
};

export default Datepicker;
