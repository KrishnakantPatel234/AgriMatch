from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

try:
    from openai import OpenAI
except Exception:  # openai package may not be installed yet
    OpenAI = None

app = FastAPI(title="AgriMatch AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    language: str | None = "en"
    role: str | None = None


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat")
async def chat(req: ChatRequest):
    # Prefer real model if configured
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    if api_key and OpenAI is not None:
        try:
            client = OpenAI(api_key=api_key)
            sys_prompt = (
                "You are FarmAI, a multilingual agriculture assistant for Indian users. "
                "Be concise, factual, and helpful. Support English (en), Hindi (hi), and Marathi (mr). "
                "Focus on crop prices, weather, pests, storage, transport, and buyer/seller guidance."
            )
            lang = (req.language or "en").lower()
            role = (req.role or "").lower()
            user_hint = f"User role: {role}. Language: {lang}."
            completion = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": sys_prompt},
                    {"role": "user", "content": user_hint},
                    {"role": "user", "content": req.message},
                ],
                temperature=0.4,
            )
            reply = completion.choices[0].message.content
            return {"reply": reply}
        except Exception as e:
            # Fall back to simple heuristic
            print("AI error:", e)

    # Simple local fallback (no API key)
    msg = req.message.lower()
    lang = (req.language or "en").lower()

    def _(en: str, hi: str, mr: str):
        return {"en": en, "hi": hi, "mr": mr}.get(lang, en)

    if any(k in msg for k in ["price", "कीमत", "किंमत", "rate"]):
        return {"reply": _(
            "Tomatoes ₹25-32/kg, Potatoes ₹18-22/kg, Onions ₹30-38/kg (wholesale).",
            "टमाटर ₹25-32/किग्रा, आलू ₹18-22/किग्रा, प्याज ₹30-38/किग्रा (थोक)।",
            "टोमॅटो ₹25-32/किग्रा, बटाटा ₹18-22/किग्रा, कांदा ₹30-38/किग्रा (घाऊक).",
        )}
    if any(k in msg for k in ["weather", "मौसम", "हवामान"]):
        return {"reply": _(
            "Next 7 days: light rain (15mm), 24°-32°C. Good for vegetables.",
            "अगले 7 दिन हल्की बारिश (15mm), 24°-32°C. सब्जी फसलों के लिए अनुकूल।",
            "पुढील 7 दिवस हलका पाऊस (15mm), 24°-32°C. भाजीपाला पिकांसाठी अनुकूल.",
        )}

    return {"reply": _(
        "I can help with prices, weather, pests, storage, transport, and buyers. Please be specific.",
        "मैं कीमत, मौसम, कीट, स्टोरेज, ट्रांसपोर्ट और खरीदारों में मदद कर सकता हूँ—कृपया थोड़ा विशिष्ट बताएं।",
        "मी किंमत, हवामान, किडी, साठवण, वाहतूक आणि खरेदीदारांमध्ये मदत करू शकतो—कृपया विशिष्ट सांगा.",
    )}


class AnalyzeImageRequest(BaseModel):
    imageBase64: str | None = None
    notes: str | None = None


@app.post("/analyze-image")
async def analyze_image(_: AnalyzeImageRequest):
    # Placeholder for image analysis; returns a deterministic response
    return {
        "result": "healthy",
        "advice": "No significant issues detected. Monitor leaves and maintain irrigation.",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)