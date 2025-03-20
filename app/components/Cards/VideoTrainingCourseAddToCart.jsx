"use client";
import { Icon } from "@iconify/react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { useState } from "react";

const VideoTrainingCourseAddToCart = ({ data }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleBoxClick = (item) => {
    // Retrieve the existing cart data from local storage
    const existingCartData =
      JSON.parse(localStorage.getItem("CartProducts")) || [];

    // Check if the item is already in the cart
    const isItemInCart = existingCartData.some(
      (cartItem) => cartItem.cart === data.cart
    );

    if (!isItemInCart) {
      // If the item is not already in the cart, add it
      const cartData = {
        cart: data.cart,
        saveExam: true,
      };

      existingCartData.push(cartData);

      // Save the updated array back to local storage
      localStorage.setItem("CartProducts", JSON.stringify(existingCartData));

      // Open the snackbar to show a message to the user
      setSnackbarOpen(true);

      // Reload the page
      window.location.reload();
    } else {
      // Optionally, you could display a message that the item is already in the cart
      console.log("Item already in the cart");
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "green",
          }}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="mdi:cart-outline"
                width="1.6em"
                height="1.4em"
                style={{ color: "white", marginRight: "2px" }}
              />
              Product added to cart!
            </span>
          }
        />
      </Snackbar>
      <div className="w-full px-2 mb-2 md:mb-0">
        <button
          onClick={handleBoxClick}
          className="block py-2 px-2 leading-8 w-full font-heading font-medium tracking-tighter text-lg text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default VideoTrainingCourseAddToCart;
