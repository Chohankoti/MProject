import React, { useState, useEffect } from 'react';
import logo from "./ohlogo.png";
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ViewAgenda } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CategoryIcon from '@mui/icons-material/Category';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import { MessageRounded } from '@mui/icons-material';
import { Message } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: '#4F8EF5',
        color:"black",
    },
}));

const SidebarItem = styled(ListItem)(({ theme }) => ({
    color: 'black !important', 
    '&:hover': {
        backgroundColor: 'black',
    },
    '&:hover .MuiListItemText-primary': {
        color: '#4F8EF5',
    },
}));


const logoStyle = {
    width: '200px',
    height: '200px',
    backgroundSize: 'cover',
  };

  const iconStyle = {
    color: 'white', // Set the icon color to white
  };
  

const   OwnerHome = () => {
    const usenavigate = useNavigate();
    let username=sessionStorage.getItem('username');
    useEffect(() => {
        if (username === '' || username === null) {
            usenavigate('/login');
        }
        else{
            usenavigate('dashboard')
            console.log(username)
          }
    }, []);

    const [open, setOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Hidden mdUp>
                {/* Render a hamburger icon for small screens */}
                <IconButton onClick={toggleSidebar}>
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Sidebar
                variant="temporary"
                open={open}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Box p={2}>
                    <Typography variant="h6" style={{ color: 'white' }}>

                    </Typography>
                </Box>
                <List>
                    {/* Sidebar links */}
                    {[
                        { to: 'dashboard', text: 'Dashboard', icon: <DashboardIcon style={iconStyle} /> },
                        {to: `addhotel`, text: 'Manage Hotel', icon: <ApartmentIcon style={iconStyle}/>},
                        { to: 'addroom', text: 'Addroom', icon: <ApartmentIcon style={iconStyle}/> },
                        { to: 'viewbooking', text: 'View bookings', icon: <ViewAgenda style={iconStyle} /> },
                        { to: 'viewfeedback', text: 'View feedback', icon: <MessageTwoToneIcon style={iconStyle}/> },
                        { to: 'viewmessage', text: 'View message', icon: <Message style={iconStyle}/> },
                        { to: '/login', text: 'Logout', icon: <Logout /> },
                    ].map((link, index) => (
                        <SidebarItem
                            key={index}
                            button
                            component={Link}
                            to={link.to}
                            selected={location.pathname === link.to}
                            style={{ textAlign: link.alignRight ? 'right' : 'left' }}
                        >
                            <ListItemIcon>{link.icon}</ListItemIcon>
                            <ListItemText primary={link.text} />
                        </SidebarItem>
                    ))}
                </List>
            </Sidebar>
            <Hidden smDown>
                {/* Render the sidebar for medium and larger screens */}
                <Sidebar variant="permanent" open>
                    <Box p={2}>
                        <Box p={2}>
                            <img src={logo} alt="Hotel Logo" style={logoStyle}/>
                        </Box>
                        <Typography variant="h6" style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                            Owner Panel
                        </Typography>
                    </Box>
                    <List>
                        {/* Sidebar links */}
                        {[
                            { to: 'dashboard', text: 'Dashboard', icon: <DashboardIcon style={iconStyle}/> },
                            {to: `addhotel`, text: 'Manage Hotel', icon: <ApartmentIcon style={iconStyle}/>},
                            { to: 'addroom', text: 'Addroom', icon: <ApartmentIcon style={iconStyle}/> },
                            { to: 'viewbooking', text: 'View bookings', icon: <ViewAgenda style={iconStyle} /> },
                            { to: 'viewfeedback', text: 'View feedback', icon: <MessageTwoToneIcon style={iconStyle} /> },
                            { to: 'viewmessage', text: 'View message', icon: <Message style={iconStyle} /> },
                            { to: '/login', text: 'Logout', icon: <Logout style={iconStyle}/> },
                        ].map((link, index) => (
                            <SidebarItem
                                key={index}
                                button
                                component={Link}
                                to={link.to}
                                selected={location.pathname === link.to}
                                style={{ textAlign: link.alignRight ? 'right' : 'left' }}
                            >
                                <ListItemIcon>{link.icon}</ListItemIcon>
                                <ListItemText primary={link.text} />
                            </SidebarItem>
                        ))}
                    </List>
                </Sidebar>
            </Hidden>
            <div>
                {/* Render the content based on the route */}
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerHome;
