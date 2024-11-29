from django.conf import settings
from django.http import JsonResponse
import os
import re

def delete_gaceta_files(request):
    # Asegúrate de proteger esta vista (por ejemplo, solo para superusuarios o autenticación)
    # if not request.user.is_superuser:
    #     return JsonResponse({'status': 'error', 'message': 'Unauthorized'}, status=403)

    # Ruta de la carpeta media
    media_path = settings.MEDIA_ROOT
    deleted_files = []
    errors = []

    if os.path.exists(media_path):
        # Iterar sobre los archivos en la carpeta media
        for filename in os.listdir(media_path):
            if re.match(r'^Gaceta*', filename):  # Verificar si el nombre del archivo comienza con "Gaceta"
                file_path = os.path.join(media_path, filename)
                try:
                    os.remove(file_path)
                    deleted_files.append(filename)
                except Exception as e:
                    errors.append({'file': filename, 'error': str(e)})
        
        return JsonResponse({
            'status': 'success',
            'deleted_files': deleted_files,
            'errors': errors
        })
    else:
        return JsonResponse({'status': 'error', 'message': f'Media path {media_path} does not exist.'})
