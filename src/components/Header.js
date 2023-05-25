import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" enableColorOnDark>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        onOpen={() => setOpenSidebar(true)}
      >
        <List>
          {["Images", "Checkboxes"].map((text, index) => (
            <ListItem key={text} >
              <ListItemButton
                selected={
                  text.toLowerCase() ===
                  location.pathname.split("/")[1].toLowerCase()
                }
                onClick={() => {
                  navigate(`/${text.toLowerCase()}`);
                  setOpenSidebar(false);
                }}
                sx={{ py: 0 }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <div>
        <Outlet />
      </div>
    </>
  );
}
