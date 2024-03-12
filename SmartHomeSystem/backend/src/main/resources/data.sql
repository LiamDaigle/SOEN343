INSERT INTO rooms (id,name) VALUES (0,'Backyard');
INSERT INTO rooms (id,name) VALUES (1,'Garage');
INSERT INTO rooms (id,name) VALUES (2,'Entrance');

INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (0,false,true,0);
INSERT INTO doors (id, is_auto_lock, is_open, room_id) VALUES (1,false,true,0);

INSERT INTO windows (id, is_open, room_id) VALUES (0, false, 0);

INSERT INTO lights (id, is_on, room_id) VALUES (0, true, 0);