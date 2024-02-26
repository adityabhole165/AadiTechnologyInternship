import CalendarList from './CalendarList'
import SearchAnnualPlanner from './SearchAnnualPlanner'

const CalendarAnnualPlanner = ({ DaysList, ClickCalendarItem, FilterList, 
    ClickFilterItem, SelectedDate, SelectedFilter }) => {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <SearchAnnualPlanner ItemList={FilterList} ClickItem={ClickFilterItem} DefaultValue={SelectedFilter} />

            <CalendarList ItemList={DaysList} ClickItem={ClickCalendarItem} DefaultValue={SelectedDate} />
        </>
    )
}

export default CalendarAnnualPlanner