package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Zone;
import com.smarthome.smarthomesystem.domain.dtos.ZoneDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ZoneMapperImpl implements Mapper<Zone, ZoneDto> {

    private ModelMapper modelMapper;

    public ZoneMapperImpl(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    @Override
    public ZoneDto mapTo(Zone zone) {return modelMapper.map(zone, ZoneDto.class);}
    @Override
    public Zone mapFrom(ZoneDto zoneDto) {return modelMapper.map(zoneDto, Zone.class);}
}
