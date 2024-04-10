package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.dtos.LightDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.LightRepository;
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

public class LightControllerTest {
    //Tests for the LightController class
    @Mock
    private LightRepository lightRepository;
    @Mock
    private Mapper<Light, LightDto> lightMapper;
    @InjectMocks
    private LightController lightController;
    private LightDto lightDto;
    private Light light;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);

        Room room = new Room();
        room.setId(0l);
        room.setName("Backyard");
        lightDto = new LightDto();
        lightDto.setId(0L);
        lightDto.setRoom(room);
        lightDto.setOn(true);

        light = new Light();
        light.setId(0L);
        light.setRoom(room);
        light.setOn(true);
    }

    @Test
    public void testTurnLightOnUpdate(){
        //Test for updating the light's on property to true
        when(lightRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Light expected = new Light();
        expected.setId(lightDto.getId());
        expected.setRoom(lightDto.getRoom());
        expected.setOn(true);

        when(lightRepository.save(any())).thenReturn(expected);
        when(lightMapper.mapTo(any())).thenReturn(lightDto);

        lightDto.setOn(true);
        ResponseEntity<LightDto> response =  lightController.fullLightUpdate(lightDto.getId(), lightDto);
        assertTrue(Objects.requireNonNull(response.getBody()).isOn());
    }

    @Test
    public void testTurnLightOffUpdate(){
        //Test for updating the light's on property to false
        when(lightRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Light expected = new Light();
        expected.setId(lightDto.getId());
        expected.setRoom(lightDto.getRoom());
        expected.setOn(true);

        when(lightRepository.save(any())).thenReturn(expected);
        when(lightMapper.mapTo(any())).thenReturn(lightDto);

        lightDto.setOn(false);
        ResponseEntity<LightDto> response =  lightController.fullLightUpdate(lightDto.getId(), lightDto);
        assertFalse(Objects.requireNonNull(response.getBody()).isOn());
    }

    @Test
    public void testLightNotFound(){
        //Test for if a light is not found
        when(lightRepository.existsById(Mockito.anyLong())).thenReturn(false);

        ResponseEntity response = lightController.fullLightUpdate(lightDto.getId(),lightDto);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
