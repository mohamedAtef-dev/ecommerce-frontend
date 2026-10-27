import { ExpandMore, KeyboardArrowRightOutlined, Add, Edit } from "@mui/icons-material"
import { Box, Paper, Typography } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

interface LinksProps {
    title: string;
}

const Links = ({ title }: LinksProps) => {
    const { t } = useTranslation();

    const [subOpen, setSubOpen] = useState(false);

    return (
        <Box sx={{
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center',
            ':hover .show-when-hover': { display: 'block' },
            ':hover': { cursor: 'pointer' },
        }}>
            {title === "Home" ? (
                <Typography 
                    component={Link} 
                    to="/" 
                    variant="body1"
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {t(`header3.${title}`)}
                </Typography>
            ) : (
            <Typography variant="body1">
                {t(`header3.${title}`)}
            </Typography>
            )}


            <ExpandMore sx={{ fontSize: '16px', ml: 1 }} />

            <Box className="show-when-hover" sx={{ 
                display: 'none', 
                position: 'absolute', 
                top: '100%', 
                minWidth: '170px', 
                zIndex: 20, 
                transform: "translateX(-50%)", 
                left: '50%' 
            }}> 
                <Paper sx={{ mt: 2, boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
                    <nav aria-label="secondary mailbox folders">
                        <List sx={{ py: 1 }}>

                            {title === "Home" ? (
                                <>
                                    {/* 1. About */}
                                    <ListItem disablePadding sx={{ display: 'flex', p: 0, px: 1 }}>
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.About")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                        </ListItemButton>
                                    </ListItem>

                                
                                    <ListItem 
                                        disablePadding 
                                        sx={{ display: 'flex', p: 0, px: 1, position: 'relative' }}
                                        onMouseEnter={() => setSubOpen(true)}
                                        onMouseLeave={() => setSubOpen(false)}
                                    >
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.Projects")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                            <Box sx={{ flexGrow: 1 }}/>
                                            <KeyboardArrowRightOutlined fontSize="small"/>
                                        </ListItemButton>

                                    
                                        {subOpen && (
                                            <Box sx={{ position: 'absolute', left: '100%', top: 0, zIndex: 30 }}>
                                                <Paper sx={{ ml: 1, minWidth: 170, boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
                                                    <List sx={{ py: 1 }}>
                                                        <ListItem disablePadding sx={{ p: 0, px: 1 }}>
                                                            <ListItemButton sx={{ borderRadius: '6px', py: 1 }}>
                                                                <ListItemText primary={t("header3.Edit Product")} sx={{ '.MuiTypography-root': { fontSize: '15px', fontWeight: 400 } }}/>
                                                                <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                                                                    <Edit fontSize="small" color="action" />
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                        </ListItem>

                                                        <ListItem disablePadding sx={{ p: 0, px: 1 }}>
                                                            <ListItemButton sx={{ borderRadius: '6px', py: 1 }}>
                                                                <ListItemText primary={t("header3.Add Product")} sx={{ '.MuiTypography-root': { fontSize: '15px', fontWeight: 400 } }}/>
                                                                <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                                                                    <Add fontSize="small" color="primary" />
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </List>
                                                </Paper>
                                            </Box>
                                        )}
                                    </ListItem>

                                    {/* 3. Contact */}
                                    <ListItem disablePadding sx={{ display: 'flex', p: 0, px: 1 }}>
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.Contact")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                        </ListItemButton>
                                    </ListItem>

                                    {/* 4. Team */}
                                    <ListItem disablePadding sx={{ display: 'flex', p: 0, px: 1 }}>
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.Team")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ) : (
                                
                                <>
                                    <ListItem disablePadding sx={{ display: 'flex', p: 0, px: 1 }}>
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.About")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding sx={{ display: 'flex', p: 0, px: 1 }}>
                                        <ListItemButton sx={{ borderRadius: '6px' }}>
                                            <ListItemText primary={t("header3.Contact")} sx={{ ".MuiTypography-root": { fontSize: '15px', fontWeight: 400 } }}/>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )}

                        </List>
                    </nav>
                </Paper>
            </Box>
        </Box>
    )
}

export default Links;