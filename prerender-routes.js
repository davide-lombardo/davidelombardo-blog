const fs = require('fs');
const path = require('path');

// Load the blog posts JSON data from the assets folder
const posts = require('./src/assets/slugs/slugs.json');

// Initialize the routes array with static routes
const routes = [
  '/',
  '/about-me',
  '/projects',
  '/posts',
  '/tags',
];

// Loop through each blog post and create a route for it
posts.forEach(post => {
  routes.push(`/posts/${post.slug}`);
});

// Write the generated routes to a text file
const outputPath = path.join(__dirname, 'routes.txt');
fs.writeFileSync(outputPath, routes.join('\n'), 'utf-8');

console.log('Routes generated:', routes);
