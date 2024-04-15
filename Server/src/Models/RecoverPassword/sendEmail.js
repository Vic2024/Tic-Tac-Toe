import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const transporte = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tic.tac.toe.game9@gmail.com',
    pass: 'jtqiesldpvrefhxi'
  }
})

/* const emailPort = process.env.PORT ?? 5000 */

const sendEmail = async ({ input }) => {
  const mailOptions = {
    from: 'tic.tac.toe.game9@gmail.com',
    to: `${input.email}`,
    subject: 'Link to recover the TIC TAC TOE account',
    html: `<a href="https://q7txpfw0-5000.use2.devtunnels.ms/reset_password/${input.id}/${input.token}">Change Password</a>`
  }

  const result = await transporte.sendMail(mailOptions)
  if (result.response.toLowerCase().includes('ok') !== true) {
    return false
  }
  return true
}

export default sendEmail
