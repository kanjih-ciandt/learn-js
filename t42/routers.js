const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        // res.write('<body>Hello World</body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        const data = fs.readFileSync('users.txt', 'utf8');
        console.log(data)

        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><ui><li>Kanji</li><li>Hara</li></ui></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            console.log('xpto');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('users.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
        });

    }

    

    
};

exports.handler = requestHandler;