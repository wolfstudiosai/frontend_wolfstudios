import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export function RightSidebar({SelectedUser}) {
  return (
    <Box
      sx={{
      width:240,
        transition: "all 0.3s ease",
        position: "fixed",
        right: 0,
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        height:'auto',
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
        

      }}
    >
      <Avatar src={SelectedUser?.avatar} sx={{ width: 56, height: 56, mb: 2 }} />
      <Typography color="inherit" variant="h6">{SelectedUser?.name}</Typography>
      <Typography variant="body2" color="inherit">
        {SelectedUser?.Avatar}
      </Typography>
    </Box>
  );
}
