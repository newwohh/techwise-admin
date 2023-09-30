import axios from "axios";
import { SellerData } from "../pages/Seller";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

function ViewSeller({ data }: { data: SellerData }) {
  const [messageSuccessBan, setSuccessBan] = React.useState<boolean>(false);
  const [messageSuccessUnban, setSuccessUnban] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingUB, setLoadingUB] = React.useState<boolean>(false);
  console.log(data);

  const banSeller = async () => {
    setLoading(true);
    const banSellerReq = await axios.put(
      "http://localhost:8000/techwise/api/seller/ban",
      { id: data._id }
    );

    if (banSellerReq.data.success) {
      setLoading(false);
      setSuccessBan(true);
    }

    return banSellerReq;
  };

  const unbanSeller = async () => {
    setLoadingUB(true);
    const unbanSellerReq = await axios.put(
      "http://localhost:8000/techwise/api/seller/unban",
      { id: data._id }
    );

    if (unbanSellerReq.data.success) {
      setLoadingUB(false);
      setSuccessUnban(true);
    }
  };

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
      <Box sx={{ marginBottom: "50px" }}>
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

      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
      >
        {data.active ? (
          <Button
            sx={{
              height: "55px",
              width: "120px",
              backgroundColor: "#74C365",
              color: "white",
              "&:hover": {
                backgroundColor: "lightgreen",
                opacity: 1,
              },
            }}
            onClick={() => banSeller()}
          >
            {loading ? (
              <CircularProgress
                sx={{ height: "10px", width: "10px", color: "white" }}
              />
            ) : (
              <Typography>
                {messageSuccessBan ? "Success" : "Active"}
              </Typography>
            )}
          </Button>
        ) : (
          <Button
            sx={{
              height: "55px",
              width: "120px",
              backgroundColor: "#FF033E",
              color: "white",
              "&:hover": {
                backgroundColor: "#F88379",
                opacity: 1,
              },
            }}
            onClick={() => unbanSeller()}
          >
            {loadingUB ? (
              <CircularProgress
                sx={{ height: "10px", width: "10px", color: "white" }}
              />
            ) : (
              <Typography>{messageSuccessUnban ? "Success" : "Ban"}</Typography>
            )}
          </Button>
        )}
      </Box>
    </div>
  );
}

export default ViewSeller;
