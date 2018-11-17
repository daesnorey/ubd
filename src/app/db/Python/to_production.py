#

_query = "INSERT INTO {} ({}) VALUES ({});\n"
_table = 'PRODUCCION'
_sub_table = 'DETALLE_PRODUCCION'

with open('to_inventario.txt', 'r') as infile, open('to_production.sql', 'w') as outproductionfile, open('to_production_detail.sql', 'w') as outproductiondetailfile:
    _columns = None
    _lote_count = 25
    _production_id = 765
    _production_detail_id = 2374
    _inventory_id = 2471
    _date_format = 'TO_DATE(\'{}\', \'yyyy-MM-dd\')'

    for line in infile:
        if not _columns:
            _columns = 'ID_DETALLE_PRODUCCION,ID_PRODUCCION,ID_INVENTARIO,FECHA_ALTA,VALOR'
            continue
        _values = line.strip().split(';')
        _cant = int(_values[2].strip())
        _start_date = _date_format.format(_values[3])
        _cost = 950
        _total_cost = 0

        for i in range(_cant):
            _total_cost += _cost

            #ID_DETALLE_PRODUCCION,ID_PRODUCCION,ID_INVENTARIO,FECHA_ALTA,VALOR
            _tmp_values = "'{}','{}','{}',{},'{}'".format(_production_detail_id, _production_id, _inventory_id, _start_date, _cost)
            outproductiondetailfile.write(_query.format(_sub_table, _columns, _tmp_values))
            _inventory_id += 1
            _production_detail_id += 1

        #ID_PRODUCCION,FECHA_ALTA,VALOR
        _production_columns = 'ID_PRODUCCION,FECHA_ALTA,VALOR'
        _tmp_production_values = "'{}',{},'{}'".format(_production_id, _start_date, _total_cost)
        outproductionfile.write(_query.format(_table, _production_columns, _tmp_production_values))
        _production_id += 1
