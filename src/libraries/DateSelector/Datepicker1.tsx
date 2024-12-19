
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const Datepicker1 = ({ DateValue, onDateChange, label, size, error, helperText }) => {
    return (
        <>
            <DatePicker
                //value={new Date(DateValue)}
                value={DateValue ? moment(DateValue, "DD-MM-YYYY").toDate() : null}
                onChange={(date) => onDateChange(moment(date).format("DD-MM-YYYY"))}
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
