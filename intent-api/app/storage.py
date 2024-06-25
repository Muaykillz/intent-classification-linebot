import json
from typing import Dict, List
from sentence_transformers import SentenceTransformer
from app.models import Intent

class IntentStorage:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
        self.intents: Dict[str, Intent] = {}
        self.embeddings: Dict[str, List[float]] = {}
        self.responses: Dict[str, str] = {}
        
    def load(self):
        try:
            with open(self.file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.intents = {intent["id"]: Intent(**intent) for intent in data["intents"]}
                self.embeddings = data["embeddings"]
                self.responses = data["responses"]
        except FileNotFoundError:
            self.intents = {}
            self.embeddings = {}
            self.responses = {}
    
    def save(self):
        data = {
            "intents": [intent.dict() for intent in self.intents.values()],
            "embeddings": self.embeddings,
            "responses": self.responses
        }
        with open(self.file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
    
    def get_all_intents(self):
        return list(self.intents.values())
    
    def get_intent(self, id: str):
        return self.intents.get(id)
    
    def get_intent_by_name(self, name: str):
        for intent in self.intents.values():
            if intent.name == name:
                return intent
        return None
    
    def add_intent(self, intent: Intent):
        self.intents[str(intent.id)] = intent
        embeddings = self.model.encode(intent.examples)
        avg_embeddings = embeddings.mean(axis=0)
        self.embeddings[str(intent.id)] = avg_embeddings.tolist()
        self.responses[str(intent.id)] = intent.response
        self.save()
        return intent
        
    def update_intent(self, id: str, intent: Intent):
        self.intents[id] = intent
        embeddings = self.model.encode(intent.examples)
        avg_embeddings = embeddings.mean(axis=0)
        self.embeddings[id] = avg_embeddings.tolist()
        self.responses[id] = intent.response    
        self.save()
        
    def delete_intent(self, id: str):
        if id in self.intents:
            del self.intents[id]
            del self.embeddings[id]
            del self.responses[id]
            self.save()