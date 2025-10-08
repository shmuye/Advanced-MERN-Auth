import {mailtrapClient, sender} from "./mailtrap.config.js";
import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken),
            category: "Email Verification",
        })

        console.log("email sent successfully", response)

    }catch(error) {
      console.error("email verification failed", error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}
export const sendWelcomeEmail = async (email, name) => {
        const recipient = [{email}]
    try {
            mailtrapClient.send({
                from: sender,
                to: recipient,
                template_uuid: "cf857685-7726-4789-a966-76967304d95f",
                template_variables: {
                    "name": name,
                }
            }).then(
                console.log, console.error
            )
    }catch(error) {
      console.error("Error sending welcome email", error)
        throw new Error(`Error sending welcome email: ${error}`)
    }
}