'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// PREVIOUS Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
// };

// const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// };

// const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
// };

// const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
// };


// const accounts = [account1, account2, account3, account4];


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// NEWER DATA//


const account1 = {
    owner: 'Priyanshi Agrawal',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Lakshay Dhiman',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////////////////////////////////////////

let currentAccount
const now = new Date()
console.log(now);

//functions// 

const updateUI = function (acc) {
    //  Display movements

    displayMovements(acc)

    //display balance

    displayBalance(acc)

    //display summary

    calcDisplaySummary(acc)

}


//A function that will display all the dates
const calcDisplayDates = function (date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / 1000 * 60 * 60 * 24))

    const daysPassed = calcDaysPassed(date, now)
    if (daysPassed === 0) return 'Today'
    if (daysPassed === 2) return 'Yesterday'
    if (daysPassed <= 7) return `${daysPassed} Days ago`
    else {
        //again hum yaha bhi internationalization karenge so commenting all below code
        // const day = `${date.getDate()}`.padStart(2, 0)
        // const month = `${date.getMonth()}`.padStart(2, 0)
        // const year = date.getFullYear()
        // const hour = `${date.getHours()}`.padStart(2, 0)
        // const min = `${date.getMonth()}`.padStart(2, 0)
        // return `${day}/${month}/${year}, ${hour}:${min}`
        return new Intl.DateTimeFormat(locale).format(date)
    }
}
// a function to format all currencies
const formattingAllCurrencies = function (value, locale, currency) {
    const options = {
        style: 'currency',
        currency: currency
    }
    const formatCurrency = new Intl.NumberFormat(locale, options).format(value)
    return formatCurrency
}
// a function that will manipulate the dom container section//
const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = ""
    //creatiing a copy of movement with slice as we do not want to change the actual movements array
    // a-b is done because bottom to up newer movement is added at the top
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements

    //we want to add date with each movement so we need to loop over the movement date property in acc object also 

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal"

        //to format the currency of the movements acc. to the account holders locale currency

        const formatCurrency = formattingAllCurrencies(mov, acc.locale, acc.currency)
        //a method to loop over 2 arrays at the same time use for each method on one of them and then from that for each use the current index to loop over the 2nd one 

        //this date is being hardcoded for each account in moment dates property so it will be stored in date variable now one at a time(looped)


        const date = new Date(acc.movementsDates[i])

        const displayDate = calcDisplayDates(date, acc.locale)
        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
         <div class="movements__value">${formatCurrency}</div>
        </div >
    `
        // <div class="movements__value">${mov.toFixed(2)}€</div>
        containerMovements.insertAdjacentHTML("afterbegin", html)

    })

}


const displayBalance = function (acc) {
    // a new property is created in each account called balance 
    acc.balance = acc.movements.reduce(function (acc, mov) {
        return acc + mov
    }, 0)
    //this acc.balance is the ceation of the new property in all accounts objects

    // formatting the currencies


    // labelBalance.textContent = `${acc.balance.toFixed(2)}€`
    labelBalance.textContent = formattingAllCurrencies(acc.balance, acc.locale, acc.currency)
}


const calcDisplaySummary = function (acc) {
    const displayIn = acc.movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
    // labelSumIn.textContent = `${displayIn.toFixed(2)}€`
    //new formatting
    labelSumIn.textContent = formattingAllCurrencies(displayIn, acc.locale, acc.currency)

    const displayOut = acc.movements.filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)
    // labelSumOut.textContent = `${Math.abs(displayOut.toFixed(2))}€`
    //new formatting
    labelSumOut.textContent = formattingAllCurrencies(displayOut, acc.locale, acc.currency)

    //har baar jab bhi koi deposit hota hai toh yeh bank ek intrest daalta hai uspar 
    //INTEREST = 1.2% of the deposited amount
    //map se sari deposits par jo interest lagg ra hai usko ek array me kiya and then reduce se vo sab ka sum kar diya 
    //a bank only pays interest if that interest is atleast 1 euro so 2nd filter is used
    const interest = acc.movements.filter(mov => mov > 0).map(deposits => deposits * 1.2 / 100)
        .filter((int, i, arr) => int >= 1)
        .reduce((acc, int) => acc + int, 0)
    // labelSumInterest.textContent = `${Math.abs(interest.toFixed(2))}€`
    //new formatting
    labelSumInterest.textContent = formattingAllCurrencies(interest, acc.locale, acc.currency)

}





const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase()
            .split(" ")
            .map(function (word) {
                return word[0]
            }).join('')

    })
}
createUserName(accounts)

//Event Handlers



/////////////////////////////
// FAKE LOG-IN 

// currentAccount = account1
// updateUI(currentAccount)
// containerApp.style.opacity = 100
///////////////////////////////


btnLogin.addEventListener("click", function (e) {
    //prevent form from submitting 

    e.preventDefault()

    //finding the inputted username 

    currentAccount = accounts.find(acc =>
        acc.username === inputLoginUsername.value
    )
    console.log(currentAccount)
    //find ki wajha se jo username dala hoga vo poora account aa gya hai current account me

    // agar ek valid username dala hoga toh hi pin check hoga ki ussi account ka sahi pin dala hai kya

    if (currentAccount?.pin === +(inputLoginPin.value)) {

        //agar haan vo sahi pin hai ussi account ka toh following kaam honge

        // applying top current balance date on login
        // const now = new Date()

        // const day = `${ now.getDate() } `.padStart(2, 0)
        // const month = `${ now.getMonth() } `.padStart(2, 0)
        // const year = now.getFullYear()
        // const hour = `${ now.getHours() } `.padStart(2, 0)
        // const min = `${ now.getMonth() } `.padStart(2, 0)
        // labelDate.textContent = `${ day } /${month}/${ year }, ${ hour }:${ min } `
        // console.log(now)

        //we'll not allow the above date so commented that out we will internationalize to date as per the users brower for using locale variable whivh will navigate to the user's language used in the browser
        //displaying current account date acc to the format used by the acc holder (internationalization)
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            // weekday: 'long'
        }

        // const locale = navigator.language
        // console.log(locale)//en-US is my default browser format
        // labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)

        // but we know hume user ke browser ke according nahi balki account holder ki country format ke acc date display karni hai soo commenting above 2 lines

        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)


        //Display U.I. and message 

        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]} `
        containerApp.style.opacity = 100

        // //Display movements

        // displayMovements(currentAccount.movements)

        // //display balance

        // displayBalance(currentAccount)

        // //display summary

        // calcDisplaySummary(currentAccount.movements)
        // these all above 3 commented steps is refactored in a new function which is called below
        updateUI(currentAccount)

    }

    //clearing the input fields

    inputLoginUsername.value = ""
    inputLoginPin.value = ""
    inputLoginPin.blur()
    inputLoginUsername.blur()
})
// 2nd Event Handler this one for transfer
btnTransfer.addEventListener("click", function (e) {
    e.preventDefault()
    const amount = +(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

    //transfer can only happen if the amount we are trying to transfer is +, is greater than 0(amount > 0 &&) and current balance should be atleast equal to the amount we are trying to transfer ( currentAccount.balance >= amount &&)and we shouldn't be able to transfer money to our own account(receiverAcc.username !== currentAccount.username) and reciever account should exist  (&& receiverAcc) 

    if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc.username !== currentAccount.username) {
        //when these all conditions are true we need to do the following steps

        //add a - movement to current account
        currentAccount.movements.push(-amount)

        //add a + movement to receivers account
        receiverAcc.movements.push(amount)

        //we need to push the date of transfer also
        currentAccount.movementsDates.push(now.toISOString())
        receiverAcc.movementsDates.push(now.toISOString())

        //updating UI now
        updateUI(currentAccount)

    }
    inputTransferAmount.value = ""
    inputTransferTo.value = ""
    inputTransferAmount.blur()
    inputTransferTo.blur()
})


