# Generated by Django 4.1 on 2023-08-28 00:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_deck_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deck',
            name='name',
        ),
    ]
