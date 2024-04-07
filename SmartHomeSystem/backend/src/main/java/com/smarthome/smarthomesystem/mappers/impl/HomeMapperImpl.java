package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Home;
import com.smarthome.smarthomesystem.domain.dtos.HomeDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class HomeMapperImpl implements Mapper<Home, HomeDto> {

    private ModelMapper modelMapper;

    public HomeMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    @Override
    public HomeDto mapTo(Home home) {
        return modelMapper.map(home, HomeDto.class);
    }

    @Override
    public Home mapFrom(HomeDto homeDto) {
        return modelMapper.map(homeDto, Home.class);
    }
}
