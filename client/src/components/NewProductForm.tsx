import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";

export interface SellerIdAndName {
  _id: string;
  name: string;
}

function NewProductForm({ seller }: { seller: SellerIdAndName }) {
  const [message, setMessage] = React.useState<string>("");
  const [productForm, setProductForm] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
    seller: seller._id,
    sellerName: seller.name,
  });

  console.log(seller.name);
  const [messageSuccessProduct, setSuccessProduct] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const addNewProduct = async () => {
    setLoading(true);
    try {
      const addNewProductReq = await axios.post(
        "http://localhost:8000/techwise/api/product/new",
        {
          name: productForm.name,
          description: productForm.description,
          price: productForm.price,
          category: productForm.category,
          stock: productForm.stock,
          imageUrl: productForm.imageUrl,
          seller: productForm.seller,
          sellerName: productForm.sellerName,
        }
      );

      if (addNewProductReq.data.success) {
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
  console.log(seller, message);

  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Add New Product</Typography>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Input
            placeholder="Name"
            sx={{ width: "250px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value,
              })
            }
          />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            sx={{ width: "350px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                description: e.target.value,
              })
            }
          />
          <Input
            placeholder="Price"
            sx={{ width: "350px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                price: e.target.value,
              })
            }
          />
          <Input
            placeholder="Category"
            sx={{ width: "350px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                category: e.target.value,
              })
            }
          />
          <Input
            placeholder="Stock"
            sx={{ width: "350px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                stock: e.target.value,
              })
            }
          />
          <Input
            placeholder="Image"
            sx={{ width: "350px", marginTop: "40px" }}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                imageUrl: e.target.value,
              })
            }
          />
        </Box>
        <Button
          sx={{
            width: "180px",
            height: "60px",
            marginTop: "50px",
            backgroundColor: "#1E90FF",
            color: "white",
            borderRadius: "40px",
            fontWeight: 1000,
            "&:hover": {
              backgroundColor: "#2a52be",
            },
          }}
          onClick={() => addNewProduct()}
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
      </Box>
    </div>
  );
}

export default NewProductForm;