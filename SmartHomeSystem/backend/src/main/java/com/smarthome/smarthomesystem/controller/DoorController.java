package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Door;
import com.smarthome.smarthomesystem.domain.dtos.DoorDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.DoorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DoorController {

    @Autowired
    private DoorRepository doorRepository;

    private Mapper<Door, DoorDto> doorMapper;

    public DoorController(Mapper<Door, DoorDto> doorMapper) {
        this.doorMapper = doorMapper;
    }

    @PutMapping(path="/api/doors/{id}")
    public ResponseEntity<DoorDto> fullDoorUpdate(@PathVariable("id") Long id, @RequestBody DoorDto door){

        if(!doorRepository.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        door.setId(id);
        Door savedDoor = doorRepository.save(doorMapper.mapFrom(door));
        return new ResponseEntity<>(doorMapper.mapTo(savedDoor), HttpStatus.OK);
    }


}
