from flask import Flask,request,json
import pickle
import joblib

import sys
sys.path.append(".")

from utils.utils import clean_url
from utils.utils import clean_non_alpha
from utils.utils import clean_lowercase
from utils.utils import clean_tokenizer
from utils.utils import clean_stopwords
from utils.utils import clean_stem
from utils.utils import clean_lemmatization
from utils.utils import clean_length
from utils.utils import convert_to_string

from sklearn.feature_extraction.text import CountVectorizer


###############################################################################
def preprocess_raw_text(text):
  text = clean_url(text)
  text = clean_non_alpha(text)
  text = clean_lowercase(text)
  text = clean_tokenizer(text)
  text = clean_stopwords(text)
  text = clean_stem(text)
  text = clean_lemmatization(text)
  text = clean_length(text)
  text = convert_to_string(text)
  text = [text]
  cv = joblib.load("./cv_file.pkl")
  text = cv.transform(text)

  return text
#########(Score Prediction Function)##################################################################################

def final_output_score(text):
  MNB_2 = pickle.load(open('naive_bayes_file.sav', 'rb'))
  MNB_predictions_2_raw_text = MNB_2.predict(text)

  return MNB_predictions_2_raw_text

#########(Sentiment Prediction Function)################################################################################

def final_output_sentiment(text):
  logisticRegr = pickle.load(open('logistic_regression_file.sav', 'rb'))
  lgr_predictions_2_raw_text = logisticRegr.predict(text)
  if (lgr_predictions_2_raw_text==1):
    return "Positive review"
  else:
    return "Negative review" 

###########################################################################################
# sentiment_output = final_output_sentiment(raw_text_processed)
# print(sentiment_output)

# score_output = final_output_score(raw_text_processed)
# print(score_output)

# raw_text_processed = preprocess_raw_text(raw_text)
  
# Flask constructor takes the name of 
# current module (__name__) as argument.
# app=Flask(__name__)
app = Flask(__name__,static_folder='./client/build',static_url_path='/')
  
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
def home():
     return app.send_static_file('index.html')

@app.route('/api',methods=['GET','POST']) 
def api():
    if request.method == 'GET':
        return {
            'status':'running',
            'fromurl':'/api',
            'plsrunlox':3
        } 
    else:
        print(request.json)
        print(request.json['text'])
       
        preprocessed_text = preprocess_raw_text(str(request.json['text']))
        print(preprocessed_text.shape)
        print(preprocessed_text)
        out_score = final_output_score(preprocessed_text)
        out_sent = final_output_sentiment(preprocessed_text)
        print(f"{out_score}\n{out_sent}")

        
        return {
            'fromurl':'/api',
            'result':"----"
        }
  
# main driver function
if __name__ == '__main__':
  
    # run() method of Flask class runs the application 
    # on the local development server.
    # app.run(debug=True)
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))