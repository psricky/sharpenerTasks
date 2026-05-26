const Sib = require('sib-api-v3-sdk');
const sibFunction = async () => {
    
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: 'psrickyking@gmail.com',
            name: 'My Company'
        }
        const receiver = [
            {
                email: 'psrickyking@yahoo.com',
                name: 'Receiver Name'
            }
        ]

        return tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Test Email',
            textContent: `This is a test email from Brevo`
        })
    
}
module.exports ={ sibFunction };