import { Box, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import   { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../theme";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";

const options = [
  'Ar',
  'En',
];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const {i18n, t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(i18n.language === 'ar' ? 0 : 1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    // تغيير اللغة بناءً على الاختيار (0 للعربية، 1 للإنجليزية)
    if (index === 0) {
      i18n.changeLanguage('ar');
    } else {
      i18n.changeLanguage('en');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


useEffect(() => {
  const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', currentDir);
}, [i18n, i18n.language]);

        return(
    <Box sx={{bgcolor: '#2B3445', py: '5px', borderBottomRightRadius: 16, borderBottomLeftRadius: 16}}>

<Container> 

<Stack direction={"row"} sx={{alignItems: 'center'}}>

    <Typography variant="body2" sx={{bgcolor: '#D23F57', marginInlineEnd: 2, p: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', color: '#fff'}}> 
        {t("header1.Hot")}
    </Typography>

    <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 300, color: '#fff'}}> 
        {t("header1.Deals of the day")}
    </Typography>

    <Box sx={{flex: 1}}/>

        <div>
            {theme.palette.mode === "light" ? (
            <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            >
            <LightModeOutlined sx={{fontSize: "20px", color: 'white'}}/>
            </IconButton>
        ) : (
            <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            >
            <DarkModeOutlined sx={{fontSize: "20px", color: 'white'}}/>
            </IconButton>
        )} 
        </div>

 <List
        component="nav"
        aria-label="Device settings"
        sx={{m: 0, p: 0}}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{"&:hover": {cursor: "pointer"}, px: 1}}
        >
          <ListItemText sx={{'.MuiListItemText-secondary': {color: '#fff', fontSize: '14px'}}}
            secondary={options[selectedIndex]}
          />

          <ExpandMoreIcon sx={{color: 'white'}}/>
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
          sx={{fontSize: '15px', p: '3px 10px', minHeight: '10px'}}
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
<Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <FacebookIcon sx={{ fontSize: '16px', color: '#fff' }} />
            <XIcon sx={{ fontSize: '16px', mx: 1, color: '#fff' }} />
            <InstagramIcon sx={{ fontSize: '16px', color: '#fff' }} />
        </Box>
</Stack>

</Container>




            </Box>
        );
    }
    export default Header1;