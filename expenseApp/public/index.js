
window.addEventListener("DOMContentLoaded", async () => {
    if(localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";
        await loadExpenses();
    }
});

const logout = () => {
    localStorage.removeItem("isLoggedIn");
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

        const data = await axios.post("http://localhost:3000/user/login", credentials);
        localStorage.setItem("isLoggedIn", true);
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";
        await loadExpenses();

    } catch (error) {
        if(error.response && error.response.status === 401) {
            alert("Invalid email or password");
        } else {
            console.error("Login error:", error);
        }
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

        await axios.post("http://localhost:3000/expense/add-expense", expense);
    } catch (error) {
        console.error("Error adding expense:", error);
    }


    this.reset();

    loadExpenses();
});

async function loadExpenses() {

    const res = await axios.get("http://localhost:3000/expense/get-expenses");

    const table = document.getElementById("expenseTable");

    table.innerHTML = "";

    res.data.data.forEach(exp => {

        table.innerHTML += `
        <tr>
            <td>${exp.id}</td>
            <td>${exp.amount}</td>
            <td>${exp.description}</td>
            <td>${exp.category}</td>
        </tr>
        `;
    });
}