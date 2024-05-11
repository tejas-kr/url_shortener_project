import string
import secrets
from shortener_app import crud
from sqlalchemy.orm import Session

def create_random_key(key_len: int = 5) -> str:
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(key_len))

def create_unique_random_key(db: Session) -> str:
    key = create_random_key()
    while crud.get_db_url_by_key(db=db, url_key=key):
        key = create_random_key()
    return key
