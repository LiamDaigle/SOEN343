package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Door;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoorRepository extends CrudRepository<Door, Long> {

    @Query("FROM Door d WHERE d.room=?1")
    List<Optional<Door>> findDoorsByRoom(Room room);
}
