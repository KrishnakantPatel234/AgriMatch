@echo off
SETLOCAL
cd /d %~dp0
python -m venv .venv
call .venv\Scripts\activate.bat
pip install -r ai_service\requirements.txt
set OPENAI_API_KEY=%OPENAI_API_KEY%
uvicorn ai_service.main:app --host 0.0.0.0 --port 8000
