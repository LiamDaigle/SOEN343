package com.smarthome.smarthomesystem.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HomeDto {

    private Long id;

    private boolean isAwayModeOn;

    private Integer timeToCallPolice;
}
