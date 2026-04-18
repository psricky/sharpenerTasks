const form = document.getElementById('form')
const url = "http://localhost:3000"
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
       const res= await axios.post(`${url}/user/signup`, {
            username,
            email,
            password
        })
        console.log(res)
    } catch (err) {
        console.log(err)
    }
})


