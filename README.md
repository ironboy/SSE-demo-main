## This an example of how to use SSE and how to use Nodemailer to send mails
* Using SSE (Server Sent Events) in a Node.js-backend and JS/React-based frontend to accomplish real-time communication from the server to the client. (SSE is an alternative to web sockets and Socket.io).
* Using Nodemailer to send a mail through a gmail account that we have an obtained an app password for.

#### Important: 
The file with the email account addresss and the app password we obtain from Gmail is git-ignored and should be that, it shouldn't be part of our repository, since this is sensitive information that can be used by hackers.

#### An important note about SSE:
* When you develop locally with Express you run version 1.1 of the http protocol per default:
  - A limitation of http 1.1 is that you can only have 6 open connections to the same domain.
  - So if you have several tabs open you can exceed this limit and everything stops working! Be careful!
  - This applies to SSE, but not Web Sockets, since they have their own protocol.
* But, today, almost everyone run h2 - http, version 2 - on their web production servers.
  - In h2 you can have hundreds of open connections to the same domain!
* So the '6 open connections limit' will not affect you when you are in production, only during development:
  - In development: Don't have too many tabs open with your app in the same browser.
  - And: When using React in Strict Mode (development mode) make sure you don't open two SSE connections at once by mistake (since components mount twice in Strict Mode).

### Obtain an app password
1. Create a new Google account and gmail (or use your old one).
2. Make sure a logged into the correct Google account!
3. Goto https://myaccount.google.com/apppasswords
4. Write "mail" in the input field asking for the name of the app.
5. Click the "Create" button.
6. Copy the password.

### Save the app password in a git ignored file your backend code can read
In this application:
1. Create the file "gmail-secret.json" inside the backend folder.
2. Paste the following information into the file:

```json
{
  "email": "youremail@gmail.com",
  "appPassword": "xxxx xxxx xxxx xxxx"
}
```

#### Note:
The advantage of an app password compared to your 'real' password is that you can revoke an app password at any time (and create new ones) without having to change the password you use to login to your mail account.

### Install
* npm install

### Run backend and frontend at the same time
* npm start

### Further reading on SSE vs Web Sockets
* https://softwaremill.com/sse-vs-websockets-comparing-real-time-communication-protocols
* https://www.smashingmagazine.com/2018/02/sse-websockets-data-flow-http2

### Documentation for Nodemailer
* https://nodemailer.com
* https://nodemailer.com/usage/using-gmail - some daily limits explained, but avoid the "less secure" option described here, it does not work anymore (use app passwords instead).