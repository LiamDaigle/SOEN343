package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Door;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.dtos.DoorDto;
import com.smarthome.smarthomesystem.repositories.DoorRepository;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DoorControllerTest {
    //Tests for the DoorController class
    @Mock
    private DoorRepository doorRepository;

    @Mock
    private Mapper<Door, DoorDto> doorMapper;

    @InjectMocks
    private DoorController doorController;

    private DoorDto doorDto;
    private Door door;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);

        Room room = new Room();
        room.setId(0l);
        room.setName("Backyard");
        doorDto = new DoorDto();
        doorDto.setId(0l);
        doorDto.setRoom(room);
        doorDto.setOpen(true);

        door = new Door();
        door.setId(0l);
        door.setRoom(room);
        door.setOpen(true);
    }

    @Test
    public void testOpenDoorUpdate(){
        //Test that updates the door's open property to open
        when(doorRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Door expected = new Door();
        expected.setId(doorDto.getId());
        expected.setRoom(doorDto.getRoom());
        expected.setOpen(true);
        expected.setAutoLock(doorDto.isAutoLock());

        when(doorRepository.save(any())).thenReturn(expected);
        when(doorMapper.mapTo(any())).thenReturn(doorDto);

        ResponseEntity<DoorDto> response =  doorController.fullDoorUpdate(doorDto.getId(), doorDto);
        assertTrue(Objects.requireNonNull(response.getBody()).isOpen());
    }
    @Test
    public void testCloseDoorUpdate(){
        //Test that updates the door's open property to closed
        when(doorRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Door expected = new Door();
        expected.setId(doorDto.getId());
        expected.setRoom(doorDto.getRoom());
        expected.setOpen(true);
        expected.setAutoLock(doorDto.isAutoLock());

        when(doorRepository.save(any())).thenReturn(expected);
        when(doorMapper.mapTo(any())).thenReturn(doorDto);

        doorDto.setOpen(false);
        ResponseEntity<DoorDto> response =  doorController.fullDoorUpdate(doorDto.getId(), doorDto);
        assertFalse(Objects.requireNonNull(response.getBody()).isOpen());
    }
    @Test
    public void testDoorNotFound(){
        //Test if a door is not found
        when(doorRepository.existsById(Mockito.anyLong())).thenReturn(false);

        ResponseEntity response =  doorController.fullDoorUpdate(doorDto.getId(), doorDto);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
