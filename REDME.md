What is Backend =
another computer that manages the data of a website
When two computers are connected to the internet they can actualy send messages to each other using the feature HTTP.

HTTPS = Hyper Text Transfor Protocol Secured.

URL = Uniform Resource Locator
URL is kind of like an address but for the internet.
URL Helps us locate another computer on the internet.

http://amazon.com(amazon.com-domain name)
https://supersimplebackend.dev/hello(/hello - this part is the URL path)

a backend only supports a certain set of URL paths.

Status Code

Starts with 4 or 5 (400,404,500) = failed
4-our problem
5- backend problem

the list of all the URL paths that are supported call the Backend API - Application Programing interface(interface means how we interact with something).

Backend can respond with different types of data

1. TEXT
2. JSON
   we can use JSON.parse()to convert to an JS object
3. HTML
4. image

Promises
better way to handel asynchronous code.
similar to done() function.
let us wait for some code to finish,before going to the next step.

Promise.all()
-lets us run multiple promises at the same time.
-and wait for all of them to finish.

Promise create lot of extra codes.
Async await is a shortcut for promises and it removes all the extra codes.

async = makes a function return a promise
await = lets us wait for a promise to finish, before going to the next line.
we can only use await, when we're inside an async function.
Why do we use Promises?
