import re

import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

from nltk.corpus import stopwords
nltk.download('stopwords')
stopwords.words('english') 

from nltk.stem import PorterStemmer

nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer



def clean_url(review_text):
  return re.sub(r'https\S+',' ',review_text)

def clean_non_alpha(review_text):
  return re.sub('[^a-zA-Z]',' ',review_text)

def clean_lowercase(review_text):
  return str(review_text).lower()


def clean_tokenizer(review_text):
  return word_tokenize(review_text)

   
def clean_stopwords(token):
    stop_words = set(stopwords.words('english'))
    return [item for item in token if item not in stop_words]

def clean_stem(token):
    stemmer = PorterStemmer()
    return [stemmer.stem(i) for i in token]

def clean_lemmatization(token):
    lemma = WordNetLemmatizer()
    return [lemma.lemmatize(word=w,pos='v') for w in token]

def clean_length(token):
  return [i for i in token if len(i)>2]

def convert_to_string(listReview):
  return ' '.join(listReview)
