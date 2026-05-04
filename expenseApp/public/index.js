
window.addEventListener("DOMContentLoaded", async () => {
    if(localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";
        await loadExpenses();
    }
});

const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("expenseSection").style.display = "none";
}
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    try {
        e.preventDefault();

        // successful login
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const credentials = { email, password };

        const response = await axios.post("http://localhost:3000/user/login", credentials);
        
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", response.data.token);
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";
        await loadExpenses();
       
    } catch (error) {
        console.error("Login failed:", error);
    }
});

document.getElementById("expenseForm").addEventListener("submit", async function (e) {
    try {
        e.preventDefault();

        const expense = {
            amount: document.getElementById("amount").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value
        };

        await axios.post("http://localhost:3000/expense/add-expense", expense, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });
    } catch (error) {
        console.error("Error adding expense:", error);
    }


    this.reset();

    loadExpenses();
});

async function loadExpenses() {

    const res = await axios.get("http://localhost:3000/expense/get-expenses", {
        headers: {
            'Authorization': `${localStorage.getItem("token")}`
        }
    }); 

    const table = document.getElementById("expenseTable");

    table.innerHTML = "";

    res.data.data.forEach(exp => {

        table.innerHTML += `
        <tr>
            <td>${exp.id}</td>
            <td>${exp.amount}</td>
            <td>${exp.description}</td>
            <td>${exp.category}</td>
            <td><button onclick="deleteExpense(${exp.id})">Delete</button></td>
        </tr>
        `;
    });
    
}
const deleteExpense = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });
        await loadExpenses();
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
};
