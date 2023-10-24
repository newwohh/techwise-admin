import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  seller: {
    id?: string;
    name: string;
  };
  sellerName: string;
}

function Product() {
  const fetchAllProducts = async () => {
    const allProductsReq = await axios.get(
      "http://localhost:8000/techwise/api/product/all"
    );

    console.log(allProductsReq.data);

    return allProductsReq.data.data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["sellerdata"],
    queryFn: () => fetchAllProducts(),
  });

  if (isLoading) {
    return (
      <div
        style={{ width: "130vh", display: "flex", justifyContent: "center" }}
      >
        <CircularProgress sx={{ color: "darkblue" }} />
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: "120vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Seller</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Total bought</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el: Product, i: number) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button variant="text" sx={{ color: "darkblue" }}>
                      {el.name}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{el.seller.name}</TableCell>
                  <TableCell align="right">{el.price}</TableCell>
                  <TableCell align="right">{el.stock}</TableCell>
                  <TableCell align="right">0</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Product;
