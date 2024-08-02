import React from 'react'
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';



function Cart() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
  return (
    <div>
        <div className='cart-heading-div'>
            <Typography variant="h4" component="h1" color="text.primary">
                Cart
            </Typography>
        </div>
        <div className='cart-table'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>ITEM</StyledTableCell>
                        <StyledTableCell align="right">PRICE</StyledTableCell>
                        <StyledTableCell align="right">QUANTITY</StyledTableCell>
                        <StyledTableCell align="right">ACTION</StyledTableCell>
                        <StyledTableCell align="right">TOTAL</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
      
    </div>
  )
}

export default Cart
