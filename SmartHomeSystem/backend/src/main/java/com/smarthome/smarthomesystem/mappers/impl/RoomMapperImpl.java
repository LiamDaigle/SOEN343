package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Room;
import com.smarthome.smarthomesystem.domain.dtos.RoomDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class RoomMapperImpl implements Mapper<Room, RoomDto>{

    private ModelMapper modelMapper;

    public RoomMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public RoomDto mapTo(Room room) {
        return modelMapper.map(room, RoomDto.class);
    }

    @Override
    public Room mapFrom(RoomDto roomDto) {
        return modelMapper.map(roomDto, Room.class);
    }
}
