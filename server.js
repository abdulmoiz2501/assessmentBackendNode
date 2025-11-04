const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
});

// Default passwords
const defaultPasswords = {
  admin: 'admin123',
  user: 'user123',
};

// In-memory user database (for demo purposes)
// In production, use a proper database
// Passwords will be hashed on server start
const users = [
  {
    id: '1',
    username: 'admin',
    password: '', // Will be hashed on startup
    email: 'admin@example.com',
  },
  {
    id: '2',
    username: 'user',
    password: '', // Will be hashed on startup
    email: 'user@example.com',
  },
];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to find text differences
function findTextDifferences(original, corrected) {
  const errors = [];
  const originalWords = original.match(/\S+|\s+/g) || [];
  const correctedWords = corrected.match(/\S+|\s+/g) || [];
  
  let origIndex = 0;
  let corrIndex = 0;
  let charPos = 0;
  
  while (origIndex < originalWords.length && corrIndex < correctedWords.length) {
    const origWord = originalWords[origIndex];
    const corrWord = correctedWords[corrIndex];
    
    // Skip whitespace
    if (/^\s+$/.test(origWord)) {
      charPos += origWord.length;
      origIndex++;
      if (/^\s+$/.test(corrWord)) {
        corrIndex++;
      }
      continue;
    }
    
    if (/^\s+$/.test(corrWord)) {
      corrIndex++;
      continue;
    }
    
    // Compare words (case-insensitive)
    if (origWord.toLowerCase() !== corrWord.toLowerCase()) {
      errors.push({
        original: origWord,
        corrected: corrWord,
        startIndex: charPos,
        endIndex: charPos + origWord.length,
        type: 'spelling',
      });
    }
    
    charPos += origWord.length;
    origIndex++;
    corrIndex++;
  }
  
  return errors;
}

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Grammar Checker Backend API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Authentication Routes

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // Since we're using stateless JWT, logout is handled client-side
  // In production, you might want to maintain a token blacklist
  res.json({ message: 'Logged out successfully' });
});

// Grammar Check Route
app.post('/api/grammar/check', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (text.trim().length === 0) {
      return res.json({
        correctedText: '',
        errors: [],
        originalText: '',
      });
    }

    // Call OpenAI API for grammar checking
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a grammar and spelling checker. Analyze the provided text and return ONLY a valid JSON object with this exact structure:
{
  "correctedText": "the fully corrected text",
  "errors": [
    {
      "original": "misspelled word",
      "corrected": "correct word",
      "startIndex": 0,
      "endIndex": 10,
      "type": "spelling"
    }
  ]
}
The "errors" array should contain objects for each error found. Calculate "startIndex" and "endIndex" based on character positions in the original text. Type can be "spelling" or "grammar". Return ONLY the JSON, no other text.`,
        },
        {
          role: 'user',
          content: `Check and correct this text: "${text}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0].message.content;

    // Parse JSON response
    let result;
    try {
      // Extract JSON from response if it's wrapped in markdown code blocks
      let jsonText = responseText;
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      } else {
        // Try to find JSON object in the response
        const jsonObjectMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonObjectMatch) {
          jsonText = jsonObjectMatch[0];
        }
      }
      
      result = JSON.parse(jsonText);
      
      // Validate structure
      if (!result.correctedText) {
        result.correctedText = text;
      }
      if (!result.errors || !Array.isArray(result.errors)) {
        result.errors = [];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback: use response as corrected text and manually find errors
      const correctedText = responseText.trim().replace(/^["']|["']$/g, '');
      
      // Find differences between original and corrected text
      const errors = findTextDifferences(text, correctedText);
      
      result = {
        correctedText: correctedText,
        errors: errors,
      };
    }

    res.json({
      correctedText: result.correctedText,
      errors: result.errors || [],
      originalText: text,
    });
  } catch (error) {
    console.error('Grammar check error:', error);
    
    if (error.response) {
      return res.status(500).json({
        error: 'OpenAI API error',
        message: error.response.data?.error?.message || 'Failed to check grammar',
      });
    }

    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, async () => {
  // Hash default passwords on startup
  for (let user of users) {
    if (defaultPasswords[user.username]) {
      user.password = await bcrypt.hash(defaultPasswords[user.username], 10);
    }
  }
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
