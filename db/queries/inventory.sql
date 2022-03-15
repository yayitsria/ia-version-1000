SELECT item_id, item.name as name, size, quantity, item_location.name as location, DATE_FORMAT(expiration_date,'%m-%d-%Y') as date, item_type.name as type, brand
FROM item, item_location, item_type
WHERE item.location_id = item_location.item_location_id
and item.type_id = item_type.item_type_id
