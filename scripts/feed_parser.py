import feedparser
import json
from typing import  *
from datetime import datetime
import dateutil.parser
from html.parser import HTMLParser

from langdetect import detect_langs


def is_english(text, threshold=0.7):
    try:
        from langdetect import detect, detect_langs

        lang = detect(text)
        langs = detect_langs(text)


        if lang == 'en':
            if len(langs) == 1:
                return True

            for detected_lang in langs:
                if 'en' in str(detected_lang):
                    confidence = float(str(detected_lang).split(':')[1])
                    return confidence >= threshold

        return False
    except Exception as e:
        print(f"Error detecting language: {e}")
        return False

class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.text = []

    def handle_data(self, d):
        self.text.append(d)

    def get_data(self):
        return ' '.join(self.text)

def convert_rss_to_json(rss_url):
    try:

        feed = feedparser.parse(rss_url)
        feed_items = []
        for entry in feed.entries:
            item = {
                "title": entry.get('title', ''),
                "link": entry.get('link', ''),
                "published_date": entry.get('published', ''),
                "author": entry.get('author', ''),
            }
            if item['published_date'] == "":
                item["published_date"] = entry.get("updated", "")
            description = entry.get('description', '')
            try:
                stripper = MLStripper()
                stripper.feed(str(description))
                description = " ".join(stripper.text).strip()
            except:
                description = description
            description = description.replace("\n", " ")
            description = " ".join(description.split())

            item['description'] = description if len(description) < 200 else description[:200] + "..."
            if is_english(description):
                feed_items.append(item)
            else:
                print(f"Article {item} is not written in english, so excluding it.")

        return feed_items

    except Exception as e:
        print(f"Error converting RSS feed: {e}")


def combine_feeds(feed_urls: List[str]):
    feeds = []
    for url in feed_urls:
        feed_metadata = convert_rss_to_json(url)
        feeds.extend(feed_metadata)

    sorted_items = sorted(
        feeds,
        key=lambda x: dateutil.parser.parse(x['published_date']),
        reverse=True
    )

    combined_feed = {
        "total_items": len(sorted_items),
        "items": sorted_items
    }

    with open("feed_output.json", 'w', encoding='utf-8') as json_file:
        json.dump(combined_feed, json_file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    combine_feeds(["https://notes.eatonphil.com/rss.xml", "https://artem.krylysov.com/atom.xml"])