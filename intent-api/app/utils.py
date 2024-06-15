from scipy.spatial.distance import cosine

def cosine_sim(a, b):
    return 1 - cosine(a, b)