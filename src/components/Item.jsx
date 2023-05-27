import { useContext, useState } from "react";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../Client";
import { CartContext } from "../context/CartContext";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { Category, Price, Image, Item } = item;

  const productQuantity = cart.getProductQuantity(item);

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {Image && (
          <img
            alt={item?.name}
            width="300px"
            height="400px"
            src={urlFor(Image)}
            onClick={() => navigate(`/item/${item?._id}`)}
            style={{ cursor: "pointer", objectFit: "fill" }}
          />
        )}
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => cart.removeOneFromCart(item)}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>
                {productQuantity}
              </Typography>
              <IconButton onClick={() => cart.addToCart(item)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                cart.addToCart(item);
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {Category.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
            str.toUpperCase()
          )}
        </Typography>
        <Typography>{Item}</Typography>
        <Typography fontWeight="bold">₹{Price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
