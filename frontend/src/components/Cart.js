import React , { useState , useEffect } from 'react'
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
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchCatItems = async () => {
        fetch('http://localhost:3001/cart' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*',
                //send token as well
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => res.json())
        .then((data)=>{
            setCartItems([...cartItems , data]);
        })
    }

    //fetch products
    const fetchProducts = async (product) => {
        fetch(`http://localhost:3001/products/${product}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*'  ,
                'Authorization': `Bearer ${localStorage.getItem('token')}`,       
            }
        })
        .then(res => res.json())
        .then((data)=>{
            console.log("Data: " , data);
            setProducts([...products , data]);
        })
    }

    useEffect(()=>{
        fetchCatItems().then(()=>{
            cartItems.map((item)=>{
                console.log("Item: " , item);
                fetchProducts(item.product_id);
            })
        });
    } , [])
    
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
        {console.log("Cart items: " , cartItems)
        }
        {        console.log("Products: " , products)
        }
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
                    
                </Table>
            </TableContainer>

        </div>
      
    </div>
  )
}

export default Cart
