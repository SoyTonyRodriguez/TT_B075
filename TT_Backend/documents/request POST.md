curl -X POST http://192.168.1.143:8000/api/v1/document/upload/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4ODc3NjE0LCJpYXQiOjE3Mjg4NzA0MTQsImp0aSI6IjRkNDkxNDBjYmVhODQ3ZTc4OWYxMTg4YTMyNDY2NDU4IiwidXNlcl9pZCI6ImFjY19kZTI0YWI4OS0xNGNjLTQ4NzYtYTM2OC1jNmJlYmRkN2ZkYTgifQ.ue-U0ReTMpdWYeLTj2I_xQgh6ZVPHq7ZlHijOo-qaY8" \
-F "file_name=Mi Documento" \
-F "file_type=jpg" \
-F "size=123123" \
-F "account_id=acc_de24ab89-14cc-4876-a368-c6bebdd7fda8" \
-F "projection_id=product_7cd5c17c-4cc0-46fc-9403-b5dd523f5b10" \
-F "file=@/home/antonio/prueba.jsx"