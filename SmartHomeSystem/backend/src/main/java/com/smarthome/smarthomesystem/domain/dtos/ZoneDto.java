package com.smarthome.smarthomesystem.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZoneDto {

    private Long id;

    private String name;

    private String rooms;

    private Double temperature;

    private Double desiredTemperature;

    private Boolean isHvacWorking;
}
