from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

def generate_task_id():
    return 'task_' + str(uuid.uuid4())


class Task(models.Model):
    
    class Status(models.TextChoices):
        TODO = 'todo', _('To Do')
        IN_PROGRESS = 'in-progress', _('In Progress')
        DONE = 'done', _('Done')

    id = models.CharField(
        max_length=40,
        primary_key=True,
        default=generate_task_id,
        editable=False
    )
    account_id = models.CharField(max_length=40, editable=False, null=False, default="id not provided")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=Status.choices,
        default=Status.TODO
    )
    priority = models.CharField(_('priority'), max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_date = models.DateField()
    end_date = models.DateField()
    projection_id = models.CharField(max_length=255, editable=False, null=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = _('task')
        verbose_name_plural = _('tasks')
        db_table = 'tasks'
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['start_date', 'end_date']),
        ]
