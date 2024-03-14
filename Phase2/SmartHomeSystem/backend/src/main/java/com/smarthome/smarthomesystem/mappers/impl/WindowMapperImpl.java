package com.smarthome.smarthomesystem.mappers.impl;

import com.smarthome.smarthomesystem.domain.Window;
import com.smarthome.smarthomesystem.domain.dtos.WindowDto;
import com.smarthome.smarthomesystem.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WindowMapperImpl implements Mapper<Window, WindowDto> {

    private ModelMapper modelMapper;

    public WindowMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public WindowDto mapTo(Window window) {
        return modelMapper.map(window, WindowDto.class);
    }

    @Override
    public Window mapFrom(WindowDto windowDto) {
        return modelMapper.map(windowDto, Window.class);
    }
}
