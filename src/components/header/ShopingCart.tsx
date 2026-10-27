import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import React from 'react';
import { IconButton, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, type BadgeProps } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { RootState } from "../../Redux/store";
import { styled } from '@mui/material/styles';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ShopingCart() {
    const { t } = useTranslation();
    
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

    const totalPrice = cartProducts.reduce((total, item) => {
        return total + item.productPrice * (item.quantity || 1);
    }, 0).toFixed(2);

    const DrawerList = (
        <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
                {t("shoppingCart.Shopping Cart")} ({cartProducts.length})
            </Typography>
            <Divider />
            
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {cartProducts.length === 0 ? (
                    <Typography variant='body2' sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                        {t("shoppingCart.Your Cart IS Empty")}
                    </Typography>
                ) : (
                    cartProducts.map((item) => {
                        const itemQty = item.quantity || 1;
                        const itemTotal = (item.productPrice * itemQty).toFixed(2);

                        return (
                            <ListItem 
                                key={item.id} 
                                disablePadding 
                                sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #eee', pb: 2 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <img 
                                            src={item.productImg?.[0]?.url || ''} 
                                            alt={item.productTitle} 
                                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '4px' }} 
                                        />
                                        <ListItemText 
                                            primary={item.productTitle}
                                            secondary={`Price: $${item.productPrice}`}
                                            sx={{
                                                '& .MuiListItemText-primary': { fontSize: '14px', fontWeight: 'bold' },
                                                '& .MuiListItemText-secondary': { fontSize: '12px' }
                                            }}
                                        />
                                    </Box>

                                    <IconButton 
                                        size="small" 
                                        onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                        sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ px: 1.5, fontSize: '14px', fontWeight: 'bold' }}>
                                            {itemQty}
                                        </Typography>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        {t("shoppingCart.Total")}: ${itemTotal}
                                    </Typography>
                                </Box>
                            </ListItem>
                        );
                    })
                )}
            </List>

            {cartProducts.length > 0 && (
                <Box sx={{ pt: 2, borderTop: '1px solid #ddd' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t("shoppingCart.Subtotal")}:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>${totalPrice}</Typography>
                    </Box>
                    <Button variant="contained" color="primary" fullWidth>
                        {t("shoppingCart.Checkout")}
                    </Button>
                    <Button onClick={() => navigate('/cart')} variant="contained" color="primary" fullWidth sx={{mt: '20px'}}>
                        {t("shoppingCart.details Poduct")}
                    </Button>
                </Box>
            )}
        </Box>
    );

    return (
        <div>
            <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
                <StyledBadge badgeContent={cartProducts.length} color="primary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default ShopingCart;