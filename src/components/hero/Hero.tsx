import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Link, Stack, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import IconSection from "./IconSection";
import { useTranslation } from "react-i18next";

const Hero = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const baseUrl = import.meta.env.BASE_URL;
    const mySlider= [
{ text: "hero.MEN", link: `${baseUrl}image/banner-25.jpg` },
        { text: "hero.WOMEN", link: `${baseUrl}image/banner-15.jpg` },
]
    return (
        <Container>
            
        <Box sx={{mt: 2.5, pt: 2, display: 'flex', alignItems: 'center', gap: 2}}>

    <Swiper loop={true}
    key={i18n.language}
        pagination={{
        dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
    >

        {mySlider.map((item) => {
            return (

        <SwiperSlide key={item.link}>
            <img src={item.link} alt="" />
        <Box
        sx={{ pb: 6, pt: 4,
        [theme.breakpoints.up('sm')]: {
        position: 'absolute', left: '10%', textAlign: 'left',
    },
        }}>
        
        <Typography variant="h6" sx={{color: '#222'}}>{t("hero.lifeStyleCollection")}</Typography>
        <Typography variant="h4" sx={{color: '#222', fontWeight: 400, my: 1}}>{t(item.text)}</Typography>
    
        <Stack direction={"row"} sx={{justifyContent:{ xs: 'center', sm: 'left'}, alignItems: 'center'}}>

            <Typography sx={{color: '#333', mr: 1,}} variant="h5">
                {t("hero.saleUpTo")}
            </Typography>

            <Typography sx={{color: '#D23F57'}} variant="h5">
                {t("hero.30%OFF")}
            </Typography>
        </Stack>

        <Typography variant="body1" sx={{color: '#000', fontWeight: 300, my: 1}}>
        {t("hero.freeShipping")}
        </Typography>

        <Button sx={{px: 5, py: 1, mt: 2, backgroundColor: '#222', 
            boxShadow: '0 4px 16px rgba(43, 52, 69, 0.1)', color: '#fff', borderRadius:'5px', '&:hover': {bgcolor: '#151515', boxShadow: '0 4px 16px rgba(43, 52, 69, 0.1)'}}} variant="contained">
            {t("hero.shop now")}
        </Button>
        </Box>
        </SwiperSlide>



            )
        })}

    </Swiper>


    <Box sx={{display: {xs: 'none', md: 'block', minWidth: '26%'}}}>

            <Box sx={{position: 'relative'}}>
            
                <img width={'100%'} src={`${baseUrl}image/banner-17.jpg`} alt="" />

<Stack  sx={{position: 'absolute', top: '50%', left: 33, transform : 'translateY(-50%)'}}>

        <Typography variant="caption" sx={{color: '#2B3445', fontSize: '18px'}}>{t("hero.NEW ARRIVALS")}</Typography>
        <Typography variant="h6" sx={{color: '#2B3445', lineHeight: '18px', mt: 1,}}>{t("hero.SUMMER")}</Typography>
        <Typography variant="h6" sx={{color: '#2B3445', lineHeight: '18px', mt: 1,}}>{t("hero.SALE20%OFF")}</Typography>
        <Link sx={{color: '#2B3445', display: 'flex', alignItems: 'center', gap: '5px', transition: '0.2s', "&:hover": {color: '#D23F57'}}} href="#" underline="none">{t("hero.shop now")}
        <ArrowForward sx={{fontSize: '13px'}} />
        </Link>

</Stack>
</Box>

            <Box sx={{position: 'relative', mt: 2}}>
                <img width={'100%'} src={`${baseUrl}image/banner-16.jpg`} alt="" />

                <Stack  sx={{position: 'absolute', top: '50%', left: 33, transform : 'translateY(-50%)'}}>

        <Typography variant="caption" sx={{color: '#2B3445', fontSize: '18px'}}>{t("hero.GAMING 4K")}</Typography>
        <Typography variant="h6" sx={{color: '#2B3445', lineHeight: '18px', mt: 1,}}>{t("hero.DESKTOPS &")}</Typography>
        <Typography variant="h6" sx={{color: '#2B3445', lineHeight: '18px', mt: 1,}}>{t("hero.LAPTOPS")}</Typography>
        <Link sx={{color: '#2B3445', display: 'flex', alignItems: 'center', gap: '5px', transition: '0.2s', "&:hover": {color: '#D23F57'}}} href="#" underline="none">{t("hero.shop now")}
        <ArrowForward sx={{fontSize: '13px'}} />
        </Link>

</Stack>


    </Box>

    </Box>


        </Box>
            <IconSection />
        </Container>
    );
}
export default Hero;