# Generated by Django 4.1 on 2023-08-28 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_deck_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deck',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]