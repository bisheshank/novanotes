from flask import Flask
import flask
from flask_cors import CORS

########################## GLOBAL VARIABLES ##########################

journal = ''


######################################################################

app = Flask(__name__)
CORS(app)

# getData API Route
@app.route("/getData", methods=['GET'])
def get_data():
    response = flask.jsonify({"members": ["Member1", "Member2", "Member3"]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/postData", methods=['POST'])
def post_data():
    data = flask.request.json
    title = data.get('title', '')
    print('Received journal data: ', title)

    response = flask.jsonify({'message': 'Data received successfully'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0',port=4997)