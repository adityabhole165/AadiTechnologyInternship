import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { INewRelease } from 'src/interfaces/Authentication/NewRelease';
import { getNewRelease } from 'src/requests/Authentication/NewRelease';
import {
  getuserLoginExpires,
  resetuserLoginExpires
} from 'src/requests/UserLoginExpires/RequestUserLoginExpires';
import { RootState } from 'src/store';
import {
  androidCurrentAppVersion,
  appleCurrentAppVersion,
  deviceType
} from '../../Common/Util';
import UpgradeApp from './UpgradeApp';

const NewRelease = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentAppVersion =
    window.localStorage.getItem('deviceType') === 'ios'
      ? appleCurrentAppVersion
      : androidCurrentAppVersion;
  const [showUpgrade, setShowUpgrade] = useState(false);

  const latestVersionDetails = useSelector(
    (state: RootState) => state.NewRelease.Release
  );
  const UserExpires = useSelector(
    (state: RootState) => state.userLoginExpires.UserLoginExpires
  );
  const iOSAppStoreUrl =
    'https://apps.apple.com/in/app/riteschool/id1036759360';
  let lastFetchDateTimeValue = null;
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem('Id');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const LastPasswordChangeDate = sessionStorage.getItem(
    'LastPasswordChangeDate'
  );
  const LoginVersion = localStorage.getItem('LoginVersion');

  useEffect(() => {
    let LogoutMessage = '';
    if (UserExpires != null) {
      //api handles academic year mismatch, account is deacivated, locked and change password scenario
      if (UserExpires.IsLogoutRequired == 'Y') {
        toast.success(UserExpires.Message, { toastId: 'success1' });
        dispatch(resetuserLoginExpires());
        sessionStorage.clear();
        localStorage.removeItem('auth');
        navigate('/');
      }
      dispatch(resetuserLoginExpires());
    }
    // if (lastFetchDateTimeValue == null || checkForNewAppVersion) {
    const releaseBody: INewRelease = {
      asDeviceType: deviceType,
      asUserCurrentVersion:
        deviceType == 'iOS' ? appleCurrentAppVersion : currentAppVersion,
      aiSchoolId: parseInt(asSchoolId),
      asOldLoginVersion: LoginVersion
    };
    dispatch(getNewRelease(releaseBody));
    // }
  }, [UserExpires]);

  useEffect(() => {
    const UserLoginExpiresBody = {
      asSchoolId: asSchoolId,
      asUserId: userId,
      asAcademicYearId: AcademicYearId,
      asUserRoleId: RoleId,
      asLastPasswordChangeDate: LastPasswordChangeDate
    };
    dispatch(getuserLoginExpires(UserLoginExpiresBody));
  }, []);

  useEffect(() => {
    // console.log(latestVersionDetails?.LoginVersionDetails, "LoginVersion")

    // if (latestVersionDetails != null && latestVersionDetails.GetNewAppVersionDetailsResult.Version != null &&
    //     latestVersionDetails.GetNewAppVersionDetailsResult.Version != "") {
    if (latestVersionDetails?.GetNewAppVersionDetailsResult != undefined) {
      // console.log(latestVersionDetails.GetNewAppVersionDetailsResult, "LoginVersion")

      if (
        latestVersionDetails.GetNewAppVersionDetailsResult.Version != null &&
        latestVersionDetails.GetNewAppVersionDetailsResult.Version != ''
      )
        setShowUpgrade(true);

      localStorage.setItem(
        'NewVersionDetails',
        JSON.stringify(latestVersionDetails.GetNewAppVersionDetailsResult)
      );

      if (
        latestVersionDetails.GetNewAppVersionDetailsResult.IsForceUpdate ===
        'True'
      )
        navigate('../../../UpgradeApp');

      let LoginVersion =
        latestVersionDetails.LoginVersionDetails.LatestLoginVersion;

      if (
        LoginVersion !== localStorage.getItem('LoginVersion') ||
        localStorage.getItem('LoginVersion') === null
      ) {
        toast.success('Please login again', { toastId: 'success1' });
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('LoginVersion', LoginVersion);
        navigate('/');
      } else localStorage.setItem('LoginVersion', LoginVersion);
    }
  }, [latestVersionDetails]);

  return (
    <>
      {showUpgrade &&
        latestVersionDetails.GetNewAppVersionDetailsResult.DeviceType.toLowerCase() ===
          (window.localStorage.getItem('deviceType') === 'ios'
            ? 'APPLE'
            : 'android'
          ).toLowerCase() && (
          <>
            <UpgradeApp
              IsForceUpdate={
                latestVersionDetails.GetNewAppVersionDetailsResult.IsForceUpdate
              }
              AppStoreUrl={
                window.localStorage.getItem('deviceType') === 'ios'
                  ? iOSAppStoreUrl
                  : latestVersionDetails.GetNewAppVersionDetailsResult
                      .AppStoreUrl
              }
              ReleaseNotes={
                latestVersionDetails.GetNewAppVersionDetailsResult.ReleaseNotes
              }
            ></UpgradeApp>
          </>
        )}
    </>
  );
};

export default NewRelease;
