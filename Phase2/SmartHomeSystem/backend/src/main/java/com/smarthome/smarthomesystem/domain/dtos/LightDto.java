package com.smarthome.smarthomesystem.domain.dtos;

import com.smarthome.smarthomesystem.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LightDto {
    private Long id;

    private boolean isOn;

    private Room room;
}
