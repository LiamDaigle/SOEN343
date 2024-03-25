package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.Zone;
import com.smarthome.smarthomesystem.domain.dtos.ZoneDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import com.smarthome.smarthomesystem.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ZoneController {

    @Autowired
    ZoneRepository zoneRepository;

    private Mapper<Zone, ZoneDto> zoneMapper;

    public ZoneController(Mapper<Zone, ZoneDto> zoneMapper){
        this.zoneMapper = zoneMapper;
    }

    @PostMapping(path = "/api/zones/addZone")
    public ResponseEntity<?> addZone(@RequestBody Zone zone){
        zoneRepository.save(zone);
        return ResponseEntity.ok(zone);
    }

    @GetMapping(path = "/api/zones/findAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(zoneRepository.findAll());
    }

    @PatchMapping("/api/zones/{zoneId}/temperature")
    public ResponseEntity<?> updateZoneTemperature(@PathVariable("zoneId") Long zoneId, @RequestBody Double newTemperature){
        Optional<Zone> zoneOptional = zoneRepository.findById(zoneId);

        if (zoneOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Zone zone = zoneOptional.get();
        zone.setTemperature(newTemperature);
        zoneRepository.save(zone);

        return ResponseEntity.status(HttpStatus.OK).body("Zone temperature updated successfully");
    }

    @PatchMapping("/api/zones/{zoneId}/desiredTemperature")
    public ResponseEntity<?> updateZoneDesiredTemperature(@PathVariable("zoneId") Long zoneId, @RequestBody Double newTemperature){
        Optional<Zone> zoneOptional = zoneRepository.findById(zoneId);

        if (zoneOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Zone zone = zoneOptional.get();
        zone.setDesiredTemperature(newTemperature);
        zoneRepository.save(zone);

        return ResponseEntity.status(HttpStatus.OK).body("Zone desired temperature updated successfully");
    }

    @PatchMapping("/api/zones/{zoneId}/hvac")
    public ResponseEntity<?> updateZoneHvac(@PathVariable("zoneId") Long zoneId, @RequestBody Boolean isHvacWorking){
        Optional<Zone> zoneOptional = zoneRepository.findById(zoneId);

        if (zoneOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Zone zone = zoneOptional.get();
        zone.setIsHvacWorking(isHvacWorking);
        zoneRepository.save(zone);

        return ResponseEntity.status(HttpStatus.OK).body("Zone hvac updated successfully");
    }
}
