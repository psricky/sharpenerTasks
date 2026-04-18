const form=document.getElementById('form')
form.addEventListener('submit',()=>{
const username=document.getElementById('username').value
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value

    axios.post('/user/signup',{
        username,
        email,
        password
    })
})

    
    