package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.repositories.LightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lights")
public class LightController {

    @Autowired
    private LightRepository lightRepository;
}
