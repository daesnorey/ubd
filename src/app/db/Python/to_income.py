from random import randrange

_query = "INSERT INTO {} ({}) VALUES ({});\n"
_table = 'FACTURA'
_sub_table = 'DETALLE_FACTURA'

with open('to_inventario.txt', 'r') as infile, open('to_income.sql', 'w') as outincomefile, open('to_income_detail.sql', 'w') as outincomedetailfile:
    _columns = None
    _income_id = 1
    _income_detail_id = 1
    _inventory_id = 2471
    _date_format = 'TO_DATE(\'{}\', \'yyyy-MM-dd\')'
    _cont = 0

    for line in infile:
        if not _columns:
            _columns = 'ID_DETALLE_FACTURA, ID_FACTURA, ID_INVENTARIO, VALOR'
            continue
        _cont += 1
        _values = line.strip().split(';')
        _cant = int(_values[2].strip())
        _start_date = _date_format.format(_values[3])
        _cost = 950
        _total_cost = 0

        for i in range(_cant):
            _total_cost += _cost

            #ID_DETALLE_FACTURA, ID_FACTURA, ID_INVENTARIO, VALOR
            _tmp_values = "'{}','{}','{}','{}'".format(_income_detail_id, _income_id, _inventory_id, _cost)
            outincomedetailfile.write(_query.format(_sub_table, _columns, _tmp_values))
            _inventory_id += 1
            _income_detail_id += 1

        _client_id = randrange(22, 121)
        #ID_FACTURA,ID_NUMERACION,CONSECUTIVO,ID_CLIENTE,VALOR_NETO,VALOR_TOTAL,ID_ESTADO_FACTURA,FECHA_ALTA
        _income_columns = 'ID_FACTURA,ID_NUMERACION,CONSECUTIVO,ID_CLIENTE,VALOR_NETO,VALOR_TOTAL,ID_ESTADO_FACTURA,FECHA_ALTA'
        _tmp_income_values = "'{}',{},'{}','{}','{}',{},{},{}".format(_income_id, 1, _cont, _client_id, _total_cost, _total_cost, 1, _start_date)
        outincomefile.write(_query.format(_table, _income_columns, _tmp_income_values))
        _income_id += 1
