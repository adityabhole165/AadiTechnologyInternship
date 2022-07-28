import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { getviewSchoolNotice } from "src/Client_Api/Common/Schoolnotice";
import { GetSchoolNoticeListResult } from "../../../Interface/Common/SchoolNotice";
import IViewschoolnotice from "../../../Interface/Student/ViewSchoolNotice";
import { useParams } from "react-router";
import Card5 from "src/UI_Library/card/card5";

function Viewschoolnotice() {

    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = sessionStorage.getItem('Id');

    const dispatch = useDispatch();

    const ViewSchoolnotice = useSelector((state: RootState) => state.Schoolnotice.ViewSchoolNotice);
    const { ID } = useParams();
    const body: IViewschoolnotice = {
        "asSchoolId": asSchoolId,
        "asNoticeId": `${ID}`,
        "asUserId": asUserId
    };

    useEffect(() => {
        dispatch(getviewSchoolNotice(body))
    }, [])
    
    return (
        <div>
            {
                ViewSchoolnotice.map((items: GetSchoolNoticeListResult, i) => (
                    <Card5 FileName={items.FileName} Content={items.Content} Name={items.Name} key={i} />
                ))
            }
        </div>
    )
}
export default Viewschoolnotice