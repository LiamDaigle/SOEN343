INSERT INTO rooms (id,name, temperature) VALUES (0,'Backyard', 10);
INSERT INTO rooms (id,name, temperature) VALUES (1,'Garage', 10);
INSERT INTO rooms (id,name, temperature) VALUES (2,'Entrance', 10);
INSERT INTO rooms (id,name, temperature) VALUES (3,'Bedroom', 10);
INSERT INTO rooms (id,name, temperature) VALUES (4,'LivingRoom', 10);

INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (0,false,true, 0);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (1,false,true, 0);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (2,false,true, 1);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (3,false,true, 2);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (4,false,true, 3);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (5,false,true, 4);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (6,false,true, 4);

INSERT INTO windows (id, is_open, is_blocked, room_id) VALUES (0, false, false, 0);
INSERT INTO windows (id, is_open, is_blocked, room_id) VALUES (1, false, false, 1);
INSERT INTO windows (id, is_open, is_blocked, room_id) VALUES (2, false, false, 2);
INSERT INTO windows (id, is_open, is_blocked, room_id) VALUES (3, false, false, 3);
INSERT INTO windows (id, is_open, is_blocked, room_id) VALUES (4, false, false, 4);

INSERT INTO lights (id, is_on, room_id) VALUES (0, true, 0);
INSERT INTO lights (id, is_on, room_id) VALUES (1, true, 0);
INSERT INTO lights (id, is_on, room_id) VALUES (2, true, 1);
INSERT INTO lights (id, is_on, room_id) VALUES (3, true, 2);
INSERT INTO lights (id, is_on, room_id) VALUES (4, true, 3);
INSERT INTO lights (id, is_on, room_id) VALUES (5, true, 3);
INSERT INTO lights (id, is_on, room_id) VALUES (6, true, 4);