import validators
from typing import List
from sqlalchemy.orm import Session
from starlette import datastructures
from shortener_app import models, crud, config
from fastapi.responses import RedirectResponse
from shortener_app.database import SessionLocal, engine
from shortener_app.schemas import URLBase, URL, URLInfo, AllUrls
from fastapi import FastAPI, HTTPException, Depends, Request


app = FastAPI()
models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/healthCheck')
def get_root():
    return "Welcome to the URL Shortener App"


def raise_bad_request(message: str):
    raise HTTPException(status_code=400, detail=message)


def raise_not_found(request: Request):
    message = f'URL ({request.url}) does not exists!'
    raise HTTPException(status_code=404, detail=message)


@app.get(
    '/admin/all',
    response_model=List[AllUrls]
)
def get_all_urls(request: Request, db: Session = Depends(get_db)):
    if url_info := crud.get_all_urls_data(db):
        return url_info
    else:
        raise_bad_request(message="Error while fetching all records")


@app.post('/url', response_model=URLInfo)
def create_url(url: URLBase, db: Session = Depends(get_db)):
    if not validators.url(url.target_url):
        raise_bad_request(message="Your provided URL is not Valid!")

    db_url = crud.create_db_url(db=db, url=url)

    return db_url


@app.get("/{url_key}")
def forward_to_target_url(
    url_key: str,
    request: Request,
    db: Session = Depends(get_db)
) -> RedirectResponse:
    if db_url := crud.get_db_url_by_key(db=db, url_key=url_key):
        crud.increment_clicks_by_key(db, db_url)
        return RedirectResponse(db_url.target_url)
    else:
        raise_not_found(request)


@app.get(
    '/admin/{secret_key}',
    name="administration info",
    response_model=URLInfo
)
def get_url_info(
    secret_key: str, 
    request: Request, 
    db: Session = Depends(get_db)
):
    base_url = datastructures.URL(url=config.get_settings().base_url)
    
    if db_url := crud.get_db_url_by_secret_key(db=db, secret_key=secret_key):
        db_url.url = str(base_url.replace(path=db_url.key))
        db_url.admin_url = str(base_url.replace(path=db_url.secret_key))
        return db_url
    else:
        raise_not_found(request)


@app.delete(
    '/admin/{secret_key}',
    name="administration url del"
)
def delete_url(secret_key: str, request: Request, db: Session = Depends(get_db)):
    if db_url := crud.deactivate_url(db, secret_key):
        message = f'Successfully Deleted the URL on {secret_key} for {db_url.target_url}'
        return {"detail": message}
    else:
        raise_not_found(request=request)
