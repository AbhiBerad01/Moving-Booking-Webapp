// Listen for the "beforeunload" event
window.addEventListener('beforeunload', function() {
    // Clear the local storage
    localStorage.removeItem('cartItems');
  });

// ***************** movie timing**********
window.onload = function() {
    let showTime = JSON.parse(localStorage.getItem('showTiming'))[0];

    const newDiv = document.getElementById('movie-name');
  

    newDiv.innerHTML = `<h1>Bholaa - ${showTime.showTime}</h1>`;
  
    //************* next show timer************* */
    const countdown = setInterval(() => {
        // Get the current date and time
        const now = new Date().getTime();
        const nextShowDate = new Date('2023-05-10T09:00:00');
        // Calculate the time remaining until the next show
        const timeRemaining = nextShowDate - now;
      
        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
        // Update the countdown element with the remaining time
        const countdownElement = document.getElementById('timer');
        countdownElement.innerHTML = `Next show starts in ${days}d ${hours}h ${minutes}m ${seconds}s`;
      
        // If the countdown has ended, clear the interval
        if (timeRemaining < 0) {
          clearInterval(countdown);
          countdownElement.innerHTML = 'The next show has started!';
        }
      }, 1000);
      
  }
  



function booking_seat(event){
    // console.log(event.id);
    // console.log(document.getElementById(event.id).getAttribute('name'));
    let seat_id = event.id;
    let seat_type = document.getElementById(seat_id).getAttribute('name');
    let seat_selected = 0;
    if(seat_type=="premium")
    {
        seat_selected = 1;
        seat_cart(370,seat_selected,seat_id,seat_type);
    }
    else if (seat_type=="exclusive") {
        seat_selected=1;
        seat_cart(350,seat_selected,seat_id,seat_type);
    }
    else if(seat_type=="normal")
    {
        seat_selected=1;
        seat_cart(330,seat_selected,seat_id,seat_type);
    }
    ticket_selected(seat_id,seat_type);
    generateReceipt();
}

const seat_cart = (ticket_value,seat_selected,seat_id,seat_type)=>{
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
    cartItems.push({
        ticket_value: ticket_value, //price
        seat_selected: seat_selected, //no.of seats
        seat_id: seat_id, // ticket_id
        seat_type :seat_type
      });
    
      // Save the updated cart items to Local Storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// Define a function to retrieve the cart items from Local Storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}
//used to booking
const ticket_selected=(seat_id,seat_type)=>{
    // let selected_seat = document.getElementById(seat_id);
    // selected_seat.className = 'seatI own_booked';
    // selected_seat.onclick = own_booked;
    const originalDiv = document.getElementById(seat_id);

    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "seatI own_booked");
    newDiv.setAttribute("onclick", "own_booked(this)");
    newDiv.setAttribute("name", seat_type);
    newDiv.setAttribute("id", seat_id);
    newDiv.innerText = originalDiv.innerText;

    // Replace the original div element with the new div element
    originalDiv.parentNode.replaceChild(newDiv, originalDiv);
}
//used to remove booking
function own_booked(event) {
    let seat_id = event.id;
    const originalDiv = document.getElementById(seat_id);
    let seat_type = originalDiv.getAttribute('name');
    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "seatI available");
    newDiv.setAttribute("onclick", "booking_seat(this)");
    newDiv.setAttribute("name", seat_type);
    newDiv.setAttribute("id", seat_id);
    newDiv.innerText = originalDiv.innerText;

    // Replace the original div element with the new div element
    originalDiv.parentNode.replaceChild(newDiv, originalDiv);
     let cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
     var index;
     for(let i=0;i<cartItems.length;i++)
     {
         //getting index to access localstorage
         let value = cartItems[i];
         if(value.seat_id==seat_id)
         {
             index = i;
         }
     }
    //  console.log(index);
    removeCartItem(index);
    generateReceipt();
}
//used to remove seat from cart
function removeCartItem(index){
    let cartItem = JSON.parse(localStorage.getItem('cartItems'));
    cartItem.splice(index,1);
    localStorage.setItem('cartItems', JSON.stringify(cartItem));
}

//receipt div

function generateReceipt() {
    let receipt = document.getElementById("receipt");
    let cartItem = JSON.parse(localStorage.getItem('cartItems'));
    let premium=0;
    let exclusive=0;
    let normal=0;
    let total_ticket_price=0;
    const tickets = new Array();
    for(let i=0;i<cartItem.length;i++)
    {
        total_ticket_price = total_ticket_price + (cartItem[i].seat_selected * cartItem[i].ticket_value);
        tickets[i]=cartItem[i].seat_id;
        if(cartItem[i].seat_type=='premium')
        {
            premium++;
        }
        else if (cartItem[i].seat_type=='exclusive') {
            exclusive++;
        }
        else if (cartItem[i].seat_type=='normal') {
            normal++;
        }
    }
    // console.log(total_ticket_price,premium,exclusive,normal);
    // console.log(tickets);
    let gen = document.getElementById('gen');
    gen.style.display = 'block';
    receipt.innerHTML =   `  <div class="generated">
                                <div class="ticket-info ml-2">
                                     <h2>Ticket Receipt</h2>
                                     <div class="js">
                                         <p>Total Tickets : ${premium+exclusive+normal}</p> 
                                         <p>  Type of Tickets : Premium - ${premium}, Exclusive - ${exclusive}, Normal - ${normal}</p> 
                                         <p>Seat Numbers : ${tickets}</p>
                                      </div>
                                      <p class="ticket-price">
                                          Total Ticket Price : ${total_ticket_price} Rs
                                      </p> 
                                 </div>
                                 <div class="pay-button">
                                     <button class="pay" id="__pay" onclick="payMoney()">PAY Rs ${total_ticket_price}</button>
                                 </div>
                            </div>`;

}

function payMoney() {
    let index = JSON.parse(localStorage.getItem('cartItems')).length;
    if(index!=0)
    {
        
    alert("You are directed to payment page");
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
     for(let i=0;i<cartItems.length;i++)
     {
         //getting index to access localstorage
         let value = cartItems[i].seat_id;
         confirmed_booking(value);
     }
     localStorage.removeItem('cartItems');
     let gen = document.getElementById('gen');
    gen.style.display = 'none';
    
}
else{
    alert("Please select at least one seat to move forward");
}
}

function confirmed_booking(id) {
    const originalDiv = document.getElementById(id);
    let seat_type = originalDiv.getAttribute('name');
    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "seatI booked");
    newDiv.setAttribute("name", seat_type);
    newDiv.setAttribute("id", id);
    newDiv.innerText = originalDiv.innerText;
    // Replace the original div element with the new div element
    originalDiv.parentNode.replaceChild(newDiv, originalDiv);
}