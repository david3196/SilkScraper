import requests
from bs4 import BeautifulSoup
import json
import sys

def fetch_page_content(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except Exception as e:
        return None

def parse_page(page_content):
    articles = []
    soup = BeautifulSoup(page_content, 'html.parser')

    for h3_tag in soup.find_all('h3', class_='title'):
        title = h3_tag.text.strip()
        doi_div = h3_tag.find_next_sibling('div', class_='doiInSummary')
        link = doi_div.find('a')['href'] if doi_div and doi_div.find('a') else 'No link available'
        
        articles.append({
            'title': title,
            'link': link
        })

    return articles

def main(query):
    url = f"https://techniumscience.com/index.php/socialsciences/search?query={query}"
    page_content = fetch_page_content(url)
    
    if page_content:
        articles = parse_page(page_content)
        print(json.dumps(articles))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        main(query)
    else:
        print("missing query", file=sys.stderr)
        sys.exit(1)
