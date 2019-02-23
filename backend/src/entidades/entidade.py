# coding=utf-8
# import psycopg2
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = 'localhost:5432'
db_name = 'ph2'
db_user = 'admin'
db_password = 'admin'
engine = create_engine('postgresql+psycopg2://'+db_user+':'+db_password+'@'+db_url+'/'+db_name, pool_pre_ping="True")
Session = sessionmaker(bind=engine)
Base = declarative_base()
#
# class Entidade():
#     id = Column(String, primary_key=True)

# coding=utf-8

class Entidade():
    id = Column(Integer, primary_key=True)
