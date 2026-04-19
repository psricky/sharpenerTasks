const signupform = document.getElementById('signupform')
const url = "http://localhost:3000"
signupform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
        const res = await axios.post(`${url}/user/signup`, {
            username,
            email,
            password
        })
        console.log(res)
    } catch (err) {
        console.log(err)
    }
})
const signinform = document.getElementById('signinform')
signinform.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
        const res = await axios.post(`${url}/user/signin`, {
            email,
            password
        })
        console.log(res)
        if (!password) {
            alert('User not authorized')
        }
        alert('User logged in successfully')
    } catch (err) {
        console.log(err)
        alert('User not found')

    }
})



