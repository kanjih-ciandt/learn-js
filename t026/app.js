const http = require('http');
const fs = require('fs');


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const message = 'Hello World...';
    res.end(html.replace('{Message}', message));
    
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});

