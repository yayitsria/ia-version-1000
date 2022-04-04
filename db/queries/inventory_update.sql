UPDATE item
SET
    name = ?,
    size = ?,
    quantity = ?,
    location_id = ?,
    expiration_date = STR_TO_DATE(?, '%b %d, %Y'),
    type_id = ?,
    brand = ?
WHERE
    item_id = ?

