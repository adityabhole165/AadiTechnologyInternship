import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AlertContext } from "src/contexts/AlertContext";
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
    const { showAlert, closeAlert } = useContext(AlertContext);
    const EventLisst = useSelector(
        (state: RootState) => state.EventsManagement.EventListt
    );
    const DeleteEventt = useSelector(
        (state: RootState) => state.EventsManagement.DeleteEventt
    );

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
        if (EventLisst.length > 0)
            clickEventEdit(EventLisst[0].Id)
    }, [EventLisst]);

    useEffect(() => {
        if (DeleteEventt !== '') {
            toast.success(DeleteEventt, { toastId: 'success1' });
            dispatch(resetDeleteEventt());
            dispatch(GetEventtList(EventListBody));
            dispatch(resetEventdetail())
        }
    }, [DeleteEventt]);
    // const clickeventDelete = (Id) => {
    //     if (confirm('Are you sure you want to delete the event?')) {
    //         const DeleteEventBody: IDeleteEventBody = {
    //             asSchoolId: asSchoolId,
    //             asEventId: Number(Id),
    //             asUserId: Number(TeacherId)
    //         };
    //         dispatch(GetDeleteEvent(DeleteEventBody));
    //     }
    // };
    const clickeventDelete = (Id) => {
        const DeleteEventBody: IDeleteEventBody = {
            asSchoolId: asSchoolId,
            asEventId: Number(Id),
            asUserId: Number(TeacherId)
        };
        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete the event?  ',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(GetDeleteEvent(DeleteEventBody));
                closeAlert();
            }
        });
    };
    return (
        <Grid container spacing={2} pb={1}>
            <Grid item xs={12}>
                <TabulerList
                    ItemList={EventLisst}
                    clickEdit={clickEventEdit}
                    clickDelete={clickeventDelete}
                />
            </Grid>
        </Grid>
    )
}

export default EventManagementList