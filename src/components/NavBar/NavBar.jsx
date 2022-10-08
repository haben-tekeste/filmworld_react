import React, { useState, useEffect, useContext } from 'react';
import {
  useTheme,
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ColorThemeContext } from '../utils/ToggleColorTheme';
import { fetchToken, authenticationApi, generateSession } from '../utils/authenticationApi';
import { Sidebar, Search } from '..';
import useStyles from './styles';
import { userSelector, setUser } from '../../features/auth';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {  toggleTheme } = useContext(ColorThemeContext);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width : 600px)');
  const theme = useTheme();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (localStorage.getItem('session')) {
          const { data: userData } = await authenticationApi.get(`/account?session_id=${localStorage.getItem('session')}`);
          dispatch(setUser(userData));
        } else {
          const session = await generateSession();
          const { data: userData } = await authenticationApi.get(`/account?session_id=${session}`);
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
