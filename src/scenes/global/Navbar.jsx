import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart.cart);

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
          <Avatar alt="Remy Sharp" src="data:image/png;base64,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" />
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
            badgeContent={5}
            color="secondary"
            // invisible={cart.length === 0}
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
              // onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
