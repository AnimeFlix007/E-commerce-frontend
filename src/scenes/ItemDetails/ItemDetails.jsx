import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { client, urlFor } from "../../Client";
import { CartContext } from "../../context/CartContext";
import { wishListContext } from "../../context/WishlistContext";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [x, setx] = useState(0);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const cart = useContext(CartContext);
  const wishlist = useContext(wishListContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const query = '*[_type == "Products"]';
    const data = await client.fetch(query);
    console.log(data);
    const Reqitem = data.find((item) => {
      return item?._id?.toString() === itemId.toString();
    });
    console.log(Reqitem);
    setItem(Reqitem);
  }

  async function getItems() {
    const query = '*[_type == "Products"]';

    const data = await client.fetch(query);
    setItems(data);
  }

  const itemPresentInWishList = wishlist.items.find(
    (product) => product._id === item?._id
  );

  function toggleWishListHandler(item) {
    if (itemPresentInWishList) {
      wishlist.removeFromWishList(item);
    } else {
      wishlist.addToWishList(item);
    }
  }

  useEffect(() => {
    getItem();
    setx(1);
    getItems();
  }, [itemId, x]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          {item && (
            <img
              alt={item?.Item}
              width="100%"
              height="100%"
              src={urlFor(item?.Image)}
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.Item}</Typography>
            <Typography>₹{item?.Price}</Typography>
            <Typography sx={{ mt: "20px" }}>{item?.Desc}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => cart.removeOneFromCart(item)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>
                {cart.getProductQuantity(item)}
              </Typography>
              <IconButton onClick={() => cart.addToCart(item)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => cart.addToCart(item)}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex" alignItems={"center"}>
              {itemPresentInWishList ? (
                <FavoriteIcon
                  style={{
                    color: "red",
                  }}
                  onClick={() => wishlist.removeFromWishList(item)}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  onClick={() => wishlist.addToWishList(item)}
                />
              )}

              <Typography
                onClick={() => toggleWishListHandler(item)}
                sx={{ ml: "5px", cursor: "pointer" }}
              >
                ADD TO WISHLIST
              </Typography>
            </Box>
            <Typography>CATEGORY: {item?.Category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <>
            <div>
              Fashion is a form of self-expression and autonomy at a particular
              period and place and in a specific context, of clothing, footwear,
              lifestyle, accessories, makeup, hairstyle, and body posture. The
              term implies a look defined by the fashion industry as that which
              is trending.
            </div>
            <div>
              The term “fashion” is used by practitioners and academics to
              generally refer to an industry which widely includes several
              sectors: textile, clothing, leather, knitwear, accessories,
              sunglasses, cosmetics, and jewelry. Generally, fashion is a
              popular style or practice, especially in clothing, footwear,
              accessories, makeup, body, or furniture. It comes from a Latin
              ward “Facere” which means “To Make”. We can simply explain fashion
              is an art. Fashion expresses of someone feelings. It also refers
              to the newest creations of textile designers. In this article I
              will teach about fashion classification and describes every
              segments.
            </div>
          </>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items
            .filter(
              (it) => it?.Category == item?.Category && it?._id !== itemId
            )
            .map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
