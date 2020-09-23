const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>My new page</title></head>');
        res.write('<body><h2>Enter a string and send</h2><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1].split("+").join(" ");
            console.log(message);
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    res.send('Some error, try again!')
                } else {
                    res.statusCode = 302;
                    res.setHeader("Location", "/");
                    return res.end();
                }
            });
        });
    }
    //don't think this code is reachable
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My new page</title></head>');
    res.write('<body><h2>Thank you, the entry is now sent to the server</h2></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;