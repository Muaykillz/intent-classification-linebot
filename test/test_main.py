from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_intent():
    response = client.post("/intents", json={"name": "test_intent", "examples": ["test1", "test2"]})
    assert response.status_code == 201
    assert response.json() == {"message": "Intent created successfully"}

def test_get_all_intents():
    response = client.get("/intents")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_classify_text():
    response = client.post("/classify", json={"text": "test1"})
    assert response.status_code == 200
    assert response.json() == {"intent": "test_intent"}