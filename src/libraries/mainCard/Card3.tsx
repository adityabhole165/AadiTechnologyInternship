import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCardIcon from '@mui/icons-material/AddCard';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CakeIcon from '@mui/icons-material/Cake';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HelpIcon from '@mui/icons-material/Help';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import SmsIcon from '@mui/icons-material/Sms';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { IconButton, keyframes, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'src/assets/style/Homework_Calci.css';
import 'src/assets/style/student-cal.css';
import {
  BadgeStyle,
  IconCard,
  IconCardSize,
  Text1,
  Text2
} from '../styled/DashboardStyled';

function Card3({
  color,
  text1,
  text2,
  icon,
  iconColor,
  opacityLevel,
  Link1,
  isAvtar,
  ImageUrl,
  Messagecount,
  ExternalLibrarySite = ''
}) {
  const theme = useTheme();
  if (
    theme.colors.gradients.pink1 !==
    'linear-gradient(135deg, white 0%, white 100%);'
  )
    iconColor = 'white';
  const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

  return (
    // Blink annimation if required
    //  <Badge badgeContent="New" color="error" sx={{ animation: `${blink} 1s linear infinite`, float: "right", mr: "15px" }} ></Badge>
    <>
      {text1 === 'Library' && ExternalLibrarySite !== '' ? (
        <a
          href={ExternalLibrarySite}
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <IconCard>
            <IconButton>
              <IconCardSize>
                {icon === 27 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{ width: '20px', height: '22px', marginTop: '8px' }}
                  />
                )}
                <Text1>{text1}</Text1>
              </IconCardSize>
            </IconButton>
          </IconCard>
        </a>
      ) : (
        <Link
          to={`/${location.pathname.split('/')[1]}/${Link1}`}
          style={{ textDecoration: 'none' }}
        >
          <IconCard>
            <IconButton>
              <IconCardSize>
                {icon === 1 && (
                  <AssignmentIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 2 && (
                  <EventIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 3 && (
                  <DateRangeIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 4 && (
                  <PhotoIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 5 && (
                  <VideoLibraryIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 6 && (
                  <EventNoteIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 7 && (
                  <AccessTimeIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 8 && (
                  <CurrencyRupeeIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 9 && (
                  <MenuBookIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 10 && (
                  <LockOpenIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 11 && (
                  <PeopleIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}

                {icon === 12 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{
                      width: '20px',
                      height: '22px',
                      marginTop: '8px',
                      filter:
                        'invert(54%) sepia(88%) saturate(362%) hue-rotate(151deg) brightness(94%) contrast(92%)'
                    }}
                  />
                )}
                {icon === 13 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{ width: '20px', height: '22px', marginTop: '8px' }}
                  />
                )}
                {icon === 14 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{
                      width: '20px',
                      height: '22px',
                      marginTop: '8px',
                      filter:
                        'invert(40%) sepia(87%) saturate(1676%) hue-rotate(333deg) brightness(92%) contrast(105%)'
                    }}
                  />
                )}
                {icon === 15 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{
                      width: '20px',
                      height: '22px',
                      marginTop: '8px',
                      filter:
                        'invert(54%) sepia(88%) saturate(362%) hue-rotate(151deg) contrast(94%)  brightness(92%) '
                    }}
                  />
                )}
                {icon === 16 && (
                  <img
                    src={ImageUrl}
                    alt=""
                    style={{ width: '20px', height: '22px', marginTop: '8px' }}
                  />
                )}

                {icon === 17 && (
                  <BadgeStyle
                    badgeContent={Messagecount}
                    color="error"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <ForwardToInboxIcon
                      sx={{ color: iconColor }}
                      fontSize="medium"
                    />{' '}
                  </BadgeStyle>
                )}

                {icon === 18 && (
                  <SmsIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 19 && (
                  <PeopleIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 20 && (
                  <CakeIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 21 && (
                  <ForwardToInboxIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 22 && (
                  <SmsIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 23 && (
                  <AirportShuttleIcon
                    sx={{ color: iconColor, mb: '-4px' }}
                    fontSize="large"
                  />
                )}
                {icon === 25 && (
                  <HelpIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 26 && (
                  <CakeIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 27 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <img
                      src={ImageUrl}
                      alt=""
                      style={{
                        width: '20px',
                        height: '22px',
                        marginTop: '8px'
                      }}
                    />
                  </>
                )}
                {icon === 28 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <AddCardIcon
                      sx={{ color: iconColor, mt: '7px' }}
                      fontSize="medium"
                    />
                  </>
                )}
                {icon === 29 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <img
                      src={ImageUrl}
                      alt=""
                      style={{
                        width: '25px',
                        height: '25px',
                        marginTop: '4px'
                      }}
                    />
                  </>
                )}
                {icon === 30 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <img
                      src={ImageUrl}
                      alt=""
                      style={{
                        width: '24px',
                        height: '27px',
                        marginTop: '5px'
                      }}
                    />
                  </>
                )}
                {icon === 31 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge>  */}
                    <img
                      src={ImageUrl}
                      alt=""
                      style={{
                        width: '24px',
                        height: '27px',
                        marginTop: '5px'
                      }}
                    />
                  </>
                )}
                {icon === 32 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <PeopleIcon
                      sx={{ color: iconColor, mt: '7px' }}
                      fontSize="medium"
                    />{' '}
                  </>
                )}
                {icon === 33 && (
                  <>
                    {/* <Badge badgeContent="New" color="error" sx={{ float: "right", mr: "15px" }} >
                </Badge> */}
                    <img
                      src={ImageUrl}
                      alt=""
                      style={{
                        width: '36px',
                        height: '35px',
                        marginTop: '3px'
                      }}
                    />
                  </>
                )}
                {icon === 34 && (
                  <MenuBookIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                {icon === 35 && (
                  <MenuIcon
                    sx={{ color: iconColor, mt: '7px' }}
                    fontSize="medium"
                  />
                )}
                <Text1>{text1}</Text1>
                <Text2>{text2}</Text2>
              </IconCardSize>
            </IconButton>
          </IconCard>
        </Link>
      )}
    </>
  );
}

export default Card3;
