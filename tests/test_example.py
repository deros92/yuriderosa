import os

def test_index_html_exists():
    assert os.path.exists('index.html'), "index.html non esiste nel repository"

