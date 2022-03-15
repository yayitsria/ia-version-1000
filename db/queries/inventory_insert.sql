INSERT INTO item (name, quantity, size, location_id, expiration_date, type_id, brand)
VALUES (?,?,?,?,STR_TO_DATE(?, '%b %d, %Y'),?,?);
