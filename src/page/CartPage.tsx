import React, { useState } from 'react';
import { 
    Box, Typography, Container, Grid, Card, Button, Divider, 
    IconButton, Radio, RadioGroup, FormControlLabel, FormControl, 
    FormLabel, TextField, Alert 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "../Redux/store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../Redux/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useTranslation } from "react-i18next";

function CartPage() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);

    // State for Payment Method selection   طريقة الدفع
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // State for Coupon Code and Discount
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState<{ text: string; severity: 'success' | 'error' } | null>(null);

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod((event.target as HTMLInputElement).value);
    };

    // Calculate Subtotal
    const subtotal = cartProducts.reduce((total, item) => {
        return total + item.productPrice * (item.quantity || 1); // 0 +  كمية المنتج * سعر المنتج 
    }, 0);

    const shippingFee = subtotal > 0 ? 15.00 : 0;
    
    // Apply Coupon Logic for "mohamed"
    const handleApplyCoupon = () => {
        if (couponCode.trim().toLowerCase() === 'mohamed') {
            setDiscount(30);
            setCouponMessage({ text: t('shoppingCart.Invalid coupon code. Try entering mohamed'), severity: 'success' });
        } else {
            setDiscount(0);
            setCouponMessage({ text: t("shoppingCart.Invalid coupon code. Try entering mohamed"), severity: 'error' });
        }
    };

    const totalAmount = Math.max(0, subtotal + shippingFee - discount);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                {t('shoppingCart.Shopping Cart & Checkout')}
            </Typography>

            {cartProducts.length === 0 ? (
                <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        {t('shoppingCart.Your cart is empty. Start shopping now!')}
                    </Typography>
                </Card>
            ) : (
                <Grid container spacing={4}>
                    {/* Left Column: Cart Items */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {t('shoppingCart.Cart Items')}({cartProducts.length})
                        </Typography>
                        
                        {cartProducts.map((item) => {
                            const itemQty = item.quantity || 1;
                            const itemTotal = (item.productPrice * itemQty).toFixed(2);

                            return (
                                <Card key={item.id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <img 
                                            src={item.productImg?.[0]?.url || ''} 
                                            alt={item.productTitle} 
                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px' }} 
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {item.productTitle}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ${item.productPrice}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Quantity Controls */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                        <IconButton size="small" onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ px: 2, fontWeight: 'bold' }}>{itemQty}</Typography>
                                        <IconButton size="small" onClick={() => dispatch(increaseQuantity({ id: item.id }))}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    {/* Item Total */}
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        ${itemTotal}
                                    </Typography>

                                    {/* Delete Button */}
                                    <IconButton color="error" onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Card>
                            );
                        })}
                    </Grid>

                    {/* Right Column: Order Summary, Payment & Coupon */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ p: 3, bgcolor: 'background.paper', boxShadow: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                {t("shoppingCart.Order Summary")}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                <Typography variant="body1">{t("shoppingCart.Subtotal")}</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>${subtotal.toFixed(2)}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalShippingIcon fontSize="small" color="action" />
                                    <Typography variant="body1">{t("shoppingCart.Shipping Fee")}</Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>${shippingFee.toFixed(2)}</Typography>
                            </Box>

                            {/* Discount Display if applied */}
                            {discount > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, color: 'success.main' }}>
                                    <Typography variant="body1">Discount (mohamed):</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>-${discount.toFixed(2)}</Typography>
                                </Box>
                            )}

                            <Divider sx={{ my: 2 }} />

                            {/* Coupon Section */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField 
                                        size="small" 
                                        placeholder={t("shoppingCart.Enter Coupon discount")}
                                        fullWidth 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button variant="outlined" onClick={handleApplyCoupon}>
                                        {t("shoppingCart.Apply")}
                                    </Button>
                                </Box>

                                {/* Popup / Alert Message for Coupon Status */}
                                {couponMessage && (
                                    <Alert severity={couponMessage.severity} sx={{ mt: 1, py: 0 }}>
                                        {couponMessage.text}
                                    </Alert>
                                )}

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 1 }}>
                                    <LocalOfferIcon fontSize="small" />
                                    <Typography variant="caption">{t("shoppingCart.Use code mohamed for $30 off")}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {/* Payment Methods Selection */}
                            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {t("shoppingCart.Payment Method")}
                                </FormLabel>
                                <RadioGroup
                                    aria-label="payment-method"
                                    name="paymentMethod"
                                    value={paymentMethod}
                                    onChange={handlePaymentChange}
                                >
                                    <FormControlLabel 
                                        value="cod" 
                                        control={<Radio />} 
                                        label={t("shoppingCart.Cash on Delivery (COD)")}
                                    />
                                    <FormControlLabel 
                                        value="card" 
                                        control={<Radio />} 
                                        label={t("shoppingCart.Credit / Debit Card")}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t("shoppingCart.Total Amount")}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    ${totalAmount.toFixed(2)}
                                </Typography>
                            </Box>

                            <Button variant="contained" color="primary" fullWidth size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
                                {t("shoppingCart.proceed to checkout")}
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

export default CartPage;