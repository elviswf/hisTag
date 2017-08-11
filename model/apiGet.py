# -*- coding: utf-8 -*-
"""
@Time    : 8/10/2017 11:31 PM
@Author  : Elvis
"""
"""
 apiGet.py
  
"""
import indicoio
import requests
from bs4 import BeautifulSoup

indicoio.config.api_key = 'a29c43c34a0d333a8325abc9f73ca414'


def dt_sort(dt):
    return sorted(dt.items(), key=lambda d: d[1], reverse=True)


def tag_text(text):
    tags = []
    jtag = indicoio.text_tags(text)
    jtags = sorted(jtag.items(), key=lambda d: d[1], reverse=True)
    tags.append(jtags[0][0])
    jkeyword = indicoio.keywords(text, version=2)
    jkeywords = sorted(jkeyword.items(), key=lambda d: d[1], reverse=True)
    for i in range(3):
        tags.append(jkeywords[i][0])
    return tags


def get_url_text(url):
    response = requests.get(url)
    page = response.content
    soup = BeautifulSoup(page)
    text = soup.get_text()
    title = soup.title.text
    return [title, text]


def get_url_tags(url):
    title, text = get_url_text(url)
    tags = tag_text(text)
    return [title, tags]


"""
跑本地数据
"""



# url = "http://awesome-python.com/#awesome-python"
# title, tags = get_url_tags(url)

import json

with open(r"C:\Users\t-fawu\AppData\Local\Google\Chrome\User Data\Default\Bookmarks", "r", encoding="utf8") as fr:
    bookmarks = json.load(fr)

"""

len(booklist)
url = booklist[2]['url']

"""

booklist = bookmarks['roots']['bookmark_bar']['children']
booklist1 = bookmarks['roots']['other']['children']
booklist.extend(booklist1)
booktags = []
for book in booklist[1:]:
    if 'url' not in book:
        continue
    url = book['url']
    text = ""
    try:
        title, text = get_url_text(url)
    except:
        print(url)
        continue
    if text == "":
        continue
    if "error" in text or "login" in text:
        continue
    tags = []
    try:
        tags = tag_text(text)
    except:
        continue
    if len(tags) < 4:
        continue
    booktag = []
    booktag.append(url)
    booktag.append(title)
    booktag.extend(tags)
    booktags.append(booktag)



from random import randrange
from datetime import datetime, timedelta
import time


def random_date(start, end):
    """
    This function will return a random datetime between two datetime
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    timest = start + timedelta(seconds=random_second)
    timestamp = int(time.mktime(timest.timetuple()))
    return timestamp


d1 = datetime.strptime('7/20/2017 1:30 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('8/10/2017 12:50 AM', '%m/%d/%Y %I:%M %p')


links = []
for id, item in enumerate(booktags):
    jitem = {
        "urlid": id,
        "url": item[0],
        "title": item[1],
        "tags": item[2:],
        "dates": random_date(d1, d2)
    }
    links.append(jitem)

test_dict = {"data": links}
wfobj = open("history.json", 'w', encoding="utf-8")
json.dump(test_dict, wfobj, indent=4, ensure_ascii=False)
wfobj.close()


"""

import pandas as pd
import matplotlib.pyplot as plt
histag = pd.DataFrame(booktags)
histag.to_csv("histag.csv", encoding="utf8")
len(booktags)
import seaborn as sns
sns.distplot(histag[2], kde=False, rug=True)
histag[2].hist()
# import sqlite3
# conn = sqlite3.connect(r'C:\Users\t-fawu\AppData\Local\Google\Chrome\User Data\Default\databases\Databases.db')
with open(r"D:\hackathon\code\hackathon.json", "rb") as fr:
    history = fr.readlines()

histag[2].plot(kind='bar')
plt.savefig("hist.pdf")

import matplotlib.pyplot as plt
from wordcloud import WordCloud


wl_space_split = " ".join(histag[2])

my_wordcloud = WordCloud().generate(wl_space_split)

plt.imshow(my_wordcloud)
plt.axis("off")
plt.show()
plt.savefig("hist.pdf")

"""

