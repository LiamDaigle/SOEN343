package com.smarthome.smarthomesystem.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDto {

    private Long id;

    private String name;

    private Double temperature;

    private Double desiredTemperature;

    private Boolean isHvacWorking;

    private Boolean overrideZone;

    private Boolean hasMotionDetector;
}
