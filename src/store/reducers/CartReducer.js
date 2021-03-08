const initialState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
};

const CartReducer = (state = initialState, action) => {
    let findPro;
    let index;

    switch(action.type){
        case 'ADD_TO_CART':
            const {product, quantity} = action.payload;
            const check = state.products.find(pr => pr.id === product.id);
            if(check){
                return state;
            }else{
                const tPrice = state.totalPrice + product.discountPrice * quantity;
                const tQuantities = state.totalQuantities + quantity;
                product.quantity = quantity
                return{
                    ...state, products: [...state.products, product], totalPrice : tPrice , totalQuantities:tQuantities
                }
            }
            case 'INC':
          findPro = state.products.find(product => product.id === action.payload);
          index = state.products.findIndex(product => product.id === action.payload);
          if(findPro.quantity < 5){
          findPro.quantity += 1;
          state.products[index] = findPro;
          return {
              ...state,
              totalPrice: state.totalPrice + findPro.discountPrice, totalQuantities: state.totalQuantities+1
          }
        }else{
            return state;
        }
          case "DEC":
        findPro = state.products.find(product => product.id === action.payload);
        index = state.products.findIndex(product => product.id === action.payload);
        if(findPro.quantity > 1){
           findPro.quantity -= 1;
           state.products[index] = findPro;
           return {
               ...state,
               totalPrice: state.totalPrice - findPro.discountPrice, totalQuantities: state.totalQuantities - 1
           }
        } else {
            return state;
        }
        case 'REMOVE':
        findPro = state.products.find(product => product.id === action.payload);
        const filtered = state.products.filter(product => product.id !== action.payload);
        return {
            ...state,
            products: filtered,
            totalPrice: state.totalPrice - findPro.discountPrice * findPro.quantity, totalQuantities: state.totalQuantities - findPro.quantity
        }
        case 'EMPTY':
            return {products: [], totalPrice:0, totalQuantities: 0}
            
        default:
            return state;
    }

}
export default CartReducer