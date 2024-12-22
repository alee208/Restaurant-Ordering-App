import {menuArray} from "./data.js"


//initializes customer order as an empty array
let customerOrderArray = []
const modalContainer = document.getElementById('modal-container')
const modal = document.getElementById('modal')
const customerName = document.getElementById('customerName')
const msgContainer = document.getElementById('msg-container')


//clearing form after hitting pay
function clearForm() {
    customerName.value = ''
    document.getElementById('cardNumber').value = ''
    document.getElementById('cvv').value = ''
}

//clearing customer order data after submitting payment
function clearOrderSummary() {
    document.getElementById('total-order-container').innerHTML = ''
    customerOrderArray = []
}

//prevents default form behavior when submitting payment
modal.addEventListener('submit', function (e) {
    e.preventDefault()
})


//clears order confirmation message after payment when new item is added into cart
function hideOrderConfirmation() {
    msgContainer.style.display = 'none'
}


//renders order confirmation and thank you message after hitting submit
function renderOrderConfirmation() {
    let msgContainerHTML = `   
        <p class="message">Thanks, ${customerName.value}! Your order is on its way!</p>   
    `
    document.getElementById('total-order-container').innerHTML = ''
    msgContainer.innerHTML = msgContainerHTML
    msgContainer.style.display = 'flex'
}

//renders customer checkout modal
function openModal() {
    modalContainer.style.display = 'flex'
}
//closes customer checkout modal
function closeModal() {
    modalContainer.style.display = 'none'
}


//event listeners for clicking on different things on the website
document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn) {
       createCustomerOrder(e.target.dataset.addbtn)
       renderCustomerOrder(customerOrderArray)
       hideOrderConfirmation(e.target.dataset.addbtn)
    } if(e.target.dataset.removebtn) {
        removeBtn(e.target.dataset.removebtn)
        renderCustomerOrder(customerOrderArray)
    } if(e.target.id === 'close-modal-btn') {
        closeModal(e)
    } if (e.target.id === 'complete-btn') {
        openModal(e)
    } if (e.target.id === 'pay-btn') {
        closeModal(e)
        renderOrderConfirmation(e)
        clearOrderSummary(e)
        clearForm(e)
    }
})


//pushes customer order into customerOrderArray
function createCustomerOrder(menuItemId) {
    const clickedItem = menuArray.find((item) => item.id == menuItemId);

    if (clickedItem) {
        // Check if item already exists in the order
        const existingItem = customerOrderArray.find((item) => item.id == clickedItem.id);

        if (existingItem) {
            // If item exists, increment its quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add it with quantity 1
            clickedItem.quantity = 1;
            customerOrderArray.push(clickedItem);
        }
    }
}


//renders customer order summary and total
function renderCustomerOrder (customerOrder) {
    let orderHTML = '<h3>Your Order</h3>'
    let orderTotal = 0 //initiates total price
    customerOrder.forEach((item) => {
        const totalItemPrice = item.price * item.quantity
        orderTotal += totalItemPrice
        orderHTML += `
        <div class="order-container">
            <p class="order-item">${item.name}</p>
            <button class="remove-btn" data-removebtn="${item.id}">remove</button>
            <p class="quantity">x ${item.quantity}</p>
            <div class="order-item-price">
                 <p class="order-price">$${totalItemPrice}</p>
            </div>
        </div> 
        `
    })
    orderHTML += `
        <hr>
        <div class="total-container" id="total-container">
            <p class="total" id="total">Total Price:</p>
            <p class="total-price" id="total-price">$${orderTotal}</p>
        </div>
            <button class="complete-btn" id="complete-btn">Complete Order</button>
        </div>
    `
    document.getElementById('total-order-container').innerHTML = orderHTML
    if (!customerOrderArray || customerOrderArray.length === 0) {
        document.getElementById('total-order-container').innerHTML = ''
    }
}


//hooks up the remove button
function removeBtn(itemId) {
    const itemIndex = customerOrderArray.findIndex(item => item.id == itemId);

    if (itemIndex !== -1) {
        const itemToRemove = customerOrderArray[itemIndex];

        if (itemToRemove.quantity > 1) {
            // If quantity is greater than 1, decrement the quantity
            itemToRemove.quantity -= 1;
        } else {
            // Otherwise, remove the item from the array
            customerOrderArray.splice(itemIndex, 1);
        }
    }
}




    

//iterates over menuArray and renders the menu items
function getMenu(menu) {
    return menu.map(item => {
        const {name, ingredients, id, price, emoji, image} = item
        return `
        <div class="item-container">
            <div class="image-container">
                <img src="${image}" alt="a picuture of a $[name}">
            </div>
            <div class="item-description">
                <p class="item-name">${name}</p>
                <p class="item-ingredients">${ingredients}</p>
                <p class="item-price">$${price}</p>
            </div>
            <div class="add-btn" ">
                <button class="add" data-addbtn="${id}">+</button>
            </div>
        </div> 
        `
    }).join('')
}

document.getElementById('menu-container').innerHTML = getMenu(menuArray)
































