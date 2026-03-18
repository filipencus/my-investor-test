import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" component="nav" aria-label="Primary navigation">
        <Toolbar>
          <IconButton
            component={Link}
            to="/home"
            size="large"
            edge="start"
            color="inherit"
            aria-label="Go to home page"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            component={NavLink}
            to="/funds"
            color="inherit"
            sx={{ "&.active": { background: "#338eea" } }}
          >
            Fondos
          </Button>

          <Button
            component={NavLink}
            to="/portfolio"
            color="inherit"
            sx={{ "&.active": { background: "#338eea" } }}
          >
            Cartera
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
