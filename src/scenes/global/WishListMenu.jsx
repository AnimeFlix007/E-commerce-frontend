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
import { wishListContext } from "../../context/WishlistContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WishListMenu = () => {
  const navigate = useNavigate();
  const breakPoint = useMediaQuery("(min-width:500px)");
  const CartbreakPoint = useMediaQuery("(min-width:400px)");
  const wishList = useContext(wishListContext);

  return (
    // OVERLAY
    <Box
      display={wishList.wishListIsOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
      onClick={() => wishList.toggleWishList()}
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
            <Typography variant="h3">
              WIShLISTS ({wishList.items.length})
            </Typography>
            <IconButton onClick={wishList.toggleWishList}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {wishList.items.map((item) => (
              <Box key={`${item?.Item}-${item?._id}`}>
                <FlexBox p="15px 0">
                  <Box flex={CartbreakPoint ? "1 1 40%" : "11 30%"}>
                    {item && (
                      <img
                        alt={item?.Item}
                        width={CartbreakPoint ? "123px" : "100px"}
                        height={CartbreakPoint ? "164px" : "140px"}
                        src={urlFor(item?.Image)}
                      />
                    )}
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item?.Item}</Typography>
                      <IconButton
                        onClick={() => wishList.removeFromWishList(item)}
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
                          onClick={() => wishList.removeFromWishList(item)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">${item?.Price}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WishListMenu;
