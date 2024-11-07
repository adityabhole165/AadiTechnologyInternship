import {
  ProfileDetail1,
  ProfileDetail4,
  ProfileWrapper
} from '../styled/ProfileStyled';

const ProfileComponent = ({ Name, Value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ProfileWrapper>
        <ProfileDetail1>{Name}</ProfileDetail1>
        <ProfileDetail4 style={{
          overflowWrap: 'break-word',
          maxWidth: '600px', 
          wordBreak: 'break-word',
          whiteSpace: 'normal', 
        }}> {Value}</ProfileDetail4>
      </ProfileWrapper>
    </div>
  );
};

export default ProfileComponent;
