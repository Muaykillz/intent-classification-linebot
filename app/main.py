from fastapi import FastAPI, HTTPException
from app.models import Intent, InputText
from app.storage import IntentStorage
from app.utils import cosine_sim

app = FastAPI()
intent_storage = IntentStorage("data/intents.json")
intent_storage.load()

@app.post("/intents", status_code=201)
async def create_intent(intent: Intent):
    if intent_storage.get_intent(intent.name):
        raise HTTPException(status_code=400, detail="Intent already exists")
    intent_storage.add_intent(intent)
    return {"message": "Intent created successfully"}

@app.put("/intents/{intent_name}")
async def update_intent(intent_name: str, intent: Intent):
    if not intent_storage.get_intent(intent_name):
        raise HTTPException(status_code=404, detail="Intent not found")
    intent_storage.update_intent(intent_name, intent)
    return {"message": "Intent updated successfully"}

@app.get("/intents")
async def get_all_intents():
    return intent_storage.get_all_intents()

@app.post("/classify")
async def classify_text(input: InputText):
    input_embeddings = intent_storage.model.encode(input.text)
    scores = [cosine_sim(input_embeddings, emb) for emb in intent_storage.embeddings.values()]
    predicted_intent_id = scores.index(max(scores))
    predicted_intent = list(intent_storage.intents.keys())[predicted_intent_id]
    return {"intent": predicted_intent}