# Generated by Django 3.1.5 on 2021-01-10 05:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20210110_1314'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Products',
            new_name='Product',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_cat',
            new_name='product_category',
        ),
    ]
