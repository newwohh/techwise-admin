import React from "react";
import axios from "axios";
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
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import NewSellerForm from "../components/NewSellerForm";
import ViewSeller from "../components/ViewSeller";

interface SellerAddress {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}
export interface SellerData {
  _id: number;
  address: SellerAddress;
  email: string;
  name: string;
  phoneNumber: string;
  id: number;
  active: boolean;
}

function Seller() {
  const [sellerData, setSellerData] = React.useState<SellerData[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSeller, setOpenSeller] = React.useState<boolean>(false);
  const [viewSellerData, setViewSellerData] = React.useState<
    SellerData | string
  >("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSeller = () => setOpenSeller(false);
  const fetchAllSellers = async () => {
    const sellers = await axios.get(
      "http://localhost:8000/techwise/api/seller/all"
    );
    setSellerData(sellers.data.data);
    return sellers.data.data;
  };
  const { isLoading } = useQuery({
    queryKey: ["sellerdata"],
    queryFn: () => fetchAllSellers(),
  });

  const handleSellerView = (el: SellerData) => {
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
  console.log(viewSellerData);
  return (
    <div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerData.map((el, i) => {
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
                      <Button
                        sx={{
                          height: "45px",
                          width: "120px",
                          backgroundColor: "#74C365",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "lightgreen",
                            opacity: 1,
                          },
                        }}
                      >
                        Active
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          height: "45px",
                          width: "120px",
                          backgroundColor: "darkred",
                          color: "white",
                        }}
                      >
                        BAN
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
          }}
        >
          <ViewSeller data={viewSellerData} />
        </Box>
      </Modal>
    </div>
  );
}

export default Seller;
