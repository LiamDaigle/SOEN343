package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Door;
import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.dtos.RoomDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.DoorRepository;
import com.smarthome.smarthomesystem.repositories.LightRepository;
import com.smarthome.smarthomesystem.repositories.RoomRepository;
import com.smarthome.smarthomesystem.repositories.WindowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DoorRepository doorRepository;

    @Autowired
    private WindowRepository windowRepository;

    @Autowired
    private LightRepository lightRepository;

    private Mapper<Room, RoomDto> roomMapper;

    public RoomController(Mapper<Room, RoomDto> roomMapper){
        this.roomMapper = roomMapper;
    }

    @PostMapping(path="/api/rooms/findByName")
    public RoomDto findByName(@RequestBody Map<String, String> nameMapping){
        Room returnedRoom = roomRepository.findByName(nameMapping.get("name"));
        return roomMapper.mapTo(returnedRoom);
    }

    @PostMapping(path = "/api/rooms/findAllDoors")
    public List<Optional<Door>> findAllDoors(@RequestBody RoomDto room){
        return doorRepository.findDoorsByRoom(roomMapper.mapFrom(room));
    }

    @PostMapping(path = "/api/rooms/findAllLights")
    public List<Optional<Light>> findAllLights(@RequestBody RoomDto room){
        return lightRepository.findLightsByRoom(roomMapper.mapFrom(room));
    }

    @PostMapping(path = "/api/rooms/findAllWindows")
    public List<Optional<Window>> findAllWindows(@RequestBody RoomDto room){
        return windowRepository.findWindowsByRoom(roomMapper.mapFrom(room));
    }
}
