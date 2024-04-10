package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Home;
import com.smarthome.smarthomesystem.domain.dtos.HomeDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.HomeRepository;
import com.smarthome.smarthomesystem.subject.SmartHomeSecurity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

public class HomeControllerTest {
    //Tests for the HomeController class
    @Mock
    private HomeRepository homeRepository;
    @Mock
    private Mapper<Home, HomeDto> homeMapper;
    @InjectMocks
    private HomeController homeController;
    @Mock
    private HomeDto homeDto;
    @Mock
    private Home home;
    @Mock
    private Optional<Home> optionalHome;
    @Mock
    private SmartHomeSecurity smartHomeSecurity;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);

    }

    @Test
    public void testSwitchAwayMode(){
        //Test switching away mode from false to true
        when(homeRepository.findById(anyLong())).thenReturn(optionalHome);
        when(optionalHome.isEmpty()).thenReturn(false);
        when(optionalHome.get()).thenReturn(home);
        when(home.isAwayModeOn()).thenReturn(false);
        doNothing().when(smartHomeSecurity).setAwayMode(anyBoolean());


        boolean newValue = homeController.switchIsAway().getBody();
        assertTrue(newValue);

    }
    @Test
    public void testSetTime(){
        //Test the setTime functionality to set the time for police to arrive after motion detected in away mode
        when(homeRepository.findById(anyLong())).thenReturn(optionalHome);
        when(optionalHome.isEmpty()).thenReturn(false);
        when(optionalHome.get()).thenReturn(home);
        doNothing().when(home).setTimeToCallPolice(190);

        String message = homeController.setTime(190).getBody();

        assertEquals("Timer changed to: 190 seconds", message);
    }
}
