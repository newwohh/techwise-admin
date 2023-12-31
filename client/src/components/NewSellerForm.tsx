import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import axios from "axios";

function NewSellerForm() {
  const [message, setMessage] = React.useState<string>("");
  const [messageSuccessProduct, setSuccessProduct] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sellerFormData, setSellerFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const addNewSeller = async () => {
    setLoading(true);

    try {
      const data = await axios.post(
        "http://localhost:8000/techwise/api/seller/new",
        {
          name: sellerFormData.name,
          email: sellerFormData.email,
          password: sellerFormData.password,
          phoneNumber: sellerFormData.password,
          address: {
            street: sellerFormData.street,
            city: sellerFormData.city,
            state: sellerFormData.state,
            postalCode: sellerFormData.postalCode,
            country: sellerFormData.country,
          },
        }
      );
      if (data.data.success) {
        setLoading(false);
        setSuccessProduct(true);
        setMessage("Success");
        console.log(message);
      } else {
        setLoading(false);
        setMessage("Failed");
        setSuccessProduct(true);
        console.log(message);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Failed");
      setSuccessProduct(true);
      console.log(message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: 700,
        padding: "60px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Input
            placeholder="Name"
            sx={{ width: "300px" }}
            onChange={(e) =>
              setSellerFormData({
                ...sellerFormData,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="E-mail"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, email: e.target.value })
            }
          />
          <Input
            placeholder="Phone number"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({
                ...sellerFormData,
                phoneNumber: e.target.value,
              })
            }
          />
          <Input
            placeholder="Id"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, password: e.target.value })
            }
          />
        </Box>
        <Box sx={{ marginLeft: "50px" }}>
          <Input
            placeholder="Street"
            sx={{ width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, street: e.target.value })
            }
          />
          <Input
            placeholder="Postal code"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({
                ...sellerFormData,
                postalCode: e.target.value,
              })
            }
          />
          <Input
            placeholder="City"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, city: e.target.value })
            }
          />
          <Input
            placeholder="State"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, state: e.target.value })
            }
          />
          <Input
            placeholder="Country"
            sx={{ marginTop: "50px", width: "300px" }}
            onChange={(e) =>
              setSellerFormData({ ...sellerFormData, country: e.target.value })
            }
          />
        </Box>
      </Box>

      <Button
        sx={{
          width: "180px",
          height: "60px",
          marginTop: "50px",
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: "40px",
          fontWeight: 1000,
          "&:hover": {
            backgroundColor: "darkblue",
          },
        }}
        onClick={addNewSeller}
      >
        {loading ? (
          <CircularProgress
            sx={{ height: "10px", width: "10px", color: "white" }}
          />
        ) : (
          <Typography>
            {messageSuccessProduct ? `${message}` : "Add"}
          </Typography>
        )}
      </Button>
    </div>
  );
}

export default NewSellerForm;
