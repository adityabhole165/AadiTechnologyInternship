import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNewRelease } from 'src/requests/Authentication/NewRelease';
import { useSelector } from "react-redux";
import { RootState } from 'src/store';
import { INewRelease } from 'src/interfaces/Authentication/NewRelease';
import { Wordbreak1 } from "src/libraries/styled/CardStyle";

const NewRelease = ({ onChangeVersion }) => {

    const dispatch = useDispatch();
    const [showUpgrade, setShowUpgrade] = useState(false)
    const androidCurrentAppVersion = "1.3.4";
    const appleCurrentAppVersion = "1.3.3";
    let deviceType = "Android";
    let currentAppVersion = androidCurrentAppVersion;
    const userAgent = navigator.userAgent
    // || navigator.bendo || window.opera;
    // if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    //     deviceType = 'Apple';
    //     currentAppVersion = appleCurrentAppVersion;
    // }
    // else if (userAgent.match(/Android/i)) {
    //     deviceType = 'Android';
    //     currentAppVersion = androidCurrentAppVersion;
    // }

    const latestVersionDetails = useSelector((state: RootState) => state.NewRelease.Release)
    const newVersionDetails = JSON.parse(localStorage.getItem("NewVersionDetails"));
    const installedVersion = parseInt(currentAppVersion.replace(/[.]/g, ""));
    let lastFetchDateTimeValue = null;
    useEffect(() => {

        // if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
        const releaseBody: INewRelease = {
            "asDeviceType": deviceType,
            "asUserCurrentVersion": currentAppVersion
        };
        dispatch(getNewRelease(releaseBody))
        // }
    }, [])
    useEffect(() => {
        if (latestVersionDetails != null && latestVersionDetails.Version != null && latestVersionDetails.Version != "") {
            setShowUpgrade(true)
            localStorage.setItem("NewVersionDetails", JSON.stringify(latestVersionDetails))
            if (latestVersionDetails.IsForceUpdate === 'True')
                onChangeVersion()
        }
    }, [latestVersionDetails])

    const checkForNewAppVersion = () => {
        let appAvailableVersion = 0;
        let checkForNewAppVersion = false
        if ((localStorage.getItem("NewVersionDetails") != null) &&
            (newVersionDetails != null) && (newVersionDetails.Version != null) &&
            (newVersionDetails.Version != "")) {
            /*Here we can set our available version on store */
            appAvailableVersion = parseInt(newVersionDetails.Version.replace(/[.]/g, ""));
            lastFetchDateTimeValue = new Date((newVersionDetails.LastFetchDate).replace(/-/g, '\/')).getTime();
            const currentDateTimeValue = new Date().getTime();
            checkForNewAppVersion = ((((currentDateTimeValue - lastFetchDateTimeValue) % (24 * 60 * 60 * 1000)) % 3600000) / 60000) > 5 ? true : false;
        }
        return checkForNewAppVersion;
    }
    return (
        <div>
            {showUpgrade &&
                (<><div >
                    A new version of app is available.<br />
                    <a href={latestVersionDetails.AppStoreUrl}>Click here to upgrade.</a>
                </div>
                    {latestVersionDetails.IsForceUpdate === 'True' &&
                        <Wordbreak1 dangerouslySetInnerHTML={{ __html: latestVersionDetails.ReleaseNotes }} />
                    }
                </>)}
        </div>
    )
}

export default NewRelease