import { makeStyles } from '@mui/styles';

export const Styles = makeStyles({
  tableRow: {
    hover: {
      '&$hover:hover': {
        backgroundColor: '#49bb7b !important'
      }
    }
  },

  logo: {
    width: '100px',
    margin: 'auto'
  },

  smalllogo: {
    // width: '100%',
    margin: 'auto',
    maxHeight: 70
  },
  check: {
    fontWeight: 'bold !important',
    fontStyle: 'Italic !important'
  },

  logoLable: {
    margin: '0',
    fontWeight: '700',
    fontSize: '18px',
    fontFamily: 'Segoe UI Emoji',
    lineHeight: '1.235',
    color: '#ffffff'
  },

  //List

  ListStyle: {
    borderRadius: '6px !important',
    marginBottom: '8px !important',
    boxShadow:
      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
  },

  ListStyle1: {
    boxShadow:
      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
  },
  Listfont1: {
    left: '1px',
    fontSize: '13px !important',
    fontWeight: 'bold !important',
    color: 'black'
  },
  Listfont2: {
    left: '1px',
    fontSize: '12px !important',
    color: 'black',
    fontWeight: 'bold !important'
  },
  Listfont3: {
    left: '1px',
    fontSize: '13px !important',
    fontWeight: 'bold !important',
    color: 'black'
  },
  Listfont4: {
    left: '0px',
    fontSize: '12px !important',
    color: 'black'
  },

  //icons
  backArrow: {
    width: '35px !important',
    height: '10px !important',
    borderRadius: '4px !important',
    marginTop: '-17px !important',
    marginLeft: '-16px !important',
    boxShadow:
      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
  },

  backArrow1: {
    width: '35px !important',
    height: '10px !important',
    borderRadius: '4px !important',
    marginTop: '-63px !important',
    marginLeft: '0px !important',
    paddingLeft: '0px'
  },

  InfoTwoToneIcon: {
    transform: 'translate3d(15px, 0.5px, 0px) !important'
  },

  //card
  Cardfont1: {
    fontSize: '13px !important',
    fontWeight: 'bold !important',
    color: 'black'
  },
  Cardfont2: {
    left: '1px',
    fontSize: '12px !important',
    color: 'black',
    marginBottom: '10px !important'
  },
  CardBottomMargin: {
    left: '1px',
    fontSize: '12px !important',
    color: 'black'
  },

  //text decoretion
  TextDecoration: {
    textDecoration: 'none'
  },

  //accordion
  color1: {
    color: '#ec6464'
  },

  color2: {
    color: '#659bd2'
  },

  colorpta1: {
    backgroundColor: '#e9a69a !important'
  },

  colorpta2: {
    // color: "#659bd2"
    backgroundColor: '#c8dccb !important'
  },

  root: {
    '& .MuiFormLabel-root': {
      color: '#362b32cf',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  },

  //pta
  roo1: {
    paddingBottom: '0 !important',
    paddingTop: '0 !important',
    marginLeft: '-17px !important',
    marginRight: '-17px !important',
    borderRadius: '10px !important',
    marginBottom: '10px !important',
    marginTop: '10px !important',
    color: 'black !important'
  },
  root2: {
    display: 'flex',
    // justifyContent:"space-between",
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '10px',
    paddingTop: '5px'
  },
  gridstart: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '100%'
  },
  gridend: {
    display: 'flex !important',
    justifyContent: 'flex-end !important',
    maxWidth: '100% !important'
  },
  // school notice
  cardfont3: {
    left: '1px',
    fontSize: '14px !important',
    marginBottom: '10px !important',
    color: 'black'
  },
  //Homework

  background: {
    backgroundColor: 'transparent !important', //"#5c5f628a !important",
    boxShadow: 'none !important'
  },

  activebox: {
    backgroundColor: 'red'
  },

  // accordionDetails:{
  //   marginBottom: "10px !important",
  //    borderRadius: "5px !important",
  //    borderBottom:"10px !important",
  //    backgroundColor:"#5c5f628a" ,
  //    borderColor:"black !important"
  // },

  date: {
    color: 'black',
    borderRadius: '2px',
    textTransform: 'uppercase'
  },

  //Compose
  InputField: {
    marginTop: '20px !important'
    // width: "50%",
    // background: "white",
    // borderTopLeftRadius: "10px",
    // borderTopRightRadius: "10px"
  },
  error: {
    marginBottom: -2,
    marginTop: -2,
    color: 'red',
    fontWeight: 'bold',
    fontSize: '12px !important',
    '@media (max-width: 280px)': {
      fontSize: '10px !important'
    }
  },
  Autocomplete: {
    background: 'black'
  },
  //Sent

  Reply: {
    width: '80px !important',
    height: '15px !important',
    borderRadius: '10px !important',
    marginTop: '15px !important',
    marginLeft: '0px !important',
    paddingBlock: '17px !important',
    color: 'white !important'
  },

  Forward: {
    width: '80px !important',
    height: '15px !important',
    borderRadius: '10px !important',
    marginTop: '15px !important',
    marginLeft: '90px !important',
    paddingBlock: '17px !important',
    color: 'white !important'
  },

  //errorMessage
  errorMessage: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    color: 'red',
    fontSize: '17px !important',
    marginTop: '20% !important'
  },
  errorMessage2: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    color: 'red',
    fontSize: '17px !important'
  },

  ellipsis: {
    marginTop: '-7px',
    fontWeight: 'bold !important',
    color: 'black !important',
    textOverflow: 'ellipsis !important',
    overflow: 'hidden !important'
  },
  form1: {
    width: '35px !important',
    height: '10px !important',
    borderRadius: '10px !important',
    marginTop: '5px !important',
    marginLeft: '0px !important',
    paddingBlock: '15px !important',
    color: 'black !important'
  },
  back: {
    width: '35px !important',
    height: '10px !important',
    borderRadius: '10px !important',
    marginTop: '6px !important',
    marginLeft: '70px !important',
    paddingBlock: '15px !important',
    color: 'black !important'
  },
  border: {
    // borderColor:"black !important",
    // borderStyle:" solid !important"
    border: '1px #303030   solid'
  },
  attendance1: {
    backgroundColor: '#f33737 !important'
  },

  attendance2: {
    backgroundColor: 'black !important'
  },

  errorMessage3: {
    textAlign: 'center',
    fontWeight: 'bold !important',
    color: 'red',
    fontSize: '17px !important',
    marginTop: '1% !important'
  },
  errorMessage4: {
    fontWeight: 'bold !important',
    color: 'red',
    fontSize: '17px !important',
    marginTop: '1% !important'
  },

  Accodian: {
    padding: '8px',
    cursor: 'pointer'
  },

  accodianHeader: {
    paddingTop: '2px',
    paddingLeft: '10px'
  },

  CardStyle: {
    marginTop: '5px',
    boxShadow:
      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
  },

  attchmentIcon: {
    marginTop: '1rem',
    transform: 'rotateZ(-36deg)',
    marginRight: '-20px',
    float: 'right',
    position: 'absolute'
  },

  ListFont5: {
    fontSize: '12px !important',
    color: 'black'
  },
  ListFont1: {
    float: 'right',

    fontSize: '12px !important',
    color: 'black',
    fontWeight: 'bold !important'
  },

  ListFont2: {
    float: 'right',
    marginLeft: '-20px',

    fontSize: '12px !important',
    color: 'black'
  },

  iIconExamSchedule: {
    fontSize: '20px !important',
    marginTop: '10px',
    backgroundColor: '#e8a0e7',
    borderRadius: '50px',
    marginRight: '-15px',
    '@media (max-width: 280px)': {
      fontSize: '15px !important',
      marginTop: '10px'
    }
  },

  iIconTExamSchedule: {
    fontSize: '20px !important',
    marginTop: '20px',
    backgroundColor: '#e8a0e7',
    borderRadius: '50px',
    marginRight: '8px',
    '@media (max-width: 280px)': {
      fontSize: '15px !important',
      marginRight: '10px'
    }
  },

  iIconSupport: {
    fontSize: '20px !important',

    '@media (max-width: 280px)': {
      fontSize: '15px !important'
      // marginTop: '20px',
    }
  },

  checkboxSize: {
    fontSize: '26px !important',

    '@media (max-width: 280px)': {
      fontSize: '16px !important'
    }
  },

  IconSize: {
    '@media (min-width: 600px)': {
      fontSize: '40px !important'
    }
  },

  Attandance: {
    '@media (min-width: 900px)': {
      marginTop: '-80px'
    }
  },

  AttandanceError: {
    '@media (max-width: 900px)': {
      marginTop: '-680px'
    }
  },

  footer: {
    '@media (max-height: 600px)': {
      // display: "none",
    }
  }
});
