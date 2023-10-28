import React from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Box,
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import NewSellerForm from "../components/NewSellerForm";
import ViewSeller from "../components/ViewSeller";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import NewProductForm, { SellerIdAndName } from "../components/NewProductForm";

interface SellerAddress {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}
export interface SellerData {
  _id: string;
  address: SellerAddress;
  email: string;
  name: string;
  phoneNumber: string;
  id: number;
  active: boolean;
  totalProducts: number;
}

function Seller() {
  const [age, setAge] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSeller, setOpenSeller] = React.useState<boolean>(false);
  const [openNewProduct, setOpenNewProduct] = React.useState<boolean>(false);
  const [selleridandname, setSelleridAndName] = React.useState<SellerIdAndName>(
    {
      _id: "",
      name: "",
    }
  );
  const [viewSellerData, setViewSellerData] = React.useState<SellerData>({
    _id: "",
    address: {
      city: "",
      country: "",
      postalCode: "",
      state: "",
      street: "",
    },
    email: "",
    name: "",
    phoneNumber: "",
    id: 12,
    active: false,
    totalProducts: 0,
  });

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleCloseSeller = (): void => setOpenSeller(false);
  const handleCloseNewProduct = (): void => setOpenNewProduct(false);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleNewProduct = (data: SellerData) => {
    setSelleridAndName({ ...selleridandname, name: data.name, _id: data._id });
    setOpenNewProduct(true);
  };
  const fetchAllSellers = async () => {
    const sellers: AxiosResponse = await axios.get(
      "http://localhost:8000/techwise/api/seller/all"
    );
    return sellers.data.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["sellerdata"],
    queryFn: () => fetchAllSellers(),
  });

  const handleSellerView = (el: SellerData): void => {
    setOpenSeller(true);
    setViewSellerData(el);
  };

  if (isLoading) {
    return (
      <div
        style={{ width: "130vh", display: "flex", justifyContent: "center" }}
      >
        <CircularProgress sx={{ color: "darkblue" }} />
      </div>
    );
  }

  const sortResults = (query: string): void => {
    if (query === "asc") {
      data.sort((a: SellerData, b: SellerData) => a.id - b.id);
    } else {
      if (query === "desc") {
        data.sort((a: SellerData, b: SellerData) => b.id - a.id);
      }
    }
  };

  console.log(viewSellerData);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{
            width: "180px",
            height: "40px",
            backgroundColor: "darkblue",
            color: "white",
            borderRadius: "40px",
            fontWeight: 1000,
            "&:hover": {
              backgroundColor: "darkblue",
            },
          }}
          onClick={handleOpen}
        >
          Add new seller
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginRight: "20px" }}>Sort by: </Typography>
          <Select
            id="demo-simple-select-filled"
            value={age}
            onChange={handleChange}
            label="random"
            sx={{ width: "150px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Sort by ID" onClick={() => sortResults("desc")}>
              Sort by ID descending
            </MenuItem>
            <MenuItem onClick={() => sortResults("asc")}>
              Sort by ID ascending
            </MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: "130vh", marginTop: "30px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Sales</TableCell>
              <TableCell align="right">Total products</TableCell>
              <TableCell align="right">Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el: SellerData, i: number) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell key={i} component="th" scope="row">
                    <Button
                      variant="text"
                      sx={{ color: "darkblue" }}
                      onClick={() => handleSellerView(el)}
                    >
                      {el.name}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{el.id}</TableCell>
                  <TableCell align="right">{el.email}</TableCell>
                  <TableCell align="right">{el.phoneNumber}</TableCell>
                  <TableCell align="right">
                    {el.active ? (
                      <Chip
                        icon={<CheckCircleOutlineTwoToneIcon />}
                        label="Active"
                        sx={{ backgroundColor: "#74C365", width: "100px" }}
                      />
                    ) : (
                      <Chip
                        icon={<CloseTwoToneIcon />}
                        label="Not-Active"
                        sx={{ backgroundColor: "#FF033E", width: "100px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">{el.totalProducts}</TableCell>
                  <TableCell align="right">
                    {el.active ? (
                      <Button
                        sx={{
                          height: "30px",
                          width: "150px",
                          backgroundColor: "#3457D5",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "lightgreen",
                            opacity: 1,
                          },
                        }}
                        onClick={() => handleNewProduct(el)}
                      >
                        Add product
                      </Button>
                    ) : (
                      <Button
                        disabled
                        sx={{
                          height: "30px",
                          width: "150px",
                          backgroundColor: "lightgrey",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "lightgreen",
                            opacity: 1,
                          },
                        }}
                      >
                        Add product
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            borderRadius: "30px",
          }}
        >
          <NewSellerForm />
        </Box>
      </Modal>
      <Modal open={openSeller} onClose={handleCloseSeller}>
        <Box
          sx={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            borderRadius: "30px",
          }}
        >
          <ViewSeller data={viewSellerData} />
        </Box>
      </Modal>
      <Modal open={openNewProduct} onClose={handleCloseNewProduct}>
        <Box
          sx={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            borderRadius: "30px",
          }}
        >
          <NewProductForm seller={selleridandname} />
        </Box>
      </Modal>
    </div>
  );
}

export default Seller;
