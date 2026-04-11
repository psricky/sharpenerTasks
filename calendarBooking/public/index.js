
const slotContainer = document.getElementById('slot-container');
const API_URL = 'http://localhost:3000';
const form = document.getElementById('bookingForm');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let selectedTimeSlotId = null;
const resetForm = () => {
    const formContainer = document.getElementById('bookingForm');
    formContainer.querySelector('input[name="name"]').value = '';
    formContainer.querySelector('input[name="email"]').value = '';
    selectedTimeSlotId = null;
}
const addMessage = (res) => {

    const messageDiv = document.getElementById('message')
    messageDiv.innerHTML='';
    const header = document.createElement('h2')
    header.textContent = `Slot confirmed ${res.name}.please join at ${res.timeSlot} via ${res.link}`
    messageDiv.append(header)
    showMessage();
}
const hideBookingForm = () => {
    const formContainer = document.getElementById('bookingForm');
    formContainer.classList.add('hidden');
}

const showBookingForm = () => {
    const formContainer = document.getElementById('bookingForm');
    formContainer.classList.remove('hidden');
}

const hideMessage = () => {
    const messageContainer = document.getElementById('message');
    messageContainer.classList.add('hidden');
}

const showMessage = () => {
    const messageContainer = document.getElementById('message');
    messageContainer.classList.remove('hidden');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    try {
        const response = await axios.post(`${API_URL}/bookings/add`, {
            name,
            email,
            slotId: selectedTimeSlotId
        });
        console.log('Booking created:', response.data);
        resetForm();
        hideBookingForm();
        addMessage(response.data)
        await sleep(2000);
        hideMessage();
        displayUser();
        fetchSlot();

    } catch (error) {
        console.error('Error creating booking:', error);
    }
});

async function fetchSlot() {
    try {
        const response = await axios.get(`${API_URL}/slots`);
        const slots = response.data;
        slotContainer.innerHTML = '';
        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.classList.add('booking-slot');
            const header = document.createElement('header');
            const paragraph = document.createElement('para');
            header.textContent = `Slot ${slot.timeSlot}:`;
            paragraph.textContent = `${slot.slotsAvailable} slots available`;
            slotElement.appendChild(header);
            slotElement.appendChild(paragraph);
            slotContainer.appendChild(slotElement);
            slotElement.addEventListener('click', () => {
                selectedTimeSlotId = slot.id;
                showBookingForm();
                const header=document.getElementById('form-header')
                header.innerHTML='';
                header.textContent =`Book a slot for: ${slot.timeSlot}`          
            });
        });

    } catch (error) {
        console.error('Error fetching slots:', error);
    }
}
async function displayUser() {
    try {
        const bookings = await axios.get(`${API_URL}/bookings`)
        const user = bookings.data
        const meetingsContainer = document.getElementById('meetings');
        meetingsContainer.innerHTML = '';
        user.forEach((user) => {
            const userDiv = document.createElement('div')
            userDiv.classList.add('meeting-class')
            const header = document.createElement('h2')
            header.textContent = `Hi ${user.name},`;
            const para = document.createElement('p')
            const delbtn=document.createElement('button')
            delbtn.classList.add('del-btn')
            delbtn.textContent='Cancel'
            delbtn.addEventListener('click',async()=>{
                const res=await axios.delete(`${API_URL}/bookings/${user.id}`)
                console.log(res.data)
                fetchSlot();
                displayUser();
            })          
            para.textContent = `Please join the meeting via this ${user.link} at ${user?.SlotTable?.timeSlot}`
            userDiv.appendChild(header)
            userDiv.appendChild(para)
            userDiv.appendChild(delbtn)
            meetingsContainer.appendChild(userDiv)
        })


    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

fetchSlot();
displayUser();