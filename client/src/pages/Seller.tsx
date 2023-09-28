import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function Seller() {
  return (
    <div>
      <TableContainer component={Paper} sx={{ width: "130vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Stock in (nos)</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button variant="text" sx={{ color: "darkblue" }}>
                  name
                </Button>
              </TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">phone</TableCell>
              <TableCell align="right">0</TableCell>
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
              <TableCell align="right">0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Seller;
