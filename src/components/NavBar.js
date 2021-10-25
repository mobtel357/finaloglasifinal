import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import Add from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';

import { useAuth0 } from "@auth0/auth0-react";
import AlertDialog from './AlertDialog';

export default function NavBar() {

    const { user, isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    const [modalVisible, setmodalVisible] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const history = useHistory();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const access = () => {
        if (!isAuthenticated) {
            loginWithRedirect()
        }
        else {
            setmodalVisible(true);
        }
    }

    const cancel = () => {
        setmodalVisible(false);
    }

    const logout1 = () => {
        logout({
            returnTo: window.location.origin,
        })
    }



    return (
        <React.Fragment>
            <Box sx={{ display: "flex", p: 1, bgcolor: "lightgray" }}>
                <Typography sx={{ p: 1, flexGrow: 1 }}>Contact</Typography>


                <Typography sx={{ p: 1 }}>
                    
                        <Button variant="contained" startIcon={<Add />} onClick={()=>history.push("/AddAdvertise")}>Dodaj oglas</Button>
                </Typography>
                <Typography sx={{ p: 1 }}>
                    {isAuthenticated ? <Button variant="contained" startIcon={<Logout />} onClick={() => access()}>Logout</Button> :
                        <Button variant="contained" startIcon={<Login />} onClick={() => access()}>Login</Button>}
                </Typography>
                
                {isAuthenticated ? <Tooltip title="Account settings">

                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>{user.name}</Avatar>
                    </IconButton>
                </Tooltip> : ''}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            {modalVisible ? <AlertDialog opened={modalVisible} onConfirm={logout1} title="Da li ste sigurni da zelite da se odjavite" onCancel={cancel} /> : ''}
        </React.Fragment>
    );
}