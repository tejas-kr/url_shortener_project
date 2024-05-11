from pydantic import BaseModel


class URLBase(BaseModel):
    target_url: str


class URL(URLBase):
    is_active: bool
    clicks: int

    class Config:
        orm_model = True


class AllUrls(URL):
    key: str
    secret_key: str


class URLInfo(URL):
    url: str
    admin_url: str
