#

_query = "INSERT INTO {} ({}) VALUES ({});\n"
_table = 'INVENTARIO'

with open('to_inventario.txt', 'r') as infile, open('to_inventario.sql', 'w') as outfile:
    _columns = None
    _lote_count = 25
    _inventory_id = 2471
    _production_detail_id = 2374
    _id_estado = 'A'
    _date_format = 'TO_DATE(\'{}\', \'yyyy-MM-dd\')'

    for line in infile:
        if not _columns:
            _columns = line.strip()
            continue
        _values = line.strip().split(';')
        _product = _values[0]
        _presentation = _values[1]
        _cant = int(_values[2].strip())
        _start_date = _date_format.format(_values[3])
        _end_date = _date_format.format(_values[4])

        for i in range(_cant):
            _lote = 'YHF' + str(_lote_count)

            #ID_INVENTARIO,LOTE,ID_PRESENTACION,ID_PRODUCTO,ID_ESTADO_INVENTARIO,FECHA_ALTA,FECHA_VENCIMIENTO
            _tmp_values = "'{}','{}','{}','{}','{}',{},{}".format(_inventory_id, _lote, _presentation, _product, _id_estado, _start_date, _end_date)
            outfile.write(_query.format(_table, _columns, _tmp_values))
            _lote_count += 1
            _inventory_id += 1
            _production_detail_id += 1