//LOan
btnLoan.addEventListener("click", function (e) {
    e.preventDefault()
    //we need to round the requested loan value as no bank gives decimal loans and math.floor does type cohersion also se no need to write number there
    const amount = Math.floor(inputLoanAmount.value)
    // the loan is only granted if amount asked for greater than 0 and there is any deposit which is 10% or greater to the requested loan asked  
    if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
        //typically a bank takes time in order to approve the loan so here we'll put some time out
        setTimeout(function () {
            // add the movement of loan granted 
            currentAccount.movements.push(amount)

            //we need to push the date of loan also
            currentAccount.movementsDates.push(now.toISOString())

            // update u.i.
            updateUI(currentAccount)
        }, 2000)

    }
    //clear input field
    inputLoanAmount.value = ""
    inputLoanAmount.blur()
})
//close account means deleting the object that account from the array of aacounts
btnClose.addEventListener('click', function (e) {
    e.preventDefault()

    if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === +(inputClosePin.value)) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        //Delete account
        accounts.splice(index, 1)

        //Hide ui for that account
        containerApp.style.opacity = 0
        labelWelcome.textContent = "Log in to get started"

    }
    inputClosePin.value = ""
    inputCloseUsername.value = ""
    inputClosePin.blur()
    inputCloseUsername.blur()

})
let sorted = false
btnSort.addEventListener("click", function (e) {
    e.preventDefault()
    displayMovements(currentAccount, !sorted)
    //but abb dobara click karne par it's not going back to how it was before so we need to preserve that sorted stage beforehand
    //now changing this sorted variable to it's opp. value
    sorted = !sorted
})
console.log(accounts);
console.log(account1.movementsDates)
//+ sign is in place of Number operator to convert string to number




