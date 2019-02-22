from mashmallow import Schema, fields

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
