let item = {
    name: '',
    quantity: 0 
};


function itemsInCart(productName, cart)  {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            cart[i].quantity++;
            found = true;
            return cart;
        }
    }
    if (!found) {
        let newItem = {
            name: productName,
            quantity: 1 
        };
        cart.push(newItem);
        return cart;
    }
}




 module.exports = itemsInCart 






/*  let cart = [] 
 console.log(itemsInCart('bin', cart))
console.log(itemsInCart('bin', cart))
console.log(itemsInCart('bin', cart))
log(itemsInCart('phuc', cart))

has tested and run ok
*/
