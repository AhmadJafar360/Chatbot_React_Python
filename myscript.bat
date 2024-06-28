@echo off
cd backend
npm run start
python chatbot.py

cd frontend
npm start

echo Program selesai di jalankan
pause