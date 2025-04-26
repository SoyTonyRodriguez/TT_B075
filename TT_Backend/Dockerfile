FROM python:3.11-slim

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY . .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto que usa Django
EXPOSE 8000

# Comando para correr el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
