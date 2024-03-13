package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.dtos.LightDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.LightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LightController {

    @Autowired
    private LightRepository lightRepository;

    private Mapper<Light, LightDto> lightMapper;

    public LightController(Mapper<Light, LightDto> lightMapper) {
        this.lightMapper = lightMapper;
    }

    @PutMapping(path="/api/lights/{id}")
    public ResponseEntity<LightDto> fullLightUpdate(@PathVariable("id") Long id, @RequestBody LightDto light){

        if(!lightRepository.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        light.setId(id);
        Light savedLight = lightRepository.save(lightMapper.mapFrom(light));
        return new ResponseEntity<>(lightMapper.mapTo(savedLight), HttpStatus.OK);
    }
}
