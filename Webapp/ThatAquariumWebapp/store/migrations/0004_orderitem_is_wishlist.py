# Generated by Django 3.1.5 on 2021-01-20 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20210120_2022'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='is_wishlist',
            field=models.BooleanField(default=False),
        ),
    ]
