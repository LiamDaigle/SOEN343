package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.dtos.WindowDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.WindowRepository;
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
public class WindowControllerTest {
    //Tests for the WindowController class
    @Mock
    private WindowRepository windowRepository;
    @Mock
    private Mapper<Window, WindowDto> windowMapper;
    @InjectMocks
    private WindowController windowController;
    private WindowDto windowDto;
    private Window window;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);

        Room room = new Room();
        room.setId(0l);
        room.setName("Backyard");
        windowDto = new WindowDto();
        windowDto.setId(0L);
        windowDto.setRoom(room);
        windowDto.setOpen(true);

        window = new Window();
        window.setId(0L);
        window.setRoom(room);
        window.setOpen(true);
    }

    @Test
    public void testTurnWindowOpenUpdate(){
        //Test that updates the window's open property to open
        when(windowRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Window expected = new Window();
        expected.setId(windowDto.getId());
        expected.setRoom(windowDto.getRoom());
        expected.setOpen(true);

        when(windowRepository.save(any())).thenReturn(expected);
        when(windowMapper.mapTo(any())).thenReturn(windowDto);

        windowDto.setOpen(true);
        ResponseEntity<WindowDto> response =  windowController.fullWindowUpdate(windowDto.getId(), windowDto);
        assertTrue(Objects.requireNonNull(response.getBody()).isOpen());
    }

    @Test
    public void testTurnWindowOffUpdate(){
        //Test that updates the window's open property to closed
        when(windowRepository.existsById(Mockito.anyLong())).thenReturn(true);

        Window expected = new Window();
        expected.setId(windowDto.getId());
        expected.setRoom(windowDto.getRoom());
        expected.setOpen(true);

        when(windowRepository.save(any())).thenReturn(expected);
        when(windowMapper.mapTo(any())).thenReturn(windowDto);

        windowDto.setOpen(false);
        ResponseEntity<WindowDto> response =  windowController.fullWindowUpdate(windowDto.getId(), windowDto);
        assertFalse(Objects.requireNonNull(response.getBody()).isOpen());
    }

    @Test
    public void testWindowNotFound(){
        //Test that covers if a window is not found
        when(windowRepository.existsById(Mockito.anyLong())).thenReturn(false);

        ResponseEntity response = windowController.fullWindowUpdate(windowDto.getId(),windowDto);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
