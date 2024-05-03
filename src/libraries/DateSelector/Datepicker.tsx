import { DatePicker } from '@mui/x-date-pickers';

const Datepicker = ({ DateValue, onDateChange, }) => {
    return (
        <>
            <DatePicker
                value={new Date(DateValue)}
                onChange={onDateChange}
                format="dd MMM yyyy"
                label={<>
                    Start Date <span style={{ color: 'red' }}>*</span>
                </>}
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true
                    }
                }}
            />
        </>
    )
}

export default Datepicker