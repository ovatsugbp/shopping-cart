const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };
        case "REMOVE":
            return {
                ...state,
                cart: state.cart.filter((el) => el.id !== action.payload),
            };
        case "INCREASE":
            let addCart = state.cart.map((el) => {
                if (el.id === action.payload) {
                    return { ...el, amount: el.amount + 1 };
                }
                return el;
            });

            return {
                ...state,
                cart: addCart,
            };
        case "DECREASE":
            let minusCart = state.cart
                .map((el) => {
                    if (el.id === action.payload) {
                        return { ...el, amount: el.amount - 1 };
                    }
                    return el;
                })
                .filter((el) => el.amount !== 0);

            return {
                ...state,
                cart: minusCart,
            };
        case "GET_TOTALS":
            let { total, amount } = state.cart.reduce(
                (acc, cartItem) => {
                    const { price, amount } = cartItem;

                    acc.amount += amount;
                    acc.total += amount * price;

                    return acc;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            return {
                ...state,
                total,
                amount,
            };
        case "LOADING":
            return { ...state, loading: true };
        case "DISPLAY_ITEMS":
            return { ...state, cart: action.payload, loading: false };
        default:
            break;
    }
    return state;
};

export default reducer;
