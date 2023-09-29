import React from "react";
import { SellerData } from "../pages/Seller";
import { Box, Typography } from "@mui/material";

function ViewSeller({ data }: { data: SellerData }) {
  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        columnGap: "20px",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography sx={{ marginTop: "20px", fontSize: "19px" }}>
          ID: {data.id}
        </Typography>
        <Typography sx={{ marginTop: "20px", fontSize: "19px" }}>
          Name: {data.name}
        </Typography>
        <Typography sx={{ marginTop: "20px", fontSize: "19px" }}>
          E-mail: {data.email}
        </Typography>
        <Typography sx={{ marginTop: "20px", fontSize: "19px" }}>
          Address: {data.address.city},{data.address.state},
          {data.address.country}
        </Typography>
        <Typography sx={{ marginTop: "20px", fontSize: "19px" }}>
          Phone: {data.phoneNumber}
        </Typography>
      </Box>
    </div>
  );
}

export default ViewSeller;
