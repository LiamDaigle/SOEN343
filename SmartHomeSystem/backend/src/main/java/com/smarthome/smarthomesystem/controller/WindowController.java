package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.dtos.WindowDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.WindowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@RestController
public class WindowController {

    @Autowired
    private WindowRepository windowRepository;

    private Mapper<Window, WindowDto> windowMapper;

    public WindowController(Mapper<Window, WindowDto> windowMapper) {
        this.windowMapper = windowMapper;
    }

    @PutMapping(path="/api/windows/{id}")
    public ResponseEntity<WindowDto> fullWindowUpdate(@PathVariable("id") Long id, @RequestBody WindowDto window){

        if(!windowRepository.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        window.setId(id);
        Window savedWindow = windowRepository.save(windowMapper.mapFrom(window));
        return new ResponseEntity<>(windowMapper.mapTo(savedWindow), HttpStatus.OK);
    }

    @PatchMapping(path = "/api/windows/{id}")
    public ResponseEntity<WindowDto> blockWindowUpdate(@PathVariable("id") Long id, @RequestBody WindowDto updatedWindow) {
        Optional<Window> optionalWindow = windowRepository.findById(id);

        if (optionalWindow.isPresent()) {
            Window window = optionalWindow.get();

            // Update specific properties
            if (updatedWindow.getIsBlocked() != null) {
                window.setBlocked(updatedWindow.getIsBlocked());
            }

            // Save the updated window
            Window savedWindow = windowRepository.save(window);
            return ResponseEntity.ok(windowMapper.mapTo(savedWindow));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
