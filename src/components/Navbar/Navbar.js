import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";


const pages = ['Home'];
const settings = ['Profile', 'Logout'];

function Navbar({currentUserExists}){


    const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);
        const navigate = useNavigate();

        const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
        };
        const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
        };

        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };

        const handleCloseUserMenu = (key) => {
            if(key ==="Logout"){
              handleLogout();
            }
            setAnchorElUser(null);
        };

        const handlePageRouting = (page) => {
            switch (page) {
              case "Home":
                return "/";
              default:
                return "/auth";
            }
          };

          const handleSettingsRouting = (setting) => {
            switch (setting) {
              case "Profile":
                return `/user/getUserById/${localStorage.getItem("currentUser")}`;
              case "Logout":
                return "/auth";
              default:
                return "/auth";
            }
          };

          const handleLogout = () =>{
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userName");
            navigate("/auth")
          }


    return(
        <AppBar position="fixed" style={{backgroundColor:"#F2BE22"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
             // href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              COOKIDEA
            </Typography>
              {currentUserExists && (

              <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                    <Link to={handlePageRouting(page)} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page}
                    </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            <Typography
              variant="h5"
              noWrap
              component="a"
              // href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              COOKIDEA
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                <Link to={handlePageRouting(page)} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page}
                    </Link>
                
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar> {!!localStorage.getItem("userName") ? localStorage.getItem("userName").charAt(0).toUpperCase() : "U"}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() =>handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">
                        <Link to = {handleSettingsRouting(setting)} style={{ textDecoration: 'none', color: 'inherit' }}>{setting}</Link>
                        </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            </>
              )}
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar;

