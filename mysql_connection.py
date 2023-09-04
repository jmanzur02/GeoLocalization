import socket
import time
import mysql.connector

# Configuración de la base de datos
db_config = {
    "host": "basededatos.cnbw6moot2c2.us-east-1.rds.amazonaws.com",
    "user": "manzur",
    "password": "JuanD0212_2003",
    "database": "basededatos"
}

# Crear una conexión a la base de datos
db_connection = mysql.connector.connect(**db_config)
db_cursor = db_connection.cursor()

# Configuración del socket UDP
host = "0.0.0.0"
port = 14000

# Crear el socket UDP
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind((host, port))
print(f"Esperando conexiones en {host}:{port}")

while True:
    try:
        udp_socket.close()      
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind((host, port))
        break  # Si enlace exitoso, salir del bucle
    except OSError as e:
        if e.errno == 10048:  # Error de puerto ya en uso
            print(f"Puerto {port} en uso. Esperando 5 segundos...")
            time.sleep(5)
        else:
            raise

    # Recibir datos del cliente
    data, client_address = udp_socket.recvfrom(1024)
    data = data.decode("utf-8")
    print(f"Dato recibido desde {client_address}: {data}")

    # Procesar los valores de latitud, longitud y estampa de tiempo
    values = data.split(', ')
    latitud = None
    longitud = None
    timestamp = None
    for value in values:
        if value.startswith('Latitud:'):
            latitud = float(value.split(': ')[1])
        elif value.startswith('Longitud:'):
            longitud = float(value.split(': ')[1])
        elif value.startswith('Timestamp:'):
            timestamp = int(value.split(': ')[1])/1000

    # Insertar datos en la base de datos
    if latitud is not None and longitud is not None and timestamp is not None:
        insert_query = "INSERT INTO ubicacion (Latitud, Longitud, Timestamp) VALUES (%s, %s, FROM_UNIXTIME(%s))"
        db_cursor.execute(insert_query, (latitud, longitud,timestamp))
        db_connection.commit()
        print("Dato insertado en la base de datos:", latitud, longitud, timestamp)
    else:
        print("Valores de latitud, longitud o estampa de tiempo faltantes en los datos recibidos.")

# Cerrar la conexión con la base de datos al final
db_cursor.close()
db_connection.close()