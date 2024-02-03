export const CardStyle = {
  '@media (max-width:600px)': {
    height: '300px',
    overflow: 'auto'
  }
};

export const MessageStyle = (theme) => ({
  [theme.breakpoints.only('md')]: {
    mt: '50px',
    ml: '-190px'
  },
  [theme.breakpoints.only('lg')]: {
    ml: '-290px',
    mt: '50px'
  }
});

export const ChangePasswordStyle = {
  '@media (min-width:600px)': {
    padding: '18px'
  }
};

export const messageCenter = {
  mt: '-10px',
  '@media (max-width:600px)': {
    mt: '-30px'
  }
};

export const messageCenterCale = {
  mt: '-8px',
  '@media (max-width:600px)': {
    mt: '-18px'
  }
};

export const ListHeight = {
  '@media (min-width: 600px)': {
    height: '200px'
  }
};

export const TabListHeight = {
  height: '60px',
  '@media (min-width: 600px)': {
    height: '80px'
  }
};

export const ReadRecipient = {
  mt: '-15px',
  '@media (min-width: 600px)': {
    mt: '-10px'
  }
};

export const MarkAsReadMessage = {
  mb: '0px',
  mt: '-10px',
  '@media (min-width: 600px)': {
    mb: '20px'
  }
};

export const DeleteButton = {
  mt: '5px',

  '@media (min-width: 600px)': {
    mt: '-10px'
  }
};

export const ProfileAddress = {
  ml: '10px',
  fontWeight: 'bold',
  width: '70px',

  '@media (max-width: 350px)': {
    width: '90px'
  },

  '@media (min-width: 350px) and @media (max-width: 500px)': {
    width: '50px'
  }
};
