import { Box, CircularProgress, Container, Dialog, IconButton, Rating, Stack, Typography, useTheme } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "motion/react"
import { t } from "i18next";
import type { Product } from '../../Redux/cartSlice';


const Main = () => {

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {

      setMyData(newValue);
    }
  };

const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const allProductsAPI = 'products?populate=*'
  const menCategoryAPI = 'products?populate=*&filters[category][$eq]=men'
  const womenCategoryAPI = 'products?populate=*&filters[category][$eq]=women'


  const [myData, setMyData] = useState<string | null>(allProductsAPI)
   const { data, error, isLoading } = useGetproductByNameQuery(myData || allProductsAPI)
const [clickedProduct, setClickedProduct] = useState<Product | null>(null)

    if (isLoading) {
      return (
      <Box sx={{ py: 11, textAlign: 'center' }}>
      <CircularProgress />
    </Box>
      )
    }


    if (error) {
      console.log(error);
      return (
        <Container sx={{py: 11, textAlign: 'center'}}>
    <Typography variant="h6">{
    // فحص ما إذا كان الخطأ من نوع FetchBaseQueryError (مثل أخطاء السيرفر 404 أو 500)
    'status' in error 
      ? `Error Status: ${error.status}` 
      // فحص ما إذا كان خطأ تسلسلي (SerializedError) يحتوي على رسالة
      : error.message || 'An unknown error occurred'
  }
  </Typography>
        </Container>
      )
    }





if (data) {
return (
<Container sx={{py: 9}}>
        {/* stack 1 */}
<Stack direction={"row"} sx={{alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3}}> 
        <Box >
            <Typography variant="h6">{t("filter.Selected Products")}</Typography>
            <Typography variant="body1" sx={{fontWeight: 300}}>{t("filter.exclusiveBrand")}</Typography>
        </Box>

    <ToggleButtonGroup
    color="error"
            value={myData}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{gap: 2,".Mui-selected": {
                border: '1px solid rgba(233, 69, 96, 0.5 !important)',
                color: '#e94560',
                backgroundColor: 'initial',
            },
        }}
            >
            <ToggleButton className="my-Button" value={allProductsAPI} aria-label="left aligned" sx={{color: theme.palette.text.primary}}>
                {t("filter.allProducts")}
            </ToggleButton>
            <ToggleButton className="my-Button" value={menCategoryAPI} aria-label="right aligned" sx={{color: theme.palette.text.primary}}>
                {t("filter.menCategory")}
            </ToggleButton>
            <ToggleButton className="my-Button" value={womenCategoryAPI} aria-label="centered" sx={{mx: '16px !important', color: theme.palette.text.primary}}>
                {t("filter.womenCategory")}
            </ToggleButton>
    </ToggleButtonGroup>
</Stack>


{/* stack 1 */}
        <Stack direction={'row'} sx={{flexWrap: 'wrap', justifyContent: 'space-between'}}> 
            
            <AnimatePresence>

          {data.data.map((item) => {
                return (
    <Card component={motion.section} layout initial={{transform: 'scale(0)'}} animate={{transform: 'scale(1)'}} transition={{duration: 0.6, type: 'spring', stiffness: 50}}
    key={item.id} sx={{ maxWidth: 333, mt: 6, ":hover .MuiCardMedia-root": {rotate: '1deg',scale: '1.1', transition: '0.3s'}

    }}>
      <CardMedia
        sx={{ height: 277 }}
        image={`${item.productImg[0].url}`}
        title={item.productTitle}
                    onClick={() => {
                      handleClickOpen();
                      setClickedProduct(item);
                    }}
      />
      <CardContent>

        <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center'}}>

            <Typography variant="h6" gutterBottom component='div'>
                {item.productTitle}
            </Typography>

            <Typography variant="subtitle1" component='p'>
                ${item.productPrice}
            </Typography>

        </Stack>

        <Typography variant="body2" color="text.secondary">
          {item.productDescription}
        </Typography> 
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between'}}>
        <Button sx={{textTransform: 'capitalize',}} size="large" 
    onClick={() => {
      handleClickOpen();
      setClickedProduct(item);
    }}>
            <AddShoppingCartOutlinedIcon fontSize="small" sx={{mr: 1}}/>
          {t("mainProducts.addToCart")}
        </Button>
        <Rating name="read-only" value={item.productRating} precision={0.5} readOnly />
      </CardActions>
    </Card>
  )
            })}

            </AnimatePresence>

        </Stack>

        <Dialog sx={{'.MuiPaper-root': {minWidth: {xs: '100%', md: 800}}}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
<IconButton sx={{
    position: 'absolute', 
    top: 2, 
    insetInlineEnd: 8, 
    zIndex: 10, 
    ":hover": { 
        rotate: '180deg', 
        transition: '0.3s' 
    }
}} onClick={handleClose}>
    <Close sx={{ color: { xs: 'red', md: 'white' }, '&:hover': { color: 'red' }}} />
</IconButton>
<ProductDetails clickedProduct={clickedProduct}/>
      </Dialog>

        </Container>
    );


}
}
export default Main;