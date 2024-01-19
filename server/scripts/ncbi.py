import requests
from bs4 import BeautifulSoup
import json
import sys

def search_pmc(query):
    formatted_query = query.replace(' ', '+')

    url = f"https://www.ncbi.nlm.nih.gov/pmc/?term={formatted_query}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    
    return None

def parse_pmc_results(html):
    soup = BeautifulSoup(html, 'html.parser')
    articles = []

    for entry in soup.find_all('div', class_='rprt'):
        title_div = entry.find('div', class_='title')
        title = title_div.get_text(strip=True) if title_div else 'No title available'
        
        link_tag = title_div.find('a') if title_div else None
        link = 'https://www.ncbi.nlm.nih.gov' + link_tag['href'] if link_tag else 'No link available'

        desc_div = entry.find('div', class_='desc')
        description = desc_div.get_text(strip=True) if desc_div else 'No description available'

        articles.append({
            'title': title,
            'description': description,
            'link': link
        })
    
    return articles

def main(query):
    html_content = search_pmc(query)
    if html_content:
        articles = parse_pmc_results(html_content)
        print(json.dumps(articles))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        main(query)
    else:
        print("missing query", file=sys.stderr)
        sys.exit(1)
