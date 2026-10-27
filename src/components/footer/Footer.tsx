import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
<Box sx={{bgcolor: '#2B3445', py: 1.3, borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
    <Typography variant="h6"  sx={{color: '#fff', justifyContent: 'center', display: 'flex', alignItems: 'center', fontSize: '16px', flexDirection: {xs: 'column', md: 'row'}}}>
        {t("footer.Designed and developed by")}
        <Button component="a"
        href="https://mohamedatef-dev.github.io/mohamed-atef-portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{mx: 0.5, fontSize: '18px', textTransform: 'capitalize', color: '#ff7790'}} variant="text" color="primary">
            {t("footer.mohamed atef")}
        </Button>
        ©2026
    </Typography>
</Box>
    );
}
export default Footer;