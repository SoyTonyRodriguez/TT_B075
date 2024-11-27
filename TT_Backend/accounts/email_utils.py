from django.core.mail import send_mail

def enviar_correo_bienvenida(destinatario_email):
    asunto = "Bienvenido a nuestra plataforma"
    mensaje = """
    ¡Hola!

    Gracias por registrarte en nuestra plataforma. Este es un correo de prueba enviado desde el dominio sandbox de Mailgun.

    Saludos,
    El Equipo.
    """
    remitente = "noreply@sandboxed880d43792f4ab3aac647cd8846099d.mailgun.org"
    send_mail(asunto, mensaje, remitente, [destinatario_email], fail_silently=False)
