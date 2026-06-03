
var allExpenses = [];
var currentView = 'daily';
var page = 1;
window.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("signupSection").style.display = "none";
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";
        document.getElementById("premiumStatusText").style.display = "none";
        document.getElementById("geminiForm").style.display = "block";


        await getUserDetails();
        await loadExpenses();
    }
});

const downloadTableAsCSV = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/expense/download-csv?range=${currentView}`, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'expense_report.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error downloading CSV:", error);
    }

    
}

const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("isPremium");
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("expenseSection").style.display = "none";
    document.getElementById("geminiForm").style.display = "none";
    const list = document.getElementById("leaderboard");
    if (list)
        list.remove();
}
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    document.getElementById("geminiForm").style.display = "block";
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
        document.getElementById("premiumStatusText").style.display = "none";
        document.getElementById("expenseSection").style.display = "block";

        await getUserDetails();
        await loadExpenses();

    } catch (error) {
        console.error("Login failed:", error);
    }
});

document.getElementById("signupBtn").addEventListener("click", async function (e) {
    try {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("signupSection").style.display = "block";
    } catch (error) {
        console.error("Error showing signup form:", error);
    }
});
document.getElementById("signupForm").addEventListener("submit", async function (e) {
    try {
        // successful signup
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signuppassword").value;
        const userData = { username, email, password };
        const response = await axios.post("http://localhost:3000/user/signup", userData);
        document.getElementById("signupSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
        alert("Signup successful! Please login to continue.");
    } catch (error) {
        console.error("Signup failed:", error);
    }
});
document.getElementById("expenseForm").addEventListener("submit", async function (e) {
    try {
        e.preventDefault();

        const expense = {
            amount: document.getElementById("amount").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value,
            expenseCreationDate: new Date(document.getElementById("expenseCreationDate").value).toISOString()
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
    
        const pageLimit=document.getElementById("expensesPerPage").value;
        localStorage.setItem("pageLimit", pageLimit);
        if(!pageLimit){
            limit=localStorage.getItem("pageLimit");
            document.getElementById("pagination").value=limit;
        }
    getPaginatedExpenses(page, pageLimit); // Load first page with the specified number of items per page

    

}

// Default view

//Function triggered when a user clicks a tab
function switchView(viewType) {
    currentView = viewType;
}



function renderView() {
    const header = document.getElementById('tableHeader');
    const body = document.getElementById('expenseTable');

    body.innerHTML = ""; // Clear table completely

    // --- CASE 1: DAILY VIEW (Default - Single Line Items) ---
    if (currentView === 'daily') {
        header.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
            </tr>
        `;

        allExpenses.forEach(exp => {
            const formattedDate = new Date(exp.expenseCreationDate).toLocaleDateString('en-GB').replace(/\//g, '-');
            body.innerHTML += `
                <tr>
                    <td>${formattedDate}</td>
                    <td>${exp.amount}</td>
                    <td>${exp.description}</td>
                    <td>${exp.category}</td>
                </tr>
            `;
        });
    }

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

document.getElementById("premiumBtn").onclick = async function () {

    const cashfree = Cashfree({
        mode: "sandbox",
    });
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to proceed with payment.");
            return;
        }
        const response = await fetch('http://localhost:3000/purchase/premium', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        const paymentSessionId = data.paymentSessionId;
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };
        const result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
            console.error("Checkout error:", result.error);
        }
        if (result.redirect) {
            console.log("Redirecting to:", result.redirect);
        }
        if (result.paymentDetails) {
            console.log("Payment details:", result.paymentDetails.paymentMessage);
            const response1 = await fetch(`http://localhost:3000/purchase/payment-status/${data?.orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });
            const data1 = await response1.json();
            if (data1.paymentStatus === "SUCCESS") {
                alert("Payment successful! You are now a premium member.");
                await getUserDetails();

            } else {
                alert("Payment failed. Please try again.");
            }

        }

    } catch (error) {
        console.error("Error occurred:", error);
    }
};

const getUserDetails = async () => {

    const response1 = await axios.get("http://localhost:3000/user/get-user", {
        headers: {
            'Authorization': `${localStorage.getItem("token")}`
        }
    });
    if (response1.data.data?.order?.status === "SUCCESS") {
        localStorage.setItem("isPremium", true);
        document.getElementById("premiumBtn").style.display = "none";
        document.getElementById("premiumStatusText").style.display = "block";
        document.getElementById("downloadReportBtn").style.display = "block";
        document.getElementById("leaderboardBtn").style.display = "block";
    } else {
        localStorage.setItem("isPremium", false);
        document.getElementById("premiumBtn").style.display = "block";
        document.getElementById("premiumStatusText").style.display = "none";
        document.getElementById("downloadReportBtn").style.display = "none";
        document.getElementById("leaderboardBtn").style.display = "none";
    }

}


document.getElementById("leaderboardBtn").addEventListener("click", async (e) => {

    e.preventDefault();
    const list = document.getElementById("leaderboard");
    if (list)
        list.remove();
    try {
        const response = await axios.get("http://localhost:3000/premium/show-leaderboard", {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });

        const ul = document.createElement('ul');
        ul.setAttribute('id', 'leaderboard');
        for (const user of response.data.data) {
            const listItem = document.createElement("li");
            listItem.textContent = `Username: ${user.username}, Total Expenses: ${user.totalExpenses}`;
            ul.appendChild(listItem);
        }

        document.getElementById("expenseSection").appendChild(ul);

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
});

document.getElementById("geminiForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const prompt = document.getElementById("prompt").value;
    try {
        const response = await axios.post("http://localhost:3000/user/gemini/ask", { prompt }, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });
        document.getElementById("response").textContent = response.data.response;
    } catch (error) {
        console.error("Error asking Gemini:", error);
        document.getElementById("response").textContent = "Error occurred while asking Gemini.";
    }
});

const forgotBtn = document.getElementById("forgotBtn");
forgotBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotBtn").style.display = "none";
    document.getElementById("forgotForm").style.display = "block";
    document.getElementById("forgotSubmitBtn").addEventListener("click", async function (e) {
        e.preventDefault();
        const email = document.getElementById("forgotEmail").value;
        try {
            const response = await axios.post("http://localhost:3000/password/forget-password", { email });
            if (response.data.success) {
                alert(response.data.message);
            }
            document.getElementById("forgotForm").style.display = "none";
            document.getElementById("loginForm").style.display = "block";
            document.getElementById("forgotBtn").style.display = "block";
        } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("Error occurred while sending password reset email.");
        }
    });

});

 const getPaginatedExpenses = async (page, limit) => {
    try {
        const paginationDiv = document.getElementById("pagination");
       
        const response = await axios.get(`http://localhost:3000/expense/paginated?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        });
        allExpenses = response.data.expenses; // Update the master array with the paginated data
        const totalPages = response.data.totalPages;
        paginationDiv.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.addEventListener("click", () => getPaginatedExpenses(i, limit));
            paginationDiv.appendChild(pageButton);
        }
       renderView(); // Re-render the view with the new paginated data
    } catch (error) {
        console.error("Error fetching paginated expenses:", error);
    }
}

