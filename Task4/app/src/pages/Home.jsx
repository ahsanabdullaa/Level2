import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./home.css";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            background:
              "linear-gradient(100deg, rgba(11,10,10,1) 0%, rgba(96,44,42,1) 64%, rgba(113,43,43,1) 99%)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ahsan.
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                userService.logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="back">
        <div className="glitch-wrapper">
          <div className="glitch" data-glitch="SWIFT  Solvers">
            SWIFT Solvers
          </div>
        </div>
      </div>
    </div>
  );
}
