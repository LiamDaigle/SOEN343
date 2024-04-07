package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Home;
import com.smarthome.smarthomesystem.domain.dtos.HomeDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.HomeRepository;
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class HomeController {

    @Autowired
    private HomeRepository homeRepository;

    private Mapper<Home, HomeDto> homeMapper;

    @Autowired
    private SimulatorSubject simulatorSubject;

    public HomeController(Mapper<Home, HomeDto> homeMapper){
        this.homeMapper = homeMapper;
    }

    @GetMapping(path = "/api/home/getIsAway")
    public ResponseEntity<Boolean> getIsAway(){
        Optional<Home> home = homeRepository.findById(0L);
        if(home.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(home.get().isAwayModeOn(), HttpStatus.OK);
    }

    @PostMapping(path = "/api/home/switchIsAway")
    public ResponseEntity<Boolean> switchIsAway(){
        Optional<Home> home = homeRepository.findById(0L);
        if(home.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        boolean oldValue = home.get().isAwayModeOn();
        boolean newAwayMode = !oldValue;
        home.get().setAwayModeOn(newAwayMode);
        homeRepository.save(home.get());

        simulatorSubject.setAwayMode(newAwayMode); // Notify observers about away mode change

        return new ResponseEntity<>(newAwayMode, HttpStatus.OK);
    }
}
