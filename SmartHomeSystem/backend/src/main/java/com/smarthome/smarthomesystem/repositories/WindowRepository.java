package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WindowRepository extends CrudRepository<Window, Long> {

    @Query("FROM Window w WHERE w.room=?1")
    List<Optional<Window>> findWindowsByRoom(Room room);
}
