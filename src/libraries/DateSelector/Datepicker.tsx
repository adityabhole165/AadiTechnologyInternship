import { DatePicker } from '@mui/x-date-pickers';

const Datepicker = ({ DateValue, onDateChange, label, size, isMax = false, isMin = false, dateWidth = undefined }) => {
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
                minDate={isMin && new Date()}
                maxDate={isMax && new Date()} // Disable future dates
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: size || 'medium'
                    },
                    actionBar: {
                        actions: ['clear', 'today'],
                        sx: {
                            marginTop: -5
                        }
                    }
                }}
                sx={{
                    minWidth: dateWidth ?? 'inherit'
                }}
            />
        </>
    )
}

export default Datepicker;