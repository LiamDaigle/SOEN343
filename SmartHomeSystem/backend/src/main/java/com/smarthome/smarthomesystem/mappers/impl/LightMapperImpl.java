package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Light;
import com.smarthome.smarthomesystem.domain.dtos.LightDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class LightMapperImpl implements Mapper<Light, LightDto> {

    private ModelMapper modelMapper;

    public LightMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public LightDto mapTo(Light light) {
        return modelMapper.map(light, LightDto.class);
    }

    @Override
    public Light mapFrom(LightDto lightDto) {
        return modelMapper.map(lightDto, Light.class);
    }
}
