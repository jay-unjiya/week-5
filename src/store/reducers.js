import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk('products/fetchProduct', async () => {
    const res = await fetch('https://fakestoreapi.in/api/products');
    const data = await res.json();
    return data;
});

export const fetchLimitedProducts = createAsyncThunk('products/fetchLimitedProduct', async (value) => {
    const res = await fetch(`https://fakestoreapi.in/api/products?limit=${value}`);
    const data = await res.json();
    return data;
});


const productSlider = createSlice({
    name: 'product',
    initialState: {
        products: [],
        limitedProduct: [],
        cart: [],
        userExists:'',
        users: [],
        errors: false,
        loading: false,
    },
    reducers: {
        addToCart: (state, action) => {
            let flag = false;
            for (let i = 0; i < state.cart.length; i++) {
                if (parseInt(state.cart[i].id) === parseInt(action.payload.id)) {
                    state.cart[i].quantity += action.payload.quantity;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                state.cart = state.cart.concat(action.payload);
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },
        handleCart: (state, action) => {
            for (let i = 0; i < state.cart.length; i++) {
                console.log(state.cart[0].id)
                if (parseInt(state.cart[i].id) === parseInt(action.payload.id)) {
                    state.cart[i].quantity = action.payload.quantity;
                    break;
                }
            }
        },
        emptyCart: (state, action) => {
            state.cart = []
            console.log('hello')
        },
        addUser: (state, action) => {
            state.users.push(action.payload.data);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.concat(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.errors = true
            })
            .addCase(fetchLimitedProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLimitedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.limitedProduct = state.limitedProduct.concat(action.payload);
            })
            .addCase(fetchLimitedProducts.rejected, (state, action) => {
                state.loading = false;
                state.errors = true
            })
    },

})
export const { addToCart, removeFromCart, handleCart, emptyCart, addUser, checkLogin } = productSlider.actions
export const products = productSlider.reducer
