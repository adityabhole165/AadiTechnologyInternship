import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNewRelease } from 'src/requests/Authentication/NewRelease';
import { useSelector } from "react-redux";
import { RootState } from 'src/store';
import { INewRelease } from 'src/interfaces/Authentication/NewRelease';
import { CardDetail2, ListStyle1, ListStyle, Wordbreak1, NewCard, NewStyle } from "src/libraries/styled/CardStyle";
import { Card, Container, Grid, Typography, Box } from "@mui/material";
import school2 from 'src/assets/img/Shool_Logo/school2.png';
import { androidCurrentAppVersion, appleCurrentAppVersion, deviceType } from "../../Common/Util"
import UpgradeApp from "./UpgradeApp";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getuserLoginExpires, resetuserLoginExpires } from "src/requests/UserLoginExpires/RequestUserLoginExpires"
import { IUserLoginExpiresBody } from "src/interfaces/Student/ICheckForUserLoginExpires";

const NewRelease = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let currentAppVersion = androidCurrentAppVersion;
    const [showUpgrade, setShowUpgrade] = useState(false);

    const latestVersionDetails = useSelector((state: RootState) => state.NewRelease.Release)
    const UserExpires = useSelector(
        (state: RootState) => state.userLoginExpires.UserLoginExpires);
    const iOSAppStoreUrl = 'https://apps.apple.com/in/app/riteschool/id1036759360'
    let lastFetchDateTimeValue = null;
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const userId = sessionStorage.getItem('Id');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');


    useEffect(() => {
        let LogoutMessage = ""
        if (UserExpires != null) {
            //api handles academic year mismatch, account is deacivated, locked and change password scenario
            if (UserExpires.IsLogoutRequired == "Y") {
                toast.success(UserExpires.Message, { toastId: 'success1' })
                sessionStorage.clear();
                localStorage.removeItem("auth")
                navigate('/');
            }
        }
        // if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
        const releaseBody: INewRelease = {
            asDeviceType: deviceType,
            asUserCurrentVersion: deviceType == 'iOS' ? appleCurrentAppVersion : currentAppVersion,
            aiSchoolId: parseInt(asSchoolId),
            asOldLoginVersion: localStorage.getItem("LoginVersion")
        };
        dispatch(getNewRelease(releaseBody))
        // }
    }, [UserExpires])


    useEffect(() => {

        const UserLoginExpiresBody =
        {
            asSchoolId: asSchoolId,
            asUserId: userId,
            asAcademicYearId: AcademicYearId,
            asUserRoleId: RoleId,
            asLastPasswordChangeDate: sessionStorage.getItem('LastPasswordChangeDate')
        }
        dispatch(getuserLoginExpires(UserLoginExpiresBody))
    }, [])

    useEffect(() => {
        console.log(latestVersionDetails?.LoginVersionDetails, "LoginVersion")

        // if (latestVersionDetails != null && latestVersionDetails.GetNewAppVersionDetailsResult.Version != null &&
        //     latestVersionDetails.GetNewAppVersionDetailsResult.Version != "") {
        if (latestVersionDetails?.GetNewAppVersionDetailsResult != undefined) {

            console.log(latestVersionDetails.GetNewAppVersionDetailsResult, "LoginVersion")

            if (latestVersionDetails.GetNewAppVersionDetailsResult.Version != null &&
                latestVersionDetails.GetNewAppVersionDetailsResult.Version != "")
                setShowUpgrade(true)

            localStorage.setItem("NewVersionDetails", JSON.stringify(latestVersionDetails))

            if (latestVersionDetails.GetNewAppVersionDetailsResult.IsForceUpdate === 'True')
                navigate('../../../UpgradeApp');

            let LoginVersion = latestVersionDetails.LoginVersionDetails.LatestLoginVersion
            
            if (LoginVersion !== localStorage.getItem('LoginVersion') ||
                localStorage.getItem('LoginVersion') === null) {

                toast.success("Please login again", { toastId: 'success1' })
                localStorage.clear();
                sessionStorage.clear();
                localStorage.setItem('LoginVersion', LoginVersion)
                navigate('/');
            }
            else
                localStorage.setItem('LoginVersion', LoginVersion)
        }
    }, [latestVersionDetails])

    return (
        <>
            {showUpgrade &&
                (<><UpgradeApp IsForceUpdate={latestVersionDetails.IsForceUpdate}
                    AppStoreUrl={window.localStorage.getItem('deviceType') === 'ios' ? iOSAppStoreUrl : latestVersionDetails.AppStoreUrl}
                    ReleaseNotes={latestVersionDetails.ReleaseNotes}></UpgradeApp></>)
            }</>
    )
}

export default NewRelease









