import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Checkbox, Grow, IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const DynamicList = ({
  HeaderList,
  ItemList,
  IconList = undefined,
  ClickItem = undefined,
  ClickCheck = undefined,
  IsSelect = 0,
  LinkList = [],
  ClickLink = undefined,
  Data = undefined,
}) => {


  const clickCheckbox = (value) => {
    let arr = [];
    arr = ItemList.map((Item) => {
      return Item.Id === value
        ? { ...Item, IsActive: !Item.IsActive }
        : IsSelect == 1
          ? { ...Item, IsActive: false }
          : Item;
    });
    ClickCheck({ Id: value, Value: arr, Action: 'Select' });
  };
  const CheckAll = () => {
    let arr = [];
    arr = ItemList.map((Item) => {
      return { ...Item, IsActive: !getIsCheckedAll() };
    });
    ClickCheck({ Id: 0, Value: arr, Action: 'Select' });
  };
  const getIsCheckedAll = () => {
    let IsChecked = true;
    ItemList.map((Item) => {
      if (!Item.IsActive) {
        IsChecked = false;
      }
    });
    return IsChecked;
  };
  const IsIntegerOrDecimal = (value) => {
    const re = /\d+\.\d+/;
    return re.test(value);
  };
  const cellStyle = {
    padding: '0.2em 1.5em', // Adjust these values to reduce the height
  };
  const rowStyle = {
    height: '0.5em 1.5em', // Ensure auto height to adjust based on content
  };
  // const rowStyle = {
  //   padding: '0.2em', // Adjust padding to reduce space between rows
  // };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
          >
            {HeaderList.map((item, i) => {
              return (
                <TableCell sx={{ color: 'white' }} align="center" key={i} >
                  <b>{item}</b>
                  {IsSelect == 2 && i == 0 && (
                    <>
                      <br></br>
                      <Checkbox
                        checked={getIsCheckedAll()}
                        onChange={CheckAll}
                      />
                    </>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 1' }}
          {...{ timeout: 1500 }}
        >
          <TableBody>
            {ItemList.map((item, index) => {


              return (
                <TableRow key={index} style={{
                  // backgroundColor: Data[index]?.IsGrey ? '#A9A9A9' : ''
                  //  backgroundColor: Data && Data[index] && Data[index].IsGrey ? '#A9A9A9' : ''
                  backgroundColor: Data && Data[index] && Data[index].IsGrey ? '#D3D3D3' : '', ...rowStyle
                }}>
                  {item.length > 0 && item.map((obj, i) => {
                    return (
                      <TableCell align="center" key={i} style={cellStyle}>
                        {i === 0 ? (
                          <span
                            style={{
                              cursor: 'pointer',
                              color: 'blue',
                              textDecoration: 'underline'
                            }}
                            onClick={(event) => {
                              if (Data[index] && Data[index].IsGrey) {
                                event.preventDefault(); // Prevents the default action of the link
                              } else {
                                ClickLink({ Id: Data[index], Index: i });
                              }
                            }}
                          >
                            {obj}
                          </span>
                        ) : (
                          (Data[index] != undefined && Data[index].IsGrey) ? "-" : obj
                        )}
                      </TableCell>
                    );
                  })}
                  {/* {item.length > 0 && item.map((obj, i) => {
                    return (
                      <TableCell align="center" key={i}
                        onClick={() => {
                          ClickLink({ Id: Data[index], Index: i });
                        }}
                      >

                        {obj}
                      </TableCell>
                    );
                  })} */}
                  {/* {
                                    (IsSelect > 0) &&
                                    <TableCell align="center">
                                        <Checkbox checked={item.IsActive}
                                            onChange={() => { clickCheckbox(item.Id) }}></Checkbox>
                                    </TableCell>
                                } */}


                  {item.Text1 != undefined && (
                    <TableCell
                      align="center" style={cellStyle}
                    >
                      <Tooltip title={item.MoueOverText1 != undefined ? item.MoueOverText1 : ""} key={index}>
                        <span>{item.Text1}</span>
                      </Tooltip>

                    </TableCell>
                  )}
                  {item.Text2 != undefined && (
                    <TableCell align="center" style={cellStyle}>{parseInt(item.Text2)}</TableCell>

                  )}
                  {item.Text3 !== undefined && (
                    <TableCell align="center" style={cellStyle}>{parseInt(item.Text3)}</TableCell>
                  )}
                  {item.Text4 != undefined && (
                    <TableCell align="center" style={cellStyle}>{parseInt(item.Text4)}</TableCell>
                  )}
                  {item.Text5 != undefined && (
                    <TableCell align="center" style={cellStyle}>{parseInt(item.Text5)}</TableCell>
                  )}
                  {item.Text6 != undefined && (
                    <TableCell align="center" style={cellStyle}>{parseInt(item.Text6)}</TableCell>
                  )}
                  {/* {IconList?.map((obj, i) => {
                    return (
                      (Data[index] != undefined && !Data[index].IsGrey) ?
                        < TableCell align="center" key={i}
                          onClick={() => {
                            ClickItem({ Id: i, Action: obj.Action, Index: index });
                          }}
                        >
                          {obj.Icon}
                        </TableCell> :
                        < TableCell>-</TableCell>

                    );
                  })} */}

                  {/* {IconList &&
                    IconList.map((obj, i) => (
                      Data[index] && !Data[index].IsGrey ? (
                        <TableCell
                          align="center"
                          key={i}
                          onClick={() => ClickItem({ Id: i, Action: obj.Action, Index: index })}
                          style={{ cursor: 'pointer' }} // Apply cursor pointer style here
                        >
                          {obj.Icon}
                        </TableCell>
                      ) : (
                        <TableCell key={i}>-</TableCell>
                      )
                    ))}
                </TableRow> */}
                  {IconList &&
                    IconList.map((obj, i) => (
                      <TableCell align="center" style={cellStyle} key={i}>
                        {Data[index] && !Data[index].IsGrey ? (
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => ClickItem({ Id: i, Action: obj.Action, Index: index })}
                              sx={{
                                color: '#223354',
                                '&:hover': {
                                  color: '#223354',
                                  cursor: 'pointer'
                                }
                              }}
                            >
                              <EditTwoTone />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Grow>
      </Table>
    </TableContainer >
  );
};

export default DynamicList;
