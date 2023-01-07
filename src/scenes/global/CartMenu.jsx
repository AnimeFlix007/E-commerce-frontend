import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../../Client";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const breakPoint = useMediaQuery("(min-width:500px)");
  const CartbreakPoint = useMediaQuery("(min-width:400px)");
  const cart = useContext(CartContext)
  const totlalCost = cart.getTotalCost()
  return (
    // OVERLAY
    <Box
      display={cart.isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      onClick={() => cart.CartToggle()}
    >
      {/* MODAL  */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width={breakPoint ? "max(400px, 30%)" : "100%"}
        height="100%"
        backgroundColor="white"
        onClick={(e) => e.stopPropagation()}
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.items.length})</Typography>
            <IconButton onClick={cart.CartToggle}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.items.map((item) => (
              <Box key={`${item?.Item}-${item?._id}`}>
                <FlexBox p="15px 0">
                  <Box flex={CartbreakPoint?"1 1 40%" : "11 30%"} >
                    {item && <img
                      alt={item?.Item}
                      width={CartbreakPoint ? "123px" : "100px"}
                      height={CartbreakPoint ? "164px" : "140px"}
                      src={urlFor(item?.Image)}
                    />}
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item?.Item}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          cart.deleteFromCart(item)
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item?.Desc}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            cart.removeOneFromCart(item)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item?.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            cart.addToCart(item)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ${item?.Price * item?.quantity}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totlalCost}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                cart.CartToggle();
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
