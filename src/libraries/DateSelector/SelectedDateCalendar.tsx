import { Container, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import HomeworkCard from 'src/libraries/card/HomeworkCard'
import PageHeader from 'src/libraries/heading/PageHeader';
import { getHomeworkDetails, getHomeworkDates } from 'src/requests/Homework/RequestHomeworkNew';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { getHomeworkDateFormatted, getNextDate } from 'src/components/Common/Util';
import { ErrorDetail } from '../styled/ErrormessageStyled';

const SelectedDateCalendar = ({ DefaultDate, setCurrentDate }) => {
    const dispatch = useDispatch();
    const [startDate, setStartdate] = useState("");
    const [endDate, setEnddate] = useState("");
    // const [itemList, setItemList] = useState([]);
    const [itemList, setItemList] = useState([]);
    // useState([{ Id: "1", Name: "20 Oct", Value: "20 Oct 2022", IsActive: true },
    // { Id: "2", Name: "21 Oct", Value: "21 Oct 2022", IsActive: false },
    // { Id: "3", Name: "22 Oct", Value: "22 Oct 2022", IsActive: false },
    // { Id: "4", Name: "5 Feb", Value: "5 feb", IsActive: false },
    // { Id: "5", Name: "6 Feb", Value: "6 feb", IsActive: false },
    // { Id: "6", Name: "7 Feb", Value: "15 feb", IsActive: false },
    // ]);

    const GetHomeworkDetails = useSelector(
        (state: RootState) => state.HomeworkNew.GetHomeworkDetails
    );

    const GetHomeworkDates = useSelector(
        (state: RootState) => state.HomeworkNew.GetHomeworkDates
    );
    const ButtonState = useSelector(
        (state: RootState) => state.HomeworkNew.ButtonState
    );
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
    const [errDates, setErrDates] = useState('')
    const [prevNext, setPrevNext] = useState(0)


    useEffect(() => {
        if (GetHomeworkDates.length > 0) {

            setItemList(GetHomeworkDates.map((item, index) => {
                return index === 0 ?
                    { ...item, IsActive: true } :
                    { ...item, IsActive: false }
            }))
            setCurrentDate(GetHomeworkDates[0].Value)
            setErrDates('')
        } else {
            if (prevNext === -1)
                setErrDates('Homework not available for previous date')
            else if (prevNext === 1)
                setErrDates('Homework not available for Next date')
        }
    }, [GetHomeworkDates])

    useEffect(() => {
        const HomeworkBody =
        {
            aiSchoolId: asSchoolId,
            aiAcademicYearId: asAcademicYearId,
            aiStandardDivisionId: asStandardDivision,
            asStartdate: startDate,
            asEnddate: getHomeworkDateFormatted(new Date())
        }
        dispatch(getHomeworkDates(HomeworkBody))
    }, [])

    const clickItem = (value) => {
        let returnDate = DefaultDate
        value.map((item) => {
            if (item.IsActive)
                returnDate = item.Value
        });
        setCurrentDate(returnDate)
        setItemList(value);
    }
    const [index, setIndex] = useState(0);
    const arrowClick = (value) => {
        setPrevNext(value)


        if (value === -1) {
            const HomeworkBody =
            {
                aiSchoolId: asSchoolId,
                aiAcademicYearId: asAcademicYearId,
                aiStandardDivisionId: asStandardDivision,
                asStartdate: '',
                asEnddate: getNextDate(itemList[0].Value, -1)
            }
            dispatch(getHomeworkDates(HomeworkBody))
        } else
            if (value === 1) {
                const HomeworkBody =
                {
                    aiSchoolId: asSchoolId,
                    aiAcademicYearId: asAcademicYearId,
                    aiStandardDivisionId: asStandardDivision,
                    asStartdate: getNextDate(itemList[itemList.length - 1].Value, 1),
                    asEnddate: ''
                }
                dispatch(getHomeworkDates(HomeworkBody))
            }
    }
    return (
        <div>
            <Container>
                <ErrorDetail>{errDates}</ErrorDetail>
                <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={2} sx={{ textAlign: "center" }}>
                        {/* <IconButton disabled={!ButtonState?.AllowPrevious}> */}
                            <ListStyle><ArrowLeft onClick={() => arrowClick(-1)} /></ListStyle>
                        {/* </IconButton> */}
                    </Grid>
                    <Grid item xs={8}>
                        <HomeworkCard ItemList={itemList} clickItem={clickItem} />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: "center" }}>
                        {/* <IconButton disabled={!ButtonState?.AllowNext}> */}
                            <ListStyle><ArrowRight onClick={() => arrowClick(1)} /></ListStyle>
                        {/* </IconButton> */}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SelectedDateCalendar