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
public class DoorDto {

    private Long id;

    private boolean isAutoLock;

    private boolean isOpen;

    private Room room;
}
