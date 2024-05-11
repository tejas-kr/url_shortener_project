import logging
from logging import Logger
from functools import lru_cache
from pydantic_settings import BaseSettings

logging.basicConfig(format='%(asctime)s::%(name)s::%(levelname)s::%(message)s', level='INFO')
logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    env_name: str = 'Dev'
    base_url: str = 'http://localhost:8000'
    db_url: str = 'sqlite:///./shortener.db'
    logger: Logger = logger

    class Config:
        env_file = '.env'


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    logger.info(f'Loading settings for: {settings.env_name}')
    return settings
    