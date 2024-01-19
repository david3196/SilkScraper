import requests
from bs4 import BeautifulSoup
import time
import json
import sys

def search_google_scholar(query, num_pages=20):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}

    all_results = []
    for page in range(0, num_pages):
        url = f"https://scholar.google.com/scholar?start={page}&q={query}"
        response = requests.get(url, headers=headers)
        time.sleep(1)

        if response.status_code == 200:
            all_results.append(response.text)
        else:
            break

    return all_results

def parse_results(html_pages):
    results = []
    for html in html_pages:
        soup = BeautifulSoup(html, 'html.parser')
        for result in soup.find_all('div', class_='gs_ri'):
            title = result.find('h3', class_='gs_rt').text
            link = result.find('a')['href'] if result.find('a') else 'No link available'
            abstract = result.find('div', class_='gs_rs').text if result.find('div', class_='gs_rs') else 'No abstract available'
            
            results.append({"title": title, "link": link, "abstract": abstract})

    return results

def main(query):
    html_pages = search_google_scholar(query, num_pages=20)
    if html_pages:
        scraped_results = parse_results(html_pages)
        print(json.dumps(scraped_results))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        main(query)
    else:
        print("missing query", file=sys.stderr)
        sys.exit(1)


