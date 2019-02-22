# coding=utf-8

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

class Entidade():
    __tablename__ = 'data'
    id = Column(String, primary_key=True)
    histological_diagnosis = Column(String, nullable=False)
    clinical_diagnosis = Column(String, nullable=False)
    asymmetry  = Column(Integer, nullable=False)
    pigment_network = Column(String, nullable=False)
    dots_globules = Column(String, nullable=False)
    streaks  = Column(String, nullable=False)
    regression_areas = Column(String, nullable=False)
    blue_whitish_veil = Column(String, nullable=False)
    white = Column(String)
    red = Column(String)
    light_brown = Column(String)
    dark_brown = Column(String)
    blue_gray = Column(String)
    black = Column(String)
    # created_at = Column(DateTime)
    # updated_at = Column(DateTime)
    # last_updated_by = Column(String)
    #
    # def __init__(self):
    #     self.created_at = datetime.now()
    #     self.updated_at = datetime.now()
    #     self.last_updated_by = created_by
