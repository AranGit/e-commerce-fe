import React from 'react'
import { AuthContext } from "@/contexts/userContext";
import { tokenKey, clearItemInLocal } from '@/utils/utils'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const navItems = [
  {
    title: 'Log In',
    url: "/login"
  }
];

function NavBar(props: Props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userContextData = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    clearItemInLocal(tokenKey);
    userContextData?.clearUser();
    router.push("/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SHOP
      </Typography>
      <Divider />
      <List>
        {
          userContextData?.user ?
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => onLogout()}>
                <ListItemText primary={"Log Out"} />
              </ListItemButton>
            </ListItem> :
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push("/login")}>
                <ListItemText primary={"Log In"} />
              </ListItemButton>
            </ListItem>
        }
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            className='left-[95%]'
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            SHOP
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              userContextData?.user ?
                <Button sx={{ color: '#fff' }} onClick={() => {
                  onLogout();
                }}>
                  Log Out
                </Button> :
                <Button sx={{ color: '#fff' }} onClick={() => router.push("/login")}>
                  Log In
                </Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor={"right"}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default NavBar
