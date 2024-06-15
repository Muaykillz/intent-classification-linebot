from pydantic import BaseModel
from typing import List

class Intent(BaseModel):
    name: str
    examples: List[str]
    response: str
class InputText(BaseModel):
    text: str