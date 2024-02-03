import Feedback from 'src/components/Student/Dashboard/Feedback';
import Messagefrom from 'src/components/Student/Dashboard/Messagefrom';
import PageHeader from 'src/libraries/heading/PageHeader';
import Birthdays from './Birthdays';
import PhotoAlbum from './PhotoAlbum';
import UnreadMessages from './UnreadMessages';
import UpcomingEvents from './UpcomingEvents';

function Dashboard() {
  return (
    <>
      <PageHeader heading={'Dashboard'} subheading={''} />
      <Birthdays />
      <br />
      <PhotoAlbum />
      <br />
      <UnreadMessages />
      <br />
      <UpcomingEvents />
      <br />
      <Messagefrom />
      <br />
      <Feedback />
    </>
  );
}

export default Dashboard;
