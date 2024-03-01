import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IDeleteEventBody, IEventListBody } from "src/interfaces/EventManegment/IEventManegment";
import TabulerList from "src/libraries/ResuableComponents/TabularList";
import { GetDeleteEvent, GetEventtList, resetDeleteEventt, resetEventdetail } from "src/requests/EventManegment/RequestEventManegment";
import { RootState } from "src/store";

const EventManagementList = ({ clickEventEdit, SelectedDate, StandardId, DivisionId }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const TeacherId = Number(sessionStorage.getItem('Id'));

    const EventLisst = useSelector(
        (state: RootState) => state.EventsManagement.EventListt
    );
    const DeleteEventt = useSelector(
        (state: RootState) => state.EventsManagement.DeleteEventt
    );
    console.log(EventLisst, "EventLisst--");

    const EventListBody: IEventListBody = {
        "asEventDate": SelectedDate,
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId,
        "asStandardId": StandardId,
        "asDivisionId": DivisionId
    };
    useEffect(() => {
        dispatch(GetEventtList(EventListBody));
    }, []);

    useEffect(() => {
        if (DeleteEventt !== '') {
            toast.success(DeleteEventt, { toastId: 'success1' });
            dispatch(resetDeleteEventt());
            dispatch(GetEventtList(EventListBody));
            dispatch(resetEventdetail())
        }
    }, [DeleteEventt]);
    const clickeventDelete = (Id) => {
        if (confirm('Are You Sure you want to delete The List')) {
            const DeleteEventBody: IDeleteEventBody = {
                asSchoolId: asSchoolId,
                asEventId: Number(Id),
                asUserId: Number(TeacherId)
            };
            dispatch(GetDeleteEvent(DeleteEventBody));
        }
    };
    console.log(EventLisst, "EventLisst");

    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TabulerList
                        ItemList={EventLisst}
                        clickEdit={clickEventEdit}
                        clickDelete={clickeventDelete}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default EventManagementList