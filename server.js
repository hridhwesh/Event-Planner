const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
let users = [];
let vendors = [
  // Catering
  { _id: '1', name: "Gourmet Delights Catering", description: "Premium catering services for all occasions", contact: "+91-9876543210", rating: 4.8, priceRange: "₹50,000 - ₹500,000", category: "catering", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '2', name: "Traditional Flavors", description: "Authentic regional cuisine specialists", contact: "+91-9876543211", rating: 4.6, priceRange: "₹30,000 - ₹300,000", category: "catering", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '3', name: "Fusion Feast", description: "Modern fusion cuisine with traditional twist", contact: "+91-9876543212", rating: 4.7, priceRange: "₹40,000 - ₹400,000", category: "catering", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },

  // Decoration
  { _id: '4', name: "Elegant Events Decor", description: "Complete decoration solutions for weddings and parties", contact: "+91-9876543213", rating: 4.9, priceRange: "₹20,000 - ₹200,000", category: "decoration", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '5', name: "Creative Designs", description: "Themed decorations and custom setups", contact: "+91-9876543214", rating: 4.5, priceRange: "₹15,000 - ₹150,000", category: "decoration", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '6', name: "Floral Fantasy", description: "Beautiful floral arrangements and decor", contact: "+91-9876543215", rating: 4.7, priceRange: "₹10,000 - ₹100,000", category: "decoration", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },

  // Venue
  { _id: '7', name: "Grand Ballroom Events", description: "Luxurious ballrooms and event spaces", contact: "+91-9876543216", rating: 4.8, priceRange: "₹200,000 - ₹2,000,000", category: "venue", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '8', name: "Garden Paradise", description: "Beautiful outdoor venues with natural settings", contact: "+91-9876543217", rating: 4.6, priceRange: "₹100,000 - ₹1,000,000", category: "venue", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
  { _id: '9', name: "Urban Chic Halls", description: "Modern urban venues for contemporary events", contact: "+91-9876543218", rating: 4.7, priceRange: "₹150,000 - ₹1,500,000", category: "venue", eventTypes: ["wedding", "birthday", "meeting", "houseparty", "custom"] },
];

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    };
    users.push(user);

    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key');

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key');

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/profile', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Vendor routes
app.get('/api/vendors', (req, res) => {
  res.json(vendors);
});

app.get('/api/vendors/:category', (req, res) => {
  const categoryVendors = vendors.filter(vendor => vendor.category === req.params.category);
  res.json(categoryVendors);
});

app.post('/api/vendors/recommend', (req, res) => {
   const { eventType } = req.body;
   const recommendedVendors = vendors.filter(vendor =>
     vendor.eventTypes.includes(eventType)
   );
   res.json(recommendedVendors);
});

// Messages storage (in-memory for demo)
let messages = [];

// Message routes
app.post('/api/messages/send', (req, res) => {
   try {
     const { vendorId, userId, message, eventName } = req.body;

     const newMessage = {
       id: Date.now().toString(),
       vendorId,
       userId,
       message,
       eventName,
       timestamp: new Date(),
       status: 'sent'
     };

     messages.push(newMessage);

     // Find vendor for response
     const vendor = vendors.find(v => v._id === vendorId);
     if (vendor) {
       // Simulate vendor auto-response
       setTimeout(() => {
         const autoResponse = {
           id: Date.now().toString() + '_response',
           vendorId,
           userId,
           message: `Thank you for your message regarding "${eventName}". We will get back to you soon!`,
           eventName,
           timestamp: new Date(),
           status: 'received',
           isAutoResponse: true
         };
         messages.push(autoResponse);
       }, 1000);
     }

     res.json({ success: true, messageId: newMessage.id });
   } catch (error) {
     console.error('Error sending message:', error);
     res.status(500).json({ message: 'Failed to send message' });
   }
});

app.get('/api/messages/:userId', (req, res) => {
   const userMessages = messages.filter(msg => msg.userId === req.params.userId);
   res.json(userMessages);
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
