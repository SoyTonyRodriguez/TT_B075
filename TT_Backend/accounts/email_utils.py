import smtplib
from email.mime.text import MIMEText
from django.conf import settings

def enviar_correo_bienvenida(email_destinatario):
    subject = '¡Bienvenido a nuestra plataforma!'
    message = 'Gracias por registrarte. Esperamos que disfrutes de nuestros servicios.'

    # Crear el mensaje MIME
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = settings.EMAIL_HOST_USER
    msg['To'] = email_destinatario

    try:
        # Conectarse al servidor SMTP de SendGrid
        with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
            server.ehlo()
            server.starttls()  # Iniciar TLS sin argumentos
            server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            server.sendmail(settings.DEFAULT_FROM_EMAIL, email_destinatario, msg.as_string())
        print("Correo enviado exitosamente.")
    except Exception as e:
        print(f"Error al enviar correo: {e}")
