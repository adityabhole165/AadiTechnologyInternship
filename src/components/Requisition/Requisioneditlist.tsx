import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Requisioneditlist = ({ ItemList, HeaderArray }) => {

  return (
    <div>

      <TableContainer component={Box} >
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`}}>
          <TableHead sx={{ overflow: 'auto' }}>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
              {HeaderArray.map((headerItem, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white,
                    py: 1
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'left',
                    gap: 1,
                    justifyContent: headerItem.Header.includes('Remark Template') ? 'flex-start' : 'left'
                  }}>
                    <b>{headerItem.Header}</b>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.ItemID}>
                <TableCell sx={{ textTransform: 'capitalize', }}>
                  {item.CreaterName}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', }}>
                  {item.Action}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', }}>
                  {item.Date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Requisioneditlist