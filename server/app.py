from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

SWAPI_BASE_URL = "https://www.swapi.tech/api/people"

def search_character_by_name(name):
    page = 1
    found_character = None
    while True:
        url = f"https://www.swapi.tech/api/people?page={page}&limit=200"
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            for person in data['results']:
                if person['name'].lower() == name.lower():
                    full_url = person['url']
                    full_response = requests.get(full_url)
                    full_response.raise_for_status()
                    return full_response.json()

            if 'next' not in data or not data['next']:
                break
            page += 1
        except Exception as e:
            print("Request failed:", e)
            return None

    return None

@app.route('/new', methods=['POST'])
def new():
    data = request.get_json()
    char1 = data.get('character1')
    char2 = data.get('character2')

    result1 = search_character_by_name(char1)
    result2 = search_character_by_name(char2)

    if not result1 or not result2:
        return jsonify({"error": "Character(s) not found"}), 404

    try:
        height1 = int(result1["result"]["properties"]["height"])
        height2 = int(result2["result"]["properties"]["height"])
    except ValueError:
        return jsonify({"error": "Invalid height data"}), 500

    if height1 > height2:
        winner = char1
    elif height2 > height1:
        winner = char2
    else:
        winner = "Draw"

    return jsonify({
        "winner": winner,
        "character1_height": height1,
        "character2_height": height2
    })

@app.route('/compare-characters', methods=['POST'])
def compare_characters():
    print("Request received at /compare-characters")
    data = request.get_json()
    character1 = data.get('character1', None)
    character2 = data.get('character2', None)

    if not character1 or not character2:
        print("Error: Missing character names")
        return jsonify({"error": "Character names required"}), 400

    char1_data = search_character_by_name(character1)
    char2_data = search_character_by_name(character2)

    if not char1_data:
        print(f"Character '{character1}' not found")
    if not char2_data:
        print(f"Character '{character2}' not found")

    return jsonify({
        "character1": char1_data or "Character not found",
        "character2": char2_data or "Character not found"
    })

def get_image_url(character_name):
    character_name = ' '.join(word.capitalize() for word in character_name.split())
    url = "https://en.wikipedia.org/w/api.php"

    params = {
        "action": "query",
        "format": "json",
        "titles": character_name,
        "prop": "images",
    }
    session = requests.Session()
    response = session.get(url, params=params)
    data = response.json()

    image_title = None
    pages = data.get("query", {}).get("pages", {})
    for _, page_data in pages.items():
        images = page_data.get("images", [])
        for img in images:
            if img["title"].lower().endswith(('.jpg', '.png', '.jpeg')):
                image_title = img["title"]
                break
        if image_title:
            break

    if not image_title:
        print(f"No images found for {character_name}")
        return None

    params2 = {
        "action": "query",
        "format": "json",
        "titles": image_title,
        "prop": "imageinfo",
        "iiprop": "url",
    }
    response2 = session.get(url, params=params2)
    image_data = response2.json()
    for _, page in image_data.get("query", {}).get("pages", {}).items():
        image_info = page.get("imageinfo", [])
        if image_info:
            return image_info[0]["url"]
    return None

@app.route('/get-character-image', methods=['POST'])
def get_character_image():
    print("Fetching character image")
    data = request.get_json()
    name = data.get('character_name', "")
    if not name:
        print("Error: No name provided")
        return jsonify({"error": "No name provided"}), 400

    image_url = get_image_url(name)
    if not image_url:
        return jsonify({"error": "No image found"}), 404

    return jsonify({"image_url": image_url})

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)
