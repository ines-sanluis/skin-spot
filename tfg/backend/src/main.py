import psycopg2
from .entidades.entidade import Session, engine, Base, Entidade
print("Backend Running")

connection = engine.connect()
result = connection.execute("select * from data")
for row in result:
    print("id: ", row['id'])
connection.close()
