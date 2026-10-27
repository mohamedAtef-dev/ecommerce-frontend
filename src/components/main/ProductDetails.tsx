import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { t } from "i18next";
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../Redux/cartSlice';

import type { Product, ProductImage } from '../../Redux/cartSlice'; 

interface ProductDetailsProps {
  clickedProduct: Product | null;
}


const ProductDetails = ({clickedProduct} : ProductDetailsProps) => {

    const [selectedImg, setSelectedImg] = useState(0);
    const dispatch = useDispatch();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Snackbar  دالة لإغلاق الـ  
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };



    return(
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2.5, flexDirection: {xs: 'column', md: 'row'}}}>

        <Box sx={{display: 'flex'}}>
            <img width={322} src={clickedProduct?.productImg?.[selectedImg]?.url || ''} alt={clickedProduct?.productTitle || ""} />
        </Box>

        <Box sx={{textAlign: {xs: 'center', sm: 'left'}, py: 2}}>
            <Typography variant="h5">{clickedProduct?.productTitle}</Typography>

            <Typography variant="h6" sx={{fontSize: '22px', my: 0.4, color: 'crimson'}}>{clickedProduct?.productPrice}</Typography>

            <Typography variant="body1">
            {clickedProduct?.productDescription}
            </Typography>

    <Stack direction={"row"} sx={{gap: 1, my: 2, justifyContent: {xs: 'center', sm: 'left'}}}>

        <ToggleButtonGroup
            value={selectedImg}
            exclusive
            aria-label="text alignment"
                sx={{".Mui-selected": {
                border: '1px solid royalblue !important',
                borderRadius: '5px !important',
                opacity: '1',
                backgroundColor: 'initial'
            },
        }}
        >
                {clickedProduct?.productImg?.map((item: ProductImage, index) => {
                    return (

            <ToggleButton sx={{width: '110px', height: '110px', mx: 1, p: 0, opacity: '0.5'}}
            value={index} aria-label="left aligned" key={item.id || item.url}>
            <img onClick={() => {
            setSelectedImg(index);
            }}
            style={{borderRadius: 3}} height={'100%'} width={'100%'} src={item.url} alt="" />
            </ToggleButton>

                    )
                })} 

        </ToggleButtonGroup>
    </Stack>

                <Button 
                    sx={{ mb: { xs: 1, sm: 0 }, textTransform: 'capitalize' }} 
                    variant="contained"
                    onClick={() => {
                        if (clickedProduct) {
                            dispatch(addToCart(clickedProduct)); // إضافة المنتج للسلة
                            setOpenSnackbar(true); // إظهار الـ Snackbar عند الضغط
                        }
                    }}
                > 
                    <AddShoppingCartOutlinedIcon fontSize='small' sx={{ mx: 1 }} />
                    {t("productDetails.buyNow")}
                </Button>
        </Box>

        {/* مكون الـ Snackbar مع الـ Alert لعرض رسالة النجاح */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity="success" 
                    variant="filled"
                    sx={{ width: '100%'}}>
                        
                    {t("productDetails.addedSuccessfully") || "Product added to cart successfully!"}
                </Alert>
            </Snackbar>

            

        </Box>
    );
}
export default ProductDetails;