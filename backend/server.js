const app = require('./index'); // Assuming index.js handles app creation
const connectDB = require('./config/db');

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
