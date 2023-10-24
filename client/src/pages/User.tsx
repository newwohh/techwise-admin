import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function User() {
  const fetchAllUsers = async () => {
    const allProductsReq = await axios.get(
      "http://localhost:8000/techwise/api/user/all"
    );

    return allProductsReq.data.data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["userdata"],
    queryFn: () => fetchAllUsers(),
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
      <TableContainer component={Paper} sx={{ width: "130vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">E-Mail</TableCell>
              <TableCell align="right">Total bought</TableCell>
              <TableCell align="right">Ban</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, i: number) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button variant="text" sx={{ color: "darkblue" }}>
                      {el.fullName}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{el.email}</TableCell>
                  <TableCell align="right">{el.orders.length}</TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{
                        height: "50px",
                        width: "120px",
                        borderRadius: "60px",
                        backgroundColor: "darkblue",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "darkblue",
                        },
                      }}
                    >
                      Ban
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default User;
