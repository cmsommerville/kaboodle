import os 
import openai
from flask import request
from flask_restx import Resource
from app.shared import BaseCRUDResource

from ..models import Model_Feedback
from ..schemas import Schema_Feedback

class Resource_Feedback(Resource):
  
    def prompt_formatter(self, prompt): 
        return f"Rewrite the text, '{prompt}', in a business-appropriate, constructive criticism style. Soften the language. Rephrase any rude or hostile comments."
        

    def post(self, *args, **kwargs):
        OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
        if OPENAI_API_KEY is None: 
            return {'status': "ERROR", 'msg': "No OpenAI API key found"}
        req = request.get_json()
        prompt = req.get('prompt')
        if prompt is None: 
            return {"status": "ERROR", 'msg': "Please provide a `prompt` key"}
        
        res = openai.Completion.create(model="text-davinci-003", prompt=self.prompt_formatter(prompt), temperature=1, max_tokens=1000)
        return res
    

class CRUD_Feedback(BaseCRUDResource): 
    model=Model_Feedback
    schema=Schema_Feedback()