const corsConfig = {
  origin: [
    'http://0.0.0.0:3001',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://139.59.91.129:3002',
    'http://139.59.91.129:3001',
    'http://139.59.91.129:3000',
    'http://139.59.91.129:3004',
    'http://64.23.145.193:3002',
    'http://64.23.145.193:3001',
    'http://64.23.145.193:3000',
    'http://64.23.145.193:3004',
  ],
  optionsSuccessStatus: 200,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-ADMIN-TOKEN', 'X-SESSION'],
  credentials: true,
  preflightContinue: true,
};

export default corsConfig;
