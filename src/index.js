// src/index.js
import http from 'http';  // Import the HTTP module for creating the server
import { parse } from 'url';  // Import URL parsing
import { StringDecoder } from 'string_decoder';  // Import StringDecoder for decoding

const hostname = '127.0.0.1';
const port = 3000;

// Sample in-memory data (acts as a temporary database)
let dataStore = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Function to handle routing and logic based on request method and URL
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, ''); // Trim slashes
  const method = req.method.toUpperCase(); // Get HTTP method
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // Collect the data chunks
  req.on('data', (chunk) => {
    buffer += decoder.write(chunk);
  });

  // Handle request after all data is received
  req.on('end', () => {
    buffer += decoder.end();
    
    // Set default Content-Type to JSON
    res.setHeader('Content-Type', 'application/json');

    // Define routes for our API
    if (path === '' && method === 'GET') {
      // GET /: Return a welcome message
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Welcome to my REST API!' }));

    } else if (path === 'data' && method === 'GET') {
      // GET /data: Return data from the server
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Data fetched successfully', data: dataStore }));

    } else if (path === 'data' && method === 'POST') {
      // POST /data: Add new data to the server
      const newItem = JSON.parse(buffer);
      newItem.id = dataStore.length + 1; // Assign new ID
      dataStore.push(newItem); // Add to data store
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Data added successfully', data: newItem }));

    } else if (path === 'data' && method === 'DELETE') {
      // DELETE /data: Simulate a delete operation (dummy)
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Delete functionality is not implemented.' }));

    } else if (path === 'data' && method === 'PUT') {
      // PUT /data: Simulate an update operation (dummy)
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Update functionality is not implemented.' }));

    } else {
      // 404 Not Found for other routes
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found.' }));
    }
  });
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
