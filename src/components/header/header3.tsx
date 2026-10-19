import { Box, Button, Container, Drawer, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import WindowIcon from '@mui/icons-material/Window';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import ElectricBikeOutlinedIcon from '@mui/icons-material/ElectricBikeOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { Close } from "@mui/icons-material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Links from "./Links";
import { useTranslation } from "react-i18next";

type Anchor = 'top';

const Header3 = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
      <Box>
        <Button
          sx={{ width: '222px', bgcolor: theme.palette.myColor.main, color: theme.palette.text.secondary }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <WindowIcon />
          <Typography sx={{ padding: '0', textTransform: 'capitalize', mx: 1 }}>
            {t("header3.Categories")}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <KeyboardArrowRightIcon />
        </Button>

        <Menu
          sx={{ ".MuiPaper-root": { width: 222, bgcolor: theme.palette.myColor.main, color: theme.palette.text.secondary } }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ElectricBikeOutlinedIcon />
            </ListItemIcon>
            <ListItemText>{t("header3.Games")}</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <VideoLabelIcon />
            </ListItemIcon>
            <ListItemText>{t("header3.Electronics")}</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText>{t("header3.Books")}</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {useMediaQuery('(min-width: 1200px)') && (
        <Stack direction={"row"} sx={{ gap: 2 }}>
          <Links title={"Home"} />
          <Links title={"Pages"} />
          <Links title={"Blog"} />
          <Links title={"Shop"} />
          <Links title={"Portfolio"} />
          <Links title={"Contact"} />
        </Stack>
      )}

      {useMediaQuery('(max-width: 1200px)') && (
        <IconButton onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        sx={{
          ".MuiPaper-root": {
            height: "auto",
            maxHeight: "85vh",
            bgcolor: theme.palette.background.paper,
            borderRadius: "0 0 16px 16px",
            boxShadow: 6,
          }
        }}
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
      >
        <Box sx={{ width: { xs: "90%", sm: 444 }, mx: 'auto', mt: 3, position: 'relative', pt: 6, pb: 3 }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 10,
              transition: '0.3s',
              ":hover": { rotate: '180deg', color: 'red' }
            }}
            onClick={toggleDrawer("top", false)}
          >
            <Close />
          </IconButton>

          {/* تم تحديث المصفوقة لتتناسب مع المطلوب لكل رابط */}
          {[
            { mainLink: 'Home', subLink: ['About', 'Projects', 'Contact', 'Team'] },
            { mainLink: 'Pages', subLink: ['About', 'Contact'] },
            { mainLink: 'Blog', subLink: ['About', 'Contact'] },
            { mainLink: 'Shop', subLink: ['About', 'Contact'] },
            { mainLink: 'Portfolio', subLink: ['About', 'Contact'] },
            { mainLink: 'Contact', subLink: ['About', 'Contact'] },
          ].map((item) => {
            return (
              <Accordion
                key={item.mainLink}
                elevation={0}
                sx={{
                  bgcolor: theme.palette.myColor.main,
                  my: 1,
                  borderRadius: '6px !important',
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                  '&::before': { display: 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${item.mainLink}-content`}
                  id={`panel-${item.mainLink}-header`}
                  sx={{
                    minHeight: '48px',
                    '&.Mui-expanded': { minHeight: '48px' },
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{t(`header3.${item.mainLink}`)}</Typography>
                </AccordionSummary>

                <List sx={{ my: 0, py: 0, bgcolor: theme.palette.background.paper }}>
                  {item.subLink.map((subItem) => {
                    return (
                      <ListItem key={subItem} sx={{ my: 0, py: 0, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <ListItemButton sx={{ py: 1, pl: 4 }}>
                          <ListItemText primary={t(`header3.${subItem}`)} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </Accordion>
            )
          })}
        </Box>
      </Drawer>
    </Container>
  );
}

export default Header3;