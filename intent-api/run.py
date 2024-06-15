import uvicorn
from os import getenv

if __name__ == '__main__':
    port = int(getenv("PORT", 8080))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
