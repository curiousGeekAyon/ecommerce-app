export const pageReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
        currPData: action.payload.currPData,
      };
    case "MOVE_BACKWARD":
      console.log(action.type);
      const pdata = state.data.slice(
        (state.page - 1 )* 12 + 1,
        (state.page - 1 )* 12 + 13
      );
      console.log((state.page - 1 )* 12 + 1);
      if (state.page > 0) {
        return {
          ...state,
          page: state.page - 1,
          currPData: pdata,
        };
      }
      break; // Added break statement to exit the case

    case "MOVE_FORWARD":
      console.log(action.type);
      if (state.page < state.total / 12) {
        const pdata = state.data.slice(
            (state.page + 1 )* 12 + 1,
            (state.page + 1 )* 12 + 13
        );
        console.log(state.pdata);
        console.log(state.page);
        return {
          ...state,
          page: state.page + 1,
          currPData: pdata,
        };
      }
      break; // Added break statement to exit the case

    case "CHANGE_PAGE":
      const data = state.data.slice(
        (action.id - 1 )* 12 + 1,
        (action.id - 1 )* 12 + 13
      );
      console.log(data);
      return {
        ...state,
        page: action.id - 1,
        currPData: data,
      };
    case "UPDATE_CATEGORIES":
         {
           return {
               ...state,
               categories:action.payload
           }
         }
    case "FILTER":
      console.log(action.type + " " + action.payload);
      return {
        ...state,
        currCategory: action.payload,
      };
    case "SEARCH":
      console.log(action.payload);
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
      console.log(action.payload);
      return {
        ...state,
        totalSearchData: [...action.payload.totalSearchData],
        currPSearchData: [...action.payload.currPSearchData],
        sTotal: action.payload.sTotal,
      };
    case "ON":
      console.log("callled");
      const newSort =action.payload.map((item,i)=>{if(i==action.index)
                                                        {
                                                          return {
                                                                ...item,
                                                                check:true
                                                          }
                                                        }
                                                      else{
                                                        return {
                                                          ...item,
                                                          check:false,
                                                          highToLow:0
                                                    }    
                                                      }})

      return   {
                  ...state,
                  sort:newSort
                }
      
    case "SORT":
      console.log("callign sort")
       return{
          ...state,
          sort:action.payload
       }
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        cost: state.cost + action.payload.price,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item, i) => {
          if (i !== action.id) {
            return true;
          } else {
            return false;
          }
        }),
        cost: state.cost - action.id,
      };
    case "PROCEED_TO_CHECKOUT":
      return {
        ...state,
        cart: [],
        cost: 0,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      console.log(state.item);
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};
