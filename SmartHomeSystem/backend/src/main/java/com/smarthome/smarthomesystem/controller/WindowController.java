package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.dtos.LightDto;
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

    @GetMapping(path="/api/windows/findAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(windowRepository.findAll());
    }

    @PutMapping(path = "/api/windows/{id}")
    public ResponseEntity<WindowDto> fullWindowUpdate(@PathVariable("id") Long id, @RequestBody WindowDto window) {

        if (!windowRepository.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        window.setId(id);
        Window savedWindow = windowRepository.save(windowMapper.mapFrom(window));
        return new ResponseEntity<>(windowMapper.mapTo(savedWindow), HttpStatus.OK);
    }

    @PatchMapping("/api/windows/{windowId}/blocked")
    public ResponseEntity<String> updateWindowBlocked(@PathVariable("windowId") Long windowId, @RequestBody Boolean isBlocked) {
        Optional<Window> optionalWindow = windowRepository.findById(windowId);

        if (optionalWindow.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Window window = optionalWindow.get();
        window.setBlocked(isBlocked);
        windowRepository.save(window);
        return ResponseEntity.ok("Window blocked value updated successfully");
    }

    @GetMapping(path="/api/windows/{id}")
    public ResponseEntity<WindowDto> getLightById(@PathVariable("id") Long id){
        Optional<Window> window = windowRepository.findById(id);

        if(!window.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(windowMapper.mapTo(window.get()), HttpStatus.OK);
    }
}
