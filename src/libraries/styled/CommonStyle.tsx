export const CardStyle = {
    '@media (max-width:600px)': {
     height: "300px", overflow: "auto"
    },
    };

  export const  MessageStyle = (theme)=> ({
    [theme.breakpoints.only('md')]: {
        mt:"50px",
        ml:"-190px"
      },
      [theme.breakpoints.only('lg')]: {
        ml:"-290px",
        mt:"50px"
      },
 });

 export const ChangePasswordStyle = {
  '@media (min-width:600px)': {
  padding:"18px"
  },
  };



  export const messageCenter = {
    mt:"-20px",
    '@media (max-width:600px)': {
            mt:"-40px"
    },
    };

  