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
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    private final SimulatorSubject simulatorSubject;


    public RoomController(Mapper<Room, RoomDto> roomMapper, SimulatorSubject simulatorSubject){
        this.roomMapper = roomMapper;
        this.simulatorSubject = simulatorSubject;
    }

    @GetMapping(path="/api/rooms/findAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(roomRepository.findAll());
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

    @PatchMapping("/api/rooms/{roomId}/temperature")
    public ResponseEntity<String> updateRoomTemperature(@PathVariable("roomId") Long roomId, @RequestBody Double newTemperature) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);

        if (optionalRoom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Room room = optionalRoom.get();
        room.setTemperature(newTemperature);
        roomRepository.save(room);
        simulatorSubject.setTemperature(newTemperature);
        simulatorSubject.setRoomId(roomId);
        simulatorSubject.notifyObservers();
        return ResponseEntity.status(HttpStatus.OK).body("Room temperature updated successfully");
    }

    @PatchMapping("/api/rooms/{roomId}/hvac")
    public ResponseEntity<String> updateRoomHvac(@PathVariable("roomId") Long roomId, @RequestBody Boolean isHvacWorking) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);

        if (optionalRoom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Room room = optionalRoom.get();
        room.setIsHvacWorking(isHvacWorking);
        roomRepository.save(room);
        simulatorSubject.setHvacWorking(isHvacWorking);
        simulatorSubject.setRoomId(roomId);
        simulatorSubject.notifyObservers();
        return ResponseEntity.status(HttpStatus.OK).body("Room temperature updated successfully");
    }
}
