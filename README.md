📱 Integration AI to WhatsApp

Integration of AI chatbot into WhatsApp using Node.js, Express, and WhatsApp Cloud API, with intelligent responses powered directly by OpenAI's API.


🚀 Features
- 🤖 AI-powered conversation (OpenAI GPT integration)
- 🌐 Default language: Bahasa Indonesia
- 🔗 Webhook integration with WhatsApp Cloud API
- 💬 Automatic response to incoming WhatsApp messages
- ☁️ Easy deployment to personal server or cloud hosting


🛠️ Built With
- Node.js
- Express.js
- OpenAI API
- WhatsApp Cloud API
- Ngrok (for local webhook testing)

📂 Project Structure
├── server.js           # Main server file (Express)
├── .env                # Environment variables
├── package.json        # NPM configuration
└── README.md           # Project documentation


⚙️ Setup Instructions Clone this repository

bash

> git clone https://github.com/RikoPurnama/IntegrateAiToWhatsApp.git

> cd IntegrateAiToWhatsApp

Install dependencies

bash

> npm install

Create .env file Isi .env kamu seperti berikut:

> PORT=3000

> VERIFY_TOKEN=your_verify_token_here

> WHATSAPP_TOKEN=your_whatsapp_access_token_here

> PHONE_NUMBER_ID=your_whatsapp_phone_number_id_here

> OPENAI_API_KEY=your_openai_api_key_here

Run local server

bash

> node server.js

Expose your server using Ngrok

bash

> ngrok http 3000

Set Webhook URL di Facebook Developer Console (WhatsApp Cloud API settings) ke URL dari ngrok, contoh:

arduino

> https://your-ngrok-id.ngrok-free.app/webhook

📸 Demo
- Coming soon! 🚀 (Optional: Bisa tambah screenshot atau screen recording nanti)

📜 License
© 2025 Riko Purnama. All rights reserved.

🎯 Notes
- Pastikan API Key dari OpenAI aktif dan punya saldo kuota.
- Pastikan webhook berhasil diverifikasi dengan token yang benar.
- Untuk penggunaan publik, lebih baik deploy ke server VPS atau services seperti Railway, Vercel, atau Render.

📢 Special Thanks
- OpenAI
- Meta for Developers (WhatsApp Cloud API)
- Ngrok for tunneling service

⚡ Penjelasan Badge
- Node.js dan Express.js untuk server.
- OpenAI API untuk AI reply.
- WhatsApp Cloud API untuk integrasi ke WhatsApp.
- Deploy Ready berarti sudah siap deploy ke server/cloud.