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
  const [imageUrls, setImageUrls] = React.useState(["", "", "", "", ""]);
  const [message, setMessage] = React.useState<string>("");
  const [productForm, setProductForm] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    screenSize: "",
    processor: "",
    storageCapacityGB: "",
    RAMGB: "",
    cameraMP: "",
    operatingSystem: "",
    color: "",
    reviews: [],
    stock: "",
    images: [] as string[],
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
      addImageUrls();

      const addNewProductReq = await axios.post(
        "http://localhost:8000/techwise/api/product/new",
        productForm
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

  const updateImageUrl = (url: string, index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = url;
    setImageUrls(updatedUrls);
  };

  const addImageUrls = () => {
    const validUrls = imageUrls.filter((url) => url.trim() !== "");
    setProductForm({
      ...productForm,
      images: validUrls,
    });
  };

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
        <Box
          sx={{
            width: "900px",
            display: "flex",
            flexDirection: "row",
            rowGap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Input
              placeholder="Name"
              sx={{ width: "350px", marginTop: "40px" }}
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
              placeholder="Brand"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  brand: e.target.value,
                })
              }
            />
            <Input
              placeholder="Screen size"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  screenSize: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Processor"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  processor: e.target.value,
                })
              }
            />
            <Input
              placeholder="Storage Capacity"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  storageCapacityGB: e.target.value,
                })
              }
            />
            <Input
              placeholder="Ram"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  RAMGB: e.target.value,
                })
              }
            />
            <Input
              placeholder="Camera"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  cameraMP: e.target.value,
                })
              }
            />
            <Input
              placeholder="Operating System"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  operatingSystem: e.target.value,
                })
              }
            />
            <Input
              placeholder="Color"
              sx={{ width: "350px", marginTop: "40px" }}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  color: e.target.value,
                })
              }
            />

            {imageUrls.map((url, index) => (
              <div key={index}>
                <Input
                  placeholder={`Image URL ${index + 1}`}
                  sx={{ width: "350px", marginTop: "40px" }}
                  value={url}
                  onChange={(e) => updateImageUrl(e.target.value, index)}
                />
              </div>
            ))}
          </div>
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
