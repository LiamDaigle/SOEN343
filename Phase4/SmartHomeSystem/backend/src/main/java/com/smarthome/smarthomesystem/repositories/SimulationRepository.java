package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.OutsideTemperature;
import com.smarthome.smarthomesystem.domain.Simulation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulationRepository extends CrudRepository<Simulation, Long> {

    @Query("FROM Simulation s WHERE s.id = 0")
    Simulation getSimulation(Long id);


}
