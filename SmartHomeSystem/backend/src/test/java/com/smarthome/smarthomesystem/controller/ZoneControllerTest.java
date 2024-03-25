package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.controller.ZoneController;
import com.smarthome.smarthomesystem.domain.Zone;
import com.smarthome.smarthomesystem.domain.dtos.ZoneDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.ZoneRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ZoneController.class)
public class ZoneControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ZoneRepository zoneRepository;

    @MockBean
    private Mapper<Zone, ZoneDto> zoneMapper; // Mock the Mapper bean

    @BeforeEach
    public void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddZone() throws Exception {
        Zone zone = new Zone();
        zone.setId(1L);
        zone.setName("Living Room");

        when(zoneRepository.save(any(Zone.class))).thenReturn(zone);

        mockMvc.perform(post("/api/zones/addZone")
                        .contentType("application/json")
                        .content("{\"name\":\"Living Room\"}"))
                .andExpect(status().isOk());

        verify(zoneRepository, times(1)).save(any(Zone.class));
    }

    // Add more test methods for other endpoints
}
