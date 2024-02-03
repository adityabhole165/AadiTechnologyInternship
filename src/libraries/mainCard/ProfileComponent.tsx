import {
  ProfileDetail1,
  ProfileDetail4,
  ProfileWrapper
} from '../styled/ProfileStyled';

const ProfileComponent = ({ Name, Value }) => {
  return (
    <div>
      <ProfileWrapper>
        <ProfileDetail1>{Name}</ProfileDetail1>
        <ProfileDetail4> {Value}</ProfileDetail4>
      </ProfileWrapper>
    </div>
  );
};

export default ProfileComponent;
