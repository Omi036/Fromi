# SMTP Manager

## Overview
**Description**: Provides a smtp manager for sending emails
**In** `src/managers/smtp/smtpManager.ts`  
**On Init:** Initializes the sender with its credentials  
**Provides**:
```js
// Initializes the smtp client. If no params specified, will take from env
SMTPManager.init(host?: string, port?: number, username?: string, password?: string): void
// Contains the smtp from address, may be changed before sending a mail
SMTPManager.from: string
// Sends a mail to an address 
SMTPManager.sendMail(to: string, subject: string, text: string, html?: string): Promise<Response>
```

<br/>

### Fields
#### Properties
[`from`](https://fromi.readthedocs.io/en/latest/managers/Smtp.html#smtpmanager-from-string)  

#### Methods
[`init()`](https://fromi.readthedocs.io/en/latest/managers/Smtp.html#smtpmanager-init-host-string-port-number-username-string-password-string-void)
[`sendMail()`](https://fromi.readthedocs.io/en/latest/managers/Smtp.html#smtpmanager-sendmail-to-string-subject-string-text-string-html-string-promise-response)  

#### Exports
`SmtpManager`

<br/>

### Docs

#### Properties
#### `SMTPManager.from: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; String containing the email in format: "mail@mydomain.com" or "Name <mail@mydomain.com>"


<br/>

#### Methods

#### `SMTPManager.init(host?: string, port?: number, username?: string, password?: string): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the client with the given host, port, username, and password. If none specified, will take from env (getEnv method should be replaces)


#### `SMTPManager.sendMail(to: string, subject: string, text: string, html?: string): Promise<Response>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Sends a mail to the given address, with the subject, text, and html specified.

<br/>

### Examples
#### Sending a mail
Let's create a simple mail message!
```{code-block} js
:caption: /src/app.ts

import { SmtpManager } from "./managers/smtp/smtpManager"

async function main() {
    // We create the client
    SmtpManager.init("smtp.gmail.com", 587, "username@gmail.com", "password")

    // Then we send the message
    SmtpManager.sendMail("recipient@gmail.com", "Car extended warranty", "We're reaching you due to your car's extended warranty.")
}

main()
```
