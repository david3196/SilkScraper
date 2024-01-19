import requests
from bs4 import BeautifulSoup
import json
import sys

def search_arxiv(query):
    url = f"http://arxiv.org/search/?query={query}&searchtype=all"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.text
    else:
        print("Failed to retrieve data")
        return None

def parse_arxiv_results(html):
    soup = BeautifulSoup(html, 'html.parser')
    articles = []

    for entry in soup.find_all('li', class_='arxiv-result'):
        title = entry.find('p', class_='title is-5 mathjax').text.strip()
        abstract = entry.find('p', class_='abstract mathjax').text.strip()
        link = entry.find('p', class_='list-title is-inline-block').find('a')['href']
        full_link = f'{link}'
        articles.append({'title': title, 'link': full_link, 'abstract': abstract})
    
    return articles

def main(query):
    html = search_arxiv(query)
    if html:
        articles = parse_arxiv_results(html)
        print(json.dumps(articles))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        main(query)
    else:
        print("missing query", file=sys.stderr)
        sys.exit(1)
