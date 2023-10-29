import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
const drawerWidth = 240;

const drawerLinks = [
  { title: "Home", link: "/" },
  { title: "Products", link: "/Products" },
  { title: "Sellers", link: "/sellers" },
  { title: "Users", link: "/users" },
];

function WebDrawer({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "white",
            boxShadow: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            color: "red",
          }}
        >
          <Typography
            sx={{ marginLeft: "10px", fontSize: "30px", color: "lightblue" }}
          >
            Welcome back <span style={{ color: "darkblue" }}>Techwise</span>{" "}
            Admin
          </Typography>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "100px",
              marginLeft: "30px",
            }}
          >
            {drawerLinks.map((text, index) => {
              return (
                <NavLink
                  to={`${text.link}`}
                  key={index}
                  style={({ isActive }) => {
                    return {
                      color: "darkblue",
                      marginBottom: "20px",
                      textDecoration: isActive ? "underline" : "none",
                      fontSize: "30px",
                      transition: "ease-in-out 0.2s",
                      fontFamily: "Helvetica",
                    };
                  }}
                >
                  {text.title}
                </NavLink>
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >
          <Toolbar />
          <Box>{children}</Box>
        </Box>
      </Box>
    </div>
  );
}

export default WebDrawer;
