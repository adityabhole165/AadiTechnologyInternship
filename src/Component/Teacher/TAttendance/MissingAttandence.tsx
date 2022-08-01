import PageHeader from 'src/UI_Library/heading/PageHeader';
import BackButton from 'src/UI_Library/button/BackButton';
import { useEffect,useState } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import MissingAttandenceInteface from 'src/Interface/Student/MissingAttandenceInterface';
import { getMissingAttandenceList } from 'src/Client_Api/Student/MissingAttandenceSlice';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';
import Buttons from "src/UI_Library/buttons/button";
import List16 from 'src/UI_Library/list/List16';
import { GetMissingAttandenceData } from 'src/Interface/Student/MissingAttandenceInterface';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

function MissingAttandence() {

	// USE PARAMS FOR PREVIOUS PAGES DATE 
	const { assignedDate } = useParams();

	// VARIABLES 
	const dispatch = useDispatch();
	const [getDate, setgetDate] = useState<any>(assignedDate);
	const [date, setDate] = useState<any>({ selectedDate: null });

	// CURRENT DATE FUNCTION
	const getCurrentDate = (newDate?: Date) => {
		setDate({
		selectedDate: getDate
	});
		setgetDate(assignedDate);
	};

	// PREVIOUS DATE FUNCTION
	const getPreviousDate = () => {
		const currentDayInMilli = new Date(getDate).valueOf();
		const oneDay = 1000 * 60 * 60 * 24;
		const previousDayInMilli = currentDayInMilli - oneDay;
		const prev = new Date(previousDayInMilli)

		const Day = new Date(prev).getDate();
		const Month = new Date(prev).toLocaleString("default", { month: 'short' });
		const Year = new Date(prev).getFullYear();
		const NewDateFormat = `${Day}-${Month}-${Year}`;
		setgetDate(NewDateFormat);
	}

	// NEXT DATE FUNCTION
	const getNextDate = () => {
		const currentDayInMilli = new Date(getDate).getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		const nextDayInMilli = currentDayInMilli + oneDay;
		const next = new Date(nextDayInMilli);

		const Day = new Date(next).getDate();
		const Month = new Date(next).toLocaleString("default", { month: 'short' });
		const Year = new Date(next).getFullYear();
		const NewDateFormat = `${Day}-${Month}-${Year}`;
		setgetDate(NewDateFormat);
	}

	const MissingAttandenceList: any = useSelector((state: RootState) => state.MissingAttandence.MissingAttandenceList);


	//SESSION DATA
	const asSchoolId = localStorage.getItem('localSchoolId');
	const asAcademicYearId = sessionStorage.getItem('AcademicYearId');

	// BODY FOR API
	const body: MissingAttandenceInteface = {
		asAcademicYearId: asAcademicYearId,
		asSchoolId: asSchoolId,
		asDate: getDate
	};

	// CALL FOR API ON DATE CHANGE AND EVEN AT START
	useEffect(()=>{
		getCurrentDate()
		dispatch(getMissingAttandenceList(body));
	},[])

	useEffect(() => {
		dispatch(getMissingAttandenceList(body));
	}, [getDate]);

	// FOR FUTURE MISSING ATTANDENCE CONSITION -----
	const AssignDate = new Date(getDate);
	const PresentDate = new Date();

return (
	<>  
			<PageHeader heading={'Missing Attendance'} subheading={''} />
				<Grid container  direction="row" sx={{mt:'-40px', marginLeft: "33px"}}>
					<BackButton />
				</Grid>
			<br/><br/>
				<Buttons date={getDate} PrevDate={getPreviousDate} NextDate={getNextDate} Close={undefined}  /> 
			<br/>
				{
						( AssignDate > PresentDate ) // FUTURE ATTANDENCE
						? 
							<ErrorMessages Error={'Future date attendance is not allowed'} />
						:
						(MissingAttandenceList.length < 1 || MissingAttandenceList == undefined || MissingAttandenceList.daywiseAttendanceStatusResult.length < 1 ) // FOR UNDEFINED VALUE OR EMPTY ARRAY
						? 
							<ErrorMessages Error={'No Missing Attandence Found'} /> 
						:
						MissingAttandenceList.daywiseAttendanceStatusResult.map((items: GetMissingAttandenceData, i) => {
							return (
								<> {
									(i === 0 && items.Status == 'A') 
									?
										<>
											<ErrorMessages Error={'Outside Academic Year'} />
										</>
									: 
									(i === 0 && items.Status == 'W') 
									?
										<>
											<ErrorMessages Error={'Selected date is weekend.'} />									
										</>
									: 
									(i === 0 && items.Status == 'H')
									?
										<>
											<ErrorMessages Error={'Selected date is holidays.'} />
										</>
									: 
									((i === 0 && items.Status == 'F') ) 
									?
										<>
											<ErrorMessages Error={'Future Date Attendance Cannot Be Viewed.'} />								
										</>
									: 
									( MissingAttandenceList.daywiseAttendanceStatusResult.length < 1 ) 
									?
										<>
											<ErrorMessages Error={'No missing attandence found'} />								
										</>
									:
										<>
											<List16 Class={items.Class}  key={i} />
										</>
									}
								</>
								)
						})
				}
	</> 
);
}

export default MissingAttandence;