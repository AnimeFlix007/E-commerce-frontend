import { Avatar, Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { wishListContext } from "../../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const wishList = useContext(wishListContext);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://i.imgur.com/Zb3NMb2.png"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.totalProductsQty()}
            color="secondary"
            invisible={cart.totalProductsQty() === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => cart.CartToggle()}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <Badge
            badgeContent={wishList.items.length}
            color="secondary"
            invisible={wishList.items.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => wishList.toggleWishList()}
              sx={{ color: "black" }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
