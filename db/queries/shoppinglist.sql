SELECT shoppinglist_id, shopping_list.name as name, quantity, store, item_type.name as type, brand
FROM shopping_list, item_type
WHERE shopping_list.type_id = item_type.item_type_id
