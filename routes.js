const fs = require('fs');

const requestResponseHandling = (req, res) => {

    // console.log(req)
    // console.log(req.url) // shoen the url req
    // console.log(req.method)  // show the req method
    // console.log(req.headers)  // shown the main line req as a header
    // // process.exit();    // It wil remove the req listener and stop the event loop, thus the server has been stopped.

    const url = req.url;
    const method = req.method;

    if(url  === '/'){
        res.setHeader('Content-type', 'text/html')
        res.write('<html><body><form action="/message" method="POST"> <input type="text" name="message"/><input type="submit" value="send" /></form></body></html>')
        return res.end();
    }

    if(url === '/message' && method === 'POST'){

        const body = [];

        req.on('data', (chunk)=>{
            body.push(chunk)
            // console.log(chunk);
            // console.log(body);
        })
-
         req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=');
            // console.log(message);
            fs.writeFileSync('./output.txt', message[1], (err)=>{console.log(err)})
            res.setHeader('Location', '/');
            res.statusCode = 302;
            return res.end();
        })


    }
}


module.exports = {
    handler : requestResponseHandling,
    someText : "Hi, i am from routes.js file"
}