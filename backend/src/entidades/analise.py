from marshmallow import Schema, fields
from sqlalchemy import Column, String, Integer
from .entidade import Entidade, Base

class Analise(Entidade, Base):
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

    def __init__(self, histological_diagnosis, clinical_diagnosis, asymmetry, pigment_network, dots_globules, streaks, regression_areas, blue_whitish_veil, white, red, light_brown, dark_brown, blue_gray, black):
        self.histological_diagnosis = histological_diagnosis
        self.clinical_diagnosis = clinical_diagnosis
        self.asymmetry = asymmetry
        self.pigment_network = pigment_network
        self.dots_globules = dots_globules
        self.streaks = streaks
        self.regression_areas = regression_areas
        self.blue_whitish_veil = blue_whitish_veil
        self.white = white
        self.red = red
        self.light_brown = light_brown
        self.dark_brown = dark_brown
        self.blue_gray = blue_gray
        self.black = black

class AnaliseSchema(Schema):
    id = fields.Str()
    histological_diagnosis = fields.Str()
    clinical_diagnosis = fields.Str()
    asymmetry  = fields.Number()
    pigment_network = fields.Str()
    dots_globules = fields.Str()
    streaks  = fields.Str()
    regression_areas = fields.Str()
    blue_whitish_veil = fields.Str()
    white = fields.Str()
    red = fields.Str()
    light_brown = fields.Str()
    dark_brown = fields.Str()
    blue_gray = fields.Str()
    black = fields.Str()
