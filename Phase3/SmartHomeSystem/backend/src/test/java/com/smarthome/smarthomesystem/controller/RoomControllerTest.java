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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RoomControllerTest {

    @Mock
    RoomRepository roomRepository;
    @Mock
    Mapper<Room, RoomDto> roomMapper;
    @Mock
    DoorRepository doorRepository;
    @Mock
    WindowRepository windowRepository;
    @Mock
    LightRepository lightRepository;
    @InjectMocks
    RoomController roomController;
    private Room room;
    private RoomDto roomDto;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);

        room = new Room();
        room.setId(0L);
        room.setName("Backyard");

        roomDto = new RoomDto();
        roomDto.setId(0L);
        roomDto.setName("Backyard");
    }

    @Test
    public void testFindByName(){
        when(roomRepository.findByName(room.getName())).thenReturn(room);
        when(roomMapper.mapTo(room)).thenReturn(roomDto);
        Map<String,String> map = new HashMap<>();

        RoomDto expected = new RoomDto();
        expected.setId(0L);
        expected.setName("Backyard");

        map.put("name","Backyard");
        RoomDto roomDto = roomController.findByName(map);

        assertEquals(expected, roomDto);
    }
    @Test
    public void testGetAllLights(){
        Light lightZero = new Light();
        lightZero.setId(0L);
        lightZero.setRoom(room);
        lightZero.setOn(true);

        Optional<Light> optionalLightZero = Optional.of(lightZero);

        Light lightOne = new Light();
        lightOne.setId(0L);
        lightOne.setRoom(room);
        lightOne.setOn(true);

        Optional<Light> optionalLightOne = Optional.of(lightOne);

        List<Optional<Light>> dtoList = List.of(optionalLightZero, optionalLightOne);

        when(roomMapper.mapFrom(roomDto)).thenReturn(room);
        when(lightRepository.findLightsByRoom(room)).thenReturn(dtoList);



        //[{"id":0,"room":{"id":0,"name":"Backyard"},"on":true},{"id":1,"room":{"id":0,"name":"Backyard"},"on":true}]
        List<Optional<Light>> list = roomController.findAllLights(roomDto);


        for(int i = 0; i < list.size(); i++){
            assertEquals(dtoList.get(i).get(), list.get(i).get());
        }
    }
    @Test
    public void testGetAllDoors(){
        Door doorZero = new Door();
        doorZero.setId(0L);
        doorZero.setRoom(room);
        doorZero.setOpen(true);
        doorZero.setAutoLock(false);

        Optional<Door> optionalDoorZero = Optional.of(doorZero);

        Door doorOne = new Door();
        doorOne.setId(1L);
        doorZero.setRoom(room);
        doorZero.setOpen(true);
        doorZero.setAutoLock(false);

        Optional<Door> optionalDoorOne = Optional.of(doorOne);

        List<Optional<Door>> dtoList = List.of(optionalDoorZero, optionalDoorOne);

        when(roomMapper.mapFrom(roomDto)).thenReturn(room);
        when(doorRepository.findDoorsByRoom(room)).thenReturn(dtoList);



        //[{"id":0,"room":{"id":0,"name":"Backyard"},"on":true},{"id":1,"room":{"id":0,"name":"Backyard"},"on":true}]
        List<Optional<Door>> list = roomController.findAllDoors(roomDto);


        for(int i = 0; i < list.size(); i++){
            assertEquals(dtoList.get(i).get(), list.get(i).get());
        }
    }
    @Test
    public void testGetAllWindows(){
        Window windowZero = new Window();
        windowZero.setId(0L);
        windowZero.setRoom(room);
        windowZero.setOpen(false);
        windowZero.setBlocked(false);

        Optional<Window> optionalWindowZero = Optional.of(windowZero);

        Window windowOne = new Window();
        windowOne.setId(1L);
        windowOne.setRoom(room);
        windowOne.setOpen(false);
        windowOne.setBlocked(false);

        Optional<Window> optionalWindowOne = Optional.of(windowOne);

        List<Optional<Window>> dtoList = List.of(optionalWindowZero, optionalWindowOne);

        when(roomMapper.mapFrom(roomDto)).thenReturn(room);
        when(windowRepository.findWindowsByRoom(room)).thenReturn(dtoList);



        //[{"id":0,"room":{"id":0,"name":"Backyard"},"on":true},{"id":1,"room":{"id":0,"name":"Backyard"},"on":true}]
        List<Optional<Window>> list = roomController.findAllWindows(roomDto);


        for(int i = 0; i < list.size(); i++){
            assertEquals(dtoList.get(i).get(), list.get(i).get());
        }
    }
}
