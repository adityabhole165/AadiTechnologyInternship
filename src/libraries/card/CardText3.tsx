import { Box, Paper, Typography, Card } from '@mui/material';

function CardText3({item}) {
  return (
    <div>
        <Card  component={Box}  my={1} >
         <Box display={"flex"} justifyContent={'space-between'} sx={{backgroundColor:"#c5cae9"}}  p={0.8}>
         <Typography variant="h5">{item.Header}</Typography>
         <Typography variant="body2">{item.Text2}</Typography>
         </Box>
         <Typography variant="body2" p={0.8}>{item.Text3}</Typography>
         </Card>
    </div>
  )
}

export default CardText3
