import { DatePicker } from '@mui/x-date-pickers';

// Function to convert 'DD-MM-YYYY HH:mm:ss' format to a JavaScript Date object
const parseDateString = (dateString) => {
    if (typeof dateString !== 'string') return null; // Ensure dateString is a string
    const [datePart] = dateString.split(' '); // Isolate the date part
    if (!datePart) return null; // Handle cases where datePart is undefined
    const [day, month, year] = datePart.split('-'); // Split by dash
    if (!day || !month || !year) return null; // Handle cases where parts are missing
    return new Date(`${year}-${month}-${day}`); // Convert to 'YYYY-MM-DD' format
};

// Function to format JavaScript Date object to 'DD-MM-YYYY'
const formatDateToString = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return ''; // Ensure date is a valid Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Return in 'DD-MM-YYYY' format
};

const Datepicker3 = ({ DateValue, onDateChange, label, size, fullWidth = true, maxDate = false, minDate = false, disabled = false }) => {
    // Parse DateValue if it's a string in 'DD-MM-YYYY HH:mm:ss' format
    const parsedDate = DateValue ? parseDateString(DateValue) : null;

    // Handle date change
    const handleDateChange = (newDate) => {
        // Convert Date object back to 'DD-MM-YYYY' format
        const formattedDate = newDate ? formatDateToString(newDate) : '';
        onDateChange(formattedDate);
    };

    return (
        <>
            <DatePicker
                disabled={disabled}
                value={parsedDate}
                onChange={handleDateChange}
                format='dd MMM yyyy'
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
                maxDate={maxDate ? new Date() : undefined} // Disable future dates here
                minDate={minDate ? new Date() : undefined} // Disable past dates here
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

export default Datepicker3;
