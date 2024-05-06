let item = {
    name: '',
    quantity: 0 
};

/* let cart = [] */
function additem(productName, cart)  {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            cart[i].quantity++;
            found = true;
            return checkItemsInCart(productName, cart);
        }
    }
    if (!found) {
        let newItem = {
            name: productName,
            quantity: 1 
        };
        cart.push(newItem);
        return checkItemsInCart(productName, cart);
    }
}


function checkItemsInCart(productName, cart) {
    let quantity = 0;
    cart.forEach(item => {
        if (item.name === productName) {
            quantity = item.quantity;
        }
    });
    return quantity;
}



 module.exports = {checkItemsInCart, additem} 
