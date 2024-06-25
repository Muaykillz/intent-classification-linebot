from pydantic import BaseModel, Field
from typing import List
from app.utils import generate_id

class Intent(BaseModel):
    id: str = Field(default_factory=lambda: generate_id())
    name: str
    examples: List[str]
    response: str

class InputText(BaseModel):
    text: str