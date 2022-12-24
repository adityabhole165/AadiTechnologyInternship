import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNewRelease } from 'src/requests/Authentication/NewRelease';
import { useSelector } from "react-redux";
import { RootState } from 'src/store';
import { INewRelease } from 'src/interfaces/Authentication/NewRelease';
import { Typography } from "@mui/material";



var androidCurrentAppVersion = "1.3.4";
var appleCurrentAppVersion = "1.3.3";

var deviceType = "Android";

const NewRelease = () => {
  const dispatch = useDispatch();
const [showVersionUpgradeMessage , setShowVersionUpgradeMessage] = useState()
const MobileSiteURL = localStorage.getItem("SiteURL");
console.log("MobileSiteURL",MobileSiteURL);

    const newVersionDetails = useSelector((state: RootState) => state.NewRelease.Release)

    const releaseBody: INewRelease = {
      "asDeviceType":"Android",
      "asUserCurrentVersion":"3.0.0"
  };
     useEffect(() => {
            dispatch(getNewRelease(releaseBody))
        }, [])
 
  // newVersionDetails.map((item)=>{
  //   const Devicetype = item.DeviceType;
  // })
    var currentAppVersion = "";
    var lastFetchDateTimeValue = null;
    var checkForNewAppVersion = false;

    var userAgent = navigator.userAgent  ; 
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        deviceType = 'Apple';
        currentAppVersion = appleCurrentAppVersion;
    }
    else if (userAgent.match(/Android/i)) {
        deviceType = 'Android';
        currentAppVersion = androidCurrentAppVersion;
    }

    /*Initially set current Appversion into one variable as a integer*/
        var installedVersion = parseInt(currentAppVersion.replace(/[.]/g, ""));
        var appAvailableVersion = 0;

          if ((localStorage.getItem("NewVersionDetails") != null) && (newVersionDetails != null) && (newVersionDetails[0].Version != null) && (newVersionDetails[0].Version != ""))
        {
            /*Here we can set our available version on store */
            appAvailableVersion = parseInt(newVersionDetails[0].Version.replace(/[.]/g, ""))
            lastFetchDateTimeValue = new Date((newVersionDetails[0].LastFetchDate).replace(/-/g,'\/')).getTime();
            const currentDateTimeValue = new Date().getTime();
           // checkForNewAppVersion = ((currentDateTimeValue - lastFetchDateTimeValue) / (24 * 60 * 60 * 1000)) > 1 ? true : false;
            checkForNewAppVersion = ((((currentDateTimeValue - lastFetchDateTimeValue) % (24 * 60 * 60 * 1000)) % 3600000) / 60000) > 5 ? true : false;
        }
        newVersionDetails.map((item)=>{
        if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
          var dataObject = {
              "asDeviceType": deviceType,
              "asUserCurrentVersion": typeof currentAppVersion != "undefined" ? currentAppVersion : ''
          };
       
          // useEffect(() => {
          //             dispatch(getNewRelease(dataObject))
          //         }, [])

          var callBack = function (data) {
              if (data.GetNewAppVersionDetailsResult.IsRefreshSchoolSettings && (location.href.indexOf("Home.htm") != -1 || location.href.indexOf("HomeTeacher.htm") != -1 || location.href.indexOf("HomeAdmin.htm") != -1) && location.href.indexOf("login.html") == -1 && location.href.indexOf("index.html") == -1)
                  // loadSchoolSettings();
              if (data.GetNewAppVersionDetailsResult.Version != null && data.GetNewAppVersionDetailsResult.Version != "") {
                  // newVersionDetails 
                      if (data.GetNewAppVersionDetailsResult.IsForceUpdate == 'True')
                          location.href = "UpgradeVersion.htm";
                      else {
                          setShowVersionUpgradeMessage(data.GetNewAppVersionDetailsResult.AppStoreUrl);
                      }
              }
          };

        //   newVersionDetails.ajax("POST",
        //  MobileSiteURL + "/User/GetNewAppVersionDetails",
        //                           dataObject,
        //                           callBack);
      }
    })
//       else if (appAvailableVersion != 0 && appAvailableVersion > installedVersion) {
//         if (newVersionDetails[0].IsForceUpdate == 'True')
//             location.href = "UpgradeVersion.htm";
//         else {
//           setShowVersionUpgradeMessage(newVersionDetails[0].AppStoreUrl);

//         }
//     }
// }
// catch (e) {
//     SaveErrorLog(e, 'checkForNewVersion', readCookie("UserId"));
// }
// }

        //   useEffect(() => {
        //     dispatch(getNewRelease(dataObject))
        // }, [])
  return (
    <>
     {/* { newVersionDetails.map((item)=>{
      <Typography>{item.ReleaseNotes}</Typography>
     })}
         */}
    </>
  )
  }

export default NewRelease


