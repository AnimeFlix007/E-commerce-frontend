import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../context/cartSlice";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../Client";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { Category, Price, Image, Item } = item;
  console.log(!Image ? item : Image);

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item?.name}
          width="300px"
          height="400px"
          src={!Image ? "data:image/jpeg;base64,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" : urlFor(Image)}
          onClick={() => navigate(`/item/${item?._id}`)}
          style={{ cursor: "pointer", objectFit: "fill" }}
        />
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
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
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
        <Typography fontWeight="bold">${Price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
