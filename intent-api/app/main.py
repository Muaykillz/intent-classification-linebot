from fastapi import FastAPI, HTTPException
from pydantic import ValidationError
from app.models import Intent, InputText
from app.storage import IntentStorage
from app.utils import cosine_sim

app = FastAPI()
intent_storage = IntentStorage("data/intents.json")
intent_storage.load()

# Constants
SIMILARITY_THRESHOLD = 0.7
FALLBACK_INTENT = "fallback"

@app.post("/intents", status_code=201)
async def create_intent(intent: Intent):
    try:
        if intent_storage.get_intent(intent.name):
            raise HTTPException(status_code=400, detail="Intent already exists")
        intent_storage.add_intent(intent)
        return {"message": "Intent created successfully"}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

@app.put("/intents/{intent_name}")
async def update_intent(intent_name: str, intent: Intent):
    try:
        if not intent_storage.get_intent(intent_name):
            raise HTTPException(status_code=404, detail="Intent not found")
        intent_storage.update_intent(intent_name, intent)
        return {"message": "Intent updated successfully"}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

@app.get("/intents")
async def get_all_intents():
    return intent_storage.get_all_intents()

@app.delete("/intents/{intent_name}", status_code=204)
async def delete_intent(intent_name: str):
    if not intent_storage.get_intent(intent_name):
        raise HTTPException(status_code=404, detail="Intent not found")
    intent_storage.delete_intent(intent_name)

@app.post("/classify")
async def classify_text(input: InputText):
    try:
        input_embeddings = intent_storage.model.encode(input.text)
        scores = [cosine_sim(input_embeddings, emb) for emb in intent_storage.embeddings.values()]
        max_score = max(scores)
        
        if max_score >= SIMILARITY_THRESHOLD:
            predicted_intent_id = scores.index(max_score) + 1 # ข้าม index 0 ที่เป็น fallback
            predicted_intent = list(intent_storage.intents.keys())[predicted_intent_id]
        else:
            predicted_intent = FALLBACK_INTENT
        
        response_text = intent_storage.responses[predicted_intent]
        return {"intent": predicted_intent, "response": response_text}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
