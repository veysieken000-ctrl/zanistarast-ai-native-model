# Zanistarast Backend Deploy Notes

## Goal
Deploy the backend to a public server so the AI page can connect without localhost.

## Current Local Flow
ai.html -> ai.js -> http://localhost:3000/api/ask -> OpenAI API

## Required Public Flow
ai.html -> ai.js -> https://YOUR-BACKEND-URL/api/ask -> OpenAI API

## Before Deploy
- server.js must be working
- prompt.js must be working
- package.json must be correct
- .gitignore must include node_modules and .env
- OPENAI_API_KEY must stay private

## After Deploy
Replace this line in ai.js:

const API_BASE_URL = "http://localhost:3000";

With:

const API_BASE_URL = "https://YOUR-BACKEND-URL";

