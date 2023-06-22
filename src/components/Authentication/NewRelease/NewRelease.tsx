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
import { getuserLoginExpires } from "src/requests/UserLoginExpires/RequestUserLoginExpires"

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
    const LastPassword = sessionStorage.getItem("LastPasswordChangeDate");

    const UserLoginExpiresBody =
    {
        asSchoolId: asSchoolId,
        asUserId: userId,
        asAcademicYearId: AcademicYearId,
        asUserRoleId: RoleId,
        asLastPasswordChangeDate: LastPassword
    }


    useEffect(() => {
        let LogoutMessage = ""
        if (UserExpires != null) {
            if (UserExpires.IsLocked == "Y") {
                LogoutMessage = "Your account is locked"
            }
            if (UserExpires.IsLogoutRequired == "Y" || 
            UserExpires.CurrentAcademicYearID.toString() !== sessionStorage.getItem('AcademicYearId')) {
                LogoutMessage = "Please login again"
            }
            if (UserExpires.LastPasswordChangeDate !== sessionStorage.getItem("LastPasswordChangeDate")) {
                LogoutMessage = "You are using old password"
            }
            if (LogoutMessage != "") {
                toast.success(UserExpires.Message, { toastId: 'success1' })
                navigate('/');
            }
        }
        // if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
        const releaseBody: INewRelease = {
            "asDeviceType": deviceType,
            "asUserCurrentVersion": deviceType == 'iOS' ? appleCurrentAppVersion : currentAppVersion
        };
        dispatch(getNewRelease(releaseBody))
        // }
    }, [UserExpires])


    useEffect(() => {
        // if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
        const releaseBody: INewRelease = {
            "asDeviceType": deviceType,
            "asUserCurrentVersion": deviceType == 'iOS' ? appleCurrentAppVersion : currentAppVersion
        };
        dispatch(getuserLoginExpires(UserLoginExpiresBody))
        // }
    }, [])
    useEffect(() => {
        if (latestVersionDetails != null && latestVersionDetails.Version != null && latestVersionDetails.Version != "") {
            setShowUpgrade(true)
            localStorage.setItem("NewVersionDetails", JSON.stringify(latestVersionDetails))
            if (latestVersionDetails.IsForceUpdate === 'True')
                navigate('../../../UpgradeApp');
            if (latestVersionDetails.IsForceLogout === 'True') {
                sessionStorage.clear();
                navigate('/');
            }
        }
    }, [latestVersionDetails])

    // const checkForNewAppVersion = () => {
    //     let appAvailableVersion = 0;
    //     let checkForNewAppVersion = false
    //     if ((localStorage.getItem("NewVersionDetails") != null) &&
    //         (newVersionDetails != null) && (newVersionDetails.Version != null) &&
    //         (newVersionDetails.Version != "")) {
    //         /*Here we can set our available version on store */
    //         appAvailableVersion = parseInt(newVersionDetails.Version.replace(/[.]/g, ""));
    //         lastFetchDateTimeValue = new Date((newVersionDetails.LastFetchDate).replace(/-/g, '\/')).getTime();
    //         const currentDateTimeValue = new Date().getTime();
    //         checkForNewAppVersion = ((((currentDateTimeValue - lastFetchDateTimeValue) % (24 * 60 * 60 * 1000)) % 3600000) / 60000) > 5 ? true : false;
    //     }
    //     return checkForNewAppVersion;
    // }
    return (
        <>
            {showUpgrade &&
                (<><UpgradeApp IsForceUpdate={latestVersionDetails.IsForceUpdate}
                    AppStoreUrl={window.localStorage.getItem('deviceType') === 'ios' ? iOSAppStoreUrl : latestVersionDetails.AppStoreUrl}
                    ReleaseNotes={latestVersionDetails.ReleaseNotes}></UpgradeApp></>)
            }</>
        // <Container>
        //     {showUpgrade &&
        //         (<>
        //          <Grid  textAlign="center">
        //         <a href='https://www.regulusit.net' target="_blank" rel="noreferrer">
        //            <img src={school2} height={70}/>
        //          </a>
        //         </Grid>
        //         <ListStyle sx={{textAlign:"center",backgroundColor:"#80cbc4"}} >
        //            <NewCard><b>A new version of app is available.</b><br /></NewCard> 
        //             <a href={latestVersionDetails.AppStoreUrl}><NewCard>Click here to upgrade.</NewCard></a>
        //         </ListStyle>
        //         <Box >

        //         </Box>
        //             {latestVersionDetails.IsForceUpdate === 'True' &&
        //              <NewStyle sx={{backgroundColor:"#e0f2f1"}}>
        //                     <Typography sx={{ml:"10px",mt:"10px"}}><b>What's New?</b></Typography>
        //              <NewCard dangerouslySetInnerHTML={{ __html: latestVersionDetails.ReleaseNotes }} />
        //              </NewStyle>
        //             }
        //         </>)}
        // </Container>
    )
}

export default NewRelease









