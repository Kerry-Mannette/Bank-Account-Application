/*
	Week4.js
	Example: Bank account application using JavaScript

	Paste this file into a webpage or run it from the browser console. It uses
	prompt() to collect user input, stores values in `let` variables, validates
	simple rules, and prints a summary.
*/

// Collect applicant information using `let` variables and prompt()

let action = true;
let selection
let fullName;
let age;
let email;
let accountNumber;
let accountType;
let initialDeposit;
let balance;
let agree;
let checkAccount;
const createdAccount = [];



while (action!= false){

selection = prompt('Choose an option:\n1. Apply for a new account\n2. Deposit funds\n3. Withdraw funds\n4. Check balance \n5. Exit'); 

if(selection == '1') {
    fullName = prompt('Enter your full name:');
    age = prompt('Enter your age:');
    while(age < 18){
        alert('You must be at least 18 years old to open an account.');
        age = prompt('Enter your age:');
    } 
    email = prompt('Enter your email address:');
    while(!email.includes('@')){
        alert('Invalid email address. Please include an "@" symbol.');
        email = prompt('Enter your email address:');
    }
    accountNumber = prompt('Choose a 6-digit account number:');
    while(accountNumber.length !== 6){
        alert('Account number must be a 6-digit number.');
        accountNumber = prompt('Choose a 6-digit account number:');
    }
    accountType = prompt('Choose account type (Checking or Savings):');
    while(accountType.toLowerCase() !== 'checking' && accountType.toLowerCase() !== 'savings'){
        alert('Invalid account type. Please choose either Checking or Savings.');
        accountType = prompt('Choose account type (Checking or Savings):');
    }
    initialDeposit = prompt('Enter initial deposit amount:');
    while (initialDeposit < 100){
        alert('Initial deposit must be at least $100.');
        initialDeposit = prompt('Enter initial deposit amount:');
    }
    // convert to number and store balance
    initialDeposit = parseFloat(initialDeposit);
    balance = initialDeposit;
    agree = prompt('Do you agree to the terms and conditions? (yes/no):');
    while (agree.toLowerCase() !== 'yes'){
        alert('You must agree to the terms and conditions to open an account.');
        agree = prompt('Do you agree to the terms and conditions? (yes/no):');
    }

    
    // store account object in the accounts array
    createdAccount.push({
        fullName: fullName,
        age: age,
        email: email,
        accountNumber: accountNumber,
        accountType: accountType,
        initialDeposit: initialDeposit,
        balance: balance
    });

    alert(`Account successfully created!\n\nAccount Summary:\nName: ${fullName}\nAge: ${age}\nEmail: ${email}\nAccount Number: ${accountNumber}\nAccount Type: ${accountType}\nInitial Deposit: $${initialDeposit}\nBalance: $${balance}`);
 
} else if(selection == '2'){
    checkAccount = prompt('Enter your account number to deposit funds:');
    deposit(checkAccount);
} else if(selection == '3'){
    checkAccount = prompt('Enter your account number to withdraw funds:');
    withdraw(checkAccount);
} else if(selection == '4'){

    checkAccount = prompt('Enter your account number to check balance:');
    Balance(checkAccount);

} else if(selection == '5'){
    action = false;
    alert('Thank you for using our banking application. Goodbye!');
}
function deposit(checkAccount){
    // Lookup the account first
    const account = searchAccount(checkAccount);
    if (!account) {
        alert('No account found with that account number.');
        return;
    }

    // Prompt for deposit amount and validate
    const amountStr = prompt('Enter deposit amount:');
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid deposit amount.');
        return;
    }

    // Update account balance and round to 2 decimals
    account.balance = parseFloat(account.balance) + amount;
    account.balance = Math.round(account.balance * 100) / 100;

    alert(`Deposit successful! New balance: $${account.balance}`);
}


function withdraw(checkAccount){
    // Lookup the account first
    const account = searchAccount(checkAccount);
    if (!account) {
        alert('No account found with that account number.');
        return;
    }

    // Prompt for withdrawal amount and validate
    const amountStr = prompt('Enter withdrawal amount:');
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid withdrawal amount.');
        return;
    }

    if (amount > account.balance) {
        alert('Insufficient funds for this withdrawal.');
        return;
    }

    // Subtract and round
    account.balance = parseFloat(account.balance) - amount;
    account.balance = Math.round(account.balance * 100) / 100;

    alert(`Withdrawal successful! New balance: $${account.balance}`);
}


function Balance(checkAccount){
    const account = searchAccount(checkAccount);
    if (!account) {
        alert('No account found with that account number.');
        return;
    }

    alert(`Account found!\nName: ${account.fullName}\nAccount Number: ${account.accountNumber}\nBalance: $${account.balance}`);
}


function searchAccount(checkAccount){
    for (let i = 0; i < createdAccount.length; i++) {
        const account = createdAccount[i];
        if (account.accountNumber === checkAccount) {
            return account;
        }
    }
    return null;
}

}


