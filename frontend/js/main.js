document.addEventListener("DOMContentLoaded", function () {
    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed');
            }
        });
    }

    // Handle Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:5001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (res.status === 201) {
                window.location.href = 'index.html';
            } else {
                alert('Registration failed');
            }
        });
    }

    // Handle Logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }

    // Fetch and display user data in the Dashboard
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://localhost:5001/api/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const summary = document.getElementById('summary');
                if (summary) {
                    summary.innerHTML = `
                        <p><strong>Income:</strong> ${data.income}</p>
                        <p><strong>Total Expenses:</strong> ${data.expenses}</p>
                    `;
                }
            })
            .catch(err => console.log(err));
    }

    // Handle Add Expense Form
    const addExpenseForm = document.getElementById('addExpenseForm');
    if (addExpenseForm) {
        addExpenseForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const category = document.getElementById('category').value;
            const notes = document.getElementById('notes').value;

            const res = await fetch('http://localhost:5001/api/expenses/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount, category, notes })
            });

            const data = await res.json();
            if (res.status === 201) {
                alert('Expense added successfully');
                window.location.reload();
            } else {
                alert('Failed to add expense');
            }
        });
    }

    // Fetch and display notifications
    const notificationList = document.getElementById('notificationList');
    if (notificationList) {
        fetch('http://localhost:5001/api/notifications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                notificationList.innerHTML = data.map(notification => `<div>${notification.message}</div>`).join('');
            })
            .catch(err => console.log(err));
    }

    // Fetch and display user profile
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        fetch('http://localhost:5001/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById('username').value = data.username;
                document.getElementById('email').value = data.email;
            })
            .catch(err => console.log(err));
    }

     // Handle Add Expense Form
     const setBudgetForm = document.getElementById('setBudgetForm');
     if (setBudgetForm) {
        setBudgetForm.addEventListener('submit', async function (e) {
             e.preventDefault();
             const income = document.getElementById('income').value;
             const category = document.getElementById('category').value;
 
             const res = await fetch('http://localhost:5001/api/budgets/set', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                 },
                 body: JSON.stringify({ income, category })
             });
 
             const data = await res.json();
             if (res.status === 201) {
                 alert('Budget added successfully');
                 window.location.reload();
             } else {
                 alert('Failed to add budget');
             }
         });
     }
 
// Fetch and display expenses
async function loadExpenses() {
    try {
        const res = await fetch('http://localhost:5001/api/expenses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const expenses = await res.json();

        const expenseTableBody = document.querySelector('#expenseTable tbody');
        expenseTableBody.innerHTML = ''; // Clear existing rows

        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td>${expense.notes}</td>
            `;
            expenseTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load expenses:', error);
    }
}

// Fetch and display budgets
async function loadBudgets() {
    try {
        const res = await fetch('http://localhost:5001/api/budgets', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const budgets = await res.json();
        // console.log('Budgets data:', budgets);

        const budgetTableBody = document.querySelector('#budgetTable tbody');
        budgetTableBody.innerHTML = ''; // Clear existing rows

        budgets.forEach(budget => {
           
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(budget.date).toLocaleDateString()}</td>
                <td>${budget.category}</td>
                <td>${budget.income}</td>
            `;
            budgetTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load budgets:', error);
    }
}
 

     loadExpenses();
     loadBudgets();  
 
});

 
