package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.repositories.WindowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/windows")
public class WindowController {

    @Autowired
    private WindowRepository windowRepository;
}
