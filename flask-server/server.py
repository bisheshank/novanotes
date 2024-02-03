from flask import Flask
import flask
from flask_cors import CORS

########################## GLOBAL VARIABLES ##########################

# each journal post will be a dictionary
journal_posts = []


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
    tmp_journal_post = {}
    tmp_journal_post["topic"] = data.get('topic', '')
    tmp_journal_post["body"] = data.get('body', '')
    tmp_journal_post["date"] = data.get('date', '')
    tmp_journal_post["timeTaken"] = data.get('timeTaken', '')
    print('Received journal data: ', tmp_journal_post)
    journal_posts.append(tmp_journal_post)

    response = flask.jsonify({'message': 'Data received successfully'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0',port=4997)