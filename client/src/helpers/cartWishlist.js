import Cookies from "js-cookie";

export const findItem = (product, placement, cartWishlist) => {
  return cartWishlist[placement]?.find((element) => element.id === product.id);
};

export const changeQuantity = (product, quantity, setCartWishlist) => {
  setCartWishlist((cartWishlist) => {
    const copy = { ...cartWishlist };

    copy["cart"] = copy["cart"].map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity };
      } else {
        return item;
      }
    });

    Cookies.set("cart", JSON.stringify(copy["cart"]));

    return copy;
  });
};

export const addItem = (product, placement, setCartWishlist, num = 1) => {
  setCartWishlist((cartWishlist) => {
    const copy = { ...cartWishlist };
    const itemFind = findItem(product, placement, cartWishlist);

    if (placement === "wishlist") {
      !itemFind && copy[placement].push(product);
    } else if (placement === "cart") {
      if (itemFind) {
        copy[placement] = copy[placement].map((element) => {
          if (element.id === product.id) {
            return { ...element, quantity: element.quantity + num };
          }
          return element;
        });
      } else {
        copy[placement].push({ ...product, quantity: num });
      }
    }

    Cookies.set(placement, JSON.stringify(copy[placement]));

    return copy;
  });
};

export const removeItem = (product, placement, setCartWishlist) => {
  setCartWishlist((cartWishlist) => {
    const copy = { ...cartWishlist };

    copy[placement] = copy[placement].filter((item) => item.id !== product.id);

    Cookies.set(placement, JSON.stringify(copy[placement]));

    return copy;
  });
};

export const removeAll = (placement, setCartWishlist) => {
  setCartWishlist((cartWishlist) => {
    const copy = { ...cartWishlist };

    copy[placement] = [];

    Cookies.remove(placement);

    return copy;
  });
};

export const totalCart = (cart) => {
  return cart.reduce(
    (acc, product) => Number(acc) + Number(product.price * product.quantity),
    0
  );
};
