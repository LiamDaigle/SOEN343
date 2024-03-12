package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends CrudRepository<Room, Long> {

    @Query("FROM Room r WHERE r.name = ?1")
    Room findByName(String name);
}
