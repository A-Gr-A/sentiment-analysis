from flask import Flask,request, jsonify, make_response
app = Flask(__name__)
@app.route("/")
def index():
    jsonResp = {'jack': 4098, 'sape': 4139}
    print("sendddd")
    print(jsonify(jsonResp))
    return jsonify(jsonResp)

@app.route("/api",methods=['GET','POST'])
def methodhanlers():
   if request.method =='GET':
      print("in get request")
      return {
         "user":"guest",
         "id":1,
         "title":"backend server"
      }
   if request.method == 'POST':
      print('in post request')
      print(type(request.json))
      print(request.json)
      return jsonify({"result":"hello there as a response"})
  
if __name__ == '__main__':
   app.run(debug = True)