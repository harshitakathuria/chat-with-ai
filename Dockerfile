FROM python

WORKDIR /chat-with-ai   

COPY . /chat-with-ai

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]