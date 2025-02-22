from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Get Hugging Face API key from environment variable
HF_API_KEY = os.getenv("HF_API_KEY")

# Check if the API key is set
if not HF_API_KEY:
    raise ValueError("Hugging Face API key is missing. Please set the 'HF_API_KEY' environment variable.")

# Hugging Face API endpoint for the Mistral-7B-Instruct model
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"  # Mistral-7B-Instruct model

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}

# Function to call Hugging Face API
def query_hugging_face(text):
    try:
        # Modify the input to ask the model to respond as a fitness coach
        prompt = f"You are a fitness coach chatbot. Respond to user query in 2-3 sentences. User query: {text}"

        response = requests.post(HF_API_URL, headers=headers, json={"inputs": prompt})
        
        # Debugging the response
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Content: {response.text}")
        
        if response.status_code == 200:
            # Extract the generated response from the model and return it
            result = response.json()
            if 'generated_text' in result[0]:
                return {"response": result[0]['generated_text'].replace(prompt, '').strip()}
            else:
                return {"error": "Generated text not found in response"}
        else:
            return {"error": f"Failed to get response from Hugging Face API: {response.text}"}
    except Exception as e:
        return {"error": f"Exception occurred: {str(e)}"}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Get the response from Hugging Face model
    result = query_hugging_face(user_message)

    if 'error' in result:
        return jsonify(result), 500

    # Send the response back to the client
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
