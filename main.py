from flask import Flask,request,json
  
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
        result = request.json['text'].upper()
        return {
            'fromurl':'/api',
            'result':result
        }
  
# main driver function
if __name__ == '__main__':
  
    # run() method of Flask class runs the application 
    # on the local development server.
    # app.run(debug=True)
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))