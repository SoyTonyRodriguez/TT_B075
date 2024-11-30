curl -X PATCH http://192.168.1.143:8000/api/v1/document/doc_cd6d9d4d-3ef6-4b67-ae7a-382cfacc3ff3/replace/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyOTQ4NDkxLCJpYXQiOjE3MzI5NDEyOTEsImp0aSI6ImZkNTYxOTFmMzczZTQwZDE4YWFmMTg0Y2Y1NzBlMjI1IiwidXNlcl9pZCI6ImFjY18wM2E3NzVmZS03ZjkxLTQyNmItYTI5NS00OGQ1YjkxN2IxOWYifQ.o8HrcUuOT20-Ph_RxlhwS4NvEb9vhDytvEuJch3_NSI" \
-F "activity=Participación en la expo-profesiográfica" \
-F "projection_id=123" \
-F "file=@/home/antonio/Downloads/Horario_Garcia_Montiel_Gustavo.pdf"