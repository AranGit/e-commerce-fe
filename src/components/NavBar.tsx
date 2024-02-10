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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter, usePathname } from 'next/navigation';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Carts, GetCartsOfUser } from '@/utils/apiUtils';
import Logout from '@mui/icons-material/Logout';

const shopName = 'Aran (Dummy Shop)'

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

function NavBar(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userCarts, setUserCarts] = React.useState<Carts | null>(null);
  const userContextData = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (userContextData?.user) {
      GetCartsOfUser(
        {
          userId: userContextData?.user.id,
          onSuccess: (data: Carts) => setUserCarts(data),
          onFailed: () => console.log("Failed")
        })
    }
  }, [userContextData?.user])

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
        {shopName}
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

  const badgeElement =
    <Badge badgeContent={userCarts?.carts.length} color="primary">
      <ShoppingCartOutlinedIcon className='fill-white' />
    </Badge>

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar className={`w-full max-w-[1400px] mx-[auto] justify-between`}>
          {
            userContextData?.user && pathname !== '/cart' ?
              <IconButton aria-label="cart" sx={{ mr: 2, display: { sm: 'none' } }} onClick={() => router.push("/cart")}>
                {badgeElement}
              </IconButton> : null
          }
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className='cursor-pointer'
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={() => router.push("/products")}
          >
            {shopName}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              userContextData?.user ?
                <>
                  {
                    pathname !== '/cart' ?
                      <IconButton aria-label="cart" className='mr-[20px]' onClick={() => router.push("/cart")}>
                        {badgeElement}
                      </IconButton>
                      : null
                  }
                  <Button
                    sx={{ color: '#fff' }}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {userContextData?.user.firstName}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        onLogout();
                      }}>
                      <Logout className='mr-4' fontSize="small" />Logout
                    </MenuItem>
                  </Menu>
                </>
                :
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
    </Box >
  );
}

export default NavBar
