import psycopg2


def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="ccif",
        user="postgres",
        password="Disel888"
    )
