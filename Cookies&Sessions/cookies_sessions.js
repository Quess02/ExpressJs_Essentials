/**
 * author: Tawanda Kanda
 * title: Cookies and Sessions
 * date: 26/10/22
 * Description:HTTP is a stateless protocol.Cookies are a way of building
 * state on top on HTTP
 */

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
/**
 * COOKIES 
 * -they are not secret to the user
 * -user can delete or disallow cookies
 * -regular cookies can be tampered with (use signed cookies)
 * -can be used for attacks
 * -prefer SESSIONS over cookies
 * 
 * Externalizing Credentials
 * -to make cookies more secure use cookie secret
 * -cookie secret===> a string that is know to the server and used to encrypt secure cookies
 * before they're sent to the client.
 * */
const credentials=require('./credentials.js')

//cookie parse middleware
app.use(cookieParser(credentials.cookieSecret));

//set a signed cookie
res.cookie('someSigned', 'our cookie value', { signed: true });

//set a regular cookie
res.cookie('regCookie','I am a regular cookie');
//access cookie properties of the request object
let someSigned = req.signedCookies.someSigned;
let regCookie = cookies.regCookie;

//delete cookie
res.clearCookie('monster');

/**
 *  COOKIE OPTIONS
 * -domain==> Controls the domain the cookie is associated with.It allows 
 * for assigning cookies to specifi subdomains.
 * -path==> Controls the path the cookie applies to
 * -maxAge==> how long the client will keep the cookie before delting it.
 * -secure==> specifies that the cookie will only be sent over secue HTTPS connection
 * -httpOnly==> set true to specify that only server can modify the cookie.Prevents XSS attacks
 * -signed ==> set true to sign the cookie
 */

/**
 * SESSIONS
 * -Convenient way to maintain state
 * 
 * Ways To Implement Sessions
 * -------------COOKIE BASED SESSIONS-----------------
 * -Store everything in a cookie
 * -Store only a unique identifier in the cookie and everything
 * else on the server.
 * 
 * NB: this approach will still store everything on session in clients' browser.NOT RECOMMENDED
 * 
 * MEMORY STORES
 * -Store session info in server (MEMORY SESSIONS)
 * -If server is restarted session info is lost.
 * -Use Database as a session store
 * 
 */
const session = require('express-session');
//Register expess-session middleware
app.use(session());

/**Session Options
 * -key ===> the name of the cookie that store unique session id
 * -store ===> An instance o session store
 * -cookie ===> cookie setting fo the session cookie
*/
//USING SESSIONS
req.session.userName = "John Doe";
//delete session
req.session.userName=null //it just sets 'userName to null'
delete req.session.userName; //removes userName


