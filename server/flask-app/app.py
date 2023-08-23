from flask import Flask, request, jsonify
from PIL import Image
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins for CORS

app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png','webp'}

# Load model, processor, and tokenizer
model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

# Set up device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if image_file and allowed_file(image_file.filename):
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
            image_file.save(image_path)

            image = Image.open(image_path)
            if image.mode != "RGB":
                image = image.convert(mode="RGB")

            pixel_values = feature_extractor(images=[image], return_tensors="pt").pixel_values
            pixel_values = pixel_values.to(device)

            output_ids = model.generate(pixel_values)
            preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)

            return jsonify({'prediction': preds[0]})
        else:
            return jsonify({'error': 'Invalid file format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
