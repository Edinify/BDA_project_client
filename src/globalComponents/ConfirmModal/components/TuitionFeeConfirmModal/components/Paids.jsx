import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import "./paids.css";

// or
// import { DataGrid } from '@mui/x-data-grid';
// // or
// import { DataGrid } from '@mui/x-data-grid-pro';
// // or
// import { DataGrid } from '@mui/x-data-grid-premium';

function Paids() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "date", headerName: "Tarix", width: 100 },
    { field: "payment", headerName: "ödəniş", width: 100 },
  ];

  const rows = [
    { id: 1, date: "Snow", payment: "Jon" },
    { id: 2, date: "Lannister", payment: "Cersei" },
    { id: 3, date: "Lannister", payment: "Jaime" },
    { id: 4, date: "Stark", payment: "Arya" },
    { id: 5, date: "Targaryen", payment: "Daenerys" },
    { id: 6, date: "Melisandre", payment: null },
    { id: 7, date: "Clifford", payment: "Ferrara" },
    { id: 8, date: "Frances", payment: "Rossini" },
    { id: 9, date: "Roxie", payment: "Harvey" },
  ];

  return (
    <Box sx={{ width: "100%", marginBottom: "40px" }}>
      <Card sx={{boxShadow:"none",borderBottom:"0.1px solid ",borderRadius:0}}  className="paids-container">
        <Checkbox
          color="primary"
          onChange={handleChange}
          checked={isChecked}
          sx={{
            ".MuiCheckbox-sizeMedium": {
              fontSize: "0px",
            },
          }}
          size="large"
        />
        {/* <div className="paids-content"> */}
          <Typography>11.02.2024</Typography>
          <Typography>100AZN</Typography>
        {/* </div> */}
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" />
        </div>
      </Card>
      {/* <TableContainer>
        <Table sx={{}} size="large">
          <TableBody>
            <TableRow
              hover
              role="checkbox"
              sx={{ cursor: "pointer", fontSize: "50px" }}
            >
              <div className="check-input" >
                <Checkbox
                  color="primary"
                  onChange={handleChange}
                  checked={isChecked}
                  sx={{
                    ".MuiCheckbox-sizeMedium": {
                      fontSize: "0px",
                    },
                  }}
                  size="medium"
                />
              </div>
              <TableCell
                component="th"
                scope="row"
                padding="none"
                sx={{ fontSize: "20px" }}
              >
                test1
              </TableCell>
              <TableCell align="right">test2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
}

export default Paids;
