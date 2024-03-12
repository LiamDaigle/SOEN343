package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.Window;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LightRepository extends CrudRepository<Light, Long> {

    @Query("FROM Light l WHERE l.room=?1")
    List<Optional<Light>> findByRoomId(int id);

}
