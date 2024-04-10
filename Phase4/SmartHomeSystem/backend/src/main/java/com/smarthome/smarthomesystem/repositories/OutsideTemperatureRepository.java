package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.OutsideTemperature;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.dtos.RoomDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OutsideTemperatureRepository extends CrudRepository<OutsideTemperature, Long> {


}
