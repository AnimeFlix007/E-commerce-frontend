import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { client } from "../../Client";
import { CartContext } from "../../context/CartContext";

const ItemsLists = () => {
  const [value, setValue] = useState("all");
  const cart = useContext(CartContext)
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const query = '*[_type == "Products"]';

    const data = await client.fetch(query);
    cart.getAllItems(data)
  }

  useEffect(() => {
    getItems();
  }, []);

  const topRatedItems = cart.allItems.filter(
    (item) => item?.Category === "topRated"
  );
  const newArrivalsItems = cart.allItems.filter(
    (item) => item?.Category === "newArrivals"
  );
  const bestSellersItems = cart.allItems.filter(
    (item) => item?.Category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          cart.allItems.map((item) => (
            <Item item={item} key={`${item?.Item}-${item?.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item?.Item}-${item?.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item?.Item}-${item?.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item?.Item}-${item?.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ItemsLists;
