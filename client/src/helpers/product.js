export class Filter {
  constructor(products = "", search = "", filterSort = "") {
    this.products = products;
    this.search = search;
    this.filterSort = filterSort;
  }

  setProducts(products) {
    this.products = products;
  }

  setSearch(search) {
    this.search = search;
  }

  setFilterSort(filterSort) {
    this.filterSort = filterSort;
  }

  setFilterValue(sortType, sortValue) {
    if (sortType === "search") {
      this.setSearch(sortValue);
    }

    if (sortType === "filterSort") {
      this.setFilterSort(sortValue);
    }
  }

  getSortedProducts() {
    if (document.getElementById("searchProduct").value === "") {
      this.setSearch("");
    }

    let sortedProducts = [...this.products];

    if (this.search) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.filterSort) {
      let copySortProducts = [...sortedProducts];

      if (this.filterSort === "default") {
        return copySortProducts;
      }

      if (this.filterSort === "priceHighToLow") {
        copySortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (this.filterSort === "priceLowToHigh") {
        copySortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }

      sortedProducts = copySortProducts;
    }

    return sortedProducts;
  }
}

//get products based whith correct filter
/**
 *
 * @param {Array} products
 * @param {String} sortType
 * @param {*} sortValue
 * @returns
 */
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "search") {
      return products.filter((product) =>
        product.name.toLowerCase().includes(sortValue.toLowerCase())
      );
    }

    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};
