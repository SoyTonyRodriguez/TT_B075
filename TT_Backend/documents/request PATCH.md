curl -X PATCH http://192.168.1.143:8000/api/v1/document/doc_85f99e74-749c-4be7-9be3-b2c0315bed5f/replace/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4ODc3NjE0LCJpYXQiOjE3Mjg4NzA0MTQsImp0aSI6IjRkNDkxNDBjYmVhODQ3ZTc4OWYxMTg4YTMyNDY2NDU4IiwidXNlcl9pZCI6ImFjY19kZTI0YWI4OS0xNGNjLTQ4NzYtYTM2OC1jNmJlYmRkN2ZkYTgifQ.ue-U0ReTMpdWYeLTj2I_xQgh6ZVPHq7ZlHijOo-qaY8" \
-F "file_name=Doc actualizado" \
-F "file_type=jpg" \
-F "size=123123" \
-F "file=@/home/antonio/prueba.jsx"