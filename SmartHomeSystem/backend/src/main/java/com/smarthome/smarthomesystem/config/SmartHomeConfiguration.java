package com.smarthome.smarthomesystem.config;

import com.smarthome.smarthomesystem.observer.Observer;
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import com.smarthome.smarthomesystem.observer.SmartHomeHeater;
import com.smarthome.smarthomesystem.service.FileService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SmartHomeConfiguration {

    @Bean
    public SimulatorSubject simulatorSubject() {
        return new SimulatorSubject();
    }

    @Bean
    public SmartHomeHeater smartHomeHeater(FileService fileService, SimulatorSubject simulatorSubject) {
        SmartHomeHeater smartHomeHeater = new SmartHomeHeater(fileService);
        simulatorSubject.registerObserver(smartHomeHeater);
        return smartHomeHeater;
    }
}
