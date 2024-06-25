from scipy.spatial.distance import cosine
import string
import random

def cosine_sim(a, b):
    return 1 - cosine(a, b)

def generate_id(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))
