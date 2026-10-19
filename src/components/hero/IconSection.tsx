import { Box, Container, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
 import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
 import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
 import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";


const IconSection = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <Container sx={{bgcolor: theme.palette.mode === 'dark' ? '#000' : '#fff', mt: 3}}>
            <Stack direction={"row"} sx={{flexWrap: 'wrap', alignItems: 'center'}}
            divider={useMediaQuery('(min-width:600px)') ? <Divider orientation="vertical" flexItem /> : null}>

            <MyBox icon={<ElectricBoltIcon />} title={t("iconSection.fastDelivery")} subTitle={t("iconSection.fastDeliverySub")} />
            <MyBox icon={<CreditScoreOutlinedIcon />} title={t("iconSection.moneyGuarantee")} subTitle={t("iconSection.moneyGuaranteeSub")} />
            <MyBox icon={<WorkspacePremiumOutlinedIcon />} title={t("iconSection.365Days")} subTitle={t("iconSection.365DaysSub")} />
            <MyBox icon={<AccessAlarmOutlinedIcon />} title={t("iconSection.payment")} subTitle={t("iconSection.paymentSub")} />

            </Stack>
        </Container>
    );
}
export default IconSection;


interface MyBoxProps {
    icon: ReactNode;
    title: string;
    subTitle: string;
}
const MyBox = ({icon, title, subTitle}: MyBoxProps) => {
    const theme = useTheme()
    return (
        <Box sx={{width: 250, display: 'flex', flexGrow: 1, gap: 3, py: 1.6, justifyContent: useMediaQuery('(min-width:600px)') ? 'center' : 'left'}}>
            {icon}
            <Box sx={{}}>
                <Typography variant="body1">
                {title}
                </Typography>
                <Typography variant="body1" sx={{fontWeight: 300, color: theme.palette.text.secondary}}>
                    {subTitle}
                </Typography>
            </Box>
        </Box>
    )
}