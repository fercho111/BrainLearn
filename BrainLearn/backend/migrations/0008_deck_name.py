# Generated by Django 4.1 on 2023-08-28 00:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_remove_deck_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='deck',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
    ]