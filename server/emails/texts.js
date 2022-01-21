module.exports = {
    userCreated: {
        subject: 'Welcome to MTA',
        text: 'To complete your account on MTA please follow the link below:',
        link: 'Signup'
    },
    changeEmail: {
        subject: 'Email change request on MTA',
        text: `<p>Dear [first-name] [last-name],</p>
               <p> To confirm your new email address on MTA please follow the link below:</p>`,
        link: 'Click here'
    },
    forgotPassword: {
        subject: 'Password reset request on MTA',
        text: `<p>Dear [first-name] [last-name],</p>
               <p> To reset your password on MTA please follow the link below:</p>`,
        link: 'Click here'
    }
}