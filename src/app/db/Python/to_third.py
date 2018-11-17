from random import randrange

_query = "INSERT INTO {} ({}) VALUES ({});\n"
_table = 'TERCERO'
_sub_table = 'CLIENTE'

_base_doc = 1013644409
_third_id = 23
_client_id = 22
_factor = 0.99

_names = ['DANIEL', 'WALTER', 'FELIPE', 'LAURA', 'JESICA', 'BEN', 'STEVEN', 'SERGIO', 'DAVID', 'ESTEBAN', 'NICOLE', 'SOFIA', 'JAMES']
_lastnames = ['NOVOA', 'CORREDOR', 'PIRAQUIVE', 'GARCIA', 'SAENZ', 'SANZ', 'RIVERA', 'RODRIGUEZ', 'DUARTE', 'MOLANO', 'QUINTERO']
_birth_dates = ['1990-02-##', '1992-12-##', '1993-11-##', '1994-09-##', '1987-04-##', '1990-08-##', '1993-10-##', '1989-02-##', '1986-07-##']

_third_columns = 'ID_TERCERO,ID_TIPO_DOCUMENTO,NUMERO_DOCUMENTO,NOMBRES,APELLIDOS,FECHA_NACIMIENTO,ID_ESTADO_CIVIL,FECHA_ALTA'
_client_columns = 'ID_CLIENTE,ID_TERCERO,FACTOR'

_start_date = 'TO_DATE(\'2013-05-16\', \'YYYY-MM-DD\')'

with open('to_client.sql', 'w') as clientoufile, open('to_third.sql', 'w') as thirdoutfile:
    for i in range(100):
        _name = _names[randrange(0, len(_names) - 1)]
        _lastname = '{} {}'.format(_lastnames[randrange(0, len(_lastnames) - 1)], _lastnames[randrange(0, len(_lastnames) - 1)])

        _day = str(randrange(1, 28))
        _birth_date = 'TO_DATE(\'{}\', \'YYYY-MM-DD\')'.format(_birth_dates[randrange(0, len(_birth_dates) - 1)].replace('##', _day))

        _third_values = '\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', {}, \'{}\', {}'.format(_third_id, 'C', _base_doc, _name, _lastname, _birth_date, 'S', _start_date)
        _third_query = _query.format(_table, _third_columns, _third_values)

        _client_values = '\'{}\', \'{}\', {}'.format(_client_id, _third_id, _factor)
        _client_query = _query.format(_sub_table, _client_columns, _client_values)

        thirdoutfile.write(_third_query)
        clientoufile.write(_client_query)
        _third_id += 1
        _client_id += 1
        _base_doc += 3
