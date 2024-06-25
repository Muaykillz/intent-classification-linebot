from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from app.models import Intent, InputText
from app.storage import IntentStorage
from app.utils import cosine_sim

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


intent_storage = IntentStorage("data/intents.json")
intent_storage.load()

# Constants
SIMILARITY_THRESHOLD = 0.7
FALLBACK_INTENT = "IveFfDfj" # fallback intent id

@app.post("/intents", status_code=201)
async def create_intent(intent: Intent):
    try:
        if intent_storage.get_intent_by_name(intent.name):
            raise HTTPException(status_code=400, detail="Intent already exists")
        new_intent = intent_storage.add_intent(intent)
        print(new_intent)
        return new_intent.dict()
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

@app.get("/intents/{intent_name}")
async def get_intent(intent_name: str):
    intent = intent_storage.get_intent(intent_name)
    if not intent:
        raise HTTPException(status_code=404, detail="Intent not found")
    return intent

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
            predicted_intent_idx = scores.index(max_score) + 1 # ข้าม index 0 ที่เป็น fallback
            predicted_intent_id = list(intent_storage.intents.keys())[predicted_intent_idx]
        else:
            predicted_intent_id = FALLBACK_INTENT
        intent_name = intent_storage.intents[predicted_intent_id].name
        response_text = intent_storage.responses[predicted_intent_id]
        return {"name": intent_name, "id": predicted_intent_id, "response": response_text}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
