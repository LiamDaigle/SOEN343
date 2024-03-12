package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.repositories.DoorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doors")
public class DoorController {

    @Autowired
    DoorRepository doorRepository;
}
