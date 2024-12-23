
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const Datepicker1 = ({ DateValue, onDateChange, label, size, error, helperText, maxDate }) => {
    const handleDateChange = (date) => {
        // If date is null (cleared) or invalid
        if (!date || !moment(date).isValid()) {
            onDateChange(''); // Send empty string to parent for validation
            return;
        }

        // Valid date - format and send
        onDateChange(moment(date).format("DD-MM-YYYY"));
    };

    const parseInitialDate = (dateValue) => {
        if (!dateValue || !moment(dateValue, "DD-MM-YYYY").isValid()) {
            return null;
        }
        return moment(dateValue, "DD-MM-YYYY").toDate();
    };
    return (
        <>
            <DatePicker
                //value={new Date(DateValue)}
                value={parseInitialDate(DateValue)}
                onChange={handleDateChange}
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
                maxDate={maxDate ? moment(maxDate).toDate() : undefined} // Use maxDate if provided
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium',
                        error: error, // Pass error prop
                        helperText: helperText, // Pass helperText prop
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
