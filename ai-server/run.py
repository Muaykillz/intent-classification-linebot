import uvicorn
from os import getenv

if __name__ == '__main__':
    port = int(getenv("PORT", 8080))  # ใช้พอร์ต 8080 ที่ตั้งค่าโดยระบบ
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
