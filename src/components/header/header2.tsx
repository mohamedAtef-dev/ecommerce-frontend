import { Container, IconButton, InputBase, Stack, Typography} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import TemporaryDrawer from "./ShopingCart";

const Search = styled('div')(({ theme }) => ({
  flexGrow: 0.4,
  position: 'relative',
  borderRadius: '22px',
  border: "1px solid #777",
  "&:hover": {
    border: '1px solid #333'
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  minWidth: '277px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '330px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#777',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  px: 2,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header2 = () => {
  const { t } = useTranslation();

  const options = [
    t("header2.All Categories"),
    t("header2.Cars"),
    t("header2.Electronics"),
    t("header2.Clothes"),
    t("header2.Shoes"),
];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <Container sx={{ my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {xs: 'column', sm: 'row'}}}>
      
      <Stack sx={{ alignItems: 'center', cursor: 'pointer' }}> 
        <ShoppingCartOutlinedIcon />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          E-commerce
        </Typography>
      </Stack> 

      <Search dir="ltr">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t('header2.Search') || "Search…"}
          inputProps={{ 'aria-label': 'search' }}
        />

        <div>
          <List 
            component="nav"
            aria-label="Device settings"
            sx={{ 
              bgcolor: theme.palette.myColor.main, 
              borderBottomRightRadius: '22px', 
              borderTopRightRadius: '22px', 
              p: 0 
            }}
          >
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="select category"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              sx={{ 
                borderBottomRightRadius: '22px', 
                borderTopRightRadius: '22px',
                '&:hover': { 
                  bgcolor: theme.palette.myColor.main, 
                } 
              }}
            >
              <ListItemText 
                sx={{ width: 93, textAlign: 'center' }}
                secondary={options[selectedIndex]}
              />
              <ExpandMoreIcon sx={{ fontSize: '16px' }} />
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
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>

      <Stack direction={"row"} sx={{ alignItems: 'center' }}>

        <TemporaryDrawer />

        <IconButton>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>

    </Container>
  );
};

export default Header2;