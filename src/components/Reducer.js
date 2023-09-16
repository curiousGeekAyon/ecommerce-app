export const pageReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
        currPData: action.payload.currPData,
      };
    case "MOVE_BACKWARD":
      const pdata = state.data.slice(
        (state.page - 1) * 12 + 1,
        (state.page - 1) * 12 + 13
      );
      if (state.page > 0) {
        return {
          ...state,
          page: state.page - 1,
          currPData: pdata,
        };
      }
      break; // Added break statement to exit the case

    case "MOVE_FORWARD":
      if (state.page < state.total / 12) {
        const pdata = state.data.slice(
          (state.page + 1) * 12 + 1,
          (state.page + 1) * 12 + 13
        );
       
        return {
          ...state,
          page: state.page + 1,
          currPData: pdata,
        };
      }
      break; // Added break statement to exit the case

    case "CHANGE_PAGE":
      const data = state.data.slice(
        (action.id - 1) * 12 + 1,
        (action.id - 1) * 12 + 13
      );
      
      return {
        ...state,
        page: action.id - 1,
        currPData: data,
      };
    case "UPDATE_CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case "FILTER":
   
      return {
        ...state,
        currCategory: action.payload,
      };
    case "SEARCH":
     
      return {
        ...state,
        searchKeyWord: action.payload,
      };
    case "REFRESH":
      return {
        ...state,
        searchKeyWord: null,
      };
    case "SET_SEARCH_PAGE":
      return {
        ...state,
        totalSearchData: [...action.payload.totalSearchData],
        currPSearchData: [...action.payload.currPSearchData],
        sTotal: action.payload.sTotal,
      };
    case "ON":
    
      const newSort = action.payload.map((item, i) => {
        if (i == action.index) {
          return {
            ...item,
            check: true,
          };
        } else {
          return {
            ...item,
            check: false,
            highToLow: 0,
          };
        }
      });

      return {
        ...state,
        sort: newSort,
      };

    case "SORT":
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const updatedCart = new Map(state.cart); // Create a new Map from the existing state.cart

      if (updatedCart.has(item.id)) {
        // If the item is already in the cart, perform some action (e.g., increase quantity)
        // For this example, we're incrementing the quantity by 1 when the item is already in the cart
        const existingItem = { ...updatedCart.get(item.id) };
        existingItem["quantity"]++;
        updatedCart.set(item.id, existingItem);
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        updatedCart.set(item.id, { ...item, quantity: 1 });
      }

      return {
        ...state,
        cart: updatedCart, // Update the cart property with the updated Map
        cost: state.cost + item.price, // Update the cost by adding the item's price
      };

      case "REMOVE_FROM_CART":
        const updatedcart = new Map(state.cart);
        const existingItem = updatedcart.get(action.id);
        if (updatedcart.has(action.id)) {
        if (existingItem) {
          existingItem.quantity--;
          if (existingItem.quantity > 0) {
            updatedcart.set(action.id, existingItem);
          } else {
            updatedcart.delete(action.id);
          }
        }
      }
        return {
          ...state,
          cart: updatedcart,
          cost: state.cost - action.price,
        };
      
      
    case "PROCEED_TO_CHECKOUT":
      return {
        ...state,
        cart: new Map(),
        cost: 0,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};
