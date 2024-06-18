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
                self.intents = {intent["name"]: Intent(**intent) for intent in data["intents"]}
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
    
    def get_intent(self, name: str):
        return self.intents.get(name)
    
    def add_intent(self, intent: Intent):
        self.intents[intent.name] = intent
        embeddings = self.model.encode(intent.examples)
        avg_embeddings = embeddings.mean(axis=0)
        self.embeddings[intent.name] = avg_embeddings.tolist()
        self.responses[intent.name] = intent.response
        self.save()
        
    def update_intent(self, name: str, intent: Intent):
        self.intents[name] = intent
        embeddings = self.model.encode(intent.examples)
        avg_embeddings = embeddings.mean(axis=0)
        self.embeddings[name] = avg_embeddings.tolist()
        self.responses[name] = intent.response    
        self.save()
        
    def delete_intent(self, name: str):
        if name in self.intents:
            del self.intents[name]
            del self.embeddings[name]
            del self.responses[name]
            self.save()