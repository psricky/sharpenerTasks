const form = document.getElementById('bookingForm');
const API_URL = 'http://localhost:3000';
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    try {
        const response = await axios.post(`${API_URL}/api/users/add`, { name, email });
        alert('User added successfully!');
        fetchUsers();
        form.reset();
    } catch (error) {
        console.error('Error adding user:', error);
        alert('Error adding user. Please try again.');

    }
});

async function fetchUsers() {
    try {
        const response = await axios.get(`${API_URL}/api/users`);
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = ''; 
        response.data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (${user.email})`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                try {
                    await axios.delete(`${API_URL}/api/users/${user.id}`);
                    listItem.remove();
                    fetchUsers();
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user. Please try again.');
                }
            });
            listItem.appendChild(deleteButton);
            usersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

fetchUsers();