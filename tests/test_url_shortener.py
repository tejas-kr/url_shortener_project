from shortener_app import main
from fastapi.testclient import TestClient
from unittest.mock import patch, Mock, MagicMock


client = TestClient(app=main.app)

def test_healthCheck():
    response = client.get("/healthCheck")
    assert response.status_code == 200
    assert response.json() == 'Welcome to the URL Shortener App'

@patch('shortener_app.main.crud.get_all_urls_data', MagicMock())
def test_get_all_urls():
    response = client.get("/admin/all")

    assert response.status_code == 200
    assert response.json() == []


