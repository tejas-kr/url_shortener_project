from typing import List
from shortener_app import models, schemas, keygen
from sqlalchemy.orm import Session


def get_db_url_by_key(db: Session, url_key: str) -> models.URL:
    return db.query(models.URL).filter(models.URL.key == url_key, models.URL.is_active).first()


def increment_clicks_by_key(db: Session, db_url: schemas.URL) -> models.URL:
    db_url.clicks += 1
    db.commit()
    db.refresh(db_url)
    return db_url


def get_db_url_by_secret_key(db: Session, secret_key: str):
    return db.query(models.URL)\
        .filter(models.URL.secret_key == secret_key, models.URL.is_active)\
        .first()


def create_db_url(db: Session, url: schemas.URLBase):
    key = keygen.create_unique_random_key(db=db)
    secret_key = f'{key}_{keygen.create_random_key(key_len=8)}'
    db_url = models.URL(
        key=key,
        secret_key=secret_key,
        target_url=url.target_url
    )

    db.add(db_url)
    db.commit()
    db.refresh(db_url)

    db_url.url = key
    db_url.admin_url = secret_key

    return db_url


def deactivate_url(db: Session, secret_key: str) -> models.URL:
    db_url = get_db_url_by_secret_key(db=db, secret_key=secret_key)
    if db_url:
        db_url.is_active = False
        db.commit()
        db.refresh(db_url)
    return db_url


def get_all_urls_data(db: Session) -> List[models.URL]:
    return db.query(models.URL).filter(models.URL.is_active).all()
