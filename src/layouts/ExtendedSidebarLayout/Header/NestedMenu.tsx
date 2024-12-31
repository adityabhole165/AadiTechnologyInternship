import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    Button,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Popper
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const NestedMenuItem = ({ item, onItemClick, level = 0 }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isChildActive, setIsChildActive] = useState(false);
    const [menuPosition, setMenuPosition] = useState('right');
    const menuRef = useRef(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setIsChildActive(true);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setIsChildActive(false);
    };

    const handleClick = () => {
        onItemClick(item);
    };

    useEffect(() => {
        if (anchorEl && menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const parentRect = anchorEl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            if (parentRect.right + menuRect.width > viewportWidth) {
                setMenuPosition('left');
            } else {
                setMenuPosition('right');
            }

            // Adjust vertical position if needed
            if (parentRect.top + menuRect.height > viewportHeight) {
                menuRef.current.style.maxHeight = `${viewportHeight - parentRect.top - 20}px`;
                menuRef.current.style.overflowY = 'auto';
            } else {
                menuRef.current.style.maxHeight = '';
                menuRef.current.style.overflowY = '';
            }
        }
    }, [anchorEl]);

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: 'relative',
                display: 'flex',
                minWidth: '200px',
                maxWidth: '300px',
                backgroundColor: isChildActive ? 'action.hover' : 'inherit',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <MenuItem
                onClick={handleClick}
                sx={{
                    width: '100%',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ListItemText
                    primary={item.MenuName}
                    primaryTypographyProps={{
                        style: {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }
                    }}
                    sx={{ flex: '1 1 auto', marginRight: '8px' }}
                />
                {item.children && item.children.length > 0 && (
                    <ListItemIcon sx={{ flex: '0 0 auto', minWidth: 'auto' }}>
                        <KeyboardArrowDownIcon />
                    </ListItemIcon>
                )}
            </MenuItem>
            {item.children && Boolean(anchorEl) && (
                <Box
                    ref={menuRef}
                    sx={{
                        position: 'absolute',
                        [menuPosition === 'right' ? 'left' : 'right']: '100%',
                        top: 0,
                        zIndex: 1,
                        backgroundColor: 'background.paper',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        minWidth: '200px',
                        maxWidth: '300px',
                    }}
                >
                    {item.children.map((child) => (
                        <NestedMenuItem
                            key={child.MenuId}
                            item={child}
                            onItemClick={onItemClick}
                            level={level + 1}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

const ImprovedNestedMenu = ({ menuStructure, onItemClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const timeoutRef = useRef(null); // To track the timeout ID

    const handleMouseEnterButton = (event) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any pending timeout when hovering back on the button
        }
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeaveButton = () => {
        timeoutRef.current = setTimeout(() => {
            if (!isMenuHovered) {
                setAnchorEl(null); // Close the menu if the user didn't hover over the menu
            }
        }, 200); // 200ms delay
    };

    const handleMouseEnterMenu = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any pending timeout when the user hovers over the menu
        }
        setIsMenuHovered(true);
    };

    const handleMouseLeaveMenu = () => {
        setIsMenuHovered(false);
        timeoutRef.current = setTimeout(() => {
            setAnchorEl(null); // Close the menu when the user leaves both the button and the menu
        }, 200); // 200ms delay
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Clear timeout on component unmount
            }
        };
    }, []);

    return (
        <Box>
            <Button
                onClick={() => onItemClick(menuStructure)}
                onMouseEnter={handleMouseEnterButton}
                onMouseLeave={handleMouseLeaveButton}
                color="inherit"
                sx={{
                    textWrap: 'nowrap',
                    minWidth: 'auto',
                    maxWidth:'auto'
                }}
            >
                {menuStructure.MenuName}
                {menuStructure.children && menuStructure.children.length > 0 && (
                    <ListItemIcon sx={{ flex: '0 0 auto', minWidth: 'auto', color: 'white'  }}>
                        <KeyboardArrowDownIcon />
                    </ListItemIcon>
                )}
            </Button>
            {menuStructure.children && menuStructure.children.length > 0 &&
                <Popper
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleMouseLeaveMenu}>
                                    <Box
                                        onMouseEnter={handleMouseEnterMenu}
                                        onMouseLeave={handleMouseLeaveMenu}
                                        sx={{
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                                        }}>
                                        {menuStructure.children.map((item) => (
                                            <NestedMenuItem
                                                key={item.MenuId}
                                                item={item}
                                                onItemClick={onItemClick}
                                            />
                                        ))}
                                    </Box>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>}
        </Box>
    );
};

export default ImprovedNestedMenu;
