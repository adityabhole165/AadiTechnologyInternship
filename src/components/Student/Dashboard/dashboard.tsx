import UnreadMessages from './UnreadMessages';
import UpcomingEvents from './UpcomingEvents';
import Messagefrom from 'src/components/Student/Dashboard/Messagefrom'
import PageHeader from "src/libraries/heading/PageHeader";
import Feedback from 'src/components/Student/Dashboard/Feedback'
import Birthdays from './Birthdays';
import PhotoAlbum from './PhotoAlbum';

function Dashboard() {

  return (
    <>
      <PageHeader heading={"Dashboard"} subheading={""} />
      <Birthdays />
      <br />
      <PhotoAlbum/>
      <br />
      <UnreadMessages />
      <br />
      <UpcomingEvents />
      <br />
      <Messagefrom />
      <br />
      <Feedback />
    </>

  )
}

export default Dashboard;

