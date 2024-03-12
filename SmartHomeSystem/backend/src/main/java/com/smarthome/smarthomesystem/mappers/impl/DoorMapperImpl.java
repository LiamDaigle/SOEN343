package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Door;
import com.smarthome.smarthomesystem.domain.dtos.DoorDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DoorMapperImpl implements Mapper<Door, DoorDto> {

    private ModelMapper modelMapper;

    public DoorMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public DoorDto mapTo(Door door) {
        return modelMapper.map(door, DoorDto.class);
    }

    @Override
    public Door mapFrom(DoorDto doorDto) {
        return modelMapper.map(doorDto, Door.class);
    }
}
