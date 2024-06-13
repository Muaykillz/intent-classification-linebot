from pydantic import BaseModel
from typing import List

class Intent(BaseModel):
    name: str
    examples: List[str]

class InputText(BaseModel):
    text: str