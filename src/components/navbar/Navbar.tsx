import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>
              <MenuIcon />
            </Link>
          </IconButton>
          <Button
            component={NavLink}
            to="/funds"
            color="inherit"
            sx={{ "&.active": { background: "#338eea" } }}
          >
            Funds
          </Button>
          <Button
            component={NavLink}
            to="/portfolio"
            color="inherit"
            sx={{ "&.active": { background: "#338eea" } }}
          >
            Portfolio
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
